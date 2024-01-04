document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('products-list');
  const productForm = document.getElementById('product-form');
  const editProductModal = document.getElementById('editProductModal');
  const editProductForm = document.getElementById('editProductForm');
  let currentProductId;

  async function fetchProducts() {
    try {
      const response = await fetch('/api/produtos');
      const produtos = await response.json();
      renderProducts(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  }

  function renderProducts(products) {
    productList.innerHTML = `
      <table>
        <tr>
          <th>Nome do Produto</th>
          <th>Código do Produto</th>
          <th>Descrição do Produto</th>
          <th>Preço do Produto</th>
          <th>Ações</th>
        </tr>
        ${products.map(product => `
          <tr>
            <td>${product.nome}</td>
            <td>${product.codigo}</td>
            <td>${product.descricao}</td>
            <td>${product.preco}</td>
            <td>
              <button onclick="editProduct('${product._id}')">Editar</button>
              <button onclick="deleteProduct('${product._id}')">Excluir</button>
            </td>
          </tr>
        `).join('')}
      </table>
    `;
  }

  async function addProduct() {
    try {
      const productName = document.getElementById('productName').value;
      const productCode = document.getElementById('productCode').value;
      const productDescription = document.getElementById('productDescription').value;
      const productPrice = document.getElementById('productPrice').value;

      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: productName,
          codigo: productCode,
          descricao: productDescription,
          preco: parseFloat(productPrice),
        }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        fetchProducts(); // Atualiza a lista de produtos após a adição
      } else {
        console.error('Erro ao adicionar produto:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  }

  async function editProduct(id) {
    try {
      currentProductId = id;
      const response = await fetch(`/api/produtos/${id}`);
      const productToUpdate = await response.json();

      // Preenche o formulário de edição com os dados do produto
      editProductForm.elements['productName'].value = productToUpdate.nome;
      editProductForm.elements['productCode'].value = productToUpdate.codigo;
      editProductForm.elements['productDescription'].value = productToUpdate.descricao;
      editProductForm.elements['productPrice'].value = productToUpdate.preco;

      // Abre o modal de edição
      editProductModal.style.display = 'block';
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  }

  async function saveProductChanges() {
    try {
      const id = currentProductId;
      const updatedName = editProductForm.elements['productName'].value;
      const updatedCode = editProductForm.elements['productCode'].value;
      const updatedDescription = editProductForm.elements['productDescription'].value;
      const updatedPrice = editProductForm.elements['productPrice'].value;

      const response = await fetch(`/api/produtos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: updatedName,
          codigo: updatedCode,
          descricao: updatedDescription,
          preco: parseFloat(updatedPrice),
        }),
      });

      if (response.ok) {
        // Fecha o modal de edição
        editProductModal.style.display = 'none';
        // Atualiza a lista de produtos após a edição
        fetchProducts();
      } else {
        console.error('Erro ao salvar alterações:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await fetch(`/api/produtos/${id}`, { method: 'DELETE' });

      if (response.ok) {
        fetchProducts(); // Atualiza a lista de produtos após a exclusão
      } else {
        console.error('Erro ao excluir produto:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  }

  // Inicializa a página
  fetchProducts();

  // Adiciona um ouvinte de evento para o formulário de adição de produtos
  productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addProduct();
  });

  // Adiciona um ouvinte de evento para o botão de salvar alterações no modal de edição
  document.getElementById('saveChangesBtn').addEventListener('click', saveProductChanges);
});

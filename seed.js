// const mongoose = require('mongoose');
// const Product = require('./models/product'); // Certifique-se de substituir pelo caminho correto do seu modelo de produto.

// mongoose.connect('mongodb://localhost:27017/nunes_sports', { useNewUrlParser: true });

// const productsData = [
//   {
//     nome: 'Tênis de Corrida',
//     codigo: 'TN001',
//     descricao: 'Tênis esportivo para corrida leve e confortável.',
//     preco: 199.99
//   },
//   {
//     nome: 'Bola de Futebol',
//     codigo: 'FB001',
//     descricao: 'Bola oficial para partidas de futebol profissional.',
//     preco: 49.99
//   },
//   // Adicione mais produtos conforme necessário
// ];

// async function seedDatabase() {
//   try {
//     // Limpa a coleção de produtos antes de adicionar novos itens
//     await Product.deleteMany({});

//     // Adiciona os produtos ao banco de dados
//     const createdProducts = await Product.create(productsData);

//     console.log('Produtos adicionados ao banco de dados:', createdProducts);
//   } catch (error) {
//     console.error('Erro ao adicionar produtos:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// seedDatabase();


const { MongoClient } = require('mongodb');

async function seedDatabase() {
  const uri = 'mongodb://localhost:27017/nunes_sports';
  
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db();

    // Lógica para inserir dados no banco de dados
    const dataToInsert = [
      {
            nome: 'Tênis de Corrida',
            codigo: 'TN001',
            descricao: 'Tênis esportivo para corrida leve e confortável.',
            preco: 199.99
          },
          {
            nome: 'Bola de Futebol',
            codigo: 'FB001',
            descricao: 'Bola oficial para partidas de futebol profissional.',
            preco: 49.99
          },
    ];

    await db.collection('products').insertMany(dataToInsert);

    console.log('Seed concluída com sucesso!');
  } finally {
    await client.close();
  }
}

seedDatabase();
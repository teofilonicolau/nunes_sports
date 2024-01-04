const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/nunes_sports', { useUnifiedTopology: true });




const productSchema = new mongoose.Schema({
  nome: String,
  codigo: String,
  descricao: String,
  preco: Number
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());

app.get('/api/produtos', async (req, res) => {
  const produtos = await Product.find();
  res.json(produtos);
});

app.post('/api/produtos', async (req, res) => {
  const novoProduto = new Product(req.body);
  await novoProduto.save();
  res.json(novoProduto);
});



app.put('/api/produtos/:id', async (req, res) => {
  const produto = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(produto);
});




app.delete('/api/produtos/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send('Produto excluído com sucesso.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

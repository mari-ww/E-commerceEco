const axios = require('axios');
const express = require('express');
const cors = require('cors');  // <-- Adicionei CORS
const products = require('./mockProducts');  // <-- Importa mockProducts

const app = express();
const port = 5002;

app.use(cors());  // <-- Ativa CORS
app.use(express.json());

// Endpoint para listar todos os produtos (mock)
app.get('/produtos', (req, res) => {
  res.json(products);
});

// Endpoint para cadastrar produto (se quiser adicionar novos)
app.post('/produtos', (req, res) => {
  const produto = req.body;
  products.push(produto);
  res.status(201).send(produto);
});

// Endpoint de exemplo
app.get('/', (req, res) => {
  res.send('Produtos - Microserviço');
});

// rota pra buscar dados do usuário (continua igual)
app.get('/usuario-de-produto/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Chamada REST para o user-service
    const resposta = await axios.get(`http://user-service:5045/users/${id}`);

    res.json({
      mensagem: 'Dados do usuário retornados via REST!',
      usuario: resposta.data,
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: erro.message });
  }
});

app.listen(port, () => {
  console.log(`Serviço de Produtos rodando na porta ${port}`);
});

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3045;  // Porta do API Gateway

app.use(cors());

// Proxy para Product Service
app.use('/produtos', createProxyMiddleware({
    target: 'http://product-service:5002',
    changeOrigin: true,
    pathRewrite: { '^/produtos': '/produtos' }
}));

// Proxy para User Service
app.use('/users', createProxyMiddleware({
    target: 'http://user-service:5045',
    changeOrigin: true,
    pathRewrite: { '^/users': '/users' }
}));

// (Opcional) Proxy para Pagamento Service
app.use('/pagamento', createProxyMiddleware({
    target: 'http://pagamento:5002',  // Exemplo
    changeOrigin: true,
    pathRewrite: { '^/pagamento': '/pagamento' }
}));

// Teste básico do gateway
app.get('/', (req, res) => {
    res.send('API Gateway EcoMercado funcionando 🚀');
});

app.listen(PORT, () => {
    console.log(`API Gateway rodando na porta ${PORT}`);
});

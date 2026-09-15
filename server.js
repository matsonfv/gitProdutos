const express = require('express');
// Importa o módulo de conexão com o banco de dados
const pool = require('./db');
// Cria uma instância do aplicativo Express
const app = express();
// Define a porta do servidor
const PORT = 3000;

// Importa o módulo CORS
const cors = require('cors');

// Middleware para permitir o envio de dados em formato JSON
app.use(express.json());

// Habilita o CORS para permitir requisições de diferentes origens
app.use(cors());

// Rota para buscar todos os produtos
app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtos';

    pool.query(sql, (erro, resultado) => {

        res.json(resultado.rows);

    });

});

// Buscar produto por ID
app.get('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM produtos WHERE id = $1';

    const valores = [id];

    pool.query(sql, valores, (erro, resultado) => {        
        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        
        res.json(resultado.rows);
    });

});

// Adicionar produto
app.post('/produtos', (req, res) => {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const descricao = req.body.descricao;

    const sql = 'INSERT INTO produtos (nome, preco, descricao) VALUES ($1, $2, $3)'; 

    if (!nome || !preco || !descricao) {
        alert('Todos os campos são obrigatórios');
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    } else if (typeof preco !== 'number' || preco <= 0) {
        alert('O preço deve ser um número positivo');
        return res.status(400).json({ mensagem: 'O preço deve ser um número positivo' });
    }
    const valores = [nome, preco, descricao];

    pool.query(sql, valores,  (erro, resultado) => {
        res.json(resultado);
    });

});

// Deletar ID produto
app.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM produtos WHERE id = $1';

    const valores = [id];

    pool.query(sql, valores, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ mensagem: 'Erro ao deletar produto' });
        }
        res.json({ mensagem: 'Produto deletado com sucesso' });
    });
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
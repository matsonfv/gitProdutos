const express = require('express');
const pool = require('./db');

const app = express();
const PORT = 3000;

const cors = require('cors');

app.use(express.json());

app.use(cors());

app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtos';

    pool.query(sql, (erro, resultado) => {

        res.json(resultado.rows);

    });

});

app.get('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM produtos WHERE id = ${id}`;

    pool.query(sql, (erro, resultado) => {        
        console.log(erro)
        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        
        res.json(resultado.rows);
    });

});

app.post('/produtos', (req, res) => {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const descricao = req.body.descricao;

    const sql = `INSERT INTO produtos (nome, preco, descricao) VALUES ('${nome}', '${preco}', '${descricao}')`; 

    pool.query(sql, (erro, resultado) => {
        res.json(resultado);
    });

});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
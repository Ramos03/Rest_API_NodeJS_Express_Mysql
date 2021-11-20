const mysql = require('mysql2');

/**
 * Função para conexão ao banco de dados
 */
const conexao = mysql.createConnection({
    host: 'HOST',
    port: 'PORT',
    user: 'USER',
    password: 'PASWORD',
    database: 'DATABASE'
});
 
module.exports = conexao;
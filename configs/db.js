const mysql = require('mysql2/promise');
const dbconfig = require('./dbconfig');

const pool = mysql.createPool({
  ...dbconfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Conectado ao Banco de Dados!');

module.exports = pool;

const Sequelize = require('sequelize');
var connection;
require('dotenv').config();

// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Salemcaiman1619!',
//     database: 'angelfish_db'
//   });
// };

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

connection.connect();
module.exports = sequelize;
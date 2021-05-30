require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
    port: 3306
    });

<<<<<<< HEAD
    
=======
  
>>>>>>> 5c1aa669e922b772d79e32c180ecea75b87dc554
module.exports = sequelize;
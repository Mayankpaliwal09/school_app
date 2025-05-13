// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//   }
// );

// module.exports = sequelize;



const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,   // Database name (school_db)
  process.env.DB_USER,   // Username (root)
  process.env.DB_PASS,   // Password (Mayank)
  {
    host: process.env.DB_HOST,  
    dialect: 'mysql',            
    port: 3306,                  
    dialectOptions: {
      ssl: {
        require: true,           
        rejectUnauthorized: false 
      }
    }
  }
);


module.exports = sequelize;

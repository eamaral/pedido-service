const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco MySQL estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Erro ao conectar no MySQL:', error.message);
    process.exit(1);
  }
};

// ⚠️ Para ambiente de desenvolvimento ou primeira execução
sequelize.sync({ alter: true });

module.exports = { sequelize, connectDB };

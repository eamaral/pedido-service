require('dotenv').config();
const { Sequelize } = require('sequelize');

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
    console.log('✅ Conexão com MySQL estabelecida.');
  } catch (err) {
    console.error('❌ Erro ao conectar no MySQL:', err.message);
    process.exit(1);
  }
};

// Sincroniza modelos no banco (dev/primeira vez)
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Modelos sincronizados.'))
  .catch(err => console.error('❌ Erro ao sincronizar modelos:', err));

module.exports = { sequelize, connectDB };

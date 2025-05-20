require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./src/infrastructure/database/sequelize');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(bodyParser.json());

// Conexão com o banco de dados
connectDB();

const apiPrefix = '/api';
const baseUrl = process.env.API_BASE_URL || `http://localhost:3000`;

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Pedido Service API',
      version: '1.0.0',
      description: 'Microsserviço responsável pela gestão de pedidos',
    },
    servers: [
      {
        url: `${baseUrl}/api`,
        description: 'Ambiente Dinâmico',
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/infrastructure/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check
app.get('/', (req, res) => {
  res.send('Pedido Service API is running.');
});
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Rotas com prefixo /api
app.use(`${apiPrefix}/pedidos`, require('./src/interfaces/http/routes/PedidoRoutes'));

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'local';

app.listen(PORT, () => {
  console.log(`✅ Pedido Service rodando no ambiente '${ENV}' na porta ${PORT}`);
  console.log(`📘 Swagger disponível em ${baseUrl}/api-docs`);
});

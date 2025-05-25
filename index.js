// index.js
require('dotenv').config();
const express       = require('express');
const bodyParser    = require('body-parser');
const { connectDB } = require('./src/infrastructure/database/sequelize');
const swaggerJsdoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');

const app = express();
app.use(bodyParser.json());
connectDB();

const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: { title: 'Pedido Service API', version: '1.0.0' },
    servers: [ { url: baseUrl } ],
    components: {
      securitySchemes: {
        BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      }
    },
    security: [ { BearerAuth: [] } ]
  },
  apis: [
    './src/interfaces/http/routes/authRoutes.js',
    './src/interfaces/http/routes/pedidoRoutes.js',
    './src/interfaces/http/routes/produtoRoutes.js'
  ]
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

app.use('/auth', require('./src/interfaces/http/routes/authRoutes'));
const verifyToken = require('./src/interfaces/http/middlewares/verifyToken');
app.use('/pedidos', verifyToken, require('./src/interfaces/http/routes/pedidoRoutes'));
app.use('/produtos',verifyToken, require('./src/interfaces/http/routes/produtoRoutes'));

app.get('/',      (_req, res) => res.send('Pedido Service is running.'));
app.get('/health',(_req, res) => res.sendStatus(200));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
  console.log(`📘 Swagger at ${baseUrl}/api-docs`);
});

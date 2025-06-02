const express       = require('express');
const bodyParser    = require('body-parser');
const swaggerJsdoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');
const { connectDB } = require('./src/infrastructure/database/sequelize');

const app = express();
app.use(bodyParser.json());
connectDB();

// Swagger config
const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: { title: 'Pedido Service API', version: '1.0.0' },
    servers: [{ url: baseUrl }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ BearerAuth: [] }]
  },
  apis: ['./src/interfaces/http/routes/*.js']
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));
app.use('/health', (_req, res) => res.sendStatus(200));

// Middlewares e rotas protegidas
const verifyToken = require('./src/interfaces/http/middlewares/verifyToken');

app.use('/pedidos',   verifyToken, require('./src/interfaces/http/routes/pedidoRoutes'));
app.use('/produtos',  verifyToken, require('./src/interfaces/http/routes/produtoRoutes'));
app.use('/auth',      require('./src/interfaces/http/routes/authRoutes'));

app.use('/', (_req, res) => res.send('Pedido Service is running.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
  console.log(`📘 Swagger at ${baseUrl}/api-docs`);
});

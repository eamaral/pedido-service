const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./src/infrastructure/database/sequelize');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(bodyParser.json());

connectDB();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Pedido Service API',
      version: '1.0.0',
      description: 'Gerenciamento de pedidos e produtos',
    },
    servers: [
      { url: 'http://ms-shared-alb-1023094345.us-east-1.elb.amazonaws.com/api', description: 'API Swagger' }
    ],
    components: {
      securitySchemes: {
        BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      }
    },
    security: [{ BearerAuth: [] }]
  },
  apis: [
    './src/interfaces/http/routes/pedidoRoutes.js',
    './src/interfaces/http/routes/produtoRoutes.js',
    './src/interfaces/http/routes/authRoutes.js'
  ]
};

app.use('/pedido-docs', swaggerUi.serveFiles(swaggerJsdoc(swaggerOptions), {}));
app.get('/pedido-docs', swaggerUi.setup(swaggerJsdoc(swaggerOptions)));



// ✅ Rotas fixas com prefixo /api
app.use('/api/auth', require('./src/interfaces/http/routes/authRoutes'));

const verifyToken = require('./src/interfaces/http/middlewares/verifyToken');
app.use('/api/pedidos', verifyToken, require('./src/interfaces/http/routes/pedidoRoutes'));
app.use('/api/produtos', verifyToken, require('./src/interfaces/http/routes/produtoRoutes'));

app.get('/health', (_req, res) => res.status(200).send('OK'));

// Log das rotas registradas
console.log('🧩 Rotas registradas:');
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route.path);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(handler.route.path);
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Pedido Service rodando na porta ${PORT}`);
});

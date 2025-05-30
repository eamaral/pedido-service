// src/interfaces/http/routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const pedidoController = require('../../../application/controllers/pedidoController');

router.use(verifyToken);

/**
 * @swagger
 * /pedidos/andamento:
 *   get:
 *     summary: Lista todos os pedidos com status "Em Preparacao"
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       404:
 *         description: Nenhum pedido encontrado
 *       500:
 *         description: Erro ao consultar pedidos
 */
router.get('/andamento', pedidoController.listarEmPreparacao);

/**
 * @swagger
 * /pedidos/{pedidoId}:
 *   get:
 *     summary: Consulta o andamento de um pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido retornado com sucesso
 *       404:
 *         description: Pedido nao encontrado
 *       500:
 *         description: Erro ao consultar o pedido
 */
router.get('/:pedidoId', pedidoController.buscarPorId);

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: string
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtoId:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     quantidade:
 *                       type: number
 *                     preco:
 *                       type: number
 *           example:
 *             clienteId: "34058799811"
 *             itens:
 *               - produtoId: "1"
 *                 nome: "Hamburguer"
 *                 quantidade: 1
 *                 preco: 15.99
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Erro ao criar pedido
 */
router.post('/', pedidoController.criar);

/**
 * @swagger
 * /pedidos/pronto:
 *   post:
 *     summary: Atualizar pedido para Pronto para Retirada
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedidoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       404:
 *         description: Pedido nao encontrado
 */
router.post('/pronto', (req, res) => {
  req.body.novoStatus = 'Pronto para Retirada';
  return pedidoController.atualizarStatus(req, res);
});

/**
 * @swagger
 * /pedidos/preparacao:
 *   post:
 *     summary: Atualizar pedido para Em Preparacao
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedidoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pedido atualizado
 *       404:
 *         description: Pedido nao encontrado
 */
router.post('/preparacao', (req, res) => {
  req.body = { pedidoId: req.body.pedidoId, novoStatus: 'Em Preparacao' };
  return pedidoController.atualizarStatus(req, res);
});

/**
 * @swagger
 * /pedidos/finalizar:
 *   post:
 *     summary: Finalizar pedido e atualizar pontos do cliente
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedidoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pedido finalizado
 *       404:
 *         description: Pedido nao encontrado
 */
router.post('/finalizar', pedidoController.finalizarPedido);

module.exports = router;

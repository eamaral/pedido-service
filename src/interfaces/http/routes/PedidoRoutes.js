const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const pedidoController = require('../../../application/controllers/PedidoController');

router.use(verifyToken);

/**
 * @swagger
 * /pedidos/andamento:
 *   get:
 *     summary: Lista todos os pedidos com status "Em Preparação"
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       404:
 *         description: Nenhum pedido encontrado
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
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/:id', pedidoController.buscarPorId);

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Criar novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtoId:
 *                       type: string
 *                     quantidade:
 *                       type: number
 *               clienteId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Erro na criação do pedido
 */
router.post('/', pedidoController.criar);

/**
 * @swagger
 * /pedidos/pronto:
 *   post:
 *     summary: Atualizar pedido para "Pronto para retirada"
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
 *         description: Pedido não encontrado
 */
router.post('/status', pedidoController.atualizarStatus);

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
 *         description: Pedido finalizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
router.post('/finalizar', pedidoController.finalizarPedido);

module.exports = router;

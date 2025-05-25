const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const produtoController = require('../../../application/controllers/produtoController');

router.use(verifyToken);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Listar todos os produtos disponíveis
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos disponível
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "01"
 *                   nome:
 *                     type: string
 *                     example: "Hamburguer"
 *                   descricao:
 *                     type: string
 *                     example: "Delicioso hamburguer de carne com queijo"
 *                   preco:
 *                     type: number
 *                     example: 15.99
 *                   categoria:
 *                     type: string
 *                     example: "Lanche"
 *       401:
 *         description: Token de autenticação ausente ou inválido
 *       500:
 *         description: Erro ao buscar produtos
 */
router.get('/', produtoController.listarProdutos);

/**
 * @swagger
 * /produtos/categoria/{categoria}:
 *   get:
 *     summary: Listar produtos por categoria
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: categoria
 *         schema:
 *           type: string
 *         required: true
 *         description: Categoria do produto (Lanche, Acompanhamento, Bebida, Sobremesa)
 *         example: "Lanche"
 *     responses:
 *       200:
 *         description: Lista de produtos da categoria selecionada
 *       401:
 *         description: Token de autenticação ausente ou inválido
 *       404:
 *         description: Nenhum produto encontrado para essa categoria
 *       500:
 *         description: Erro ao buscar produtos por categoria
 */
router.get('/categoria/:categoria', produtoController.listarProdutosPorCategoria);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Criar novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Hamburguer"
 *               descricao:
 *                 type: string
 *                 example: "Delicioso hamburguer de carne com queijo"
 *               preco:
 *                 type: number
 *                 example: 15.99
 *               categoria:
 *                 type: string
 *                 example: "Lanche"
 *               imagem:
 *                 type: string
 *                 example: "http://exemplo.com/imagem.jpg"
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro ao criar produto
 *       401:
 *         description: Token de autenticação ausente ou inválido
 */
router.post('/', produtoController.criarProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Editar produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Produto editado com sucesso
 *       400:
 *         description: Erro ao editar produto
 *       401:
 *         description: Token de autenticação ausente ou inválido
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', produtoController.editarProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remover produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *       401:
 *         description: Token de autenticação ausente ou inválido
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', produtoController.removerProduto);

module.exports = router;

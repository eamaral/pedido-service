const express = require('express');
const router  = express.Router();
const {
  login,
  register,
  confirmarSenha,
  loginViaCpf
} = require('../../../application/controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticação (Cognito)
 */

/**
 * @swagger
 * /auth/login:
  *   post:
 *     summary: Login com Cognito
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: erik.fernandes87@gmail.com
 *               senha:
 *                 type: string
 *                 example: MinhaSenhaNova123!
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Email ou senha inválidos
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastro de usuário no Cognito
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: novo.usuario@email.com
 *               senha:
 *                 type: string
 *                 example: Senha123!
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro ao criar usuário
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/confirmar-senha:
 *   post:
 *     summary: Confirma a troca da senha temporária do Cognito
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: erik.fernandes87@gmail.com
 *               senhaTemporaria:
 *                 type: string
 *                 example: Senha123!
 *               novaSenha:
 *                 type: string
 *                 example: MinhaSenhaNova123!
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       500:
 *         description: Erro ao confirmar senha
 */
router.post('/confirmar-senha', confirmarSenha);

/**
 * @swagger
 * /auth/cpf-login:
*   post:
 *     summary: Login via CPF e senha (autentica no Cognito)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *                 example: 34058799811
 *               senha:
 *                 type: string
 *                 example: MinhaSenhaNova123!
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: CPF e senha obrigatórios
 *       500:
 *         description: Erro na autenticação
 */
router.post('/cpf-login', loginViaCpf);

module.exports = router;

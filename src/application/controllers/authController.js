const AWS   = require('aws-sdk');
const axios = require('axios');
require('dotenv').config();

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION,
});

const {
  COGNITO_CLIENT_ID,
  COGNITO_USER_POOL_ID,
  CLIENTE_SERVICE_URL
} = process.env;

// ============ REGISTER ============
exports.register = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }
  try {
    await cognito.adminCreateUser({
      UserPoolId: COGNITO_USER_POOL_ID,   // ex: us-east-1_XXXXX
      Username: email,
      TemporaryPassword: senha,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'true' },
      ],
      MessageAction: 'SUPPRESS',
    }).promise();

    return res.status(201).json({
      message: 'Usuário criado com sucesso. Use /api/auth/confirmar-senha para ativar.',
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({
      error:   'Erro ao criar usuário',
      detalhes: error.message
    });
  }
};

// ============ CONFIRMAR SENHA ============
exports.confirmarSenha = async (req, res) => {
  const { email, senhaTemporaria, novaSenha } = req.body;
  if (!email || !senhaTemporaria || !novaSenha) {
    return res.status(400).json({
      error: 'Email, senha temporária e nova senha são obrigatórios'
    });
  }
  try {
    // Inicia fluxo para troca de senha
    const authResult = await cognito.initiateAuth({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: senhaTemporaria
      },
    }).promise();

    if (authResult.ChallengeName !== 'NEW_PASSWORD_REQUIRED') {
      return res.status(400).json({
        error: 'Desafio inesperado. Nenhuma atualização feita.'
      });
    }

    // Responde ao desafio trocando a senha
    const finalResponse = await cognito.respondToAuthChallenge({
      ClientId: COGNITO_CLIENT_ID,
      ChallengeName: 'NEW_PASSWORD_REQUIRED',
      Session: authResult.Session,
      ChallengeResponses: {
        USERNAME: email,
        NEW_PASSWORD: novaSenha
      },
    }).promise();

    return res.status(200).json({
      message: 'Senha atualizada com sucesso!',
      tokens:  finalResponse.AuthenticationResult
    });
  } catch (error) {
    console.error('Erro ao confirmar senha:', error);
    return res.status(500).json({
      error:   'Erro ao confirmar senha',
      detalhes: error.message
    });
  }
};

// ============ LOGIN via email/senha ============
exports.login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }
  try {
    const response = await cognito.initiateAuth({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: senha
      },
    }).promise();

    const { AccessToken, IdToken, RefreshToken } = response.AuthenticationResult;
    return res.status(200).json({
      accessToken:  AccessToken,
      idToken:      IdToken,
      refreshToken: RefreshToken
    });
  } catch (error) {
    console.error('Erro ao autenticar:', error);
    return res.status(401).json({ error: 'Email ou senha inválidos' });
  }
};

// ============ LOGIN via CPF usando cliente-service ============
exports.loginViaCpf = async (req, res) => {
  const { cpf, senha } = req.body;
  if (!cpf || !senha) {
    return res.status(400).json({ error: 'CPF e senha são obrigatórios' });
  }

  try {
    // Busca cliente no cliente-service
    const resp = await axios.get(
      `${CLIENTE_SERVICE_URL}/api/clientes/identificar/${cpf}`
    );
    const cliente = resp.data;
    const email   = cliente.email;

    if (!email) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Reutiliza fluxo de login via email
    const auth = await cognito.initiateAuth({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: senha
      },
    }).promise();

    const { AccessToken, IdToken, RefreshToken } = auth.AuthenticationResult;
    return res.status(200).json({
      accessToken:  AccessToken,
      idToken:      IdToken,
      refreshToken: RefreshToken
    });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    console.error('Erro no login via CPF:', err.message);
    return res.status(500).json({ error: 'Erro ao autenticar via CPF' });
  }
};

const { CognitoJwtVerifier } = require('aws-jwt-verify');
require('dotenv').config();

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: 'access',
  clientId: process.env.COGNITO_CLIENT_ID,
});

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token de autenticação ausente ou inválido' });
    }

    const token = authHeader.split(' ')[1];
    const payload = await verifier.verify(token);
    req.user = payload;

    next();
  } catch (error) {
    console.error('Erro na verificação do token:', error.message);
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

module.exports = verifyToken;

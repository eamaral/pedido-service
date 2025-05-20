const nodemailer = require('nodemailer');
require('dotenv').config();

// Configura o transportador do nodemailer (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Envia e-mail quando o pedido estiver pronto para retirada
exports.enviarNotificacaoDePronto = async (clienteEmail, clienteNome) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: clienteEmail,
      subject: 'Seu pedido está pronto para retirada!',
      text: `Olá ${clienteNome},\n\nSeu pedido já está pronto e pode ser retirado no balcão.\n\nEquipe FastFood.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📩 E-mail enviado para ${clienteEmail} (pedido pronto).`);
  } catch (error) {
    console.error('Erro ao enviar e-mail de pedido pronto:', error.message);
  }
};

// Envia e-mail informando pontos acumulados
exports.enviarNotificacaoDePontos = async (clienteEmail, clienteNome, pontos, zerado) => {
  try {
    let assunto = 'Atualização de Pontos';
    let mensagem = '';

    if (zerado) {
      mensagem = `Parabéns ${clienteNome}, você acumulou 10 pontos e ganhou um pedido grátis! Seus pontos foram zerados.`;
    } else {
      mensagem = `Olá ${clienteNome}, você agora tem ${pontos} pontos acumulados. Ao atingir 10 pontos, você ganha um pedido grátis!`;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: clienteEmail,
      subject: assunto,
      text: mensagem,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📩 E-mail enviado para ${clienteEmail} com pontuação atualizada.`);
  } catch (error) {
    console.error('Erro ao enviar e-mail de pontos:', error.message);
  }
};

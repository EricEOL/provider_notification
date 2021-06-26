const nodemailer = require("nodemailer");

const SMTP_CONFIG = require("./config/smtp");

const data = require("./data.json");

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function run() {
  const mailSent = await transporter.sendMail({
    subject: "Notificação por falta de entrega - Depósito Central de Munição",
    from: "Almoxarifado DCMUN <almoxarifadodcmun@gmail.com",
    to: data.emails,
    html: `
    <html>
    <body>
      <header>
        <h1>Noticação por falta de entrega</h1>
      </header>
      <main>
        <div>
          O senhor fonecedor está sendo notificado pois não realizou a entrega dos materiais/serviços <br>
          previstos na Nota de Empenho 2021NE000020. A falta de realização do contrato implica em sanções, <br>
          incluindo o impedimento de licitar por até 5 anos.
        </div>
      </main>
    </body>
    </html>
    `,
  });

  console.log(mailSent);
}

run();
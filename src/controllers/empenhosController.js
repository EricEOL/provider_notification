const Empenho = require('../models/Empenho');
const differenceInDays = require('date-fns/differenceInDays')
const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("../config/smtp");

const empenhosController = {
  all: async function (req, res) {

    const empenhos = await Empenho.find();

    res.json(empenhos);
  },

  insertNewEmpenho: async function (req, res) {
    const empenho = new Empenho({
      empenho: req.body.empenho,
      supplierEmail: req.body.email,
      sendDate: req.body.date
    })

    try {
      await empenho.save();
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }

    res.status(201).send(empenho);
  },

  notificationSupplier: async function (req, res) {

    const empenhosNotNotificated = await Empenho.find({ notificated: false });

    const today = Date.now();

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

    async function emailTrigger(empenho) {
      const mailSent = await transporter.sendMail({
        subject: "Notificação por falta de entrega - Depósito Central de Munição",
        from: "Almoxarifado DCMUN <almoxarifadodcmun@gmail.com",
        to: empenho.supplierEmail,
        html: `
          <html>
          <body>
            <header>
              <h1>Notificação por falta de entrega - ${empenho.empenho}</h1>
            </header>
            <main>
              <div>
                O senhor fonecedor está sendo notificado pois não realizou a entrega dos materiais/serviços <br>
                previstos na Nota de Empenho ${empenho.empenho}. A falta de realização do contrato implica em sanções, <br>
                incluindo o impedimento de licitar por até 5 anos.
              </div>
            </main>
        </body>
        </html>
        `,
      });

      if(mailSent.accepted.length > 0) {
        try {
          await Empenho.updateOne(
            {
              _id: empenho._id
            },
            {
              $set: {
                notificated: true
              }
            }
          )
        } catch (error) {
          return res.status(400).send(`Não foi possível realizar o update na notificação do ${empenho.empenho}`)
        }
      }
    }

    const empenhosNotificatedNow = empenhosNotNotificated.filter(empenho => {
      const differenceDays = differenceInDays(today, empenho.sendDate);
      if (differenceDays >= 30) {
        emailTrigger(empenho);
      }
    });

    res.json(empenhosNotificatedNow);
  }
}

module.exports = empenhosController;
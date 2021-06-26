const Empenho = require('../models/Empenho');

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

    //const empenhosSentMoreThan30DaysAgo = empenhosNotNotificated.filter( empenho => empenho.sendDate > 30);

    res.json(empenhosNotNotificated);
  }
}

module.exports = empenhosController;
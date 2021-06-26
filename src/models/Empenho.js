const mongoose = require('mongoose');

const empenhoSchema = mongoose.Schema({
  empenho: {type: String},
  supplierEmail: {type: String},
  sendDate: {type: Date},
  notificated: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now()}
});

const empenho = mongoose.model('Empenho', empenhoSchema);

module.exports = empenho;
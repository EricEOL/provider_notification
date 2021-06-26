const mongoose = require('mongoose');

const empenhoSchema = mongoose.Schema({
  empenho: {type: String},
  sendDate: {type: Date}
});

const empenho = mongoose.model('Empenho', empenhoSchema);

module.exports = empenho;
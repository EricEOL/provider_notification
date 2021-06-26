import mongoose from 'mongoose';

const empenhoSchema = mongoose.Schema({
  empenho: {type: String},
  sendDate: {type: Date}
});

const empenho = mongoose.model('Empenho', empenhoSchema);

export default empenho;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servico = new Schema({
  salaoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Salao',
  },
  titulo: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  comissao: {
    type: Number,
    required: true,
  },
  duracao: {
    type: String,
    required: true,
  },
  recorrencia: {
    type: Number,
    required: true,
    default: 30,
  },
  descricao: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['A', 'I', 'E'],
    required: true,
    default: 'A',
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Servico', servico);

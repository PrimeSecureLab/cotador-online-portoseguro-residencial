const mongoose = require('mongoose');

const orcamentoSchema = new mongoose.Schema({
    criadoEm: { type: Date },
    numeroOrcamento: { type: String },
    numeroVersaoOrcamento: { type: String },
    tipo: { type: String }
});

const Orcamentos = mongoose.model('Orcamentos', orcamentoSchema);

module.exports = Orcamentos;
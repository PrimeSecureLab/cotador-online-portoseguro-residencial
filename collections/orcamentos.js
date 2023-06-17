const mongoose = require('mongoose');

const orcamentoSchema = new mongoose.Schema({
    criadoEm: { type: Date },
    produto: { type: String },
    vigencia: { type: String },
    listaParcelamento: { type: mongoose.Schema.Types.Mixed, required: false },
    numeroOrcamento: { type: String },
    numeroVersaoOrcamento: { type: String },
    propostaCriada: { type: Boolean },
    valoresCoberturas: { type: mongoose.Schema.Types.Mixed, required: false }
});

const Orcamentos = mongoose.model('Orcamentos', orcamentoSchema);

module.exports = Orcamentos;
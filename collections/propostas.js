const mongoose = require('mongoose');

const propostaSchema = new mongoose.Schema({
    criadoEm: { type: Date },
    proposta: {
        numeroProposta: { type: String },
        numeroVersaoProposta: { type: String }
    },
    numeroOrcamento: { type: String },
    usuario:{
        id: { type: String },
        nome: { type: String },
        cpf: { type: String },
        email: { type: String }
    },
    pagamento: {
        formaPagamento: { type: String },
        quantidadeParcelas: { type: String },
        codigoBandeira: { type: String },
        ticket: {type: String },
    }
});

const Propostas = mongoose.model('Propostas', propostaSchema);

module.exports = Propostas;
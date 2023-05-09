const mongoose = require('mongoose');

const propostaSchema = new mongoose.Schema({
    criadoEm: { type: Date },
    proposta: {
        numeroProposta: { type: String },
        numeroVersaoProposta: { type: String }
    },
    usuario:{
        id: { type: String },
        nome: { type: String },
        cpf: { type: String },
        email: { type: String }
    },
    pagamento: {
        formaPagamento: { type: String },
        quantidadeParcelas: { type: String },
        codigoBandeira: { type: String }
    },
    orcamento: { type: mongoose.Schema.Types.Mixed, required: false }
});

const Propostas = mongoose.model('Propostas', propostaSchema);

module.exports = Propostas;
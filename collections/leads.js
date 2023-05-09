const mongoose = require('mongoose');

const leadsSchema = new mongoose.Schema({
    nome: { type: String },
    cpf: { type: String },
    numeroTelefone: { type: String },
    tipoTelefone: { type: Number },
    dataNascimento: { type: String },
    cep: { type: String },
    logradouro: { type: String },
    tipoRua: { type: Number },
    bairro: { type: String },
    cidade: { type: String },
    uf: { type: String },
    dataCadastro: { type: Date }
});

const Leads = mongoose.model('Leads', leadsSchema);

module.exports = Leads;
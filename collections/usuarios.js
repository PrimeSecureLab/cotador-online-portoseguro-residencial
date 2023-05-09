const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    usuario:{
        nome: { type: String },
        cpf: { type: String },
        email: { type: String },
        senha: { type: String },
        numeroTelefone: { type: String },
        tipoTelefone: { type: Number },
        dataNascimento: { type: String },
        dataCadastro: { type: Date }
    },
    endereco: {
        cep: { type: String },
        logradouro: { type: String },
        tipoRua: { type: Number },
        bairro: { type: String },
        cidade: { type: String },
        uf: { type: String }
    }
});

const Usuarios = mongoose.model('Usuarios', usuarioSchema);

module.exports = Usuarios;
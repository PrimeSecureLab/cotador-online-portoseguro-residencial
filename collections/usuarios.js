const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    dataCadastro: {type: Date},
    email: {type: String},
    senha: {type: String},
    pessoaFisica: {
        nome: {type: String},
        cpf: {type: String},
        telefone: {
            tipo: {type: String},
            numero: {type: String}
        },
        dataNascimento: {type: String},
        sexo: {type: String},
        estadoCivil: {type: String},
        paisResidencia: {type: String},
        faixaRenda: {type: String},
        documento: {
            tipo: {type: String},
            numero: {type: String},
            orgaoExpedidor: {type: String},
            dataExpedicao: {type: String}
        },
        pessoaPoliticamenteExposta: {type: Number},
        politicamenteExposta: {
            cpf: {type: String},
            nome: {type: String},
            grauRelacionamento: {type: String}
        }
    },
    endereco: {
        cep: { type: String },
        tipoRua: { type: String },
        logradouro: { type: String },
        bairro: { type: String },
        cidade: { type: String },
        uf: { type: String }
    },
    recuperarSenha: {
        token: { type: String },
        tokenCancelar: { type: String },
        criadoEm: { type: Date }
    }
});

const Usuarios = mongoose.model('Usuarios', usuarioSchema);

module.exports = Usuarios;
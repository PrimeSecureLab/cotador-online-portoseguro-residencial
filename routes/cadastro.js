const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const Usuarios = require('../collections/usuarios');
const validation = require('../configs/validation');

dotenv.config();

router.get("/", async (req, res) => {
    let session = req.session;
    if (!session.user_id){ return res.sendFile("cadastro.html", { root: "public" }); }

    let user = await Usuarios.findOne({_id: session.user_id});
    if (!user){ req.session.destroy(); return res.sendFile("cadastro.html", { root: "public" }); }
    
    return res.redirect('/pagamento');
});

router.post("/", async (req, res)=>{
    let data = req.body;
    let session = req.session;
    let fatalError = false;

    if (session.user_id){ 
        let _user = await Usuarios.findOne({_id: session.user_id});
        if (!_user){ req.session.destroy(); }
    }

    if (!data){ fatalError = { code: 1 }; data = {login:{}, data: {}}; }
    let user = data.data.segurado;
    let login = data.login;
    if (!user){ fatalError = { code: 2 }; user = {}; }
    if (!user.cpf){ fatalError = { code: 3 }; }
    if (!user.dataNascimento){ fatalError = { code: 4 }; }
    if (!user.nome){ fatalError = { code: 5 }; }
    if (!user.numeroTelefone){ fatalError = { code: 6 }; }
    let endereco = user.endereco;
    if (!endereco){ fatalError = { code: 7 }; endereco = {};  }
    if (!endereco.cep){ fatalError = { code: 8 }; }
    if (!endereco.logradouro){ fatalError = { code: 8 }; }
    if (!endereco.numero){ fatalError = { code: 10 }; }
    if (!endereco.bairro){ fatalError = { code: 11 }; }
    if (!endereco.cidade){ fatalError = { code: 12 }; }
    if (!endereco.uf){ fatalError = { code: 13 }; }
    
    if (!login.email){ fatalError = { code: 14 }; }
    if (!login.senha){ fatalError = { code: 15 }; }

    if (fatalError){ return res.status(400).json({fatal: fatalError}); }

    if (!validation.cpfPattern.test(user.cpf)) { fatalError = { code: 16 }; }
    if (!validation._nomePattern.test(user.nome)) { fatalError = { code: 17 }; }
    if (!validation.numeroTelefonePattern.test(user.numeroTelefone.replace(/[^0-9]+/g, ""))) { fatalError = { code: 18 }; }
    if (!validation._tipoTelefonePattern.test(user.tipoTelefone)) { fatalError = { code: 19 }; }
    if (!validation._dataNascimentoPattern.test(user.dataNascimento)) { fatalError = { code: 20 }; }

    if (!validation._cepPattern.test(endereco.cep.replace(/[^0-9]+/g, ""))) { fatalError = { code: 21 }; }
    if (!validation._enderecoPattern.test(endereco.logradouro)) { fatalError = { code: 22 }; }
    if (!validation._tipoRuaPattern.test(endereco.tipo)) { fatalError = { code: 23 }; }
    if (!validation.numeroPattern.test(endereco.numero)) { fatalError = { code: 24 }; }
    if (!validation.bairroPattern.test(endereco.bairro)) { fatalError = { code: 25 }; }
    if (!validation._cidadePattern.test(endereco.cidade)) { fatalError = { code: 26 }; }
    if (!validation.ufPattern.test(endereco.uf.toUpperCase())) { fatalError = { code: 27 }; }

    if (login.email.length < 5 || !login.email.includes('@') || !login.email.includes('.')){ 
        return res.status(400).json({fatal: false, message: "O email informado não é válido.", id: "email"});    
    }
    if (login.senha.length < 8){ 
        return res.status(400).json({fatal: false, message: "Sua senha deve ter no mínimo 8 caracteres.", id: "senha"}); 
    }

    if (fatalError){ return res.status(400).json({fatal: fatalError}); }

    user = {
        usuario: {
            nome: user.nome,
            numeroTelefone: user.numeroTelefone,
            cpf: user.cpf,
            dataNascimento: user.dataNascimento,
            dataCadastro: new Date(),
            email: login.email.trim(),
            senha: login.senha
        },
        endereco: {
            cep: endereco.cep,
            logradouro: endereco.logradouro,
            tipo: endereco.tipo,
            numero: endereco.numero,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            uf: endereco.uf,
            complemento: endereco.complemento
        }
    }; 
    let usuario = await Usuarios.findOne({'usuario.email': login.email.trim()});
    if (usuario){ 
        return res.status(400).json({fatal: false, message: "Já existe uma conta utilizando este endereço de email", id: "email"}); 
    }
    usuario = new Usuarios(user);
    try { 
        usuario = await usuario.save(); 
        req.session.user_id = usuario.id;
        req.session.sessionStart = new Date();
        return res.status(200).json({message: "Cadastro realizado com sucesso!"});
    } catch (err) { 
        console.log(err); 
        return res.status(400).json({code: 31});
    }   
});

module.exports = router;
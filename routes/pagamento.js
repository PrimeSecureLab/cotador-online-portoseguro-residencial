const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const Usuarios = require('../collections/usuarios');
const Propostas = require('../collections/propostas');
const authToken = require('../configs/authToken');
const validation = require('../configs/validation');

dotenv.config();

router.get("/", async (req, res) => {
    //console.log(req.session);
    if (!req.session){ return res.redirect('/cadastro'); }
    if (!req.session.user_id){ return res.redirect('/cadastro'); }
    if (req.session.user_id){ 
        let user = await Usuarios.findOne({_id: req.session.user_id})
        if (!user){ req.session.destroy((e) => { return res.redirect('/cadastro'); }); }
    }
    let token = await authToken();
    console.log(token.data);
    res.sendFile("pagamento.html", { root: "public" });
});

router.post("/", async (req, res) => {
    let session = (req.session) ? req.session : {};
    if (!session.user_id){ return res.status(400).json({fatal: 1}); }
    
    let user = await Usuarios.findOne({_id: session.user_id});
    if (!user){ req.session.destroy((e) => { return res.status(400).json({fatal: 2}); }); }

    let data = req.body;
    let errorList = [];

    if (!data){ return res.status(400).json({fatal: 3}); }
    if (!data.pagamento){ return res.status(400).json({fatal: 4}); }
    
    
    data.pagamento.codigoBandeira = 0;
    data.segurado.email = user.usuario.email;
    
    console.log(data);

    if (data.pagamento.nomeImpresso.length < 3){ 
        errorList.push({message: "Nome inválido", id: "nome_impresso"}); 
    }else{
        if (!/^[A-zÀ-ú/\s]+$/.test(data.pagamento.nomeImpresso)){ errorList.push({message: "Nome inválido"}); }
    }
    if (!/^\d{2,4}$/.test(data.pagamento.numeroCvc)){ errorList.push({message: "CVC inválido", id: "cvc"}); } 
    if (!/^\d{2}$/.test(data.pagamento.mesValidade)){ 
        if (/^[1-9]$/.test(data.pagamento.mesValidade)){// Caso tenha apenas 1 dígito 
            data.pagamento.mesValidade = `0${data.pagamento.mesValidade}`; 
            $("#mes").val(data.pagamento.mesValidade); 
        }else{ // Caso tenha mais de 2 digitos
            errorList.push({message: "Mês inválido", id: "mes"}); 
        }
    }else{
        if (parseInt(data.pagamento.mesValidade) > 12){ errorList.push({message: "Mês inválido", id: "mes"}); }
    }
    if (!/^\d{4}$/.test(data.pagamento.anoValidade)){ 
        if (/^\d{2}$/.test(data.pagamento.anoValidade)){
            $("#ano").val(`20${data.pagamento.anoValidade}`);
            if (parseInt(data.pagamento.anoValidade) < 23){ errorList.push({message: "Ano inválido", id: "ano"}); }
        }else{
            errorList.push({message: "Ano inválido", id: "ano"});
        }  
    }
    if (!/^\d{16}$/.test(data.pagamento.numeroCartao)){ 
        errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); 
    }else{
        let soma = 0;
        let dobrar = false;
        for (var i = data.pagamento.numeroCartao.length - 1; i >= 0; i--) {
            let digito = parseInt(data.pagamento.numeroCartao.charAt(i), 10);
            if (dobrar) { if ((digito *= 2) > 9){ digito -= 9; } }
            soma += digito;
            dobrar = !dobrar;
        }
        if ((soma % 10) != 0){ errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); }
    }

    if (errorList.length){ return res.status(400).json({fatal: false, errors: errorList}); }

    if (!validation.eloCardPattern.test(data.pagamento.numeroCartao)){ data.pagamento.codigoBandeira = 5; }
    if (!validation.dinersCardPattern.test(data.pagamento.numeroCartao)){ data.pagamento.codigoBandeira = 3; }
    if (!validation.masterCardPattern.test(data.pagamento.numeroCartao)){ data.pagamento.codigoBandeira = 2; }
    if (!validation.visaCardPattern.test(data.pagamento.numeroCartao)){ data.pagamento.codigoBandeira = 1; }

    if (data.segurado.numeroTelefone){ data.segurado.numeroTelefone = data.segurado.numeroTelefone.replace(/\D/g, ''); }

    let proposta = {
        "numeroOrcamento": data.orcamento.numeroOrcamento,
        "codigoPessoaPoliticamenteExposta": 2, // 1 - Sim, 2 - Não
        "segurado": {
          "enderecoCobranca": {
            "cep": data.segurado.endereco.cep,
            "tipoLogradouro": data.segurado.endereco.tipo,
            "logradouro": data.segurado.endereco.logradouro,
            "numero": data.segurado.endereco.numero,
            "bairro": data.segurado.endereco.bairro,
            "complemento": data.segurado.endereco.complemento,
            "cidade": data.segurado.endereco.cidade,
            "uf": data.segurado.endereco.uf
          },
          "enderecoCorrespondencia": {
            "cep": data.segurado.endereco.cep,
            "tipoLogradouro": data.segurado.endereco.tipo,
            "logradouro": data.segurado.endereco.logradouro,
            "numero": data.segurado.endereco.numero,
            "bairro": data.segurado.endereco.bairro,
            "complemento": data.segurado.endereco.complemento,
            "cidade": data.segurado.endereco.cidade,
            "uf": data.segurado.endereco.uf
          },
          "contato": {
            "email": data.segurado.email,
            "numeroTelefoneResidencial": data.segurado.numeroTelefone, //
          }
        },
        "pagamento": {
          "formaPagamento": "CARTAO_DE_CREDITO_62", //
          "quantidadeParcelas": data.pagamento.parcelas, //
          "cartao": {
            "numeroCartao": data.pagamento.numeroCartao,
            "codigoBandeira": data.pagamento.codigoBandeira, //1 - VISA, 2 - MASTER, 3 - DINERS, 5 - ELO
            "mesValidade": data.pagamento.mesValidade,// MM
            "anoValidade": data.pagamento.anoValidade //AAAA
          }
        },
        "contatoInspecao": {
          "numeroTelefone": data.segurado.numeroTelefone, //
          "contato": data.segurado.nome
        }
    }
    console.log(proposta);

    let token = await authToken();
    let request_url = "https://portoapi-sandbox.portoseguro.com.br/re/residencial/v1/habitual/propostas";
    let result = await axios.post(request_url, proposta, { 
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    let novaProposta = {  
        criadoEm: new Date(),      
        proposta: {
            numeroProposta: result.data.numeroProposta,
            numeroVersaoProposta: result.data.numeroVersaoProposta
        },
        usuario: {
            id: user.id,
            nome: user.usuario.nome,
            cpf: user.usuario.cpf,
            email: user.usuario.email
        },
        pagamento: {
            formaPagamento: "CARTAO_DE_CREDITO_62",
            quantidadeParcelas: data.pagamento.parcelas,
            codigoBandeira: data.pagamento.codigoBandeira
        },
        orcamento: data.orcamento
    }
    proposta = new Propostas(novaProposta);
    proposta = await proposta.save();
    console.log(result.data);
    return res.status(200).json({mesage: "Ok"});
});

module.exports = router;
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
    if (!req.session){ return res.redirect('/cadastro'); }
    if (!req.session.user_id){ return res.redirect('/cadastro'); }
    if (req.session.user_id){ 
        let user = await Usuarios.findOne({_id: req.session.user_id})
        if (!user){ req.session.destroy((e) => { return res.redirect('/cadastro'); }); }
    }
    res.sendFile("pagamento.html", { root: "public" });
});

router.post("/", async (req, res) => {
    let session = (req.session) ? req.session : {};
    if (!session.user_id){ return res.status(400).json({fatal: 1}); }
    
    let user = await Usuarios.findOne({_id: session.user_id});
    if (!user){ req.session.destroy((e) => { return res.status(400).json({redirect: '/login'}); }); }

    let data = req.body;
    let errorList = [];

    if (!data){ return res.status(400).json({fatal: 3}); }
    if (!data.formData){ return res.status(400).json({redirect: '/'}); }
    if (!data.pagamento){ return res.status(400).json({fatal: 4}); }
    if (!data.produto){ return res.status(400).json({fatal: 5}); }

    let produto = data.produto;
    if (produto != 'habitual' && produto != 'habitual-premium' && produto != 'veraneiro'){ return res.status(400).json({fatal: 6}); }

    let bytes = CryptoJS.AES.decrypt(data.formData, process.env.CRYPTO_TOKEN);
    if (!bytes){ return res.status(400).json({redirect: '/'}); }
    
    let formData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (!formData){ return res.status(400).json({redirect: '/'}); }
    formData.item = data.itemData;
    
    data.pagamento.codigoBandeira = 0;
    formData.segurado.email = user.email;

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
    if (data.pagamento.numeroCartao){ data.pagamento.numeroCartao = data.pagamento.numeroCartao.replace(/[^0-9]+/g, ""); }
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

    if (formData.segurado.numeroTelefone){ formData.segurado.numeroTelefone = formData.segurado.numeroTelefone.replace(/\D/g, ''); }

    let pessoaFisica = user.pessoaFisica;
    
    let dataNascimento = pessoaFisica.dataNascimento.toString();
    dataNascimento = dataNascimento.split('-');
    dataNascimento = `${dataNascimento[2]}-${dataNascimento[1]}-${dataNascimento[0]}`;
    
    let documento = pessoaFisica.documento;

    let dataExpedicao = documento.dataExpedicao.toString();
    dataExpedicao = dataExpedicao.split('-');
    dataExpedicao = `${dataExpedicao[2]}-${dataExpedicao[1]}-${dataExpedicao[0]}`;
    
    let proposta = {
        "numeroOrcamento": data.orcamento.numeroOrcamento,
        "codigoPessoaPoliticamenteExposta": user.pessoaFisica.pessoaPoliticamenteExposta, // 1 - Sim, 2 - Não
        "segurado": {
            "enderecoCobranca": {
                "cep": formData.segurado.endereco.cep,
                "tipoLogradouro": formData.segurado.endereco.tipo,
                "logradouro": formData.segurado.endereco.logradouro,
                "numero": formData.segurado.endereco.numero,
                "bairro": formData.segurado.endereco.bairro,
                "complemento": formData.segurado.endereco.complemento,
                "cidade": formData.segurado.endereco.cidade,
                "uf": formData.segurado.endereco.uf
            },
            "enderecoCorrespondencia": {
                "cep": formData.segurado.endereco.cep,
                "tipoLogradouro": formData.segurado.endereco.tipo,
                "logradouro": formData.segurado.endereco.logradouro,
                "numero": formData.segurado.endereco.numero,
                "bairro": formData.segurado.endereco.bairro,
                "complemento": formData.segurado.endereco.complemento,
                "cidade": formData.segurado.endereco.cidade,
                "uf": formData.segurado.endereco.uf
            },
            "contato": {
                "email": formData.segurado.email,
                "numeroTelefoneResidencial": formData.segurado.numeroTelefone, //
            },
            "pessoaFisica": {
                "dataNascimento": dataNascimento,
                "codigoSexo": pessoaFisica.sexo,
                "codigoEstadoCivil": pessoaFisica.estadoCivil,
                "codigoPaisResidencia": 55,
                "codigoFaixaRenda": pessoaFisica.faixaRenda,
                "documentoIdentificacao": {
                    "tipoDocumento": documento.tipo,
                    "numeroDocumento": documento.numero,
                    "orgaoExpedidor": documento.orgaoExpedidor,
                    "dataExpedicao": documento.dataExpedicao
                }
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
          "numeroTelefone": formData.segurado.numeroTelefone, //
          "contato": formData.segurado.nome
        }
    };

    let politicamenteExposta = {
        "cpf": pessoaFisica.politicamenteExposta.cpf,
        "nome": pessoaFisica.politicamenteExposta.nome,
        "codigoGrauRelacionamento": pessoaFisica.politicamenteExposta.grauRelacionamento
    };

    if (pessoaFisica.pessoaPoliticamenteExposta == 3){ proposta.pessoaFisica.pessoaPoliticamenteExposta = politicamenteExposta; }
    //console.log(proposta);

    let token = await authToken();
    let subUrl = '-sandbox';
    if (process.env.AMBIENTE == 'HOMOLOGACAO'){ subUrl = '-hml'; }
    if (process.env.AMBIENTE == 'PRODUCAO'){ subUrl = ''; }

    let request_url = `https://portoapi${subUrl}.portoseguro.com.br/re/residencial/v1/${produto}/propostas`;
    let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
    let result = await axios.post(request_url, proposta, header);

    let novaProposta = {  
        criadoEm: new Date(),      
        proposta: {
            numeroProposta: result.data.numeroProposta,
            numeroVersaoProposta: result.data.numeroVersaoProposta
        },
        usuario: {
            id: user.id,
            nome: user.pessoaFisica.nome,
            cpf: user.pessoaFisica.cpf,
            email: user.email
        },
        pagamento: {
            formaPagamento: "CARTAO_DE_CREDITO_62",
            quantidadeParcelas: data.pagamento.parcelas,
            codigoBandeira: data.pagamento.codigoBandeira
        },
        orcamento: data.orcamento
    };

    proposta = new Propostas(novaProposta);
    proposta = await proposta.save();
    //console.log(result.data);
    return res.status(200).json({mesage: "", proposta: result.data});
});

module.exports = router;
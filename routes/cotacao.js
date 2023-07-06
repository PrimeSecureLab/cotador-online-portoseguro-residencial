const express = require("express");
const CryptoJS = require("crypto-js");
const router = express.Router();
const dotenv = require('dotenv');
const axios = require("axios");

const validation = require("../configs/validation");

const PortoCoberturas = require('../configs/coberturas');
var portoCoberturas = new PortoCoberturas;
var todasCoberturas = portoCoberturas.listaCoberturas('all', false);

const ValidarCotacao = require('../configs/validarCotacao');
var validacaoCotacao = new ValidarCotacao;

const ValidadorGeral = require('../configs/validacaoGeral');
var validador = new ValidadorGeral;

dotenv.config();

// Define a rota para a página HTML
router.get("/", async (req, res) => {     
    res.sendFile("cotacao.html", { root: "public" }); 
});

router.get("/formulario", async (req, res)=>{
    let session = req.session;
    //console.log(session)
    if (!session){ return res.status(400).json({}); }
    if (!session.cotacao){ return res.status(400).json({}); }
    if (!session.cotacao.criadoEm){ session.cotacao = {}; return res.status(400).json({}); }
    
    let dataInicio = new Date(session.cotacao.criadoEm);
    let intervalo = (new Date() - dataInicio) / (1000 * 60 * 60 * 24);
    
    if (intervalo > 5){ session.cotacao = {}; return res.status(400).json({}); }    
    return res.status(200).json(session.cotacao);
});

router.post("/enviar-dados", async (req, res) => {
    let body = req.body;
    
    let produto = validador.retornarProduto(body.tiporesidencia);
    let todasCoberturas = validador.retornarCoberturas(produto);
    
    let items = {};

    for(let key in body){ if (todasCoberturas.includes(key)){ items[key] = body[key]; } }

    var errorList = [];

    body.cpf = body.cpf || "";
    body.nome = body.nome || "";
    body.numerotelefone = body.numerotelefone || "";
    body.tipotelefone = body.tipotelefone || "";
    body.datanascimento = body.datanascimento || "";

    if (!validador.validarCPF(body.cpf)){ errorList.push({error: "CPF inválido.", field: "cpf", step: "1"}); }
    if (!validador.validarNome(body.nome)){ errorList.push({error: "Nome inválido.", field: "nome", step: "1"}); }
    if (!validador.validarData(body.datanascimento)){ errorList.push({error: "Data de nascimento inválida.", field: "datanascimento", step: "1"}); }
    if (!validador.validarTelefone(body.numerotelefone)){ errorList.push({error: "Número de telefone inválido.", field: "numerotelefone", step: "1"}); }

    if (body.tipotelefone == 1 && body.numerotelefone.replace(/[^0-9]+/g, '').length != 10){ errorList.push({error: "Telefone fixo deve ter 10 digitos.", field: "numerotelefone", step: "1"}); }
    if (body.tipotelefone == 3 && body.numerotelefone.replace(/[^0-9]+/g, '').length != 11){ errorList.push({error: "Telefone celular deve ter 11 digitos.", field: "numerotelefone", step: "1"}); }
    
    body.cep = body.cep || "";
    body.tiporesidencia = body.tiporesidencia || "";
    body.logradouro = body.logradouro || "";
    body.tiporua = body.tiporua || "";
    body.numero = body.numero || "";
    body.bairro = body.bairro || "";
    body.cidade = body.cidade || "";
    body.uf = body.uf || "";
    body.complemento = body.complemento || "";

    if (!validador.validarCEP(body.cep)){ errorList.push({error: "CEP inválido.", field: "cep", step: "2"}); }
    if (!validador.validarTipoResidencia(body.tiporesidencia)){ errorList.push({error: "Tipo de residencia inválido.", field: "tiporesidencia", step: "2"}); }
    if (!validador.validarLogradouro(body.logradouro)){ errorList.push({error: "Endereço inválido.", field: "logradouro", step: "2"}); }
    if (!validador.validarTipoRua(body.tiporua)){ errorList.push({error: "Tipo de rua inválido.", field: "tiporua", step: "2"}); }
    if (!validador.validarNumero(body.numero)){ errorList.push({error: "Número inválido.", field: "numero", step: "2"}); }
    if (!validador.validarBairro(body.bairro)){ errorList.push({error: "Bairro inválido.", field: "bairro", step: "2"}); }
    if (!validador.validarMunicipio(body.cidade)){ errorList.push({error: "Cidade inválida.", field: "cidade", step: "2"}); }
    if (!validador.validarUF(body.uf)){ errorList.push({error: "UF inválido.", field: "uf", step: "2"}); }
    if (!validador.validarComplemento(body.complemento)){ errorList.push({error: "Complemento inválido.", field: "complemento", step: "2"});  }

    if (errorList.length > 0){ return res.status(400).json(errorList); }
    
    body.cep = body.cep.replace(/[^0-9]+/g, "");
    body.numerotelefone = body.numerotelefone.replace(/[^0-9]+/g, "");
    body.cpf = body.cpf.replace(/[^0-9]+/g, "");
    body.datanascimento = validador.formatarDataAmericana(body.datanascimento) || '';

    var data = {
        criadoEm: new Date(),
        susep: '5600PJ',//susep,
        codigo: 40,//codigooperacao,
        codigoCanal: 60,//codigocanal,
        flagImprimirCodigoOperacaoOrcamento: true,
        tipoResidencia: body.tiporesidencia,
        flagSinistrosUltimos12meses: false,
        segurado: {
            nome: body.nome,
            numeroTelefone: body.numerotelefone,
            tipoTelefone: body.tipotelefone,
            cpf: body.cpf,
            dataNascimento: body.datanascimento,
            endereco: {
                cep: body.cep,
                logradouro: body.logradouro,
                tipo: body.tiporua,
                numero: body.numero,
                bairro: body.bairro,
                cidade: body.cidade,
                uf: body.uf,
                complemento: body.complemento
            },
        }
    };

    return res.status(200).json({fomulario: data, dadosCobertura: body.dadosCobertura, valoresCobertura: body.valoresCobertura});

    //console.log(data);

    

    if (!validation.cpfPattern.test(body.cpf)){ 
        errorList.push({error: "CPF inválido.", field: "cpf", step: "1"}); 
    }
    if (!validation._nomePattern.test(body.nome)) { 
        errorList.push({error: "Nome inválido.", field: "nome", step: "1"}); 
    }
    if (body.tipotelefone != 1 && body.tipotelefone != 2 && body.tipotelefone != 3) { 
        errorList.push({error: "Tipo de telefone inválido.", field: "tipotelefone", step: "1"}); //0: Celular, 1: Fixo
    }
    if (body.numerotelefone.length != 10 && body.numerotelefone.length != 11) { 
        errorList.push({error: "Número de telefone inválido.", field: "numerotelefone", step: "1"}); 
    }else{
        if ((body.tipotelefone == 1 || body.tipotelefone == 2) && body.numerotelefone.length != 10){
            errorList.push({error: "Telefone fixo deve ter 10 digitos.", field: "numerotelefone", step: "1"});
        }
        if (body.tipotelefone == 3 && body.numerotelefone.length != 11){
            errorList.push({error: "Telefone celular deve ter 11 digitos.", field: "numerotelefone", step: "1"});
        }
    }
    if (body.datanascimento){
        if (!/^(\d{4})\-(\d{2})\-(\d{2})$/.test(body.datanascimento)) { 
            errorList.push({error: "Data de nascimento inválida.", field: "datanascimento", step: "1"}); 
        }
    }else{
        errorList.push({error: "Data de nascimento inválida.", field: "datanascimento", step: "1"});
    }
    
    //Etapa 2:
    if (body.cep.length != 8) { 
        errorList.push({error: "CEP inválido.", field: "cep", step: "2"}); 
    }
    if (!validation.tipoResidenciaPattern.test(body.tiporesidencia)){
        errorList.push({error: "Tipo de residencia inválido.", field: "tiporesidencia", step: "2"});
    }
    if (!validation._enderecoPattern.test(body.logradouro)) { 
        errorList.push({error: "Endereço inválido.", field: "logradouro", step: "2"}); 
    }
    if (!validation.listaTipoRua.includes(body.tiporua)) { 
        errorList.push({error: "Tipo de rua inválido.", field: "tiporua", step: "2"}); //0: Rua, 1: Avenida
    }
    if (!validation.numeroPattern.test(body.numero)) { 
        errorList.push({error: "Número inválido.", field: "numero", step: "2"}); 
    }
    if (!validation._bairroPattern.test(body.bairro)) { 
        errorList.push({error: "Bairro inválido.", field: "bairro", step: "2"}); 
    }
    if (!validation._cidadePattern.test(body.cidade)) { 
        errorList.push({error: "Cidade inválida.", field: "cidade", step: "2"}); 
    }
    if (!validation.ufPattern.test(body.uf.toUpperCase())) { 
        errorList.push({error: "UF inválido.", field: "uf", step: "2"}); 
    }else{
        if (!validation.listaUF.includes(body.uf.toUpperCase())){ 
            errorList.push({error: "UF inválido.", field: "uf", step: "2"}); 
        }
    }
    
    //Retorna campos com erro ao enviar formulário
    if (errorList.length > 0){ return res.status(400).send(JSON.stringify(arrayErros)); }

    // Adiciona informações ao banco de dados
    //var lead = data.segurado;
    //lead.dataCadastro = new Date;
    //lead = new Leads(lead);
    //try { lead = await lead.save(); data.id = lead.id; } catch (err) { console.log(err); }
    
    // Encripta dados a serem enviados
    var encryptedForm = CryptoJS.AES.encrypt( JSON.stringify(data), process.env.CRYPTO_TOKEN ).toString();

    res.json({ formData: encryptedForm, itemData: items });
});

module.exports = router;

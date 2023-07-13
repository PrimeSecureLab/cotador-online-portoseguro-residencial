const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const Usuarios = require('../collections/usuarios');
const Propostas = require('../collections/propostas');
const Orcamentos = require('../collections/orcamentos');
const authToken = require('../configs/authToken');
const validation = require('../configs/validation');
const NodeMailer = require('../configs/nodeMailer');

const ValidarCotacao = require('../configs/validarCotacao');
var validacaoCotacao = new ValidarCotacao;

const FuncoesProposta = require('../configs/funcoesProposta');
var funcoesProposta = new FuncoesProposta;

const ValidadorGeral = require('../configs/validacaoGeral');
var validador = new ValidadorGeral;

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
    if (!session.user_id){ return res.status(400).json({message:'Você deve estar logado para finalizar a transação.', fatal: true, id: 0}); }

    let user = await Usuarios.findOne({_id: session.user_id});
    if (!user){ req.session.destroy((e) => { return res.status(400).json({redirect: '/login', id: 1}); }); }

    let errorList = [];
    let body = req.body || {};

    let pagamento = body.pagamento || {};
    let formulario = body.formulario || {};
    let orcamento = body.orcamento || {};

    let segurado = formulario.segurado || {};
    let endereco = segurado.endereco || {};

    if (!body){ return res.status(400).json({fatal: 3, id: 2}); }

    if (!formulario){ return res.status(400).json({redirect: '/', id: 3}); } //Verifica se dados da Cotação ainda são válidos
    if (!orcamento){ return res.status(400).json({redirect: '/planos', id: 4}); } // Verifica se registrou o plano
    if (!pagamento){ return res.status(400).json({fatal: 4, id: 5}); }
    
    if (!orcamento.numeroOrcamento){ return res.status(400).json({redirect: '/planos', id: 6}); }
    if (!(['habitual', 'habitual-premium', 'veraneio'].includes(orcamento.tipo))){ return res.status(400).json({redirect: '/', id: 7}); }
    if (!(['essencial', 'conforto', 'exclusive'].includes(orcamento.plano))){ return res.status(400).json({redirect: '/planos', id: 8}); }
    if (!/^[1-3]{1}$/.test(orcamento.vigencia)){ return res.status(400).json({redirect: '/planos', id: 9}); }

    if (!/^[0-9]{8}$/.test(endereco.cep)){ return res.status(400).json({redirect: '/', id: 10}); }
    if (!validador.validarTipoResidencia(formulario.tipoResidencia)){ return res.status(400).json({redirect: '/', id: 11}); }
    if (!validador.validarLogradouro(endereco.logradouro)){ return res.status(400).json({redirect: '/', id: 12}); }
    if (!validador.validarTipoRua(endereco.tipo)){ return res.status(400).json({redirect: '/', id: 13}); }
    if (!validador.validarNumero(endereco.numero)){ return res.status(400).json({redirect: '/', id: 14}); }
    if (!validador.validarBairro(endereco.bairro)){ return res.status(400).json({redirect: '/', id: 15}); }
    if (!validador.validarMunicipio(endereco.cidade)){ return res.status(400).json({redirect: '/', id: 16}); }
    if (!validador.validarUF(endereco.uf)){ return res.status(400).json({redirect: '/', id: 17}); }
    if (!validador.validarComplemento(endereco.complemento)){ return res.status(400).json({redirect: '/', id: 18}); }

    pagamento.numeroCartao = pagamento.numeroCartao.replace(/[^\d]/g, "");
    let codigoBandeira = validador.retornarCodigoBandeira(pagamento.numeroCartao);

    if (!codigoBandeira){ errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); }

    if (!validador.validarNumeroCartao(pagamento.numeroCartao)){ errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); }
    
    if (!/^\d{2,4}$/.test(pagamento.numeroCvc)){ errorList.push({message: "CVC inválido", id: "cvc"}); } 
    
    if (!/^[0-9]{2}$/.test(pagamento.mesValidade)){ 
        if (/^[1-9]{1}$/.test(pagamento.mesValidade)){// Caso tenha apenas 1 dígito 
            pagamento.mesValidade = `0${pagamento.mesValidade}`; 
        }else{ // Caso tenha mais de 2 digitos
            errorList.push({message: "Mês inválido", id: "mes"}); 
        }
    }else{ 
        if (/^[0-9]{2}$/.test(pagamento.mesValidade)){
            if (parseInt(pagamento.mesValidade) > 12){ errorList.push({message: "Mês inválido", id: "mes"}); }
        }else{
            errorList.push({message: "Mês inválido", id: "mes"});
        }         
    }

    if (!/^\d{4}$/.test(pagamento.anoValidade)){ 
        if (/^\d{2}$/.test(pagamento.anoValidade)){
            pagamento.anoValidade = `20${pagamento.anoValidade}`; 
            if (parseInt(pagamento.anoValidade) < 23){ errorList.push({message: "Ano inválido", id: "ano"}); }
        }else{
            errorList.push({message: "Ano inválido", id: "ano"});
        }  
    }

    if (errorList.length){ return res.status(400).json({fatal: false, errors: errorList, id: 9}); }

    let numeroParcelas = pagamento.parcelas || 0;

    pagamento.numeroParcelas = numeroParcelas;
    pagamento.formaPagamento = "CARTAO_DE_CREDITO_62";

    if (numeroParcelas < 1 || numeroParcelas > 12){ 
        orcamento.listaParcelamento.map((parcela, index)=>{
            if (parcela.codigo == 62 && orcamento.listaParcelamento[index + 1].codigo != 62){ numeroParcelas = quantidadeParcelas; }
        });
    }
    
    let token = await authToken();
    let subUrl = '-sandbox';
    let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };

    if (process.env.AMBIENTE == 'HOMOLOGACAO'){ subUrl = '-hml'; }
    if (process.env.AMBIENTE == 'PRODUCAO'){ subUrl = ''; }
    
    let url = `https://portoapi${subUrl}.portoseguro.com.br/re/cartoes/v1/cartoes?numeroCartao=${pagamento.numeroCartao}`;

    let ticketCartao = await processarCartao({ "numeroCartao": parseInt(pagamento.numeroCartao) }, url, header, token, 0);
    if (!ticketCartao){ return res.status(400).json('Ocorreu dura processar o pagamento, tente novamente em alguns instantes.') }
    
    let pessoaFisica = user.pessoaFisica || {};
    let politicamenteExposta = pessoaFisica.politicamenteExposta || {};

    let payloadProposta = funcoesProposta.criarObjetoProposta( 
        orcamento.numeroOrcamento, 1, 
        { "cep": endereco.cep, "tipoLogradouro": endereco.tipo, "logradouro": endereco.logradouro, "numero": endereco.numero, "bairro": endereco.bairro, "cidade": endereco.cidade, "uf": endereco.uf, "complemento": endereco.complemento }, 
        { "email": user.email, "numeroTelefoneCelular": segurado.numeroTelefone, "numeroTelefoneResidencial": segurado.numeroTelefone }, 
        { "dataNascimento": pessoaFisica.dataNascimento, "codigoSexo": pessoaFisica.sexo, "codigoEstadoCivil": pessoaFisica.estadoCivil, "codigoPaisResidencia": 237, "codigoFaixaRenda": pessoaFisica.faixaRenda }, 
        { "tipoDocumento": pessoaFisica.documento.tipo, "numeroDocumento": pessoaFisica.documento.numero, "orgaoExpedidor": pessoaFisica.documento.orgaoExpedidor, "dataExpedicao": pessoaFisica.documento.dataExpedicao }, 
        { "cpf": politicamenteExposta.cpf, "nome": politicamenteExposta.nome, "codigoGrauRelacionamento": politicamenteExposta.grauRelacionamento }, 
        { "formaPagamento": "CARTAO_DE_CREDITO_62", "quantidadeParcelas": numeroParcelas }, 
        { "numeroCartao": ticketCartao, "codigoBandeira": codigoBandeira, "mesValidade": pagamento.mesValidade, "anoValidade": pagamento.anoValidade }

        /*{ "cep": "09571020", "tipoLogradouro": "R", "logradouro": "Rua Coronel CamisC#o", "numero": 91, "bairro": "Oswaldo Cruz", "cidade": "SC#o Caetano do Sul", "uf": "SP" }, 
        { "email": "matheus.marques.aquino@gmail.com", "numeroTelefoneCelular": "11979544109", "numeroTelefoneResidencial": "11979544109" }, 
        { "dataNascimento": "1997-08-29", "codigoSexo": 1, "codigoEstadoCivil": 1, "codigoPaisResidencia": 237, "codigoFaixaRenda": 6 }, 
        { "tipoDocumento": 1, "numeroDocumento": "441498486", "orgaoExpedidor": "SSP", "dataExpedicao": "2022-05-25" }, 
        { "cpf": "64010333049", "nome": "Gilbor Baohon Koxyorim", "codigoGrauRelacionamento": 1 }, 
        { "formaPagamento": "CARTAO_DE_CREDITO_62", "quantidadeParcelas": 1 }, 
        { "numeroCartao": "5408094831763990", "codigoBandeira": 2, "mesValidade": 12, "anoValidade": 2026 }*/
    );

    
    //console.log(ticketCartao)
    //console.log(payloadProposta);

    url = `https://portoapi${subUrl}.portoseguro.com.br/re/residencial/v1/${orcamento.tipo}/propostas`;
    let proposta = await processarProposta(payloadProposta, url, header, token, 0);

    console.log(proposta)
    
    /*url = `https://portoapi${subUrl}.portoseguro.com.br/re/residencial/v1/${orcamento.tipo}/propostas`;
    await axios.post(url, __payload, header)
        .then(function (response) {
            console.log('Proposta Criada:', response.data);
        })
        .catch(function (error) {
            if (error.response) {
                console.log('2-AAA:', error.response.status);
                console.log('2-AAB:', error.response.data);
            } else if (error.request) { 
                console.log('Error-Request:', error.request); 
            } else { 
                console.log('2-CCC', error.message); 
            }
        });*/
    
    return res.status(200).json('teste');
    
});

async function processarCartao(payload, url, header, token, tentativa){
    let ticket = false;
    let tentativas = tentativa + 1;
    tentativas = `Tentativa ${tentativas}`;

    await axios.post(url, payload, header)
        .then((response)=>{
            ticket = response.data.ticket
            console.log('Cartao criado:', response.data);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(tentativas, '[Error] RE Cartões - A:', `[${error.response.status}]`, error.response.data);
            } else if (error.request) { 
                console.log(tentativas, '[Error] RE Cartões - B:', error.request);
            } else { 
                console.log(tentativas, '[Error] RE Cartões - C'); 
            }
        });
        
    if (ticket){ return ticket; }
    if (!ticket && tentativa < 3){ return await processarCartao(numero, url, header, token, tentativa + 1); }
    if (!ticket && tentativa >= 3){ return false; }    
}

async function processarProposta(payload, url, header, token, tentativa){
    let proposta = false;
    let tentativas = tentativa + 1;

    await axios.post(url, payload, header)
        .then(function (response) {
            console.log('Proposta Criada:', response.data);
            proposta = response.data;
        })
        .catch(function (error) {
            if (error.response) {
                console.log(tentativas, '[Error] Proposta - A:', `[${error.response.status}]`, error.response.data);
                let response = error.response.data;
                if (response == 422){
                    if (Array.isArray(response.messages)){
                        if (response.messages.length == 1){
                            let numeroProposta = payload.numeroProposta;
                            let message = response.messages[0];
                            console.log(message);

                            if (message.includes('existe uma proposta criada para este o orçamento') && message.includes(numeroProposta)){
                                let orcamentoIndex = message.indexOf(numeroProposta);
                                message = message.slice(orcamentoIndex).replace(numeroProposta, '');
                                message = message.replace(/[^\d]/g, '');
                                console.log(message);
                            }
                        }
                    }
                }
            } else if (error.request) { 
                console.log(tentativas, '[Error] Proposta - B:', error.request);
            } else { 
                console.log(tentativas, '[Error] Proposta - C'); 
            }
        });

    if (proposta){ return proposta; }
    if (!proposta && tentativa < 3){ return await processarProposta(payload, url, header, token, tentativa + 1); }
    if (!proposta && tentativa >= 3){ return false; }   

}

module.exports = router;
const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const authToken = require('../configs/authToken');
const Orcamentos = require('../collections/orcamentos');
const Usuarios = require('../collections/usuarios');

dotenv.config();

// Define a rota para a página HTML
router.get('/', (req, res) => { res.sendFile('planos.html', { root: 'public' }); });

router.post('/salvar-orcarmento', async (req, res) => {
    let body = req.body;
    let session = (req.session) ? req.session : {};
    let redirect = '/cadastro';

    if (!body){ return res.status(400).json({message: 'Ocorreu um erro durante a seleção do plano.'}); }

    if (session.user_id){ 
        let user = await Usuarios.findOne({_id: session.user_id});
        if (!user){ 
            if (!session.cotacao){ session.cotacao = {}; }
            let cpf = session.cotacao.cpf || '000.000.000-00';
            cpf = cpf.replace(/[^0-9]+/g, '');
            user = await Usuarios.findOne({"pessoaFisica.cpf": body.cpf.replace(/[^0-9]+/g, '')});
            if (user){ redirect = "/login"; }else{ redirect = "/cadastro" }            
        }else{ redirect = "/pagamento"; }
    }

    if (!body.numeroOrcamento){ return res.status(400).json({message: 'Ocorreu um erro durante a seleção do plano.'}); }
    
    let orcamento = await Orcamentos.findOne({numeroOrcamento: body.numeroOrcamento});
    if (orcamento){ return res.status(200).json({redirect: redirect}); }

    orcamento = {
        criadoEm: body.criadoEm || new Date(),
        produto: body.tipo || '',
        vigencia: body.vigencia || '',
        listaParcelamento: [],
        propostaCriada: false,
        numeroOrcamento: body.numeroOrcamento,
        numeroVersaoOrcamento: body.numeroVersaoOrcamento,
        valoresCoberturas: body.coberturas || {}
    };

    if (Array.isArray(body.listaParcelamento)){
        for(let i in body.listaParcelamento){
            let parcelamento = body.listaParcelamento[i];
            if (parcelamento.codigo != 62){ continue; }
            orcamento.listaParcelamento.push(parcelamento);
        }
    }    

    let entry = new Orcamentos(orcamento);
    entry = await entry.save();
    return res.status(200).json({redirect: redirect});
});

// Define a rota para receber os dados do formulário
router.post('/', async (req, res) => {
    let data = req.body;
    let redirect = '/cadastro';
    let session = (req.session) ? req.session : {};

    if (!session.cotacao){ session.cotacao = {}; }
    if (!session.cotacao.itens){ session.cotacao.itens = {}; }

    if (!data){ return res.status(400).json({error: "Ocorreu um erro durante o envio do fomulário."}); }
    if (!data.formData){ return res.status(400).json({redirect: '/'}); }
    if (!data.itemData){ return res.status(400).json({redirect: '/'}); }
    if (!data.produto){ return res.status(400).json({error: "Produto não identificado.", redirect: false}); }

    if (!data.dadosCobertura){ data.dadosCobertura = {}; }      
    let produto = data.produto;
        
    if (produto != "habitual" && produto != "habitual-premium" && produto != "veraneio"){
        let error = { error: "Produto não identificado.", redirect: false };
        return res.status(400).json(error);
    }

    let bytes = CryptoJS.AES.decrypt(data.formData, process.env.CRYPTO_TOKEN);
    if (!bytes){ return res.status(400).json({redirect: '/'}); }

    let coberturas = data.itemData;
    let vigencia = data.vigencia || 1;

    data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    data.item = coberturas;
    data.vigencia = vigencia;

    if (!data){ return res.status(400).json({redirect: '/'}); }
    if (!data.segurado){ return res.status(400).json({redirect: '/'}); }
    if (!data.segurado.cpf){ return res.status(400).json({redirect: '/'}); }
    if (!data.segurado.endereco){ return res.status(400).json({redirect: '/'})}
    
    if (/^\d{11}$/.test(data.segurado.cpf.replace(/[^0-9]+/g, ""))){
        let user = await Usuarios.findOne({"pessoaFisica.cpf": data.segurado.cpf}); 
        if (user){ redirect = "/login"; }
    }
    
    let token = await authToken();
    let orcamento = await portoOrcamentoApi(produto, data, token);    

    let response = {};
    if (orcamento){
        if (orcamento.status == 200){
            orcamento.data.tipo = produto;
            orcamento.data.criadoEm = new Date();
            response = { error: false, status: orcamento.status, data: orcamento.data, redirect: redirect };
        }else{
            errorData = orcamento.data;
            errorData.tipo = produto;
            response = { error: true, status: orcamento.status, data: errorData, redirect: false };
        }
    }else{
        errorData = orcamento.data;
        errorData.tipo = produto;
        response = { error: true, status: 504, data: errorData, redirect: false };
    }
    res.status(200).json(response);
});

const PortoCoberturas = require('../configs/coberturas');
const CodigoServicos = require('../configs/servicos');
var portoCoberturas = new PortoCoberturas;
var codigoServicos = new CodigoServicos;

async function portoOrcamentoApi(produto, formData, token){
    return new Promise(async (resolve, reject)=>{
        let data = formData;
        
        data.susep = "5600PJ";
        data.codigoOperacao = 40;
        data.codigoCanal = 60;
        data.flagImprimirCodigoOperacaoOrcamento = false;
        data.flagSinistrosUltimos12Meses = false;

        let dataInicio = new Date();
        dataInicio = dataInicio.toISOString().split('T')[0];

        let dataSegmentada = dataInicio.split('-');
        dataSegmentada[0] = parseInt(dataSegmentada[0]) + data.vigencia;

        if (dataSegmentada[1] == 2 && dataSegmentada[2] == 29){ dataSegmentada[2] = 28; }
        dataSegmentada[1] = parseInt(dataSegmentada[1]) - 1;

        let dataFim = new Date(dataSegmentada[0], dataSegmentada[1], dataSegmentada[2]);
        dataFim = dataFim.toISOString().split('T')[0];

        let dataNascimento = data.segurado.dataNascimento.toString();
        dataNascimento = dataNascimento.split("-");
        dataNascimento = `${dataNascimento[2]}-${dataNascimento[1]}-${dataNascimento[0]}`;

        let allItens = portoCoberturas.listaCoberturas(produto, false);
        let itens = data.item;
        let itemList = {};

        for(let i in allItens){
            let item = allItens[i];
            if (!item){ continue; }
            if (itens[item]){ itemList[item] = itens[item]; } 
        }

        itemList.flagLMIDiscriminado = 0;
        itemList.flagContratarValorDeNovo = 0;
        itemList.valorCoberturaMorteAcisdental = 0;

        let servico = null;
        if (produto == 'habitual'){ servico = codigoServicos.listaServicosHabitual(data.vigencia, data.tipoResidencia); }
        if (produto == 'habitual-premium'){ servico = codigoServicos.listaServicosHabitualPremium(data.vigencia, data.tipoResidencia); }
        if (produto == 'veraneio'){ servico = codigoServicos.listaServicosVeraneio(data.vigencia, data.tipoResidencia); }

        servico = servico[1];
        if (!servico){ servico = []; }
        servico = servico[0];
        if (!servico){ servico = {cod: null, desc: ''}; }
        itemList.codigoClausulasPortoSeguroServicos = servico.cod;
        
        let subUrl = '-sandbox';
        if (process.env.AMBIENTE == 'HOMOLOGACAO'){ subUrl = '-hml'; }
        if (process.env.AMBIENTE == 'PRODUCAO'){ subUrl = ''; }

        let url = `https://portoapi${subUrl}.portoseguro.com.br/re/residencial/v1/${produto}/orcamentos`;
        let payload = {
            "susep": data.susep,
            "codigoOperacao": data.codigoOperacao,
            "codigoCanal": data.codigoCanal,
            "flagImprimirCodigoOperacaoOrcamento": data.flagImprimirCodigoOperacaoOrcamento,
            "tipoResidencia": parseInt(data.tipoResidencia),
            "tipoVigencia": 2,
            "dataInicioVigencia": dataInicio,
            "dataFimVigencia": dataFim,
            "flagSinistrosUltimos12Meses": data.flagSinistrosUltimos12Meses,
            "segurado": {
                "nome": data.segurado.nome,
                "numeroTelefone": data.segurado.numeroTelefone.replace(/[^0-9]+/g, ''),
                "tipoTelefone": data.segurado.tipoTelefone,
                "cpfCnpj": data.segurado.cpf.replace(/[^0-9]+/g, ''),
                "dataNascimento": dataNascimento,
                "endereco": {
                    "cep": data.segurado.endereco.cep.replace(/[^0-9]+/g, ''),
                    "logradouro": data.segurado.endereco.logradouro,
                    "tipo": data.segurado.endereco.tipo,
                    "numero": parseInt(data.segurado.endereco.numero.replace(/[^0-9]+/g, '')),
                    "bairro": data.segurado.endereco.bairro,
                    "cidade": data.segurado.endereco.cidade,
                    "uf": data.segurado.endereco.uf
                }
            },
            "item": itemList
        }

        let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
        let delay = 100

        if (produto == 'habitual-premium'){ delay = 200; }
        if (produto == 'veraneio'){ delay = 300; }

        delay += (data.vigencia - 1) * 30;
        setTimeout(async () => { 
            let request = await axios.post( url, payload, header).catch((error)=>{ 
                console.log(produto + ':', error.response.status); resolve(error.response); 
            });
            resolve( request ); 
        }, delay);
    });
}
module.exports = router;
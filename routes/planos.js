const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const authToken = require('../configs/authToken');
const Orcamentos = require('../collections/orcamentos');
const Usuarios = require('../collections/usuarios');

dotenv.config();

const _allItems = [ 'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 'codigoClausulasPortoSeguroServicos', 
'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes', 'valorCoberturaQuebraVidros', 
'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto', 'valorCoberturaAlagamento', 'flagContratarValorDeNovo', 'flagLMIDiscriminado',
'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos', 'valorSubtracaoBicicleta', 'valorNegocioCasa', 'valorPequenasReformas', 'valorFuneralFamiliar', 
'valorDanosMorais', 'valorRCEmpregador', 'valorCoberturaHoleinOne', 'valorCoberturaDanosJardim', 'valorCoberturaObrasObjetosArte', 'valorCoberturaJoiasRelogios' ];

// Define a rota para a página HTML
router.get('/', (req, res) => { res.sendFile('planos.html', { root: 'public' }); });

// Define a rota para receber os dados do formulário
router.post('/', async (req, res) => {
    let data = req.body;
    let redirect = '/cadastro';


    if (!data){ return res.status(400).json({error: "Ocorreu um erro durante o envio do fomulário."}); }
    if (!data.formData){ return res.status(400).json({redirect: '/'}); }
    if (!data.itemData){ return res.status(400).json({redirect: '/'}); }
    if (!data.produto){ return res.status(400).json({error: "Produto não identificado.", redirect: false}); }
    let produto = data.produto;
    if (produto != "habitual" && produto != "habitual-premium" && produto != "veraneio"){
        return res.status(400).json({error: "Produto não identificado.", redirect: false});
    }

    let bytes = CryptoJS.AES.decrypt(data.formData, process.env.CRYPTO_TOKEN);
    if (!bytes){ return res.status(400).json({redirect: '/'}); }

    let coberturas = data.itemData
    
    data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    data.item = coberturas;

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

    //console.log('A:', orcamento.data);
    let response = {};
    if (orcamento){
        if (orcamento.status == 200){
            orcamento.data.tipo = produto;
            orcamento.data.criadoEm = new Date();
            response = { error: false, status: orcamento.status, data: orcamento.data, redirect: redirect };
        }else{
            response = { error: true, status: response.status, data: { tipo: produto }, redirect: false };
        }
    }else{
        response = { error: true, status: 504, data: { tipo: produto }, redirect: false };
    }
    res.status(200).json(response);
    /*let promise_array = [];
    let response_array = [];

    promise_array[0] = await portoOrcamentoApi('habitual', data, token);
    promise_array[1] = await portoOrcamentoApi('habitual-premium', data, token);
    promise_array[2] = await portoOrcamentoApi('veraneio', data, token);

    promise_array.map((response, index)=>{
        let tipo = ["habitual", "premium", "veraneio"];
        if (response){
            //console.log(index);
            if (response.status == 200){
                response.data.tipo = tipo[index];
                response.data.criadoEm = new Date();
                response_array[index] = { error: false, status: response.status, data: response.data, redirect: redirect };
            }else{
                response_array[index] = { error: true, status: response.status, data: { tipo: tipo[index]}, redirect: false };
            }
        }else{
            response_array[index] = { error: true, status: 504, data: { tipo: tipo[index]}, redirect: false };
        }
    });

    res.status(200).json(response_array);*/
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

        let dataFim = new Date();
        dataFim.setDate(dataFim.getDate() + 366);
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
        if (produto == 'habitual'){ servico = codigoServicos.listaServicosHabitual(1, data.tipoResidencia); }
        if (produto == 'habitual-premium'){ servico = codigoServicos.listaServicosHabitualPremium(1, data.tipoResidencia); }
        if (produto == 'veraneio'){ servico = codigoServicos.listaServicosVeraneio(1, data.tipoResidencia); }

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
            "tipoVigencia": 1,
            "dataInicioVigencia": dataInicio,
            "dataFimVigencia": dataFim,
            "flagSinistrosUltimos12Meses": data.flagSinistrosUltimos12Meses,
            "segurado": {
                "nome": data.segurado.nome,
                "numeroTelefone": data.segurado.numeroTelefone.replace(/[^0-9]+/g, ''),
                "tipoTelefone": 3,
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
        //console.log(payload);
        let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
        let request = await axios.post( url, payload, header).catch((error)=>{ console.log(error.response.data); resolve(error.response); });
        let delay = 100
        if (produto == 'habitual-premiu'){ delay = 200; }
        if (produto == 'veraneio'){ delay = 300; }
        setTimeout(() => { resolve( request ); }, delay);
    });
}

async function porto_orcamento_habitual(formData, token){
    return new Promise(async (resolve, reject)=>{
        let data = formData;
        //console.log(data)

        let dataInicio = new Date();
        dataInicio = dataInicio.toISOString().split('T')[0];

        let dataFim = new Date()
        dataFim.setDate(dataFim.getDate() + 366);
        dataFim = dataFim.toISOString().split('T')[0];

        let dataNascimento = data.segurado.dataNascimento;
        dataNascimento = dataNascimento.split("-");
        dataNascimento = `${dataNascimento[2]}-${dataNascimento[1]}-${dataNascimento[0]}`;

        let itens = data.item;
        let itemList = {};

        allItems.map((item, index)=>{ if (itens[item]){ itemList[item] = itens[item]; } });
        //console.log(itemList);

        let url = "https://portoapi-hml.portoseguro.com.br/re/residencial/v1/habitual/orcamentos";
        let json = {
            "susep": data.susep,
            "codigoOperacao": data.codigo, 
            "flagImprimirCodigoOperacaoOrcamento": data.flagImprimirCodigoOperacaoOrcamento,
            "codigoCanal": data.codigoCanal,
            "tipoResidencia": 2,
            "tipoVigencia": 1,
            "dataInicioVigencia": dataInicio,
            "dataFimVigencia": dataFim,
            "flagSinistrosUltimos12Meses": data.flagSinistrosUltimos12Meses,
            "segurado": {
                "nome": data.segurado.nome,
                "numeroTelefone": data.segurado.numeroTelefone,
                "tipoTelefone": data.segurado.tipoTelefone,
                "cpfCnpj": data.segurado.cpf,
                "dataNascimento": dataNascimento,
                "endereco": {
                    "cep": data.segurado.endereco.cep,
                    "logradouro": data.segurado.endereco.logradouro,
                    "tipo": data.segurado.endereco.tipo,
                    "numero": data.segurado.endereco.numero,
                    "bairro": data.segurado.endereco.bairro,
                    "cidade": data.segurado.endereco.cidade,
                    "uf": data.segurado.endereco.uf,
                    "complemento": data.segurado.endereco
                }
            },
            "item": itemList
        };
        let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
        let request = await axios.post( url, json, header).catch((error)=>{ console.log(error.response); resolve(error.response); });
        
        if (request){
            if (request.status == 200){ 
                let novoOrcamento = {
                    criadoEm: new Date(),
                    numeroOrcamento: request.data.numeroOrcamento,
                    numeroVersaoOrcamento: request.data.numeroVersaoOrcamento,
                    tipo: "habitual"
                };
                let orcamento = new Orcamentos(novoOrcamento);
                orcamento = await orcamento.save();
            }
        }
        setTimeout(() => { resolve( request ); }, 200);
    });
}

async function porto_orcamento_habitual_premium(formData, token){
    return new Promise(async (resolve, reject)=>{
        let data = formData;
        let dataInicio = new Date();
        dataInicio = dataInicio.toISOString().split('T')[0];

        let dataFim = new Date()
        dataFim.setDate(dataFim.getDate() + 366);
        dataFim = dataFim.toISOString().split('T')[0];

        let dataNascimento = data.segurado.dataNascimento;
        dataNascimento = dataNascimento.split("-");
        dataNascimento = `${dataNascimento[2]}-${dataNascimento[1]}-${dataNascimento[0]}`;

        let itens = data.item;
        let itemList = {};
        allItems.map((item, index)=>{ if (itens[item]){ itemList[item] = itens[item]; } });
        //console.log(itemList);

        let url = "https://portoapi-hml.portoseguro.com.br/re/residencial/v1/habitual-premium/orcamentos";
        let json = {
            "susep": data.susep,
            "codigoOperacao": data.codigo,
            "flagImprimirCodigoOperacaoOrcamento": data.flagImprimirCodigoOperacaoOrcamento,
            "codigoCanal": data.codigoCanal,
            "tipoResidencia": 2,
            "tipoVigencia": 1,
            "dataInicioVigencia": dataInicio,
            "dataFimVigencia": dataFim,
            "flagSinistrosUltimos12Meses": data.flagSinistrosUltimos12Meses,
            "segurado": {
                "nome": data.segurado.nome,
                "numeroTelefone": data.segurado.numeroTelefone,
                "tipoTelefone": data.segurado.tipoTelefone,
                "cpfCnpj": data.segurado.cpf,
                "dataNascimento": dataNascimento,
                "endereco": {
                    "cep": data.segurado.endereco.cep,
                    "logradouro": data.segurado.endereco.logradouro,
                    "tipo": data.segurado.endereco.tipo,
                    "numero": data.segurado.endereco.numero,
                    "bairro": data.segurado.endereco.bairro,
                    "cidade": data.segurado.endereco.cidade,
                    "uf": data.segurado.endereco.uf,
                    "complemento": data.segurado.endereco
                }
            },
            "item": itemList
        };
        let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
        let request = await axios.post(url, json, header).catch((error)=>{ console.log(error.response.status); resolve(error.response); });
        
        if (request){
            if (request.status == 200){ 
                let novoOrcamento = {
                    criadoEm: new Date(),
                    numeroOrcamento: request.data.numeroOrcamento,
                    numeroVersaoOrcamento: request.data.numeroVersaoOrcamento,
                    tipo: "premium"
                };
                let orcamento = new Orcamentos(novoOrcamento);
                orcamento = await orcamento.save();
            }
        }
        setTimeout(() => { resolve( request ); }, 200);
    });
}

async function porto_orcamento_veraneio(formData, token){
    return new Promise(async (resolve, reject)=>{
        let data = formData;
        let dataInicio = new Date();
        dataInicio = dataInicio.toISOString().split('T')[0];

        let dataFim = new Date()
        dataFim.setDate(dataFim.getDate() + 366);
        dataFim = dataFim.toISOString().split('T')[0];

        let dataNascimento = data.segurado.dataNascimento;
        dataNascimento = dataNascimento.split("-");
        dataNascimento = `${dataNascimento[2]}-${dataNascimento[1]}-${dataNascimento[0]}`;

        let itens = data.item;
        let itemList = {};
        allItems.map((item, index)=>{ if (itens[item]){ itemList[item] = itens[item]; } });

        let url = "https://portoapi-hml.portoseguro.com.br/re/residencial/v1/veraneio/orcamentos";
        let json = {
            "susep": data.susep,
            "codigoOperacao": data.codigo,
            "flagImprimirCodigoOperacaoOrcamento": data.flagImprimirCodigoOperacaoOrcamento,
            "codigoCanal": data.codigoCanal,
            "tipoResidencia": 2,
            "tipoVigencia": 1,
            "dataInicioVigencia": dataInicio,
            "dataFimVigencia": dataFim,
            "flagSinistrosUltimos12Meses": data.flagSinistrosUltimos12Meses,
            "segurado": {
                "nome": data.segurado.nome,
                "numeroTelefone": data.segurado.numeroTelefone,
                "tipoTelefone": data.segurado.tipoTelefone,
                "cpfCnpj": data.segurado.cpf,
                "dataNascimento": dataNascimento,
                "endereco": {
                    "cep": data.segurado.endereco.cep,
                    "logradouro": data.segurado.endereco.logradouro,
                    "tipo": data.segurado.endereco.tipo,
                    "numero": data.segurado.endereco.numero,
                    "bairro": data.segurado.endereco.bairro,
                    "cidade": data.segurado.endereco.cidade,
                    "uf": data.segurado.endereco.uf,
                    "complemento": data.segurado.endereco
                }
            },
            "item": itemList
        };
        let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        let request = await axios.post(url, json, header).catch((error)=>{ console.log(error.response.status); resolve(error.response); });
        if (request){
            if (request.status == 200){ 
                let novoOrcamento = {
                    criadoEm: new Date(),
                    numeroOrcamento: request.data.numeroOrcamento,
                    numeroVersaoOrcamento: request.data.numeroVersaoOrcamento,
                    tipo: "veraneio"
                };
                let orcamento = new Orcamentos(novoOrcamento)
                orcamento = await orcamento.save();
            }
        }
        setTimeout(() => { resolve( request ); }, 200);
    });
}
module.exports = router;
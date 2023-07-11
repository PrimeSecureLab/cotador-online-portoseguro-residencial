const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');

const authToken = require('../configs/authToken');
const Orcamentos = require('../collections/orcamentos');
const Usuarios = require('../collections/usuarios');

const ValidadorGeral = require('../configs/validacaoGeral');
var validador = new ValidadorGeral;

const PortoCoberturas = require('../configs/coberturas');
var portoCoberturas = new PortoCoberturas;

const CodigoServicos = require('../configs/servicos');
var codigoServicos = new CodigoServicos;


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
            user = await Usuarios.findOne({"pessoaFisica.cpf": body.cpf});
            if (user){ redirect = "/login"; }else{ redirect = "/cadastro" }            
        }//else{ redirect = "/pagamento"; }
    }

    if (!body.numeroOrcamento){ return res.status(400).json({message: 'Ocorreu um erro durante a seleção do plano.'}); }
    
    let orcamento = await Orcamentos.findOne({numeroOrcamento: body.numeroOrcamento});
    if (orcamento){ return res.status(200).json({redirect: redirect}); }

    orcamento = {
        beneficios: body.beneficios || {},
        criadoEm: body.criadoEm || new Date(),
        dadosCobertura: body.dadosCobertura || {},
        diasValidadeOrcamentoEndosso: body.diasValidadeOrcamentoEndosso || null,
        diasValidadeOrcamentoNovo: body.diasValidadeOrcamentoNovo || null,
        diasValidadeOrcamentoRenovacao: body.diasValidadeOrcamentoRenovacao || null,
        listaParcelamento: body.listaParcelamento || [],
        numeroOrcamento: body.numeroOrcamento || null,
        numeroVersaoOrcamento: body.numeroVersaoOrcamento || null,
        plano: body.plano || '',
        produto: body.tipo || '',
        residencia: body.residencia || null,
        servico: servico || null,
        vigencia: body.vigencia || null,
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
    let body = req.body;
    let redirect = '/cadastro';
    let session = (req.session) ? req.session : {};

    if (!body){ return res.status(400).json({error: "Ocorreu um erro durante o envio do fomulário.", redirect: '/'}); }
    if (!validador.validarProduto(body.produto)){ return res.status(400).json({redirect: '/'}); }
    if (!validador.validarPlano(body.plano)){ return res.status(400).json({redirect: '/'}); }
    if (!validador.validarVigencia(body.vigencia)){ return res.status(400).json({redirect: '/'}); }
    if (!validador.validarDadosCobertura(body.dadosCobertura)){ return res.status(400).json({redirect: '/'}); }
    if (!validador.validarFormulario(body.formulario)){ return res.status(400).json({redirect: '/'}); }

    let listaCoberturas = validador.formatarItensCobertura(body.dadosCobertura);

    /*
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
    }*/

    
    let token = await authToken();
    let orcamento = await portoOrcamentoApi(body.produto, body.plano, body.vigencia, body.formulario, listaCoberturas, token);   
    let codServico = null;

    if (body.produto == 'habitual'){ codServico = codigoServicos.listaServicosHabitual(body.plano, body.vigencia, body.formulario.tipoResidencia); }
    if (body.produto == 'habitual-premium'){ codServico = codigoServicos.listaServicosHabitualPremium(body.plano, body.vigencia, body.formulario.tipoResidencia); }
    if (body.produto == 'veraneio'){ codServico = codigoServicos.listaServicosVeraneio(body.plano, body.vigencia, body.formulario.tipoResidencia); }

    if (codServico){ codServico = codServico[0].cod; }
    //console.log(codServico);
    
    let response = {};
    let errorData = {};
    
    if (orcamento){
        if (!orcamento.data){ orcamento.data = {}; }
        if (orcamento.status == 200){
            orcamento.data.tipo = body.produto;
            orcamento.data.plano = body.plano;
            orcamento.data.criadoEm = new Date();
            orcamento.data.vigencia = body.vigencia;
            orcamento.data.servico = codServico;
            orcamento.data.residencia = body.formulario.tipoResidencia;
            orcamento.data.dadosCobertura = body.dadosCobertura;
            response = { error: false, status: orcamento.status, data: orcamento.data, redirect: redirect };
        }else{
            errorData = orcamento.data;
            errorData.tipo = body.produto;
            errorData.plano = body.plano;
            errorData.vigencia = body.vigencia;
            errorData.servico = codServico;
            errorData.residencia = body.formulario.tipoResidencia;
            errorData.dadosCobertura = body.dadosCobertura;
            response = { error: true, status: orcamento.status, data: errorData, redirect: false };
        }
    }else{
        errorData = orcamento.data;
        errorData.tipo = body.produto;
        errorData.plano = body.plano;
        errorData.vigencia = body.vigencia;
        errorData.servico = codServico;
        errorData.residencia = body.formulario.tipoResidencia;
        errorData.dadosCobertura = body.dadosCobertura;
        response = { error: true, status: 504, data: errorData, redirect: false };
    }
    res.status(200).json(response);
});

async function portoOrcamentoApi(produto, plano, vigencia, formulario, itens, token){
    return new Promise(async (resolve, reject)=>{
        //let data = formData;
        
        //data.susep = "5600PJ";
        //data.codigoOperacao = 40;
        //data.codigoCanal = 60;
        //data.flagImprimirCodigoOperacaoOrcamento = false;
        //data.flagSinistrosUltimos12Meses = false;

        let dataInicio = new Date();
        dataInicio = dataInicio.toISOString().split('T')[0];

        let dataSegmentada = dataInicio.split('-');
        dataSegmentada[0] = parseInt(dataSegmentada[0]) + parseInt(vigencia);

        if (dataSegmentada[1] == 2 && dataSegmentada[2] == 29){ dataSegmentada[2] = 28; }
        dataSegmentada[1] = parseInt(dataSegmentada[1]) - 1;

        let dataFim = new Date(dataSegmentada[0], dataSegmentada[1], dataSegmentada[2]);
        dataFim = dataFim.toISOString().split('T')[0];

        //let dataNascimento = data.segurado.dataNascimento.toString();
        //dataNascimento = dataNascimento.split("-");
        //dataNascimento = `${dataNascimento[2]}-${dataNascimento[1]}-${dataNascimento[0]}`;

        let allItens = portoCoberturas.listaCoberturas(produto, false);
        let items = itens;
        let itemList = {};

        for(let i in allItens){
            let item = allItens[i];
            if (!item){ continue; }
            if (items[item]){ itemList[item] = items[item]; } 
        }

        itemList.flagLMIDiscriminado = 0;
        itemList.flagContratarValorDeNovo = 0;
        itemList.valorCoberturaMorteAcidental = 0;

        let servico = null;
        if (produto == 'habitual'){ servico = codigoServicos.listaServicosHabitual(plano, vigencia, formulario.tipoResidencia); }
        if (produto == 'habitual-premium'){ servico = codigoServicos.listaServicosHabitualPremium(plano, vigencia, formulario.tipoResidencia); }
        if (produto == 'veraneio'){ servico = codigoServicos.listaServicosVeraneio(plano, vigencia, formulario.tipoResidencia); }

        //servico = servico[1];
        //if (!servico){ servico = []; }
        servico = servico[0];
        if (!servico){ servico = {cod: null, desc: ''}; }
        itemList.codigoClausulasPortoSeguroServicos = servico.cod;
        
        let subUrl = '-sandbox';
        if (process.env.AMBIENTE == 'HOMOLOGACAO'){ subUrl = '-hml'; }
        if (process.env.AMBIENTE == 'PRODUCAO'){ subUrl = ''; }

        let url = `https://portoapi${subUrl}.portoseguro.com.br/re/residencial/v1/${produto}/orcamentos`;
        let payload = {
            "susep": "5600PJ",
            "codigoOperacao": 40,
            "codigoCanal": 60,
            "flagImprimirCodigoOperacaoOrcamento": false,
            "tipoResidencia": parseInt(formulario.tipoResidencia),
            "tipoVigencia": 2,
            "dataInicioVigencia": dataInicio,
            "dataFimVigencia": dataFim,
            "flagSinistrosUltimos12Meses": false,//data.flagSinistrosUltimos12Meses,
            "segurado": {
                "nome": formulario.segurado.nome,
                "numeroTelefone": formulario.segurado.numeroTelefone,
                "tipoTelefone": formulario.segurado.tipoTelefone,
                "cpfCnpj": formulario.segurado.cpf,
                "dataNascimento": formulario.segurado.dataNascimento,
                "endereco": {
                    "cep": formulario.segurado.endereco.cep,
                    "logradouro": formulario.segurado.endereco.logradouro,
                    "tipo": formulario.segurado.endereco.tipo,
                    "numero": formulario.segurado.endereco.numero,
                    "bairro": formulario.segurado.endereco.bairro,
                    "cidade": formulario.segurado.endereco.cidade,
                    "uf": formulario.segurado.endereco.uf,
                    "complemento": formulario.segurado.endereco.complemento || ''
                }
            },
            "item": itemList
        }

        let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
        let delay = 100

        if (produto == 'habitual-premium'){ delay = 300; }
        if (produto == 'veraneio'){ delay = 200; }

        delay += (parseInt(vigencia)) * 30;
        setTimeout(async () => { 
            let request = await axios.post( url, payload, header).catch((error)=>{ console.log(produto, '-', plano + ':', error.data); resolve(error); });
            resolve( request ); 
        }, delay);
    });
}
module.exports = router;
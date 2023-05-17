const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const authToken = require('../configs/authToken');
const Orcamentos = require('../collections/orcamentos');
const Usuarios = require('../collections/usuarios');

dotenv.config();

const allItems = [ 'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 'codigoClausulasPortoSeguroServicos', 
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

    let bytes = CryptoJS.AES.decrypt(data.formData, process.env.CRYPTO_TOKEN);
    if (!bytes){ return res.status(400).json({redirect: '/'}); }
    
    let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    user.item = data.itemData;
    user.item.flagLMIDiscriminado = 0;

    if (!user){ return res.status(400).json({redirect: '/'}); }
    if (!user.segurado){ return res.status(400).json({redirect: '/'}); }
    if (!user.segurado.cpf){ return res.status(400).json({redirect: '/'}); }
    if (!user.segurado.endereco){ return res.status(400).json({redirect: '/'})}
    
    
    if (/^\d{11}$/.test(user.segurado.cpf.replace(/[^0-9]+/g, ""))){
        let _user = await Usuarios.findOne({"pessoaFisica.cpf": user.segurado.cpf}); 
        if (_user){ redirect = "/login"; }
    }
    
    let token = await authToken();
    let promise_array = [];
    let response_array = [];

    promise_array[0] = await porto_orcamento_habitual(user, token);
    promise_array[1] = await porto_orcamento_habitual_premium(user, token);
    promise_array[2] = await porto_orcamento_veraneio(user, token);

    promise_array.map((response, index)=>{
        let tipo = ["habitual", "premium", "veraneio"];
        if (response){
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

    res.status(200).json(response_array);
});

async function porto_orcamento_habitual(formData, token){
    return new Promise(async (resolve, reject)=>{
        let data = formData;
        console.log(data)

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

        let url = "https://portoapi-sandbox.portoseguro.com.br/re/residencial/v1/habitual/orcamentos";
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
        let request = await axios.post( url, json, header).catch((error)=>{ console.log(error); reject(error); });
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

        let url = "https://portoapi-sandbox.portoseguro.com.br/re/residencial/v1/habitual-premium/orcamentos";
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
        let request = await axios.post(url, json, header).catch((error)=>{ console.log(error); reject(error); });
            
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

        let url = "https://portoapi-sandbox.portoseguro.com.br/re/residencial/v1/veraneio/orcamentos";
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
        let request = await axios.post(url, json, header).catch((error)=>{ console.log(error); reject(error); });
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
        setTimeout(() => { resolve( request ); }, 200);
    });
}
module.exports = router;
const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');

const authToken = require('../configs/authToken');
const Orcamentos = require('../collections/orcamentos');

dotenv.config();

// Define a rota para a página HTML
router.get('/', (req, res) => { res.sendFile('planos.html', { root: 'public' }); });

// Define a rota para receber os dados do formulário
router.post('/', async (req, res) => {
  let data = req.body;
  if (!data){ res.status(400).json({error: "Ocorreu um erro durante o envio do fomulário."}); }
  //console.log(data);
  let callPorto = await porto_api_call(data);
  res.status(200).json(callPorto);
});

async function porto_api_call(data){
  let response_array = [];
  let token = await authToken();

  let promise_array = [];
  promise_array[0] = await _porto_orcamento_habitual(data, token);
  promise_array[1] = await _porto_orcamento_habitual_premium(data, token);
  promise_array[2] = await _porto_orcamento_veraneio(data, token);

  promise_array.map((response, index)=>{
    //console.log(response);
    let tipo = ["habitual", "premium", "veraneio"];
    if (response.status == 200){
      response.data.tipo = tipo[index];
      response.data.criadoEm = new Date();
      response_array[index] = { error: false, status: response.status, data: response.data };
    }else{
      response_array[index] = { error: true, status: response.status, data: { tipo: tipo[index]} };
    }
  });
  return response_array;
}

const allItems = [ 'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 'codigoClausulasPortoSeguroServicos', 
'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes', 'valorCoberturaQuebraVidros', 
'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto', 'valorCoberturaAlagamento', 'flagContratarValorDeNovo', 'flagLMIDiscriminado',
'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos', 'valorSubtracaoBicicleta', 'valorNegocioCasa', 'valorPequenasReformas', 'valorFuneralFamiliar', 
'valorDanosMorais', 'valorRCEmpregador', 'valorCoberturaHoleinOne', 'valorCoberturaDanosJardim', 'valorCoberturaObrasObjetosArte', 'valorCoberturaJoiasRelogios' ];

async function _porto_orcamento_habitual(formData, token){
  return new Promise(async (resolve, reject)=>{
    let data = formData;
    if (!data) { data = {}; }
    if (!data.segurado){ data.segurado = {} }
    if (!data.segurado.endereco){ data.segurado.endereco = {}; }
    if (!data.item){ data.item = {}; }

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
    console.log(itemList);

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
    let request = await axios.post( url, json, 
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } } 
    );
    if (request.status == 200){ 
      let novoOrcamento = {
        criadoEm: new Date(),
        numeroOrcamento: request.data.numeroOrcamento,
        numeroVersaoOrcamento: request.data.numeroVersaoOrcamento,
        tipo: "habitual"
      };
      let orcamento = new Orcamentos(novoOrcamento)
      orcamento = await orcamento.save();
    }
    setTimeout(() => { resolve( request ); }, 200);
  });
}

async function _porto_orcamento_habitual_premium(formData, token){
  return new Promise(async (resolve, reject)=>{
    let data = formData;
    if (!data) { data = {}; }
    if (!data.segurado){ data.segurado = {} }
    if (!data.segurado.endereco){ data.segurado.endereco = {}; }
    if (!data.item){ data.item = {}; }

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
    console.log(itemList);

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
    let request = await axios.post(url, json, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    if (request.status == 200){ 
      let novoOrcamento = {
        criadoEm: new Date(),
        numeroOrcamento: request.data.numeroOrcamento,
        numeroVersaoOrcamento: request.data.numeroVersaoOrcamento,
        tipo: "premium"
      };
      let orcamento = new Orcamentos(novoOrcamento)
      orcamento = await orcamento.save();
    }
    setTimeout(() => { resolve( request ); }, 200);
  });
}

async function _porto_orcamento_veraneio(formData, token){
  return new Promise(async (resolve, reject)=>{
    let data = formData;
    if (!data) { data = {}; }
    if (!data.segurado){ data.segurado = {} }
    if (!data.segurado.endereco){ data.segurado.endereco = {}; }
    if (!data.item){ data.item = {}; }

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
    console.log(itemList);

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
    
    let request = await axios.post(url, json, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
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

function porto_orcamento_habitual(_data, token) {
  let data = _data;
  if (!data) { data = {}; }
  if (!data.segurado){ data.segurado = {} }
  if (!data.segurado.endereco){ data.segurado.endereco = {}; }
  if (!data.item){ data.item = {}; }

  let dataInicio = new Date();
  dataInicio = dataInicio.toISOString().split('T')[0];

  let dataFim = new Date()
  dataFim.setDate(dataFim.getDate() + 366);
  dataFim = dataFim.toISOString().split('T')[0];

  let dataNascimento = data.segurado.dataNascimento;
  dataNascimento = dataNascimento.split("-");
  dataNascimento = `${dataNascimento[2]}-${dataNascimento[1]}-${dataNascimento[0]}`;

  let request_url = "https://portoapi-sandbox.portoseguro.com.br/re/residencial/v1/habitual/orcamentos";
  let request_json = {
    "susep": data.susep,
    "codigoOperacao": data.codigo, 
    "flagImprimirCodigoOperacaoOrcamento": data.flagImprimirCodigoOperacaoOrcamento,
    "codigoCanal": data.codigoCanal,
    "melhorDataPagamento": "2022-06-22",
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
    "item": {
      "valorCoberturaIncendio": data.item.valorCoberturaIncendio,
      "valorCoberturaSubstracaoBens": data.item.valorCoberturaSubstracaoBens,
      "valorCoberturaPagamentoAluguel": data.item.valorCoberturaPagamentoAluguel,
      "valorCoberturaRCFamiliar": data.item.valorCoberturaRCFamiliar,
      //"codigoClausulasPortoSeguroServicos": 1,
      //"valorCoberturaDanosEletricos": 1,
      //"valorCoberturaVendaval": 1,
      //"valorCoberturaDesmoronamento": 1,
      "valorCoberturaVazamentosTanquesTubulacoes": data.item.valorCoberturaVazamentosTanquesTubulacoes,
      "valorCoberturaQuebraVidros": data.item.valorCoberturaQuebraVidros,
      //"valorCoberturaPagamentoCondominio": 1,
      //"valorCoberturaMorteAcidental": 1,
      "valorCoberturaTremorTerraTerremoto": data.item.valorCoberturaTremorTerraTerremoto,
      //"valorCoberturaAlagamento": 1,
      //"flagContratarValorDeNovo": 1,
      //"flagLMIDiscriminado": 1,
      //"valorCoberturaEdificio": 1,
      //"valorCoberturaConteudo": 1,
      "valorImpactoVeiculos": data.item.valorImpactoVeiculos,
      "valorSubtracaoBicicleta": data.item.valorSubtracaoBicicleta,
      //"valorNegocioCasa": 1,
      "valorPequenasReformas": data.item.valorPequenasReformas,
      //"valorFuneralFamiliar": 1,
      //"valorDanosMorais": 1,
      "valorRCEmpregador": data.item.valorRCEmpregador
    }
  };
  return axios.post(request_url, request_json, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
}

function porto_orcamento_habitual_premium(_data, token) {
  let data = _data;
  if (!data) { data = {}; }
  if (!data.segurado){ data.segurado = {} }
  if (!data.segurado.endereco){ data.segurado.endereco = {}; }
  if (!data.item){ data.item = {}; }

  let dataInicio = new Date();
  dataInicio = dataInicio.toISOString().split('T')[0];

  let dataFim = new Date()
  dataFim.setDate(dataFim.getDate() + 366);
  dataFim = dataFim.toISOString().split('T')[0];

  let dataNascimento = data.segurado.dataNascimento;
  dataNascimento = dataNascimento.split("-");
  dataNascimento = `${dataNascimento[2]}-${dataNascimento[1]}-${dataNascimento[0]}`;

  let request_url = "https://portoapi-sandbox.portoseguro.com.br/re/residencial/v1/habitual-premium/orcamentos";
  let request_json = {
    "susep": data.susep,
    "codigoOperacao": data.codigo,
    "flagImprimirCodigoOperacaoOrcamento": data.flagImprimirCodigoOperacaoOrcamento,
    "codigoCanal": data.codigoCanal,
    "melhorDataPagamento": "2022-06-22",
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
    "item": {
      "valorCoberturaIncendio": data.item.valorCoberturaIncendio,
      "valorCoberturaSubstracaoBens": data.item.valorCoberturaSubstracaoBens,
      "valorCoberturaPagamentoAluguel": data.item.valorCoberturaPagamentoAluguel,
      "valorCoberturaRCFamiliar": data.item.valorCoberturaRCFamiliar,
      //"codigoClausulasPortoSeguroServicos": 1,
      //"valorCoberturaDanosEletricos": 10000,
      //"valorCoberturaVendaval": 1000,
      //"valorCoberturaDesmoronamento": 1000,
      "valorCoberturaVazamentosTanquesTubulacoes": data.item.valorCoberturaVazamentosTanquesTubulacoes,
      "valorCoberturaQuebraVidros": data.item.valorCoberturaQuebraVidros,
      //"valorCoberturaPagamentoCondominio": 1000,
      //"valorCoberturaMorteAcidental": 1000,
      "valorCoberturaTremorTerraTerremoto": data.item.valorCoberturaTremorTerraTerremoto,
      //"valorCoberturaAlagamento": 1000,
      //"flagContratarValorDeNovo": 1,
      //"flagLMIDiscriminado": 1,
      //"valorCoberturaEdificio": 1000,
      //"valorCoberturaConteudo": 1000,
      "valorImpactoVeiculos": data.item.valorImpactoVeiculos,
      //"valorCoberturaHoleinOne": 1000,
      //"valorCoberturaDanosJardim": 1000,
      //"valorCoberturaObrasObjetosArte": 1000,
      //"valorCoberturaJoiasRelogios": 1000
    }
  };
  return axios.post(request_url, request_json, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
}

function porto_orcamento_veraneio(_data, token){
  let data = _data;
  if (!data) { data = {}; }
  if (!data.segurado){ data.segurado = {} }
  if (!data.segurado.endereco){ data.segurado.endereco = {}; }
  if (!data.item){ data.item = {}; }

  let dataInicio = new Date();
  dataInicio = dataInicio.toISOString().split('T')[0];

  let dataFim = new Date()
  dataFim.setDate(dataFim.getDate() + 366);
  dataFim = dataFim.toISOString().split('T')[0];

  let dataNascimento = data.segurado.dataNascimento;
  dataNascimento = dataNascimento.split("-");
  dataNascimento = `${dataNascimento[2]}-${dataNascimento[1]}-${dataNascimento[0]}`;

  let request_url = "https://portoapi-sandbox.portoseguro.com.br/re/residencial/v1/veraneio/orcamentos";
  let request_json = {
    "susep": data.susep,
    "codigoOperacao": data.codigo,
    "flagImprimirCodigoOperacaoOrcamento": data.flagImprimirCodigoOperacaoOrcamento,
    "codigoCanal": data.codigoCanal,
    "melhorDataPagamento": "2022-06-22",
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
    "item": {
      "valorCoberturaIncendio": data.item.valorCoberturaIncendio,
      "valorCoberturaSubstracaoBens": data.item.valorCoberturaSubstracaoBens,
      "valorCoberturaPagamentoAluguel": data.item.valorCoberturaPagamentoAluguel,
      "valorCoberturaRCFamiliar": data.item.valorCoberturaRCFamiliar,
      //"codigoClausulasPortoSeguroServicos": 1,
      //"valorCoberturaDanosEletricos": 10000,
      //"valorCoberturaVendaval": 10000,
      //"valorCoberturaDesmoronamento": 10000,
      "valorCoberturaVazamentosTanquesTubulacoes": data.item.valorCoberturaVazamentosTanquesTubulacoes,
      "valorCoberturaQuebraVidros": data.item.valorCoberturaQuebraVidros,
      //"valorCoberturaPagamentoCondominio": 10000,
      //"valorCoberturaMorteAcidental": 10000,
      "valorCoberturaTremorTerraTerremoto": data.item.valorCoberturaTremorTerraTerremoto,
      //"valorCoberturaAlagamento": 10000,
      //"flagContratarValorDeNovo": 1,
      //"flagLMIDiscriminado": 1,
      //"valorCoberturaEdificio": 100000,
      //"valorCoberturaConteudo": 10000,
      "valorImpactoVeiculos": data.item.valorImpactoVeiculos
    }
  };
  return axios.post(request_url, request_json, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
}

module.exports = router;
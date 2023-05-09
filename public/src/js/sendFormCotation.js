/*const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const dbConfig = require('../configs/dbconfig.js');
const mysql = require('mysql2/promise');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//cria conexão com o banco de dados
const connection = await mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB_NAME,
});

connection.connect((error) => {
    if (error) {
      console.error('Erro ao conectar com o banco de dados:', error);
    } else {
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
    }
  });


app.post('/enviar-dados', async (req, res) => {
  const susep = req.body.susep;
  const codigooperacao = req.body.codigooperacao;
  //const flagimprimircodigooperacaoorcamento = req.body.flagimprimircodigooperacaoorcamento;
  const codigocanal = req.body.codigocanal;
  //const melhordatapagamento = req.body.melhordatapagamento;
  //const tiporesidencia = req.body.tiporesidencia;
  //const tipovigencia = req.body.tipovigencia;
  //const datainiciovigencia = req.body.datainiciovigencia;
  //const datafimvigencia = req.body.datafimvigencia;
  //const flagsinistrosultimos12meses = req.body.flagsinistrosultimos12meses;

  //dados do usuário (Primeiro Step)
  const cpf = req.body.cpf;
  const nome = req.body.nome;
  const numerotelefone = req.body.numerotelefone;
  const tipotelefone = req.body.tipotelefone;
  const datanascimento = req.body.datanascimento;

  //dados do endereço (Segundo Step)
  const cep = req.body.cep;
  const endereco = req.body.endereco;
  const tiporua = req.body.tiporua;
  const numero = req.body.numero;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const uf = req.body.uf;

  //dados das coberturas (Terceiro Step)
  const valorcoberturaincendio = req.body.valorcoberturaincendio;
  const valorcoberturasubstracaobens = req.body.valorcoberturasubstracaobens;
  const valorcoberturapagamentoaluguel = req.body.valorcoberturapagamentoaluguel;
  const valorcoberturarcfamiliar = req.body.valorcoberturarcfamiliar;
  const codigoclausulasportoseguroservicos = req.body.codigoclausulasportoseguroservicos;
  const valorCoberturaVendaval = req.body.valorCoberturaVendaval;
  const valorcoberturadesmoronamento = req.body.valorcoberturadesmoronamento;
  const valorcoberturavazamentostanquestubulacoes = req.body.valorcoberturavazamentostanquestubulacoes;
  const valorcoberturaquebravidros = req.body.valorcoberturaquebravidros;
  const valorcoberturapagamentocondominio = req.body.valorcoberturapagamentocondominio;
  const valorcoberturamorteacidental = req.body.valorcoberturamorteacidental;
  const valorcoberturatremorterraterremoto = req.body.valorcoberturatremorterraterremoto;
  const valorcoberturaalagamento = req.body.valorcoberturaalagamento;
  const flagcontratarvalordenovo = req.body.flagcontratarvalordenovo;
  const flaglmidiscriminado = req.body.flaglmidiscriminado;
  const valorcoberturaedificio = req.body.valorcoberturaedificio;
  const valorcoberturaconteudo = req.body.valorcoberturaconteudo;
  const valorimpactoveiculos = re.body.valorimpactoveiculos;
  const valorsubtracaobicicleta = req.body.valorsubtracaobicicleta;
  const valornegociocasa = req.body.valornegociocasa;
  const valorpequenasreformas = req.body.valorpequenasreformas;
  const valorfuneralfamiliar = req.body.valorfuneralfamiliar;
  const valordanosmorais = req.body.valordanosmorais;
  const valorrcempregador = req.body.valorrcempregador;

  // Criar o objeto com os dados para enviar para a Porto Seguro
  const data = {
    susep: susep,
    codigo: codigooperacao,
    flagImprimirCodigoOperacaoOrcamento: false,
    codigoCanal: codigocanal,
    melhorDataPagamento: '',
    tipoResidencia: tipo,
    tipoVigencia: '',
    dataInicioVigencia: '',
    dataFimVigencia: '',
    flagSinistrosUltimos12meses: false,
    segurado: {
      nome: nome,
      numeroTelefone: numerotelefone,
      tipoTelefone: tipotelefone,
      cpfCnpj: cpf,
      dataNascimento: datanascimento,
      endereco: {
        cep: cep,
        logradouro: endereco,
        tipo: tiporua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        complemento,
      },
    },
    item: {
      valorCoberturaIncendio: valorcoberturaincendio,
      valorCoberturaSubstracaoBens: valorcoberturasubstracaobens,
      valorCoberturaPagamentoAluguel: valorcoberturapagamentoaluguel,
      valorCoberturaRCFamiliar: valorcoberturarcfamiliar,
      codigoClausulasPortoSeguroServicos: codigoclausulasportoseguroservicos,
      valorCoberturaVendaval: valorCoberturaVendaval,
      valorCoberturaDesmoronamento: valorcoberturadesmoronamento,
      valorCoberturaVazamentosTanquesTubulacoes: valorcoberturavazamentostanquestubulacoes,
      valorCoberturaQuebraVidros: valorcoberturaquebravidros,
      valorCoberturaPagamentoCondominio: valorcoberturapagamentocondominio,
      valorCoberturaMorteAcidental: valorcoberturamorteacidental,
      valorCoberturaTremorTerraTerremoto: valorcoberturatremorterraterremoto,
      valorCoberturaAlagamento: valorcoberturaalagamento,
      flagContratarValorDeNovo: flagcontratarvalordenovo,
      flagLMIDiscriminado: flaglmidiscriminado,
      valorCoberturaEdificio: valorcoberturaedificio,
      valorCoberturaConteudo: valorcoberturaconteudo,
      valorImpactoVeiculos: valorimpactoveiculos,
      valorSubtracaoBicicleta: valorsubtracaobicicleta,
      valorNegocioCasa: valornegociocasa,
      valorPequenasReformas: valorpequenasreformas,
      valorFuneralFamiliar: valorfuneralfamiliar,
      valorDanosMorais: valordanosmorais,
      valorRCEmpregador: valorrcempregador,
    },
  };

  try {
    // Gerar o token JWT
    const token = jwt.sign(data, process.env.JWT_SECRET);
    const encodedToken = CryptoJS.AES.encrypt(token, process.env.JWT_SECRET).toString();

    const url = `http://127.0.0.1:5500/public/planos.html?token=${encodedToken}`;

    //inserir os dados no banco de dados
    const query = `INSERT INTO dadosleadportoresidencial (nome, telefone, tipotelefone, cpf, datanascimento, cep, logradouro, tiporua, numero, bairro, cidade, uf, complemento) VALUES ('${nome}', '${telefone}', '${tipotelefone}', '${cpf}', '${dataNascimento}', '${cep}', '${logradouro}', '${tiporua}', '${numero}', '${bairro}', '${cidade}', '${uf}', '${complemento}')`;
    const values = [nome, telefone, tipotelefone, cpf, dataNascimento, cep, logradouro, tiporua, numero, bairro, cidade, uf, complemento];
    await connection.query(query, values);

    // Enviar a requisição para a API da Porto Seguro
    const response = await axios.post(process.env.PORTO_API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PORTO_API_TOKEN}`,
      },
    });
    res.redirect(url);

    // Enviar a resposta da API para a página de planos
    const planos = response.data;
    res.render('planos', { planos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocorreu um erro ao enviar os dados para a Porto Seguro.');
  }
});

//armazena os dados na localStorage
localStorage.setItem('susep',)
localStorage.setItem('codigooperacao',)*/
const express = require("express");
const CryptoJS = require("crypto-js");
const router = express.Router();
const dotenv = require('dotenv');

const Leads = require("../collections/leads");
const validation = require("../configs/validation");
const authToken = require('../configs/authToken');

dotenv.config();

// Define a rota para a página HTML
router.get("/", async (req, res) => { res.sendFile("cotacao.html", { root: "public" }); });

router.post("/enviar-dados", async (req, res) => {
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
    const datanascimento = (req.body.datanascimento) ? req.body.datanascimento.replace(/\//g, "-") : req.body.datanascimento;

    //dados do endereço (Segundo Step)
    const cep = req.body.cep;
    const logradouro = req.body.logradouro;
    const tiporua = req.body.tiporua;
    const numero = req.body.numero;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const uf = req.body.uf;

    //dados das coberturas (Terceiro Step)
    const valorcoberturaincendio = req.body.valorcoberturaincendio; ///*
    const valorcoberturasubstracaobens = req.body.valorcoberturasubstracaobens; //
    const valorcoberturapagamentoaluguel = req.body.valorcoberturapagamentoaluguel; //
    const valorcoberturarcfamiliar = req.body.valorcoberturarcfamiliar; //
    const codigoclausulasportoseguroservicos = req.body.codigoclausulasportoseguroservicos; //* ?
    const valorcoberturavendaval = req.body.valorcoberturavendaval; //
    const valorcoberturadesmoronamento = req.body.valorcoberturadesmoronamento; //
    const valorcoberturavazamentostanquestubulacoes = req.body.valorcoberturavazamentostanquestubulacoes;
    const valorcoberturaquebravidros = req.body.valorcoberturaquebravidros;
    const valorcoberturapagamentocondominio = req.body.valorcoberturapagamentocondominio;
    const valorcoberturamorteacidental = req.body.valorcoberturamorteacidental;
    const valorcoberturatremorterraterremoto = req.body.valorcoberturatremorterraterremoto;
    const valorcoberturaalagamento = req.body.valorcoberturaalagamento; //
    const flagcontratarvalordenovo = req.body.flagcontratarvalordenovo;
    const flaglmidiscriminado = req.body.flaglmidiscriminado; //*
    const valorcoberturaedificio = req.body.valorcoberturaedificio;
    const valorcoberturaconteudo = req.body.valorcoberturaconteudo;
    const valorimpactoveiculos = req.body.valorimpactoveiculos;
    const valorsubtracaobicicleta = req.body.valorsubtracaobicicleta;//
    const valornegociocasa = req.body.valornegociocasa;
    const valorpequenasreformas = req.body.valorpequenasreformas;//
    const valorfuneralfamiliar = req.body.valorfuneralfamiliar;
    const valordanosmorais = req.body.valordanosmorais;
    const valorrcempregador = req.body.valorrcempregador;

    // Criar o objeto com os dados para enviar para a Porto Seguro
    const data = {
        susep: susep,
        codigo: codigooperacao,
        flagImprimirCodigoOperacaoOrcamento: false,
        codigoCanal: codigocanal,
        melhorDataPagamento: null,
        tipoResidencia: null,
        tipoVigencia: null,
        dataInicioVigencia: null,
        dataFimVigencia: null,
        flagSinistrosUltimos12meses: false,
        segurado: {
            nome: nome,
            numeroTelefone: numerotelefone,
            tipoTelefone: tipotelefone,
            cpf: cpf,
            dataNascimento: datanascimento,
            endereco: {
                cep: cep,
                logradouro: logradouro,
                tipo: tiporua,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                complemento: null,
            },
        },
        item: {
            valorCoberturaIncendio: valorcoberturaincendio,
            valorCoberturaSubstracaoBens: valorcoberturasubstracaobens,
            valorCoberturaPagamentoAluguel: valorcoberturapagamentoaluguel,
            valorCoberturaRCFamiliar: valorcoberturarcfamiliar,
            codigoClausulasPortoSeguroServicos: codigoclausulasportoseguroservicos,
            valorCoberturaVendaval: valorcoberturavendaval,
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

    var arrayErros = [];

    try {
        // Gerar o token JWT
        //const token = jwt.sign(data, process.env.CRYPTO_TOKEN);
        //const encodedToken = CryptoJS.AES.encrypt(
        //token,
        //process.env.CRYPTO_TOKEN
        //).toString();

        //const url = `http://127.0.0.1:3000/planos.html?token=${encodedToken}`;

        // Limpa a array de erros a cada novo submit
        arrayErros = [];

        // Adicionar console.log para verificar o valor do CPF recebido no lado do servidor
        //console.log("Valor do CPF no lado do servidor:", cpf);
        //console.log("CPF recebido:", req.body.cpf);

        // Verificar se os dados são válidos antes de inserir no banco de dados e enviar para a API
        //console.log("Valor do CPF no lado do servidor:", cpf); // Adicione essa linha
        
        //Etapa 1:
        if (!validation.cpfPattern.test(cpf)){ 
            arrayErros.push({error: "CPF inválido.", field: "cpf", step: "1"}); 
        }
        if (!validation._nomePattern.test(nome)) { 
            arrayErros.push({error: "Nome inválido.", field: "nome", step: "1"}); 
        }
        if (!validation.numeroTelefonePattern.test(numerotelefone.replace(/[^0-9]+/g, ""))) { 
            arrayErros.push({error: "Número de telefone inválido.", field: "numerotelefone", step: "1"}); 
        }
        if (!validation._tipoTelefonePattern.test(tipotelefone)) { 
            arrayErros.push({error: "Tipo de telefone inválido.", field: "tipotelefone", step: "1"}); //0: Celular, 1: Fixo
        }
        if (datanascimento){
            if (!validation._dataNascimentoPattern.test(datanascimento)) { 
                arrayErros.push({error: "Data de nascimento inválida.", field: "datanascimento", step: "1"}); 
            }
        }else{
            arrayErros.push({error: "Data de nascimento inválida.", field: "datanascimento", step: "1"});
        }
        
        //Etapa 2:
        if (!validation._cepPattern.test(cep.replace(/[^0-9]+/g, ""))) { 
            arrayErros.push({error: "CEP inválido.", field: "cep", step: "2"}); 
        }
        if (!validation._enderecoPattern.test(logradouro)) { 
            arrayErros.push({error: "Endereço inválido.", field: "logradouro", step: "2"}); 
        }
        if (!validation._tipoRuaPattern.test(tiporua)) { 
            arrayErros.push({error: "Tipo de rua inválido.", field: "tiporua", step: "2"}); //0: Rua, 1: Avenida
        }
        if (!validation.numeroPattern.test(numero)) { 
            arrayErros.push({error: "Número inválido.", field: "numero", step: "2"}); 
        }
        if (!validation._bairroPattern.test(bairro)) { 
            arrayErros.push({error: "Bairro inválido.", field: "bairro", step: "2"}); 
        }
        if (!validation._cidadePattern.test(cidade)) { 
            arrayErros.push({error: "Cidade inválida.", field: "cidade", step: "2"}); 
        }
        if (!validation.ufPattern.test(uf.toUpperCase())) { 
            arrayErros.push({error: "UF inválido.", field: "uf", step: "2"}); 
        }
        
        //Retorna campos com erro ao enviar formulário
        if (arrayErros.length > 0){ return res.status(400).send(JSON.stringify(arrayErros)); }

        // Adiciona informações ao banco de dados
        var lead = data.segurado;
        lead.dataCadastro = new Date;
        lead = new Leads(lead);
        try { lead = await lead.save(); data.id = lead.id; } catch (err) { console.log(err); }
        
        // Encripta dados a serem enviados
        var encrypted_form = CryptoJS.AES.encrypt( JSON.stringify(data), process.env.CRYPTO_TOKEN ).toString();

        res.json({ form_data: encrypted_form });    
    } catch (error) {
        console.error(error);
        return res
        .status(500)
        .send("Ocorreu um erro ao enviar os dados para a Porto Seguro.");
    }
});

module.exports = router;

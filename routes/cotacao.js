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

router.get("/formulario", async (req, res)=>{
    let session = req.session;
    console.log(session)
    if (!session){ return res.status(400).json({}); }
    if (!session.cotacao){ return res.status(400).json({}); }
    if (!session.cotacao.criadoEm){ session.cotacao = {}; return res.status(400).json({}); }
    
    let dataInicio = new Date(session.cotacao.criadoEm);
    let intervalo = (new Date() - dataInicio) / (1000 * 60 * 60 * 24);
    
    if (intervalo > 5){ session.cotacao = {}; return res.status(400).json({}); }
    return res.status(200).json(session.cotacao);
});

router.post("/enviar-dados", async (req, res) => {
    var allItems = [ 'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 'codigoClausulasPortoSeguroServicos', 
        'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes', 'valorCoberturaQuebraVidros', 
        'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto', 'valorCoberturaAlagamento', 'flagContratarValorDeNovo', 'flagLMIDiscriminado',
        'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos', 'valorSubtracaoBicicleta', 'valorNegocioCasa', 'valorPequenasReformas', 'valorFuneralFamiliar', 
        'valorDanosMorais', 'valorRCEmpregador', 'valorCoberturaHoleinOne', 'valorCoberturaDanosJardim', 'valorCoberturaObrasObjetosArte', 'valorCoberturaJoiasRelogios' ];
    var _allItems = [];
    allItems.map((item, index)=>{ _allItems[item.toLocaleLowerCase()] = item; });
    
    let items = {};
    for(let [key, value] of Object.entries(req.body)){ if (key in _allItems){ items[_allItems[key]] = value; } }

    //console.log(items);
    const susep = '5600PJ'//req.body.susep;
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
    const cpf = req.body.cpf || "";
    const nome = req.body.nome;
    const numerotelefone = req.body.numerotelefone || "";
    const tipotelefone = req.body.tipotelefone;
    const datanascimento = (req.body.datanascimento) ? req.body.datanascimento.replace(/\//g, "-") : req.body.datanascimento;

    //dados do endereço (Segundo Step)
    const tiporesidencia = req.body.tiporesidencia;
    const cep = req.body.cep || "";
    const logradouro = req.body.logradouro;
    const tiporua = req.body.tiporua || "";
    const numero = req.body.numero;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const uf = req.body.uf || "";

    // Criar o objeto com os dados para enviar para a Porto Seguro
    var data = {
        criadoEm: new Date(),
        susep: susep,
        codigo: codigooperacao,
        flagImprimirCodigoOperacaoOrcamento: false,
        codigoCanal: codigocanal,
        melhorDataPagamento: null,
        tipoResidencia: tiporesidencia,
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
        }
    };

    var arrayErros = [];

    try {
        arrayErros = [];
        //Etapa 1:
        if (!validation.cpfPattern.test(cpf.replace(/[^0-9]+/g, ""))){ 
            arrayErros.push({error: "CPF inválido.", field: "cpf", step: "1"}); 
        }
        if (!validation._nomePattern.test(nome)) { 
            arrayErros.push({error: "Nome inválido.", field: "nome", step: "1"}); 
        }
        if (tipotelefone != 1 && tipotelefone != 2 && tipotelefone != 3) { 
            arrayErros.push({error: "Tipo de telefone inválido.", field: "tipotelefone", step: "1"}); //0: Celular, 1: Fixo
        }
        if (!validation.numeroTelefonePattern.test(numerotelefone.replace(/[^0-9]+/g, ""))) { 
            arrayErros.push({error: "Número de telefone inválido.", field: "numerotelefone", step: "1"}); 
        }else{
            if ((tipotelefone == 1 || tipotelefone == 2) && numerotelefone.replace(/[^0-9]+/g, "").length != 10){
                arrayErros.push({error: "Telefone fixo deve ter 10 digitos.", field: "numerotelefone", step: "1"});
            }
            if (tipotelefone == 3 && numerotelefone.replace(/[^0-9]+/g, "").length != 11){
                arrayErros.push({error: "Telefone celular deve ter 11 digitos.", field: "numerotelefone", step: "1"});
            }
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
        if (!validation.tipoResidenciaPattern.test(tiporesidencia)){
            arrayErros.push({error: "Tipo de residencia inválido.", field: "tiporesidencia", step: "2"});
        }
        if (!validation._enderecoPattern.test(logradouro)) { 
            arrayErros.push({error: "Endereço inválido.", field: "logradouro", step: "2"}); 
        }
        if (!validation.listaTipoRua.includes(tiporua)) { 
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
        }else{
            if (!validation.listaUF.includes(uf.toUpperCase())){ 
                arrayErros.push({error: "UF inválido.", field: "uf", step: "2"}); 
            }
        }
        
        //Retorna campos com erro ao enviar formulário
        if (arrayErros.length > 0){ return res.status(400).send(JSON.stringify(arrayErros)); }

        // Adiciona informações ao banco de dados
        var lead = data.segurado;
        lead.dataCadastro = new Date;
        lead = new Leads(lead);
        try { lead = await lead.save(); data.id = lead.id; } catch (err) { console.log(err); }
        
        // Encripta dados a serem enviados
        var encryptedForm = CryptoJS.AES.encrypt( JSON.stringify(data), process.env.CRYPTO_TOKEN ).toString();

        res.json({ formData: encryptedForm, itemData: items });    
    } catch (error) {
        console.error(error);
        return res.status(500).send("Ocorreu um erro ao enviar os dados para a Porto Seguro.");
    }
});

module.exports = router;

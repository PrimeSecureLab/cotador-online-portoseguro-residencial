let patterns = {
    cpf: /^\d{11}$/,
    nome: /^[A-Za-z\s]+$/,
    _nome: /^([^0-9]*).{1,}$/,
    numeroTelefone: /^\d{10,11}$/,
    tipotelefone: /^(fixo|celular)$/,
    _tipoTelefone: /^[0-1]{1}$/,
    datanascimento: /^\d{4}\-\d{2}\-\d{2}$/,
    _dataNascimento: /^\d{2}\-\d{2}\-\d{4}$/,
    cep: /^\d{5}\-\d{3}$/,
    _cep: /^\d{8}$/,
    endereco: /^[A-Za-z0-9\s\,\.\-]+$/,
    _endereco: /^.{2,200}$/,
    tiporua: /^(rua|avenida|travessa|alameda)$/,
    _tipoRua: /^[0-7]{1}$/,
    numero: /^\d+$/,
    bairro: /^[A-Za-z\s\.\-]+$/,
    _bairro: /^.{2,200}$/,
    cidade: /^[A-Za-z\s\.\-]+$/,
    _cidade: /^([^0-9]*).{2,}$/,
    uf: /^[A-Z]{2}$/,
    tipoResidencia: /^[1-7]{1}$/,
    eloCard: /^(40117[8-9]|4011[8-9][0-9]|4[23][0-9]{2}|5[1-5][0-9]{2}|5[6][0-9][0-9]|6[0-9]{3})[0-9]{10}$/,
    dinersCard: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    visaCard: /^4[0-9]{12}(?:[0-9]{3})?$/,
    masterCard: /^5[1-5][0-9]{14}$/,
    _geral: /^[A-zÀ-ú0-9\s]+$/,
    listaTipoRua: [ "R", "AV", "AL", "CH", "COND", "CJ", "EST", "LD", "LRG", "PRQ", "PC", "PR", "Q", "ROD", "TV", "V" ],
    listaUF: [ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO' ],
    
    celular: /^\([0-9]{2}\)\s[0-9]{5}\-[0-9]{4}$/,
    _celular: /^\([0-9]{2}\)\s[0-9]{4}\-[0-9]{5}$/,
    telefone: /^\([0-9]{2}\)\s[0-9]{4}\-[0-9]{4}$/,
    _cpf: /^(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})$/,

    data: /^(\d{2})\/(\d{2})\/(\d{4})$/,
    dataAmerica: /^(\d{4})\-(\d{2})\-(\d{2})$/,
}

let objCoberturas = {};
objCoberturas['habitual'] = [ //Itens Habitual
    'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', /*'codigoClausulasPortoSeguroServicos',*/
    'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes',
    'valorCoberturaQuebraVidros', 'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto',
    'valorCoberturaAlagamento', /*'flagContratarValorDeNovo', 'flagLMIDiscriminado',*/ 'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos',
    'valorSubtracaoBicicleta', 'valorNegocioCasa', 'valorPequenasReformas', 'valorFuneralFamiliar', 'valorDanosMorais', 'valorRCEmpregador'
];
objCoberturas['veraneio'] = [ 
    'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', /*'codigoClausulasPortoSeguroServicos',*/
    'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes', 
    'valorCoberturaQuebraVidros', 'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto', 
    'valorCoberturaAlagamento', /*'flagContratarValorDeNovo', 'flagLMIDiscriminado',*/ 'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos'
];

function validarNome(nome){
    nome = nome || '';
    nome = nome.toString().trim();
    if (nome.length < 4 || !nome.includes(' ')){ return false; }
    return true;
}

function validarCPF(cpf){
    if (!patterns._cpf.test(cpf)){ return false; }
    let numeroCpf = cpf.replace(/\D/g, '');

    let soma = 0;
    for (let i = 1; i <= 9; i++){ soma = soma + parseInt(numeroCpf.substring(i-1, i)) * (11 - i); }
    let resto = (soma * 10) % 11;
    
    if ((resto == 10) || (resto == 11)){ resto = 0; }
    if (resto != parseInt(numeroCpf.substring(9, 10)) ){ return false; }
    
    soma = 0;
    for (let i = 1; i <= 10; i++){ soma = soma + parseInt(numeroCpf.substring(i-1, i)) * (12 - i); }
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)){ resto = 0; }
    if (resto != parseInt(numeroCpf.substring(10, 11) ) ){ return false; }
    return true;
}

function validarTelefone(numero){
    if (patterns.celular.test(numero) || patterns._celular.test(numero) || patterns.telefone.test(numero)){ return true; }
    return false;
}

function validarTipoTelefone(tipoTelefone){
    if (!tipoTelefone){ return false; }
    if (tipoTelefone != 1 && tipoTelefone != 3){ return false; }
    return true;
}

function validarTipoRua(tipoRua){
    if (!tipoRua){ return false; }
    tipoRua = tipoRua.toUpperCase();
    if (!patterns.listaTipoRua.includes(tipoRua)){ return false; }
    return true;
}

function validarTipoResidencia(tipoResidencia){ return /^[1-8]{1}$/.test(tipoResidencia); }

function validarEmail(email){
    email = email || '';
    email = email.toString().trim();
    if (email.length < 5 || !email.includes('@') || !email.includes('.')){ return false; }
    return true;
}

function validarCEP(cep){ return patterns.cep.test(cep); }

function validarMunicipio(municipio){ return /^.{2,50}$/.test(municipio); }

function validarLogradouro(logradouro){ return /^.{2,60}$/.test(logradouro); }

function validarNumero(numero){ return /^.{1,20}$/.test(numero); }

function validarComplemento(complemento){ return /^.{0,35}$/.test(complemento); }

function validarBairro(bairro){ return /^.{1,33}$/.test(bairro); }

function validarUF(uf){
    uf = uf || '';
    uf = uf.toUpperCase();
    if (!patterns.listaUF.includes(uf)){ return false; }
    return true;
}

function validarData(date){
    if (!patterns.data.test(date)){ return false; } 

    var [, dia, mes, ano] = patterns.data.exec(date);
    var data = new Date(ano, mes - 1, dia);

    return (
        data.getFullYear() === parseInt(ano, 10) &&
        data.getMonth() === parseInt(mes, 10) - 1 &&
        data.getDate() === parseInt(dia, 10) &&
        !isNaN(data.getTime())
    );
}
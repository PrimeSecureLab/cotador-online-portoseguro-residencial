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
    dataAmericana: /^(\d{4})\-(\d{2})\-(\d{2})$/,
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
    let numeroCpf = cpf.replace(/\D/g, '');
    console.log(cpf, numeroCpf);
    if (!patterns._cpf.test(cpf) && cpf != numeroCpf){ return false; }    

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

function validarSenha(senha){
    if (!senha){ return false; }
    senha = senha.toString();
    if (senha.length < 8){ return false; }
    return true;
}

function validarDataAmericana(date){
    if (!patterns.dataAmericana.test(date)){ return false; } 

    var [, ano, mes, dia] = patterns.dataAmericana.exec(date);
    var data = new Date(ano, mes - 1, dia);

    return (
        data.getFullYear() === parseInt(ano, 10) &&
        data.getMonth() === parseInt(mes, 10) - 1 &&
        data.getDate() === parseInt(dia, 10) &&
        !isNaN(data.getTime())
    );
}

function retornarObjetoDate(data){
    var [, ano, mes, dia] = patterns.dataAmericana.exec(data);
    var date = new Date(ano, mes - 1, dia);
    return date;
}

function validarIntervaloEmDias(dataInicio, dataFim, limite){
    let datas = [dataInicio, dataFim];
    if (datas[0].getTime() > datas[1].getTime()){ return false; }

    let intervalo = datas[1].getTime() - datas[0].getTime();
    intervalo = Math.abs( intervalo / ( 1000 * 60 * 60 * 24 ) );

    if ( intervalo > limite ){ return false; }
    return true;
}

function validarCodigoPlanos(codigo){
    let listaCodigos = [501, 505, 509, 572, 576, 577, 580, 582, 593, 1192, 1193, 1194, 1195, 1200, 1201, 1206, 1207, 1208, 1209, 1215, 1217, 1237, 1239, 1248, 1257, 1259, 1267];
    codigo = codigo || null;
    if (!listaCodigos.includes(codigo)){ return false; }
    return true;
}

function validarOrcamento(orcamento){
    if (!orcamento.criadoEm){ return false; }
    //console.log(orcamento.criadoEm.toISOString());
    let criadoEm = (new Date(orcamento.criadoEm)).toISOString().split('T')[0];
    if (!validarDataAmericana(criadoEm)){ console.log('criadoEm', criadoEm); return false; }

    let hoje = (new Date()).toISOString().split('T')[0];
    hoje = retornarObjetoDate(hoje);
    criadoEm = retornarObjetoDate(criadoEm);

    if (!validarIntervaloEmDias(criadoEm, hoje, 5)){ console.log('intervalo'); return false; }

    if (!orcamento.numeroOrcamento){ console.log('numero orcamento'); return false; }

    let listaPlanos = ['essencial', 'conforto', 'exclusive'];
    let listaProdutos = ['habitual', 'habitual-premium', 'veraneio'];
    let listaResidencia = [1, 2, 3, 4, 8];
    let listaVigencia = [1, 2, 3];
        
    orcamento.plano = orcamento.plano || '';
    orcamento.plano = orcamento.plano.toLowerCase();

    orcamento.tipo = orcamento.tipo || '';
    orcamento.tipo = orcamento.tipo.toLowerCase();

    orcamento.residencia = orcamento.residencia || 0;
    orcamento.residencia = parseInt(orcamento.residencia);

    orcamento.vigencia = orcamento.vigencia || 0;
    orcamento.vigencia = parseInt(orcamento.vigencia);

    orcamento.servico = orcamento.servico || null;
    orcamento.servico = parseInt(orcamento.servico);

    if (!listaPlanos.includes(orcamento.plano)){ console.log('plano'); return false; }
    if (!listaProdutos.includes(orcamento.tipo)){ console.log('produto'); return false; }    
    if (!listaResidencia.includes(orcamento.residencia)){ console.log('residencia'); return false; }    
    if (!listaVigencia.includes(orcamento.vigencia)){ console.log('vigencia'); return false; }
    if (!validarCodigoPlanos(orcamento.servico)){ console.log('servico'); return false; }

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

function validarNumeroCartao(numero){
    numero = numero || '';
    numero = numero.replace(/[^\d]/g, "");

    if (!/^[0-9]{16}$/.test(numero)){ return false; }
    numero = numero.toString();

    let soma = 0;
    let dobrar = false;

    for (var i = numero.length - 1; i >= 0; i--) {
        let digito = parseInt(numero.charAt(i), 10);
        if (dobrar) { if ((digito *= 2) > 9){ digito -= 9; }}
        soma += digito;
        dobrar = !dobrar;
    }
    if ((soma % 10) != 0){ return false; }
    return true;
}
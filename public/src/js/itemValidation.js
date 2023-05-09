var planoHabitual = {
    'valorCoberturaIncendio': {
        pattern: /^[0-9\.]{1,15}$/,
        required: true, max: 1000000000, min: 1
    },
    'valorCoberturaSubstracaoBens': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorCoberturaPagamentoAluguel': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorCoberturaRCFamiliar': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'codigoClausulasPortoSeguroServicos': {
        pattern: /^[0-9]{1,9}$/,
        required: true, max: 1000000000, min: 1
    },
    'valorCoberturaDanosEletricos': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorCoberturaVendaval': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorCoberturaDesmoronamento': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorCoberturaVazamentosTanquesTubulacoes': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorCoberturaQuebraVidros': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorCoberturaPagamentoCondominio': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorCoberturaMorteAcidental': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorCoberturaTremorTerraTerremoto': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorCoberturaAlagamento': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'flagContratarValorDeNovo': {
        pattern: /^[0-1]{1}$/,
        required: false, max: 1, min: 0
    },
    'flagLMIDiscriminado': {
        pattern: /^[0-1]{1}$/,
        required: true, max: 1, min: 0
    },
    'valorCoberturaEdificio': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorCoberturaConteudo': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorImpactoVeiculos': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorSubtracaoBicicleta': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorNegocioCasa': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorPequenasReformas': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorFuneralFamiliar': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorDanosMorais': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false, max: 1000000000, min: 1
    },
    'valorRCEmpregador': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
};
var planoHabitualPremium = {
    'valorCoberturaIncendio': { 
        pattern: /^[0-9\.]{1,15}$/,
        required: true, 
    },
    'valorCoberturaSubstracaoBens': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaPagamentoAluguel': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaRCFamiliar': {
        pattern: /^[0-9]{1,9}$/,
        required: false , max: 10000000, min: 1
    },
    'codigoClausulasPortoSeguroServicos': { 
        pattern: /^[0-9\.]{1,15}$/,
        required: true, max: 10000000, min: 1
    },
    'valorCoberturaDanosEletricos': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaVendaval': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaDesmoronamento': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaVazamentosTanquesTubulacoes': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaQuebraVidros': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaPagamentoCondominio': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaMorteAcidental': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaTremorTerraTerremoto': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaAlagamento': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'flagContratarValorDeNovo': {
        pattern: /^[0-1]{1}$/,
        required: false , max: 1, min: 0
    },
    'flagLMIDiscriminado': { 
        pattern: /^[0-1]{1}$/,
        required: true, max: 1, min: 0
    },
    'valorCoberturaEdificio': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaConteudo': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorImpactoVeiculos': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaHoleinOne': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaDanosJardim': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaObrasObjetosArte': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaJoiasRelogios': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
};
var planoVeraneio = {
    'valorCoberturaIncendio': { 
        pattern: /^[0-9\.]{1,15}$/,
        required: true, 
    },
    'valorCoberturaSubstracaoBens': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaPagamentoAluguel': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaRCFamiliar': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'codigoClausulasPortoSeguroServicos': { 
        pattern: /^[0-9]{1,9}$/,
        required: true, max: 10000000, min: 1
    },
    'valorCoberturaDanosEletricos': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaVendaval': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaDesmoronamento': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaVazamentosTanquesTubulacoes': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaQuebraVidros': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaPagamentoCondominio': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaMorteAcidental': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaTremorTerraTerremoto': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaAlagamento': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'flagContratarValorDeNovo': {
        pattern: /^[0-1]{1}$/,
        required: false , max: 1, min: 0
    },
    'flagLMIDiscriminado': { 
        pattern: /^[0-1]{1}$/,
        required: true, max: 1, min: 0
    },
    'valorCoberturaEdificio': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorCoberturaConteudo': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
    'valorImpactoVeiculos': {
        pattern: /^[0-9\.]{1,15}$/,
        required: false , max: 1000000000, min: 1
    },
};

var _planoHabitual = {};
var _planoHabitualPremium = {};
var _planoVeraneio = {};

for(var key in planoHabitual){ _planoHabitual[key.toLowerCase()] = planoHabitual[key]; }
for(var key in planoHabitualPremium){ _planoHabitualPremium[ key.toLowerCase() ] = planoHabitualPremium[key]; }
for(var key in planoVeraneio){ _planoVeraneio[key.toLowerCase()] = planoVeraneio[key]; }
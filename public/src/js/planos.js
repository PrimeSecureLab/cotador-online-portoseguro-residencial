$(document).ready(function() {
    // Função para converter o valor em texto por extenso
    function formatCurrency(value) {
        if (value < 1000) {
            return value + "";
        } else if (value < 1000000) {
            return (value / 1000) + " mil";
        } else {
            return (value / 1000000) + " milhão";
        }
    }

    function setupRangeInput(config) {
        // Atualiza o valor formatado ao carregar a página
        $("." + config.rangeValueClass).text(formatCurrency($("#" + config.inputId).val()));

        // Atualiza o valor formatado quando o usuário ajusta o range
        $("#" + config.inputId).on("input", function() {
            $("." + config.rangeValueClass).text(formatCurrency($(this).val()));
            $("." + config.rangeValueClass).css("left", "calc(100% * (" + $(this).val() + " - " + $(this).attr("min") + ") / (" + $(this).attr("max") + " - " + $(this).attr("min") + "))");
        });
    }

    // Configuração dos Sliders
    const incendioConfig = {
        inputId: "valorcoberturaincendio",
        rangeValueClass: "range-value0",
        min: 10000,
        max: 1000000
    };
    const substracaoBensConfig = {
        inputId: "valorcoberturasubstracaobens",
        rangeValueClass: "range-value1",
        min: 10000,
        max: 1000000
    };
    const valorcoberturapagamentoaluguelConfig = {
        inputId: "valorcoberturapagamentoaluguel",
        rangeValueClass: "range-value2",
        min: 10000,
        max: 1000000
    };
    const valorcoberturarcfamiliar = {
        inputId: "valorcoberturarcfamiliar",
        rangeValueClass: "range-value3",
        min: 10000,
        max: 1000000
    };
    const valorCoberturaDanosEletricos = {
        inputId: "valorcoberturadanoseletricos",
        rangeValueClass: "range-value4",
        min: 10000,
        max: 1000000
    };
    const valorCoberturaVendaval = {
        inputId: "valorCoberturaVendaval",
        rangeValueClass: "range-value5",
        min: 10000,
        max: 1000000
    };
    const valorcoberturadesmoronamento = {
        inputId: "valorcoberturadesmoronamento",
        rangeValueClass: "range-value6",
        min: 10000,
        max: 1000000
    }
    const valorcoberturavazamentostanquestubulacoes = {
        inputId: "valorcoberturavazamentostanquestubulacoes",
        rangeValueClass: "range-value7",
        min: 10000,
        max: 1000000
    };
    const valorcoberturaquebravidros = {
        inputId: "valorcoberturaquebravidros",
        rangeValueClass: "range-value8",
        min: 10000,
        max: 1000000
    };
    const valorcoberturapagamentocondominio = {
        inputId: "valorcoberturapagamentocondominio",
        rangeValueClass: "range-value9",
        min: 10000,
        max: 1000000
    };
    const valorcoberturamorteacidental = {
        inputId: "valorcoberturamorteacidental",
        rangeValueClass: "range-value10",
        min: 10000,
        max: 1000000
    };
    const valorcoberturatremorterraterremoto = {
        inputId: "valorcoberturatremorterraterremoto",
        rangeValueClass: "range-value11",
        min: 10000,
        max: 1000000
    };
    const valorcoberturaalagamento = {
        inputId: "valorcoberturaalagamento",
        rangeValueClass: "range-value12",
        min: 10000,
        max: 1000000
    };
    const flagcontratarvalordenovo = {
        inputId: "flagcontratarvalordenovo",
        rangeValueClass: "range-value13",
        min: 10000,
        max: 1000000
    };
    const flaglmidiscriminado = {
        inputId: "flaglmidiscriminado",
        rangeValueClass: "range-value14",
        min: 10000,
        max: 1000000
    };
    const valorcoberturaedificio = {
        inputId: "valorcoberturaedificio",
        rangeValueClass: "range-value15",
        min: 10000,
        max: 1000000
    };
    const valorcoberturaconteudo = {
        inputId: "valorcoberturaconteudo",
        rangeValueClass: "range-value16",
        min: 10000,
        max: 1000000
    };
    const valorimpactoveiculos = {
        inputId: "valorimpactoveiculos",
        rangeValueClass: "range-value17",
        min: 10000,
        max: 1000000
    };
    const valorsubtracaobicicleta = {
        inputId: "valorsubtracaobicicleta",
        rangeValueClass: "range-value18",
        min: 10000,
        max: 1000000
    };
    const valornegociocasa = {
        inputId: "valornegociocasa",
        rangeValueClass: "range-value19",
        min: 10000,
        max: 1000000
    };
    const valorpequenasreformas = {
        inputId: "valorpequenasreformas",
        rangeValueClass: "range-value20",
        min: 10000,
        max: 1000000
    };
    const valorfuneralfamiliar = {
        inputId: "valorfuneralfamiliar",
        rangeValueClass: "range-value21",
        min: 10000,
        max: 1000000
    };
    const valordanosmorais = {
        inputId: "valordanosmorais",
        rangeValueClass: "range-value22",
        min: 10000,
        max: 1000000
    };
    const valorrcempregador = {
        inputId: "valorrcempregador",
        rangeValueClass: "range-value23",
        min: 10000,
        max: 1000000
    }

    // Inicializa os controles deslizantes com suas respectivas configurações
    setupRangeInput(incendioConfig);
    setupRangeInput(substracaoBensConfig);
    setupRangeInput(valorcoberturapagamentoaluguelConfig);
    setupRangeInput(valorcoberturarcfamiliar);
    setupRangeInput(valorCoberturaDanosEletricos);
    setupRangeInput(valorCoberturaVendaval);
    setupRangeInput(valorcoberturadesmoronamento);
    setupRangeInput(valorcoberturavazamentostanquestubulacoes);
    setupRangeInput(valorcoberturaquebravidros);
    setupRangeInput(valorcoberturapagamentocondominio);
    //setupRangeInput(valorcoberturamorteacidental);
    setupRangeInput(valorcoberturatremorterraterremoto);
    setupRangeInput(valorcoberturaalagamento);
    setupRangeInput(flagcontratarvalordenovo);
    setupRangeInput(flaglmidiscriminado);
    setupRangeInput(valorcoberturaedificio);
    setupRangeInput(valorcoberturaconteudo);
    setupRangeInput(valorimpactoveiculos);
    setupRangeInput(valorsubtracaobicicleta);
    setupRangeInput(valornegociocasa);
    setupRangeInput(valorpequenasreformas);
    setupRangeInput(valorfuneralfamiliar);
    setupRangeInput(valordanosmorais);
    setupRangeInput(valorrcempregador);
});
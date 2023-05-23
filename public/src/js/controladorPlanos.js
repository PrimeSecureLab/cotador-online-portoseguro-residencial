$("#loading-screen").hide();
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
        inputId: "valorcoberturavendaval",
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
    setupRangeInput(valorcoberturamorteacidental);
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
    
    

    var relacaoItemId = [];
    var allItems = [ 'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 'codigoClausulasPortoSeguroServicos', 
    'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes', 'valorCoberturaQuebraVidros', 
    'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto', 'valorCoberturaAlagamento', 'flagContratarValorDeNovo', 'flagLMIDiscriminado',
    'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos', 'valorSubtracaoBicicleta', 'valorNegocioCasa', 'valorPequenasReformas', 'valorFuneralFamiliar', 
    'valorDanosMorais', 'valorRCEmpregador', 'valorCoberturaHoleinOne', 'valorCoberturaDanosJardim', 'valorCoberturaObrasObjetosArte', 'valorCoberturaJoiasRelogios' ];

    allItems.map((item, index)=>{ relacaoItemId[item.toLowerCase()] = item; });

    var currentData = {};
    var planos = [];
    var encryptedData = null;
    var responseArray = [];
    var loading = false;

    async function api_call(data) {
        if (loading == true){ return; }
        loading = true;
        $("#loading-screen").show();
        responseArray = [];
        let produtos = ['habitual', 'habitual-premium', 'veraneio'];
        for(let i in produtos){
            let payload = data;
            payload.produto = produtos[i];
            $.ajax({
                url: '/planos',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(payload),
                success: function(res) { 
                    
                    responseArray.push(res);
                    if (responseArray.length > 2){ loading = false; $("#loading-screen").hide(); atualizarCards(responseArray); }
                    console.log(produtos[i], 'Sucesso:', res); 
                },
                error: function(xhr, status, error) { 
                    if (error.redirect){ /*window.location.href = errorData.redirect;*/ }
                    responseArray.push(error);
                    if (responseArray.length > 2){ loading = false; $("#loading-screen").hide(); atualizarCards(responseArray); }
                    console.error(produtos[i], 'Error:', error, 'Status:', status); 
                }
            });
        }
        /*try {
            const response = await fetch( "/planos", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(data) 
            });
            console.log(currentData);
            if (response.ok) {
                let res = await response.json(); // Recebe os dados da resposta
                atualizarCards(res); // Atualiza os valores dos planos
                console.log(res);
            } else if (response.status === 400) {
                const errorData = await response.json();
                if (errorData.redirect){ window.location.href = errorData.redirect; }
                console.error("Erro:", errorData);
            } else {
                console.error("Ocorreu um erro inesperado.");
            }
            $("#loading-screen").hide();
        } catch (error) {
            console.error(error);
            console.error("Não foi possível estabeleces uma conexão com o servidor.");
            $("#loading-screen").hide();
        }*/
    }

    function validacaoInicial() {
        encryptedData = localStorage.getItem("formData");
        if (!encryptedData) { window.location.href = "/"; return; }
        encryptedData = JSON.parse(encryptedData);
        console.log(encryptedData);
        api_call(encryptedData);
    }

    function atualizarCards(res){
        if (!Array.isArray(res)){ return; } // Erro na requisição do plano
        planos = res;
        res.forEach((plano, index)=>{
            if (plano.error){ return; } // Erro durante a requisição do plano.
            if (!plano.data){ return; } // Erro na formatação da resposta
            if (!plano.data.listaParcelamento){ return; } // Erro na formatação da resposta
            plano.data.listaParcelamento.forEach((parcelamento, i)=>{
                if (parcelamento.codigo != 62){ return; } // Pula se não for cartão de crédito (cod. 62)
                if (parcelamento.quantidadeParcelas != 1){ return; } // Pula se não for 1x no crédito
                let value = parcelamento.valorPrimeiraParcela.toFixed(2).replace(".", ","); // Formata valores para exibição
                document.getElementById(`card-price-${index+1}`).innerHTML = `R$${value}<span class="period">/mês</span>`;
                console.log(`${index+1}: ${value}`);
            });
        });
    }

    function salvarOrcamento(index){
        console.log(planos);
        if (!planos){ return; }
        if (planos.length < 3){ return; }
        if (planos[index].error){ return; }
        if (!planos[index].data){ return; }
        encryptedData.orcamento = planos[index].data;
        console.log(planos[index].data)
        localStorage.setItem("finalData", JSON.stringify(encryptedData));
        window.location.href = "./login";
        return;
    }

    function atualizarInputs(data){
        //console.log(data);
        let lowerCaseData = {};
        let inputList = $("input");
        for(let key in data){ lowerCaseData[key.toLowerCase()] = data[key]; }
        for(let i=0; i < inputList.length; i++){ 
            if (!inputList[i].id){ continue; }
            if (inputList[i].type != "range"){ continue; }
            let key = inputList[i].id;
            if (!lowerCaseData[key]){ continue; }
            inputList[i].value = lowerCaseData[key];
            let input_id = `#${inputList[i].id}`;
            let label_id = `#${inputList[i].id}-label`;

            $(label_id).text(formatCurrency($(input_id).val()));
            $(label_id).text(formatCurrency($(input_id).val()));
            $(label_id).css("left", "calc(100% * (" + $(input_id).val() + " - " + $(input_id).attr("min") + ") / (" + $(input_id).attr("max") + " - " + $(input_id).attr("min") + "))");
        }
    }

    function salvarItens(){  
        let inputList = $("input");
        let item = {};
        for(let i=0; i < inputList.length; i++){
            if (!inputList[i].id){ continue; }
            if (inputList[i].type != "range"){ continue; }
            let key = inputList[i].id;
            key = relacaoItemId[key];
            item[key] = $(`input#${inputList[i].id}`).val();
        }
        let _item = item;
        _item.etapa = 'step-4';
        $.ajax({
            url: '/datalayer',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(_item),
            success: function(res) { console.log('Sucesso:', res); },
            error: function(xhr, status, error) { console.error('Error:', error); }
        });
        encryptedData.itemData = item;
        api_call(encryptedData);
    }

    $(".modal-dialog").on("click", function(e) { e.stopPropagation(); });
    $("div#modal-editar-plano1").on("click", function() { salvarItens(); })
    $("button#btn-save").on("click", function() { salvarItens(); });
    $("button.btn-close").on("click", function() { salvarItens(); });
    $("button#btn-cancel").on("click", function() { atualizarInputs(encryptedData.itemData); });
    $("button.btn-editar-plano").on("click", function() { atualizarInputs(encryptedData.itemData); });

    $("#btn-plano-1").on("click", function(e) { e.preventDefault(); salvarOrcamento(0); });
    $("#btn-plano-2").on("click", function(e) { e.preventDefault(); salvarOrcamento(1); });
    $("#btn-plano-3").on("click", function(e) { e.preventDefault(); salvarOrcamento(2); });

    validacaoInicial();
});
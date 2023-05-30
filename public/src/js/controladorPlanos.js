$("#loading-screen").hide();
$(document).ready(function() {
    // Função para converter o valor em texto por extenso
    function formatCurrency(value) {
        if (value < 1000) { return value + ""; }
        if (value < 1000000) { return (value / 1000) + " mil"; } 
        return (value / 1000000) + " milhão";
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

    var encryptedData = null;
    var responseArray = [];
    var loading = false;
    var tipoResidencia = null;
    
    $(".modal-dialog").on("click", function(e) { e.stopPropagation(); });
    $("div#modal-editar-plano1").on("click", function() { 
        salvarItens(); 
        if (indexJanela > 0){ 
            apiCallOrcamento(produto[indexJanela - 1], 0); 
            apiCallOrcamento(produto[indexJanela - 1], 1); 
        } 
    });
    $("button#btn-save").on("click", function() { 
        salvarItens(); 
        if (indexJanela > 0){ 
            apiCallOrcamento(produto[indexJanela - 1], 0); 
            apiCallOrcamento(produto[indexJanela - 1], 1); 
        } 
    });
    $("button.btn-close").on("click", function() { 
        salvarItens(); 
        if (indexJanela > 0){ 
            apiCallOrcamento(produto[indexJanela - 1], 0); 
            apiCallOrcamento(produto[indexJanela - 1], 1); 
        } 
    });
    $("button#btn-cancel").on("click", function() { 
        salvarItens(); 
        if (indexJanela > 0){ 
            apiCallOrcamento(produto[indexJanela - 1], 0); 
            apiCallOrcamento(produto[indexJanela - 1], 1); 
        } 
    });
    
    $("#editar-plano-1").on("click", function() { indexJanela = 1; configurarJanelaDePlano(); });
    $("#editar-plano-2").on("click", function() { indexJanela = 2; configurarJanelaDePlano(); });
    $("#editar-plano-3").on("click", function() { indexJanela = 3; configurarJanelaDePlano(); });

    $('.slick-carousel').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [ { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } } ]
    });

    //$("button.btn-editar-plano").on("click", function() { atualizarInputs(encryptedData.itemData); });
    var tempoVigencia = 0;

    var buttonHabitual = $("#btn-plano-1");
    var buttonHabitualPremium = $("#btn-plano-2");
    var buttonVeraneio = $("#btn-plano-3");

    buttonHabitual.on("click", function(e) { 
        e.preventDefault(); 
        if (!loadingProduto.habitual[tempoVigencia]){ 
            salvarOrcamento('habitual'); 
        } 
    });
    buttonHabitualPremium.on("click", function(e) { 
        e.preventDefault(); 
        if (!loadingProduto.habitualPremium[tempoVigencia]){ 
            salvarOrcamento('habitual-premium'); 
        } 
    });
    buttonVeraneio.on("click", function(e) { 
        e.preventDefault(); 
        if (!loadingProduto.habitualPremium[tempoVigencia]){ 
            salvarOrcamento('veraneio'); 
        } 
    });

    var tabVigencia = $(".my-pills-link");
    tabVigencia.on("click", function(e){ 
        tabVigencia.removeClass("active"); 
        let tab = $(`#${e.target.id}`);
        tab.addClass('active');

        let index = tab.html().replace(/[^0-9]+/g, "");
        index = parseInt(index) - 1;
        if (index == tempoVigencia){ return; }

        atualizarVigencia('habitual', index);
        atualizarVigencia('habitual-premium', index);
        atualizarVigencia('veraneio', index);
    });


    var produto = ['habitual', 'habitual-premium', 'veraneio'];
    var indexJanela = -1;

    var tentativaTimeOut = {
        habitual: [0, 0, 0],
        habitualPremium: [0, 0, 0],
        veraneio: [0, 0, 0]
    };
    var loadingProduto = { 
        habitual: [false, false, false], 
        habitualPremium: [false, false, false], 
        veraneio: [false, false, false] 
    };

    var valoresCobertura = [];
    var dadosCobertura = [];
    var coberturaGenerica = {};
    var orcamentos = [];

    for(let i = 0; i < 3; i++){
        let plano = produto[i];
        valoresCobertura[plano] = {};
        dadosCobertura[plano] = {};
        orcamentos[plano] = [];
        for(let k = 1; k < 4; k++){ orcamentos[plano][k] = false; }
    }

    function validacaoInicial() {
        let storage = localStorage.getItem('formData');
        let coberturas = {};
        if (!storage) { window.location.href = '/'; return; }
        encryptedData = JSON.parse(storage);
        if (encryptedData._dadosCoberturas){ coberturas = encryptedData._dadosCoberturas; }
        if (coberturas.valorcoberturaincendio){ coberturaGenerica = coberturas; }
        console.log(encryptedData);
        tipoResidencia = encryptedData.tipoResidencia;
        if (!tipoResidencia){ window.location.href = '/'; return; }
        encryptedData = encryptedData.formData;

        gerarToggleSwitch();

        controleCoberturasHabitual();
        controleCoberturasHabitualPremium();
        controleCoberturasVeraneio();

        apiCallOrcamento('habitual', 0);
        apiCallOrcamento('habitual-premium', 0);
        apiCallOrcamento('veraneio', 0);

        apiCallOrcamento('habitual', 1);
        apiCallOrcamento('habitual-premium', 1);
        apiCallOrcamento('veraneio', 1);

    }

    function gerarToggleSwitch(){
        let inputList = $('input[type="range"]');
        inputList.each((index)=>{ 
            let input = inputList[index];
            let label = $(`label[for="${input.id}"]`);
            let toggle = `<div id="${input.id}-toggle" class="container-toggle"><div class="toggle-switch"></div></div>`;
            label.before(toggle);
        });
    }

    function salvarOrcamento(produto){
        let orcamento = orcamentos[produto][tempoVigencia];
        if (tempoVigencia != 0 && tempoVigencia != 1 && tempoVigencia != 2){ return; }
        if (!orcamento){ return; }
        if (!orcamento.tipo){ return; }
        if (!orcamento.criadoEm){ return; }

        let criadoEm = orcamento.criadoEm.toString().split('T')[0];
        let outdated = new Date() - new Date(criadoEm);
        outdated = (outdated / (1000 * 60 * 60 * 24)) > 5 ;
        if (outdated){ apiCallOrcamento(produto, tempoVigencia); return; }

        orcamento.vigencia = tempoVigencia + 1;
        encryptedData.orcamento = orcamento;
        encryptedData.itemData = valoresCobertura[produto];
        console.log(encryptedData);
        localStorage.setItem('finalData', JSON.stringify(encryptedData));

        window.location.href = './login';
        return;
    }

    function apiCallOrcamento(produto, vigencia) {
        let produtos = ['habitual', 'habitual-premium', 'veraneio'];
        let produtosUpperCase = ['habitual', 'habitualPremium', 'veraneio'];
        let indexProduto = produtos.indexOf(produto);
        let produtoUpperCase = produtosUpperCase[indexProduto];
        let loadingScreen = $("#loading-screen");
        let payload = {};
        let showLoading = true;
        let button = $(`#btn-plano-${indexProduto + 1}`);

        if (loadingProduto[produtoUpperCase][vigencia]){ return; }
        produtosUpperCase.forEach((plano)=>{ loadingProduto[plano].forEach((loading)=>{ if (loading){ showLoading = false; } }); });
        
        if (showLoading){ loadingScreen.show(); }
        loadingProduto[produtoUpperCase][vigencia] = true;
        
        Object.assign(payload, encryptedData);
        payload.itemData = valoresCobertura[produto];
        payload.produto = produto;
        payload.vigencia = vigencia + 1;

        button.css('background-color', 'gray');

        $.ajax({
            url: '/planos',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function(res) {
                loadingProduto[produtoUpperCase][vigencia] = false; 
                if (res.error && (res.status == 504 || res.status == 401 || res.status == 429) && tentativaTimeOut[produtoUpperCase][vigencia] < 3){ 
                    tentativaTimeOut[produtoUpperCase][vigencia] += 1; 
                    orcamentos[produto][vigencia] = false;
                    apiCallOrcamento(produto, vigencia); 
                    console.log(`[${vigencia + 1} ANO] ${produto}: ${res.status}, Tentativas: ${tentativaTimeOut[produtoUpperCase][vigencia]}`); 
                    return;
                }
                if (res.error && res.status > 499 && tentativaTimeOut[produtoUpperCase][vigencia] < 3){ 
                    tentativaTimeOut[produtoUpperCase][vigencia] += 1; 
                    orcamentos[produto][vigencia] = false;
                    apiCallOrcamento(produto, vigencia); 
                    console.log(`[${vigencia + 1} ANO] ${produto}: ${res.status}, Tentativas: ${tentativaTimeOut[produtoUpperCase][vigencia]}`); 
                    return;
                }
                if (res.error && res.status != 200){
                    let stopLoading = true;
                    produtosUpperCase.forEach((plano)=>{ loadingProduto[plano].forEach((loading)=>{ if (loading){ stopLoading = false; } }); });                 
                    if (stopLoading){ loadingScreen.hide(); }
                    tentativaTimeOut[produtoUpperCase][vigencia] = 0; 
                    orcamentos[produto][vigencia] = false;   
                    atualizarCard(produto, vigencia, {}, true);
                    console.log(`[${vigencia + 1} ANO] ${produto}: ${res.status} -`, res.data.messages);
                    return;
                }
                let stopLoading = true;
                produtosUpperCase.forEach((plano)=>{ loadingProduto[plano].forEach((loading)=>{ if (loading){ stopLoading = false; } }); });                 
                if (stopLoading){ loadingScreen.hide(); }
                tentativaTimeOut[produtoUpperCase][vigencia] = 0;  
                orcamentos[produto][vigencia] = res.data;  
                button.css('background-color', '');
                atualizarCard(produto, vigencia, res.data, false);
                console.log(`[${vigencia + 1} ANO] ${produto}: OK`);
            },
            error: function(xhr, status, error) {  
                let stopLoading = true;
                produtosUpperCase.forEach((plano)=>{ loadingProduto[plano].forEach((loading)=>{ if (loading){ stopLoading = false; } }); });         
                if (stopLoading){ loadingScreen.hide(); }
                tentativaTimeOut[produtoUpperCase][vigencia] = 0;    
                loadingProduto[produtoUpperCase][vigencia] = false;
                atualizarCard(produto, vigencia, {}, true);
                console.log(`[${vigencia + 1} ANO] ${produto}`, 'Error:', error, 'Status:', status); 
            }
        });
    } 
    
    function atualizarVigencia(produto, vigencia){
        let produtos = ['habitual', 'habitual-premium', 'veraneio'];
        let index = produtos.indexOf(produto);
        index = index + 1;

        tempoVigencia = vigencia;

        let mainContainer = $(`.card-price#card-price-${index}`).parent();
        let priceContainer = $(`.card-price#card-price-${index}`);
        let totalContainer = mainContainer.children('p.text-center');
        let parcelasContainer = $(`.card-price#card-price-${index} > .parcela`);
        let jurosFlag = $(`.card-price#card-price-${index} > .period`);
        let button = $(`#btn-plano-${index}`);

        let card = dadosCobertura[produto].card[vigencia];
        console.log(dadosCobertura[produto]);

        let numeroParcelas = card.numeroParcelas; 
        let primeiraParcela = card.primeiraParcela;
        //let demaisParcelas = card.demaisParcelas;
        let valorTotal = card.valorTotal;

        let textParcela = priceContainer.contents().filter(function() { return this.nodeType === 3;});
        textParcela.each(function() { this.textContent = primeiraParcela; });
        totalContainer.html(`Valor Total: R$${valorTotal}`);
        parcelasContainer.html(`${numeroParcelas}x`);
        //if (!juros){ jurosFlag.css('display', 'inline'); }else{ jurosFlag.css('display', 'none'); }
        jurosFlag.css('display', 'none');
        if (card.error){ button.css('background-color', 'gray'); }else{ button.css('background-color', ''); }
        return;
    }

    function atualizarCard(produto, vigencia, data, error){
        let produtos = ['habitual', 'habitual-premium', 'veraneio'];
        let index = produtos.indexOf(produto);
        if (index < 0){ return; }
        index = index + 1;

        let mainContainer = $(`.card-price#card-price-${index}`).parent();
        let priceContainer = $(`.card-price#card-price-${index}`);
        let totalContainer = mainContainer.children('p.text-center');
        let parcelasContainer = $(`.card-price#card-price-${index} > .parcela`);
        let jurosFlag = $(`.card-price#card-price-${index} > .period`);

        if (error){
            if (tempoVigencia == vigencia){
                let textParcela = priceContainer.contents().filter(function() { return this.nodeType === 3;});
                textParcela.each(function() { this.textContent = '--,--'; });
                totalContainer.html(`Valor Total: R$--,--`);
                parcelasContainer.html(`--x`);
                jurosFlag.css('display', 'none');

            }
            if (!dadosCobertura[produto].card){ dadosCobertura[produto].card = []; }
            dadosCobertura[produto].card[vigencia] = { 
                numeroParcelas: '--', 
                primeiraParcela: '--,--', 
                demaisParcelas: '--,--', 
                valorTotal: '--,--', 
                displayJuros: 'none',
                error: true
            };
            return;
        }
        
        if (!data.tipo){ return; }
        if (!data.listaParcelamento){ return; }
        if (!Array.isArray(data.listaParcelamento)){ return; }

        let valorSemJuros = 0;
        let juros = true;
        
        data.listaParcelamento.forEach((parcelamento, i)=>{
            if (parcelamento.codigo != 62){ return; } // Pula se não for cartão de crédito (cod. 62)
            if (parcelamento.quantidadeParcelas == 1){ valorSemJuros = parcelamento.valorPrimeiraParcela; } // Pula se não for 1x no crédito
            
            if (data.listaParcelamento[i + 1].codigo != 62){ 
                let numeroParcelas = parcelamento.quantidadeParcelas; 
                let primeiraParcela = parcelamento.valorPrimeiraParcela;
                let demaisParcelas = parcelamento.valorDemaisParcelas;
                let valorTotal = (numeroParcelas - 1) * demaisParcelas + primeiraParcela;

                if (Math.abs(valorSemJuros - valorTotal) < 0.05){ juros = false; }

                primeiraParcela = primeiraParcela.toFixed(2).replace(".", ",");
                valorTotal = valorTotal.toFixed(2).replace(".", ",");

                if (!dadosCobertura[produto].card){ dadosCobertura[produto].card = []; }
                dadosCobertura[produto].card[vigencia] = { 
                    numeroParcelas: numeroParcelas, 
                    primeiraParcela: primeiraParcela, 
                    demaisParcelas: demaisParcelas, 
                    valorTotal: valorTotal, 
                    displayJuros: 'none',
                    error: false 
                };
                
                if (tempoVigencia == vigencia){
                    let textParcela = priceContainer.contents().filter(function() { return this.nodeType === 3;});
                    textParcela.each(function() { this.textContent = primeiraParcela; });
                    totalContainer.html(`Valor Total: R$${valorTotal}`);
                    parcelasContainer.html(`${numeroParcelas}x`);
                    //if (!juros){ jurosFlag.css('display', 'inline'); }else{ jurosFlag.css('display', 'none'); }
                    jurosFlag.css('display', 'none');
                }
            }
        });
        console.log(dadosCobertura);
        return;
    }
    
    function salvarItens(){
        encryptedData.listaProdutos = dadosCobertura;
        let payload = valoresCobertura;
        payload.etapa = 'step-4';
        $.ajax({
            url: '/datalayer',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function(res) { console.log('Sucesso:', res); },
            error: function(xhr, status, error) { console.error('Error:', error); }
        });
    }

    function configurarJanelaDePlano(){
        let inputsRange = $('input[type="range"]');
        switch(indexJanela){
            case 1:
                controleCoberturasHabitual();
                inputsRange
                    .off('change', controleCoberturasHabitualPremium )
                    .off('change', controleCoberturasVeraneio )
                    .on('change', controleCoberturasHabitual );
                break;
            case 2:
                controleCoberturasHabitualPremium();
                inputsRange
                    .off('change', controleCoberturasHabitual )
                    .off('change', controleCoberturasVeraneio )
                    .on('change', controleCoberturasHabitualPremium );
                break;
            case 3:
                controleCoberturasVeraneio();
                inputsRange
                    .off('change', controleCoberturasHabitual )
                    .off('change', controleCoberturasHabitualPremium )
                    .on('change', controleCoberturasVeraneio );
                break;
        }
    }

    function controleCoberturasHabitual(){
        let inputs = {};
        let inputChange = this.id;
        let residencia = tipoResidencia;
        let todasInputRange = $('input[type="range"]');

        if (!dadosCobertura['habitual'].valorcoberturaincendio){
            todasInputRange.each((index)=>{ 
                let input = todasInputRange[index];
                if (inputChange && inputChange == input.id){ input.value = this.value; }
                inputs[input.id] = { id: input.id, value: parseInt(input.value), min: input.min, max: input.max, disabled: !(input.value > 0), display: true };
            });
        }else{
            todasInputRange.each((index)=>{ 
                let input = todasInputRange[index];
                let cobertura = dadosCobertura['habitual'][input.id];
                if (coberturaGenerica.valorcoberturaincendio){ if (coberturaGenerica[input.id]){ cobertura = coberturaGenerica[input.id]; } }
                if (inputChange && inputChange == input.id){ cobertura.value = this.value; }
                inputs[input.id] = { id: input.id, value: cobertura.value, min: cobertura.min, max: cobertura.max, disabled: cobertura.disabled, display: true };
            });
        }

        inputs.valorcoberturaincendio.min = 100000;
        inputs.valorcoberturaincendio.max = (residencia == 2) ? 700000 : 1000000;

        if (inputs.valorcoberturaincendio.value > inputs.valorcoberturaincendio.max){ 
            inputs.valorcoberturaincendio.value = inputs.valorcoberturaincendio.max; 
        }
        if (inputs.valorcoberturaincendio.value < inputs.valorcoberturaincendio.min){ 
            inputs.valorcoberturaincendio.value = inputs.valorcoberturaincendio.min; 
        }

        let base = inputs.valorcoberturaincendio.value;

        inputs.valorcoberturadanoseletricos.min = 2000;
        inputs.valorcoberturadanoseletricos.max = base * 0.5;

        inputs.valorcoberturasubstracaobens.min = 2000;
        inputs.valorcoberturasubstracaobens.max = (base * 0.3 > 150000) ? 150000 : base * 0.3;

        inputs.valorcoberturaalagamento.min = 5000;
        inputs.valorcoberturaalagamento.max = 30000;
        inputs.valorcoberturaalagamento.disabled = !(residencia == 1 || residencia == 2 || residencia == 4);

        inputs.valornegociocasa.min = 2000;
        inputs.valornegociocasa.max = 50000;
        inputs.valornegociocasa.disabled = (inputs.valorcoberturadanoseletricos.disabled && inputs.valorcoberturasubstracaobens.disabled);

        inputs.valorcoberturarcfamiliar.min = 2000;
        inputs.valorcoberturarcfamiliar.max = base * 0.5;
        inputs.valorcoberturarcfamiliar.value = (inputs.valorcoberturarcfamiliar.value > base * 0.5) ? base * 0.5 : inputs.valorcoberturarcfamiliar.value;

        inputs.valordanosmorais.min = 2000;
        inputs.valordanosmorais.max = (inputs.valorcoberturarcfamiliar.value * 0.5 > 50000) ? 50000 : inputs.valorcoberturarcfamiliar.value * 0.5;
        inputs.valordanosmorais.disabled = (inputs.valorcoberturarcfamiliar.value == 0 || inputs.valorcoberturarcfamiliar.disabled)

        inputs.valorcoberturadesmoronamento.min = 2000;
        inputs.valorcoberturadesmoronamento.max = (base * 0.1 > 100000) ? 100000 : base * 0.1;

        inputs.valorimpactoveiculos.min = 2000;
        inputs.valorimpactoveiculos.max = base * 1;
        
        inputs.valorpequenasreformas.min = 2000;
        inputs.valorpequenasreformas.max = 100000;
        inputs.valorpequenasreformas.disabled = (residencia == 5 || residencia == 6 || residencia == 7);

        inputs.valorcoberturapagamentocondominio.min = 300;
        inputs.valorcoberturapagamentocondominio.max = 5000;

        inputs.valorcoberturaquebravidros.min = 2000;
        inputs.valorcoberturaquebravidros.max = base * 0.5;

        inputs.valorcoberturatremorterraterremoto.min = 2000;
        inputs.valorcoberturatremorterraterremoto.max = (base * 0.15 > 500000) ? 500000 : base * 0.15;

        inputs.valorcoberturavazamentostanquestubulacoes.min = 2000;
        inputs.valorcoberturavazamentostanquestubulacoes.max = (base * 0.30 > 100000) ? 100000 : base * 0.30;

        inputs.valorcoberturavendaval.min = 2000;
        inputs.valorcoberturavendaval.max = base * 0.5;

        inputs.valorcoberturapagamentoaluguel.min = 3000;
        inputs.valorcoberturapagamentoaluguel.max = (base * 0.50 > 200000) ? 200000 : base * 0.50;

        inputs.valorsubtracaobicicleta.min = 2500;
        inputs.valorsubtracaobicicleta.max = (base * 0.3 > 50000) ? 50000 : base * 0.3;
        inputs.valorsubtracaobicicleta.disabled = (inputs.valorcoberturaincendio.value < 250000);

        valoresCobertura['habitual'] = {};

        for(let i in inputs){
            let input = inputs[i];
            if (!input.disabled && input.min > input.max){ 
                input.disabled = true; 
                input.min = input.max; 
            }else{
                if (input.value > input.max){ input.value = input.max; }
                if (input.value < input.min){ input.value = input.min; }
            }

            let inputElement = $(`#${input.id}`);
            inputElement.prop('min', input.min);
            inputElement.prop('max', input.max);
            inputElement.val(input.value);

            let labelElement = $(`#${input.id}-label`); 
            labelElement.text(formatCurrency(input.value));
            labelElement.css('left', `calc(100% * ( ${input.value} - ${input.min} ) / ( ${input.max} - ${input.min} ))`);

            let toggleElement = $(`#${input.id}-toggle`);
            let switchElement = toggleElement.children('.toggle-switch');
            
            toggleElement.off("click").on("click", ()=>{
                if (input.id == 'valorcoberturaincendio'){ return; }
                if (input.id == 'valorsubtracaobicicleta' && inputs.valorcoberturaincendio.value < 250000){ return; }
                if (input.disabled){
                    toggleElement.css('background-color', '#03A8DB');
                    toggleElement.css('border-color', '#03A8DB');
                    switchElement.css('margin-left', '20px');
                    labelElement.css('display', 'block');
                    //inputElement.parent().css('max-height', '');
                    //inputElement.parent().css('overflow', '');
                }else{  
                    toggleElement.css('background-color', '#C7C7C7'); 
                    toggleElement.css('border-color', '#C7C7C7');
                    switchElement.css('margin-left', '0px');
                    labelElement.css('display', 'none');
                    //inputElement.parent().css('max-height', '0');
                    //inputElement.parent().css('overflow', 'hidden');
                    
                }
                
                input.disabled = !input.disabled;
                inputElement.prop("disabled", input.disabled);
            });
            
            dadosCobertura['habitual'][input.id] = { value: input.value, min: input.min, max: input.max, disabled: input.disabled, display: input.display};

            if (!input.disabled){ 
                let nomeCobertura = relacaoItemId[input.id];
                inputElement.prop("disabled", false);
                valoresCobertura['habitual'][nomeCobertura] = input.value;

                toggleElement.css('background-color', '#03A8DB');
                toggleElement.css('border-color', '#03A8DB');
                switchElement.css('margin-left', '20px');

                /*toggleElement.hover(()=>{
                    toggleElement.css('border-color', '#1F88DF');
                    toggleElement.css('background-color', '#1F88DF');
                }, ()=>{
                    toggleElement.css('background-color', '#03A8DB');
                    toggleElement.css('border-color', '#03A8DB');
                });*/


                if (input.id == 'valorcoberturapagamentocondominio'){ 
                    valoresCobertura['habitual'].valorCoberturaMorteAcidental = 5000; 
                    dadosCobertura['habitual'].valorcoberturamorteacidental = { value: 5000, min: 5000, max: 5000, disabled: false, display: false, display: false };
                }
            }else{ 
                inputElement.prop("disabled", true); 
                toggleElement.css('background-color', '#C7C7C7'); 
                toggleElement.css('border-color', '#C7C7C7');
                switchElement.css('margin-left', '0px');
            }
            let rangeContainer = inputElement.parent();
            let coberturaContainer = rangeContainer.parent();
            if (input.display){ coberturaContainer.show(); }else{ coberturaContainer.hide(); }
        }
    }
    
    function controleCoberturasHabitualPremium(){
        let inputs = {};
        let inputChange = this.id;
        let residencia = tipoResidencia;
        let todasInputRange = $('input[type="range"]');

        if (!dadosCobertura['habitual-premium'].valorcoberturaincendio){
            todasInputRange.each((index)=>{ 
                let input = todasInputRange[index];
                if (inputChange && inputChange == input.id){ input.value = this.value; }
                inputs[input.id] = { id: input.id, value: parseInt(input.value), min: input.min, max: input.max, disabled: !(input.value > 0), display: true };
            });
        }else{
            todasInputRange.each((index)=>{ 
                let input = todasInputRange[index];
                let cobertura = dadosCobertura['habitual-premium'][input.id];
                if (coberturaGenerica.valorcoberturaincendio){ if (coberturaGenerica[input.id]){ cobertura = coberturaGenerica[input.id]; } }
                if (inputChange && inputChange == input.id){ cobertura.value = this.value; }
                inputs[input.id] = { id: input.id, value: cobertura.value, min: cobertura.min, max: cobertura.max, disabled: cobertura.disabled, display: true };
            });
        }
        
        inputs.valorcoberturaincendio.min = (residencia == 2) ? 7100000 : 1100000;
        inputs.valorcoberturaincendio.max = 20000000;

        if (inputs.valorcoberturaincendio.value > inputs.valorcoberturaincendio.max){ 
            inputs.valorcoberturaincendio.value = inputs.valorcoberturaincendio.max; 
        }
        if (inputs.valorcoberturaincendio.value < inputs.valorcoberturaincendio.min){ 
            inputs.valorcoberturaincendio.value = inputs.valorcoberturaincendio.min; 
        }

        let base = inputs.valorcoberturaincendio.value;

        inputs.valorcoberturadanoseletricos.min = 2000;
        inputs.valorcoberturadanoseletricos.max = base * 0.5;

        inputs.valorcoberturasubstracaobens.min = 2000;
        inputs.valorcoberturasubstracaobens.max = (base * 0.3 > 1500000) ? 1500000 : base * 0.3;

        inputs.valorcoberturaalagamento.min = 5000;
        inputs.valorcoberturaalagamento.max = 500000; //50.000 da Básica
        inputs.valorcoberturaalagamento.disabled = !(residencia == 1 || residencia == 2 || residencia == 4);

        inputs.valornegociocasa.min = 2000;
        inputs.valornegociocasa.max = 300000;
        inputs.valornegociocasa.disabled = (inputs.valorcoberturadanoseletricos.disabled && inputs.valorcoberturasubstracaobens.disabled);

        inputs.valorcoberturarcfamiliar.min = 2000;
        inputs.valorcoberturarcfamiliar.max = (base * 0.5 > 1000000) ? 1000000 : base * 0.5;
        inputs.valorcoberturarcfamiliar.value = (inputs.valorcoberturarcfamiliar.value > base * 0.5) ? base * 0.5 : inputs.valorcoberturarcfamiliar.value;

        inputs.valordanosmorais.min = 2000;
        inputs.valordanosmorais.max = (inputs.valorcoberturarcfamiliar.value * 0.5 > 100000) ? 100000 : inputs.valorcoberturarcfamiliar.value * 0.5;
        inputs.valordanosmorais.disabled = (inputs.valorcoberturarcfamiliar.value == 0 || inputs.valorcoberturarcfamiliar.disabled)

        inputs.valorcoberturadesmoronamento.min = 2000;
        inputs.valorcoberturadesmoronamento.max = (base * 0.1 > 500000) ? 500000 : base * 0.1;

        inputs.valorimpactoveiculos.min = 2000;
        inputs.valorimpactoveiculos.max = base * 1;
        
        inputs.valorpequenasreformas.min = 5000;
        inputs.valorpequenasreformas.max = 200000; //R$200.00 da Básica
        inputs.valorpequenasreformas.disabled = (residencia == 5 || residencia == 6 || residencia == 7);

        inputs.valorcoberturapagamentocondominio.min = 300;
        inputs.valorcoberturapagamentocondominio.max = 5000;

        inputs.valorcoberturaquebravidros.min = 2000;
        inputs.valorcoberturaquebravidros.max = (base * 0.3 > 1000000) ? 1000000 : base * 0.3;

        inputs.valorcoberturatremorterraterremoto.min = 5000;
        inputs.valorcoberturatremorterraterremoto.max = (base * 0.05 > 1000000) ? 500000 : base * 0.05;

        inputs.valorcoberturavazamentostanquestubulacoes.min = 2000;
        inputs.valorcoberturavazamentostanquestubulacoes.max = (base * 0.30 > 300000) ? 300000 : base * 0.30;

        inputs.valorcoberturavendaval.min = 2000;
        inputs.valorcoberturavendaval.max = base * 0.3;

        inputs.valorcoberturapagamentoaluguel.min = 3000;
        inputs.valorcoberturapagamentoaluguel.max = (base * 0.50 > 1000000) ? 1000000 : base * 0.50;

        let somatoria = 0;
        for(let i in inputs){
            let input = inputs[i];
            if (!input.disabled && input.id != 'valorsubtracaobicicleta' && input.id != 'valorcoberturaincendio'){ somatoria += input.value; }
        }
        inputs.valorsubtracaobicicleta.min = 2500;
        inputs.valorsubtracaobicicleta.max = (base * 0.5 > 50000) ? 50000 : base * 0.5;
        inputs.valorsubtracaobicicleta.disabled = (somatoria > 500000);

        valoresCobertura['habitual-premium'] = {};

        for(let i in inputs){
            let input = inputs[i];

            if (!input.disabled && input.min > input.max){ 
                input.disabled = true; 
                input.min = input.max; 
            }else{
                if (input.value > input.max){ input.value = input.max; }
                if (input.value < input.min){ input.value = input.min; }
            }

            let inputElement = $(`#${input.id}`);
            inputElement.prop('min', input.min);
            inputElement.prop('max', input.max);
            inputElement.val(input.value);

            let labelElement = $(`#${input.id}-label`); 
            labelElement.text(formatCurrency(input.value));
            labelElement.css('left', `calc(100% * ( ${input.value} - ${input.min} ) / ( ${input.max} - ${input.min} ))`);

            let rangeContainer = inputElement.parent();
            let coberturaContainer = rangeContainer.parent();

            dadosCobertura['habitual-premium'][input.id] = { value: input.value, min: input.min, max: input.max, disabled: input.disabled, display: input.display};
            if (!input.disabled){ 
                let nomeCobertura = relacaoItemId[input.id];
                valoresCobertura['habitual-premium'][nomeCobertura] = input.value;
                inputElement.prop("disabled", false);
                if (input.id == 'valorcoberturapagamentocondominio'){ 
                    valoresCobertura['habitual-premium'].valorCoberturaMorteAcidental = 5000; 
                    dadosCobertura['habitual-premium'].valorcoberturamorteacidental = { value: 5000, min: 5000, max: 5000, disabled: false };
                }
            }else{
                inputElement.prop("disabled", true); 
            }
            if (input.display){ coberturaContainer.show(); }else{ coberturaContainer.hide(); }
        }
    }

    function controleCoberturasVeraneio(){
        let inputs = {};
        let inputChange = this.id;
        let residencia = tipoResidencia;
        let todasInputRange = $('input[type="range"]');

        if (!dadosCobertura['veraneio'].valorcoberturaincendio){
            todasInputRange.each((index)=>{ 
                let input = todasInputRange[index];
                if (inputChange && inputChange == input.id){ input.value = this.value; }
                inputs[input.id] = { id: input.id, value: parseInt(input.value), min: input.min, max: input.max, disabled: !(input.value > 0), display: true };
            });
        }else{
            todasInputRange.each((index)=>{ 
                let input = todasInputRange[index];
                let cobertura = dadosCobertura['veraneio'][input.id];
                if (coberturaGenerica.valorcoberturaincendio){ if (coberturaGenerica[input.id]){ cobertura = coberturaGenerica[input.id]; } }
                if (inputChange && inputChange == input.id){ cobertura.value = this.value; }
                inputs[input.id] = { id: input.id, value: cobertura.value, min: cobertura.min, max: cobertura.max, disabled: cobertura.disabled, display: cobertura.display };
            });
        }
            
        inputs.valorcoberturaincendio.min = 100000;
        inputs.valorcoberturaincendio.max = (residencia == 3 || residencia == 8) ? 700000 : 10000000;

        if (inputs.valorcoberturaincendio.value > inputs.valorcoberturaincendio.max){ 
            inputs.valorcoberturaincendio.value = inputs.valorcoberturaincendio.max; 
        }
        if (inputs.valorcoberturaincendio.value < inputs.valorcoberturaincendio.min){ 
            inputs.valorcoberturaincendio.value = inputs.valorcoberturaincendio.min; 
        }

        let base = inputs.valorcoberturaincendio.value;

        inputs.valorcoberturadanoseletricos.min = 2000;
        inputs.valorcoberturadanoseletricos.max = base * 0.5;

        inputs.valorcoberturasubstracaobens.min = 2000;
        inputs.valorcoberturasubstracaobens.max = (base * 0.2 > 150000) ? 150000 : base * 0.2;

        inputs.valorcoberturaalagamento.min = 5000;
        inputs.valorcoberturaalagamento.max = (base * 0.2 > 30000) ? 30000 : base * 0.2;
        inputs.valorcoberturaalagamento.disabled = !(residencia == 1 || residencia == 2 || residencia == 4);

        /*inputs.valornegociocasa.min = 2000;
        inputs.valornegociocasa.max = 50000;
        inputs.valornegociocasa.disabled = (inputs.valorcoberturadanoseletricos.disabled && inputs.valorcoberturasubstracaobens.disabled);*/
        inputs.valornegociocasa.disabled = true;
        inputs.valornegociocasa.display = false;

        inputs.valorcoberturarcfamiliar.min = 2000;
        inputs.valorcoberturarcfamiliar.max = (base * 0.5 > 1000000) ? 1000000 : base * 0.5;
        inputs.valorcoberturarcfamiliar.value = (inputs.valorcoberturarcfamiliar.value > inputs.valorcoberturarcfamiliar.max) ? inputs.valorcoberturarcfamiliar.max : inputs.valorcoberturarcfamiliar.value;

        /*inputs.valordanosmorais.min = 2000;
        inputs.valordanosmorais.max = (inputs.valorcoberturarcfamiliar.value * 0.5 > 50000) ? 50000 : inputs.valorcoberturarcfamiliar.value * 0.5;
        inputs.valordanosmorais.disabled = (inputs.valorcoberturarcfamiliar.value == 0 || inputs.valorcoberturarcfamiliar.disabled)*/
        inputs.valordanosmorais.disabled = true;
        inputs.valordanosmorais.display = false;

        inputs.valorcoberturadesmoronamento.min = 2000;
        inputs.valorcoberturadesmoronamento.max = (base * 0.1 > 100000) ? 100000 : base * 0.1;

        inputs.valorimpactoveiculos.min = 2000;
        inputs.valorimpactoveiculos.max = base * 1;
        
        /*inputs.valorpequenasreformas.min = 2000;
        inputs.valorpequenasreformas.max = 100000;
        inputs.valorpequenasreformas.disabled = (residencia == 5 || residencia == 6 || residencia == 7);*/
        inputs.valorpequenasreformas.disabled = true;
        inputs.valorpequenasreformas.display = false;

        /*inputs.valorcoberturapagamentocondominio.min = 300;
        inputs.valorcoberturapagamentocondominio.max = 5000;*/
        inputs.valorcoberturapagamentocondominio.disabled = true;
        inputs.valorcoberturapagamentocondominio.display = false;

        inputs.valorcoberturaquebravidros.min = 2000;
        inputs.valorcoberturaquebravidros.max = base * 0.5;

        inputs.valorcoberturatremorterraterremoto.min = 2000;
        inputs.valorcoberturatremorterraterremoto.max = (base * 0.15 > 500000) ? 500000 : base * 0.15;

        inputs.valorcoberturavazamentostanquestubulacoes.min = 2000;
        inputs.valorcoberturavazamentostanquestubulacoes.max = (base * 0.30 > 100000) ? 100000 : base * 0.30;

        inputs.valorcoberturavendaval.min = 2000;
        inputs.valorcoberturavendaval.max = base * 0.5;

        /*inputs.valorcoberturapagamentoaluguel.min = 3000;
        inputs.valorcoberturapagamentoaluguel.max = (base * 0.50 > 200000) ? 200000 : base * 0.50;*/
        inputs.valorcoberturapagamentoaluguel.disabled = true;
        inputs.valorcoberturapagamentoaluguel.display = false;

        /*inputs.valorsubtracaobicicleta.min = 2500;
        inputs.valorsubtracaobicicleta.max = (base * 0.3 > 50000) ? 50000 : base * 0.3;
        inputs.valorsubtracaobicicleta.disabled = (inputs.valorcoberturaincendio.value > 250000);*/
        inputs.valorsubtracaobicicleta.disabled = true;
        inputs.valorsubtracaobicicleta.display = false;

        valoresCobertura['veraneio'] = {};

        for(let i in inputs){
            let input = inputs[i];

            if (!input.disabled && input.min > input.max){ 
                input.disabled = true; 
                input.min = input.max; 
            }else{
                if (input.value > input.max){ input.value = input.max; }
                if (input.value < input.min){ input.value = input.min; }
            }

            let inputElement = $(`#${input.id}`);
            inputElement.prop('min', input.min);
            inputElement.prop('max', input.max);
            inputElement.val(input.value);

            let labelElement = $(`#${input.id}-label`); 
            labelElement.text(formatCurrency(input.value));
            labelElement.css('left', `calc(100% * ( ${input.value} - ${input.min} ) / ( ${input.max} - ${input.min} ))`);

            let rangeContainer = inputElement.parent();
            let coberturaContainer = rangeContainer.parent();

            dadosCobertura['veraneio'][input.id] = { value: input.value, min: input.min, max: input.max, disabled: input.disabled, display: input.display};
           
            if (!input.disabled){ 
                let nomeCobertura = relacaoItemId[input.id];
                valoresCobertura['veraneio'][nomeCobertura] = input.value;
                //if (input.id == 'valorcoberturapagamentocondominio'){ valoresCobertura['habitual'].valorCoberturaMorteAcidental = 5000; }
                inputElement.prop("disabled", false);
            }else{ 
                inputElement.prop("disabled", true); 
            }
            if (input.display){ coberturaContainer.show(); }else{ coberturaContainer.hide(); }
        }
    }
    
    validacaoInicial();        
    console.log(encryptedData);
});

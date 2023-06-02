$("#loading-screen").hide();
$(document).ready(function() {
    // Função para converter o valor em texto por extenso
    function formatCurrency(value) {
        if (value < 1000) { return value + ""; }
        if (value < 1000000) { return (value / 1000) + " mil"; } 
        if (value >= 2000000){ return (value / 1000000) + " milhões"; }
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

    async function validacaoInicial() {
        let storage = localStorage.getItem('formData');
        let storageCobertura = localStorage.getItem('dadosCobertura');

        let coberturas = { generica: {}, habitual: {}, habitualPremium: {}, veraneio: {} };
        //let dadosCoberturas = {};
        
        if (!storage) { window.location.href = '/'; return; }else{ encryptedData = JSON.parse(storage); }
        if (!storageCobertura){ storageCobertura = {}; }else{ storageCobertura = JSON.parse(storageCobertura); }
        if (!encryptedData.tipoResidencia){ window.location.href = '/'; return; }else{ tipoResidencia = encryptedData.tipoResidencia; }       

        if (encryptedData.dadosCoberturaGenerica){ coberturas.generica = encryptedData.dadosCoberturaGenerica; }
        if (coberturas.generica.valorcoberturaincendio){ coberturaGenerica = coberturas.generica; }        

        if (storageCobertura.habitual){ coberturas.habitual = storageCobertura.habitual; }
        if (coberturas.habitual.valorcoberturaincendio){ dadosCobertura['habitual'] = storageCobertura.habitual; }

        if (storageCobertura.habitualPremium){ coberturas.habitualPremium = storageCobertura.habitualPremium; }
        if (coberturas.habitualPremium.valorcoberturaincendio){ dadosCobertura['habitual-premium'] = storageCobertura.habitualPremium; }

        if (storageCobertura.veraneio){ coberturas.veraneio = storageCobertura.veraneio; }
        if (coberturas.veraneio.valorcoberturaincendio){ dadosCobertura['veraneio'] = storageCobertura.veraneio; }

        console.log('encryptedData:', encryptedData);
        console.log('Coberturas:', coberturas);

        encryptedData = encryptedData.formData;

        gerarToggleSwitch();
        /*let todasInputRange = $('input[type="range"]');

        $.ajax({
            url: '/formulario',
            type: 'GET',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function(form) { 
                let itens = form.itens;
                let empty = [];               
                if (!itens){ itens = {}; }
                
                if (!itens.habitual){ empty.push('habitual'); }
                if (itens.habitual.valorcoberturaincendio && !empty.includes('habitual')){ empty.push('habitual'); }
                
                if (!itens.habitualPremium){ empty.push('habitual-premium'); }
                if (itens.habitualPremium.valorcoberturaincendio && !empty.includes('habitual-premium')){ empty.push('habitual-premium'); }
                
                if (!itens.veraneio){ empty.push('veraneio'); }
                if (itens.veraneio.valorcoberturaincendio && !empty.includes('veraneio')){ empty.push('veraneio'); }

                if (!itens.generico){ empty.push('generico'); }
                if (itens.generico.valorcoberturaincendio && !empty.includes('generico')){ empty.push('generico'); }

                if (!empty.includes('generico')){ coberturaGenerica = itens.generico; }
                
                if (!empty.includes('habitual') || !empty.includes('habitual-premium') || !empty.includes('veraneio')){
                    todasInputRange.each((index)=>{
                        let input = todasInputRange[index];
                        if (!empty.includes('habitual')){
                            if (!dadosCobertura['habitual']){ dadosCobertura['habitual'] = {}; }
                            dadosCobertura['habitual'].id = input.id;
                            dadosCobertura['habitual'].value = itens.habitual.value;
                            dadosCobertura['habitual'].min = input.min;
                            dadosCobertura['habitual'].max = input.max;
                            dadosCobertura['habitual'].disabled = itens.habitual.disabled;
                            dadosCobertura['habitual'].display = true;
                        }
                    }); 
                }
                //
                
                todasInputRange.each((index)=>{ 
                let input = todasInputRange[index];
                    id: , 
                    value: parseInt(cobertura.value), 
                    min: cobertura.min, 
                    max: cobertura.max, 
                    disabled: (cobertura.disabled) ? true : false, 
                    display: true
                
                console.log('Sucesso:', form); 
                for(let key in form){
                    if (key == 'criadoEm'){ continue; }
                    if (key == 'itens'){ continue; }
                    let input = $(`#${key}`);
                    if (input.length){ input.val(form[key]); }
                }
                if (!form.itens){ form.itens = {}; }
                if (!form.itens.generico){ form.itens.generico = {}; }
                
                for(let key in form.itens.generico){
                    if (!dadosCobertura['generica'][key]){ continue; }
                    dadosCobertura['generica'][key].value = form.itens.generico[key].value || dadosCobertura['generica'][key].value;
                    dadosCobertura['generica'][key].disabled = (form.itens.generico[key].disable);
                    valoresCobertura['generica'][key] = form.itens.generico[key].value || dadosCobertura['generica'][key].value;
                }
                controleCoberturasGenerico();
                console.log(form);
                console.log(dadosCobertura['generica']);    
            },
            error: function(xhr, status, error) { 
                console.error('Error:', error); 
            }
        });*/  

        controleCoberturaMain('habitual');
        controleCoberturaMain('habitual-premium');
        controleCoberturaMain('veraneio');

        setTimeout(()=>{ apiCallOrcamento('habitual', 0); }, 10); 
        setTimeout(()=>{ apiCallOrcamento('habitual-premium', 0); }, 150); 
        setTimeout(()=>{ apiCallOrcamento('veraneio', 0); }, 300);

        setTimeout(()=>{ apiCallOrcamento('habitual', 1); }, 450);
        setTimeout(()=>{ apiCallOrcamento('habitual-premium', 1); }, 600);
        setTimeout(()=>{ apiCallOrcamento('veraneio', 1); }, 750);

    }

    function gerarToggleSwitch(){
        let inputList = $('input[type="range"]');
        inputList.each((index)=>{ 
            let input = inputList[index];
            let label = $(`label[for="${input.id}"]`);
            let toggle = `<div id="${input.id}-toggle" class="container-toggle"><div class="toggle-switch"></div></div>`;
            let divInativo = `<div id="${input.id}-inativo" style="position: absolute; width: fit-content; top: 25px;">(Inativo)</div>`
            label.before(toggle);
            label.before(divInativo);
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
        payload.dadosCobertura = {};
        button.css('background-color', 'gray');

        for (let key in dadosCobertura[produto]){
            cobertura = dadosCobertura[produto][key];
            if (!cobertura){ continue; }
            if (key == 'card'){ continue; }
            if (!payload.dadosCobertura[key]){ payload.dadosCobertura[key] = {}; }
            payload.dadosCobertura[key].value = parseInt(dadosCobertura[produto][key].value);            
            payload.dadosCobertura[key].disabled = dadosCobertura[produto][key].disabled;
        }

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
                controleCoberturaMain('habitual');
                inputsRange
                    .off('change', controleCoberturaMain )
                    .on('change', {param1: 'habitual'}, controleCoberturaMain );
                break;
            case 2:
                controleCoberturaMain('habitual-premium');
                inputsRange
                    .off('change', controleCoberturaMain )
                    .on('change', {param1: 'habitual-premium'}, controleCoberturaMain );
                break;
            case 3:
                controleCoberturaMain('veraneio');
                inputsRange
                    .off('change', controleCoberturaMain )
                    .on('change', {param1: 'veraneio'}, controleCoberturaMain );
                break;
        }
    }

    function controleCoberturaMain(event){
        console.log(event, dadosCobertura);
        var produto = event;
        if (produto != 'habitual' && produto != 'habitual-premium' && produto != 'veraneio'){ produto = event.data.param1; }
        let inputs = {};
        let inputChange = this.id;
        let todasInputRange = $('input[type="range"]');
        
        if (!dadosCobertura[produto].valorcoberturaincendio){
            todasInputRange.each((index)=>{ 
                let input = todasInputRange[index];
                let cobertura = coberturaGenerica[input.id];

                if (!cobertura){ cobertura = input; }
                if (inputChange && inputChange == input.id){ cobertura.value = this.value; }

                inputs[input.id] = { 
                    id: input.id, 
                    value: parseInt(cobertura.value), 
                    min: cobertura.min, 
                    max: cobertura.max, 
                    disabled: (cobertura.disabled) ? true : false, 
                    display: true 
                };
            });
        }else{
            todasInputRange.each((index)=>{ 
                let input = todasInputRange[index];
                let cobertura = dadosCobertura[produto][input.id];

                if (!cobertura){ cobertura = input;}
                if (inputChange && inputChange == input.id){ cobertura.value = this.value; }

                inputs[input.id] = { 
                    id: input.id, 
                    value: cobertura.value, 
                    min: cobertura.min, 
                    max: cobertura.max, 
                    disabled: (cobertura.disabled) ? true : false, 
                    display: true 
                };
            });
        }

        controleValidacaoCoberturas(produto, {inputs: inputs});
    }

    function controleValidacaoCoberturas(produto, data){
        let inputs = data.inputs;

        inputs.valorcoberturaincendio.min = 100000;
        inputs.valorcoberturaincendio.max = (tipoResidencia == 2) ? 700000 : 1000000;

        if (produto == 'habitual-premium'){ inputs.valorcoberturaincendio.min = (tipoResidencia == 2) ? 7100000 : 1100000; inputs.valorcoberturaincendio.max = 20000000; }
        if (produto == 'veraneio'){ inputs.valorcoberturaincendio.max = (tipoResidencia == 3 || tipoResidencia == 8) ? 700000 : 10000000; }

        if (inputs.valorcoberturaincendio.value > inputs.valorcoberturaincendio.max){ inputs.valorcoberturaincendio.value = inputs.valorcoberturaincendio.max; }
        if (inputs.valorcoberturaincendio.value < inputs.valorcoberturaincendio.min){ inputs.valorcoberturaincendio.value = inputs.valorcoberturaincendio.min; }

        let base = inputs.valorcoberturaincendio.value;

        if (produto == 'habitual'){    
            inputs.valorcoberturadanoseletricos.min = 2000;
            inputs.valorcoberturadanoseletricos.max = base * 0.5;

            inputs.valorcoberturasubstracaobens.min = 2000;
            inputs.valorcoberturasubstracaobens.max = (base * 0.3 > 150000) ? 150000 : base * 0.3;

            inputs.valorcoberturaalagamento.min = 5000;
            inputs.valorcoberturaalagamento.max = 30000;
            //inputs.valorcoberturaalagamento.disabled = !(residencia == 1 || residencia == 2 || residencia == 4);

            inputs.valornegociocasa.min = 2000;
            inputs.valornegociocasa.max = 50000;
            //inputs.valornegociocasa.disabled = (inputs.valorcoberturadanoseletricos.disabled && inputs.valorcoberturasubstracaobens.disabled);

            inputs.valorcoberturarcfamiliar.min = 2000;
            inputs.valorcoberturarcfamiliar.max = (base * 0.5 > 200000) ? 200000 : base * 0.5; //base * 0.5;
            inputs.valorcoberturarcfamiliar.value = (inputs.valorcoberturarcfamiliar.value > inputs.valorcoberturarcfamiliar.max) ? inputs.valorcoberturarcfamiliar.max : inputs.valorcoberturarcfamiliar.value;

            inputs.valordanosmorais.min = 2000;
            inputs.valordanosmorais.max = (inputs.valorcoberturarcfamiliar.value * 0.5 > 50000) ? 50000 : inputs.valorcoberturarcfamiliar.value * 0.5;
            //inputs.valordanosmorais.disabled = (inputs.valorcoberturarcfamiliar.value == 0 || inputs.valorcoberturarcfamiliar.disabled)

            inputs.valorcoberturadesmoronamento.min = 2000;
            inputs.valorcoberturadesmoronamento.max = (base * 0.1 > 100000) ? 100000 : base * 0.1;

            inputs.valorimpactoveiculos.min = 2000;
            inputs.valorimpactoveiculos.max = base * 1;
            
            inputs.valorpequenasreformas.min = 2000;
            inputs.valorpequenasreformas.max = 100000;
            //inputs.valorpequenasreformas.disabled = (residencia == 5 || residencia == 6 || residencia == 7);

            inputs.valorcoberturapagamentocondominio.min = 300;
            inputs.valorcoberturapagamentocondominio.max = 5000;

            inputs.valorcoberturaquebravidros.min = 2000;
            inputs.valorcoberturaquebravidros.max = base * 0.5;

            inputs.valorcoberturatremorterraterremoto.min = 2000;
            inputs.valorcoberturatremorterraterremoto.max = (base * 0.15 > 500000) ? 500000 : base * 0.15;

            inputs.valorcoberturavazamentostanquestubulacoes.min = 2000;
            inputs.valorcoberturavazamentostanquestubulacoes.max = (base * 0.30 > 100000) ? 100000 : base * 0.30;

            inputs.valorcoberturavendaval.min = 2000;
            inputs.valorcoberturavendaval.max = (base * 0.5 > 500000) ? 500000 : base * 0.5;//base * 0.5;

            inputs.valorcoberturapagamentoaluguel.min = 3000;
            inputs.valorcoberturapagamentoaluguel.max = (base * 0.50 > 200000) ? 200000 : base * 0.50;

            inputs.valorsubtracaobicicleta.min = 2500;
            inputs.valorsubtracaobicicleta.max = (base * 0.3 > 50000) ? 50000 : base * 0.3;
            //inputs.valorsubtracaobicicleta.disabled = (inputs.valorcoberturaincendio.value < 250000);


        }
        if (produto == 'habitual-premium'){
            inputs.valorcoberturadanoseletricos.min = 2000;
            inputs.valorcoberturadanoseletricos.max = base * 0.5;
    
            inputs.valorcoberturasubstracaobens.min = 2000;
            inputs.valorcoberturasubstracaobens.max = (base * 0.3 > 1500000) ? 1500000 : base * 0.3;
    
            inputs.valorcoberturaalagamento.min = 5000;
            inputs.valorcoberturaalagamento.max = 500000; //50.000 da Básica
            //inputs.valorcoberturaalagamento.disabled = !(residencia == 1 || residencia == 2 || residencia == 4);
    
            inputs.valornegociocasa.min = 2000;
            inputs.valornegociocasa.max = 300000;
            //inputs.valornegociocasa.disabled = (inputs.valorcoberturadanoseletricos.disabled && inputs.valorcoberturasubstracaobens.disabled);
    
            inputs.valorcoberturarcfamiliar.min = 2000;
            inputs.valorcoberturarcfamiliar.max = (base * 0.5 > 1000000) ? 1000000 : base * 0.5;
            inputs.valorcoberturarcfamiliar.value = (inputs.valorcoberturarcfamiliar.value > base * 0.5) ? base * 0.5 : inputs.valorcoberturarcfamiliar.value;
    
            inputs.valordanosmorais.min = 2000;
            inputs.valordanosmorais.max = (inputs.valorcoberturarcfamiliar.value * 0.5 > 100000) ? 100000 : inputs.valorcoberturarcfamiliar.value * 0.5;
            //inputs.valordanosmorais.disabled = (inputs.valorcoberturarcfamiliar.value == 0 || inputs.valorcoberturarcfamiliar.disabled)
    
            inputs.valorcoberturadesmoronamento.min = 2000;
            inputs.valorcoberturadesmoronamento.max = (base * 0.1 > 500000) ? 500000 : base * 0.1;
    
            inputs.valorimpactoveiculos.min = 2000;
            inputs.valorimpactoveiculos.max = base * 1;
            
            inputs.valorpequenasreformas.min = 5000;
            inputs.valorpequenasreformas.max = 200000; //R$200.00 da Básica
            //inputs.valorpequenasreformas.disabled = (residencia == 5 || residencia == 6 || residencia == 7);
    
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
        }
        if (produto == 'veraneio'){
            inputs.valorcoberturadanoseletricos.min = 2000;
            inputs.valorcoberturadanoseletricos.max = base * 0.5;
    
            inputs.valorcoberturasubstracaobens.min = 2000;
            inputs.valorcoberturasubstracaobens.max = (base * 0.2 > 150000) ? 150000 : base * 0.2;
    
            inputs.valorcoberturaalagamento.min = 5000;
            inputs.valorcoberturaalagamento.max = (base * 0.2 > 30000) ? 30000 : base * 0.2;
            //inputs.valorcoberturaalagamento.disabled = !(residencia == 1 || residencia == 2 || residencia == 4);
    
            inputs.valornegociocasa.disabled = true;
            inputs.valornegociocasa.display = false;
    
            inputs.valorcoberturarcfamiliar.min = 2000;
            inputs.valorcoberturarcfamiliar.max = (base * 0.5 > 200000) ? 200000 : base * 0.5; //(base * 0.5 > 1000000) ? 1000000 : base * 0.5;
            inputs.valorcoberturarcfamiliar.value = (inputs.valorcoberturarcfamiliar.value > inputs.valorcoberturarcfamiliar.max) ? inputs.valorcoberturarcfamiliar.max : inputs.valorcoberturarcfamiliar.value;
    
            inputs.valordanosmorais.disabled = true;
            inputs.valordanosmorais.display = false;
    
            inputs.valorcoberturadesmoronamento.min = 2000;
            inputs.valorcoberturadesmoronamento.max = (base * 0.1 > 100000) ? 100000 : base * 0.1;
    
            inputs.valorimpactoveiculos.min = 2000;
            inputs.valorimpactoveiculos.max = base * 1;
            
            inputs.valorpequenasreformas.disabled = true;
            inputs.valorpequenasreformas.display = false;
    
            inputs.valorcoberturapagamentocondominio.disabled = true;
            inputs.valorcoberturapagamentocondominio.display = false;
    
            inputs.valorcoberturaquebravidros.min = 2000;
            inputs.valorcoberturaquebravidros.max = base * 0.5;
    
            inputs.valorcoberturatremorterraterremoto.min = 2000;
            inputs.valorcoberturatremorterraterremoto.max = (base * 0.15 > 500000) ? 500000 : base * 0.15;
    
            inputs.valorcoberturavazamentostanquestubulacoes.min = 2000;
            inputs.valorcoberturavazamentostanquestubulacoes.max = (base * 0.30 > 100000) ? 100000 : base * 0.30;
    
            inputs.valorcoberturavendaval.min = 2000;
            inputs.valorcoberturavendaval.max = (base * 0.5 > 500000) ? 500000 : base * 0.5;//base * 0.5;
    
            inputs.valorcoberturapagamentoaluguel.disabled = true;
            inputs.valorcoberturapagamentoaluguel.display = false;

            inputs.valorsubtracaobicicleta.disabled = true;
            inputs.valorsubtracaobicicleta.display = false;
        }

        controleCoberturaDOM(produto, {inputs: inputs});
    }

    function controleCoberturaDOM(produto, data){
        let inputs = data.inputs;
        let subtracaoSomatoria = 0;

        valoresCobertura[produto] = {};

        for(let i in inputs){
            let input = inputs[i];
            if (!input.disabled && input.min > input.max){ 
                input.disabled = true; 
                input.min = input.max; 
            }else{
                if (input.value > input.max){ input.value = input.max; }
                if (input.value < input.min){ input.value = input.min; }
            }

            if (produto == 'habitual-premium'){
                if (input.id == 'valorsubtracaobicicleta'){ subtracaoSomatoria += parseInt(input.value); }
                if (input.id == 'valorcoberturasubstracaoBens'){ subtracaoSomatoria += parseInt(input.value); }
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
            let inativoElement = $(`#${input.id}-inativo`);

            dadosCobertura[produto][input.id] = { value: input.value, min: input.min, max: input.max, disabled: input.disabled, display: input.display };
            
            if (!input.disabled){ //Input Ativada
                let enable = true;     
                let nomeCobertura = relacaoItemId[input.id];            
                
                if (input.id == 'valorsubtracaobicicleta' ){ 
                    if (produto == 'habitual-premium'){ 
                        if (subtracaoSomatoria > 500000){
                            inativoElement.html('*Somatórias das coberturas relacionadas não deve ultrapassar R$ 500.000,00');
                            inativoElement.css('font-size', '13px');
                            enable = false; 
                        }else{
                            inativoElement.html('(Inativo)');
                            inativoElement.css('font-size', '16px');
                        }
                    }
                    if (produto == 'habitual'){ 
                        if (inputs.valorcoberturaincendio.value < 250000){    
                            inativoElement.html('*Liberada quando cobertura de incêndio for maior que R$ 250.000,00');
                            inativoElement.css('font-size', '13px');
                            enable = false; 
                        }else{
                            inativoElement.html('(Inativo)');
                            inativoElement.css('font-size', '16px');
                        }
                    }
                }
                if (input.id == 'valornegociocasa'){ 
                    if (inputs.valorcoberturadanoseletricos.disabled && inputs.valorcoberturasubstracaobens.disabled){
                        inativoElement.html('*Liberada quando contratado Danos Elétricos e Subtração de Bens');
                        inativoElement.css('font-size', '13px');
                        enable = false; 
                    }else{
                        inativoElement.html('(Inativo)');
                        inativoElement.css('font-size', '16px');
                    }
                }
                if (input.id == 'valorpequenasreformas'){ 
                    if (tipoResidencia == 5 || tipoResidencia == 6 || tipoResidencia == 7){
                        inativoElement.html('*Cobertura não permitida para imóveis desocupados');
                        inativoElement.css('font-size', '13px');
                        enable = false; 
                    }else{
                        inativoElement.html('(Inativo)');
                        inativoElement.css('font-size', '16px');
                    }
                }
                if (input.id == 'valordanosmorais'){ 
                    if (inputs.valorcoberturarcfamiliar.value == 0 || inputs.valorcoberturarcfamiliar.disabled){
                        inativoElement.html('*Liberada quando contratado Responsabilidade Civil Familiar');
                        inativoElement.css('font-size', '13px');
                        enable = false;
                    }else{
                        inativoElement.html('(Inativo)');
                        inativoElement.css('font-size', '16px');
                    }
                }
                if (input.id == 'valorcoberturaalagamento'){ 
                    if (!(tipoResidencia == 1 || tipoResidencia == 2 || tipoResidencia == 4)){
                        inativoElement.html('*Cobertura não permitida para imóveis desocupados');
                        inativoElement.css('font-size', '13px');
                        enable = false; 
                    }else{
                        inativoElement.html('(Inativo)');
                        inativoElement.css('font-size', '16px');
                    }
                }

                if (input.id == 'valorcoberturapagamentocondominio'){ 
                    valoresCobertura[produto].valorCoberturaMorteAcidental = 5000; 
                    dadosCobertura[produto].valorcoberturamorteacidental = { value: 5000, min: 5000, max: 5000, disabled: false, display: false, display: false };
                }
                if (enable){
                    valoresCobertura[produto][nomeCobertura] = input.value;
                    inputElement.prop("disabled", false);

                    toggleElement.css('background-color', '#03A8DB');
                    toggleElement.css('border-color', '#03A8DB');
                    switchElement.css('margin-left', '20px');
                    labelElement.css('display', 'block');
                    inativoElement.css('display', 'none');   
                }else{
                    inputElement.prop("disabled", true); 
                    toggleElement.css('background-color', '#C7C7C7'); 
                    toggleElement.css('border-color', '#C7C7C7');
                    switchElement.css('margin-left', '0px');
                    labelElement.css('display', 'none');
                    inativoElement.css('display', 'block');
                }
            }else{ //Input Desativada
                inputElement.prop("disabled", true); 
                toggleElement.css('background-color', '#C7C7C7'); 
                toggleElement.css('border-color', '#C7C7C7');
                switchElement.css('margin-left', '0px');
                labelElement.css('display', 'none');
                inativoElement.css('display', 'block');
            }

            let rangeContainer = inputElement.parent();
            let coberturaContainer = rangeContainer.parent();
            if (input.display){ coberturaContainer.show(); }else{ coberturaContainer.hide(); }

            toggleElement.off("click").on("click", ()=>{
                if (input.id == 'valorcoberturaincendio'){ return; }
                if (input.id == 'valorsubtracaobicicleta' && inputs.valorcoberturaincendio.value < 250000){ 
                    dadosCobertura[produto][input.id].disabled = true;
                    inputElement.prop("disabled", true);
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                    return; 
                }
                if (input.id == 'valorpequenasreformas' && (tipoResidencia == 5 || tipoResidencia == 6 || tipoResidencia == 7)){ 
                    dadosCobertura[produto][input.id].disabled = true;
                    inputElement.prop("disabled", true);
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                    return;
                }
                if (input.id == 'valornegociocasa' && (inputs.valorcoberturadanoseletricos.disabled && inputs.valorcoberturasubstracaobens.disabled)){ 
                    dadosCobertura[produto][input.id].disabled = true;
                    inputElement.prop("disabled", true);
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                    return; 
                }
                if (input.id == 'valordanosmorais' && (inputs.valorcoberturarcfamiliar.value == 0 || inputs.valorcoberturarcfamiliar.disabled)){ 
                    dadosCobertura[produto][input.id].disabled = true;
                    inputElement.prop("disabled", true);
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                    return; 
                }
                if (input.id == 'valorcoberturaalagamento' && (!(tipoResidencia == 1 || tipoResidencia == 2 || tipoResidencia == 4))){ 
                    dadosCobertura[produto][input.id].disabled = true;
                    inputElement.prop("disabled", true);
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                    return; 
                }
                dadosCobertura[produto][input.id].disabled = !(dadosCobertura[produto][input.id].disabled);
                inputElement.prop("disabled", dadosCobertura[produto][input.id].disabled);
                console.log(input.id, !(dadosCobertura[produto][input.id].disabled));

                controleCoberturaMain(produto);
                console.log(valoresCobertura);
                //controleCoberturasHabitual();
                return;
            });
        }
        let coberturas = {
            habitual: dadosCobertura['habitual'],
            habitualPremium: dadosCobertura['habitual-premium'],
            veraneio: dadosCobertura['veraneio']
        }
        localStorage.setItem('dadosCobertura', JSON.stringify(coberturas));
    }

    validacaoInicial();        
    console.log(encryptedData);
});

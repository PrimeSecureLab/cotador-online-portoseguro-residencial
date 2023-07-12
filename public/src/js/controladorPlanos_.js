$("#loading-screen").hide();
// ESSENCIAL -> CONFORTO -> EXCLUSIVE
var StringOptions = {  style: 'decimal', useGrouping: true, groupingSeparator: '.', minimumFractionDigits: 2, maximumFractionDigits: 2 };

$(document).ready(function() {
    // Função para converter o valor em texto por extenso
    /*function formatCurrency(value) {
        if (value < 1000) { return value + ""; }
        if (value < 1000000) { return (value / 1000) + " mil"; } 
        if (value >= 2000000){ return (value / 1000000) + " milhões"; }
        return (value / 1000000) + " milhão";
    }
    function setupRangeInput(config) {
        $("." + config.rangeValueClass).text(formatCurrency($("#" + config.inputId).val()));
        $("#" + config.inputId).on("input", function() {
            $("." + config.rangeValueClass).text(formatCurrency($(this).val()));
            $("." + config.rangeValueClass).css("left", "calc(100% * (" + $(this).val() + " - " + $(this).attr("min") + ") / (" + $(this).attr("max") + " - " + $(this).attr("min") + "))");
        });
    }*/  

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
        if (indexJanela > 0){ apiCallOrcamento(produto[indexJanela - 1], 0); apiCallOrcamento(produto[indexJanela - 1], 1); } 
    });
    $("button#btn-save").on("click", function() { 
        salvarItens(); 
        if (indexJanela > 0){ apiCallOrcamento(produto[indexJanela - 1], 0); apiCallOrcamento(produto[indexJanela - 1], 1); } 
    });
    $("button.btn-close").on("click", function() { 
        salvarItens(); 
        if (indexJanela > 0){ apiCallOrcamento(produto[indexJanela - 1], 0); apiCallOrcamento(produto[indexJanela - 1], 1); } 
    });
    $("button#btn-cancel").on("click", function() { 
        salvarItens(); 
        if (indexJanela > 0){ apiCallOrcamento(produto[indexJanela - 1], 0); apiCallOrcamento(produto[indexJanela - 1], 1); } 
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

    buttonHabitual.on("click", function(e) { e.preventDefault(); if (!loadingProduto.habitual[tempoVigencia]){ salvarOrcamento('habitual'); } });
    buttonHabitualPremium.on("click", function(e) { e.preventDefault(); if (!loadingProduto.habitualPremium[tempoVigencia]){ salvarOrcamento('habitual-premium'); } });
    buttonVeraneio.on("click", function(e) { e.preventDefault(); if (!loadingProduto.habitualPremium[tempoVigencia]){ salvarOrcamento('veraneio'); } });

    var produto = ['habitual', 'habitual-premium', 'veraneio'];
    var indexJanela = -1;

    var tentativaTimeOut = { habitual: [0, 0, 0], habitualPremium: [0, 0, 0], veraneio: [0, 0, 0] };

    var loadingProduto = { habitual: [false, false, false], habitualPremium: [false, false, false], veraneio: [false, false, false] };

    var produtoReady = [];
    produtoReady[0] = [false, false, false];
    produtoReady[1] = [false, false, false];
    produtoReady[2] = [false, false, false];

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
        
        if (!storage) { window.location.href = '/'; return; }else{ encryptedData = JSON.parse(storage); }
        if (!storageCobertura){ storageCobertura = {}; }else{ storageCobertura = JSON.parse(storageCobertura); }
        
        // Coleta o tipo de Residencia
        if (!encryptedData.tipoResidencia){ window.location.href = '/'; return; }else{ tipoResidencia = encryptedData.tipoResidencia; }       

        // Configura sliders genéricos da cotação
        if (encryptedData.dadosCoberturaGenerica){ coberturas.generica = encryptedData.dadosCoberturaGenerica; }
        if (coberturas.generica.valorcoberturaincendio){ coberturaGenerica = coberturas.generica; }        

        // Verifica se há dados salvos em alterações de sliders
        if (storageCobertura.habitual){ coberturas.habitual = storageCobertura.habitual; }
        if (coberturas.habitual.valorcoberturaincendio){ dadosCobertura['habitual'] = storageCobertura.habitual; }

        if (storageCobertura.habitualPremium){ coberturas.habitualPremium = storageCobertura.habitualPremium; }
        if (coberturas.habitualPremium.valorcoberturaincendio){ dadosCobertura['habitual-premium'] = storageCobertura.habitualPremium; }

        if (storageCobertura.veraneio){ coberturas.veraneio = storageCobertura.veraneio; }
        if (coberturas.veraneio.valorcoberturaincendio){ dadosCobertura['veraneio'] = storageCobertura.veraneio; }

        //console.log('encryptedData:', encryptedData);
        //console.log('Coberturas:', coberturas);

        encryptedData = encryptedData.formData;

        $('.my-pills-link').removeClass('active');
        $('#btn-vigencia-1').addClass('active');

        gerarToggleSwitch();

        controleCoberturaMain('habitual');
        controleCoberturaMain('habitual-premium');
        controleCoberturaMain('veraneio');

        setTimeout(()=>{ apiCallOrcamento('habitual', 0); }, 10); 
        setTimeout(()=>{ apiCallOrcamento('habitual-premium', 0); }, 150); 
        setTimeout(()=>{ apiCallOrcamento('veraneio', 0); }, 300);

        $('#btn-vigencia-1').on('click', ()=>{
            //console.log(tempoVigencia);
            let delay = 0;

            if (!produtoReady[0][0]){ limparCards(1); setTimeout(()=>{ apiCallOrcamento('habitual', 0); }, delay); delay += 150; }
            if (!produtoReady[0][1]){ limparCards(2); setTimeout(()=>{ apiCallOrcamento('habitual-premium', 0); }, delay); delay += 150; }
            if (!produtoReady[0][2]){ limparCards(3); setTimeout(()=>{ apiCallOrcamento('veraneio', 0); }, delay); delay += 150; }

            $(".my-pills-link").removeClass('active');
            $('#btn-vigencia-1').addClass('active');

            atualizarVigencia('habitual', 0);
            atualizarVigencia('habitual-premium', 0);
            atualizarVigencia('veraneio', 0);
        });

        $('#btn-vigencia-2').on('click', ()=>{
            //console.log(tempoVigencia);
            let delay = 0;

            if (!produtoReady[1][0]){ limparCards(1); setTimeout(()=>{ apiCallOrcamento('habitual', 1); }, delay); delay += 150; }
            if (!produtoReady[1][1]){ limparCards(2); setTimeout(()=>{ apiCallOrcamento('habitual-premium', 1); }, delay); delay += 150; }
            if (!produtoReady[1][2]){ limparCards(3); setTimeout(()=>{ apiCallOrcamento('veraneio', 1); }, delay); delay += 150; }   

            $(".my-pills-link").removeClass('active');
            $('#btn-vigencia-2').addClass('active');

            atualizarVigencia('habitual', 1);
            atualizarVigencia('habitual-premium', 1);
            atualizarVigencia('veraneio', 1);
        });
    }

    function limparCards(index){
        let card = $(`#card-price-${index}`)
        card.html(`
            <span class="parcela">--x</span>
            <span class="moeda">R$</span>
            <span class="inteiro">--</span>
            <span class="centavos">,--</span>
            <span class="period" style="display: none;"> Sem Juros</span>
        `);
        let cardContainer = card.parent();
        cardContainer.children('p.text-center').html('Valor Total: -- ');
    }

    function gerarToggleSwitch(){
        let inputList = $('input[type="range"]');
        inputList.each((index)=>{ 
            let input = inputList[index];
            let label = $(`label[for="${input.id}"]`);

            if (input.id == 'valorcoberturaincendio'){ return true; }

            let toggle = `
                <div id="${input.id}-toggle-conteiner" class="main-toggle-conteiner">
                    <div id="${input.id}-ativo" class="cobertura-ativa">Ativo</div>
                    <div id="${input.id}-toggle" class="container-toggle"><div class="toggle-switch"></div></div>
                </div>
            `;
            let divInativo = `<div id="${input.id}-inativo" style="position: absolute; width: fit-content; top: 25px;">(Inativo)</div>`

            label.before(toggle);
            label.before(divInativo);
        });
    }

    async function salvarOrcamento(produto){
        let orcamento = orcamentos[produto][tempoVigencia];
        if (tempoVigencia != 0 && tempoVigencia != 1 && tempoVigencia != 2){ return; }
        if (!orcamento){ return; }
        if (!orcamento.tipo){ return; }
        if (!orcamento.criadoEm){ return; }

        let criadoEm = orcamento.criadoEm.toString().split('T')[0];
        let outdated = new Date() - new Date(criadoEm);
        outdated = (outdated / (1000 * 60 * 60 * 24)) > 5;
        if (outdated){ apiCallOrcamento(produto, tempoVigencia); return; }

        orcamento.vigencia = tempoVigencia + 1;
        encryptedData.orcamento = orcamento;
        encryptedData.itemData = valoresCobertura[produto];
        //console.log(encryptedData);
        localStorage.setItem('finalData', JSON.stringify(encryptedData));

        let payload = JSON.parse(JSON.stringify(orcamento));
        payload.coberturas = valoresCobertura[produto];
        

        $("#loading-screen").show();
        try {
            const response = await fetch("/planos/salvar-orcarmento", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                let data = await response.json();
                $("#loading-screen").hide();
                window.location.href = data.redirect;//'./login';
            } else {
                let data = await response.json();
                $("#loading-screen").hide();
                window.location.href = data.redirect;//'./login';
            } 
        } catch (error) {
            let data = await response.json();
            $("#loading-screen").hide();
            window.location.href = data.redirect;//'./login';
        }      
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
                    //console.log(`[${vigencia + 1} ANO] ${produto}: ${res.status}, Tentativas: ${tentativaTimeOut[produtoUpperCase][vigencia]}`); 
                    return;
                }
                if (res.error && res.status > 499 && tentativaTimeOut[produtoUpperCase][vigencia] < 3){ 
                    tentativaTimeOut[produtoUpperCase][vigencia] += 1; 
                    orcamentos[produto][vigencia] = false;
                    apiCallOrcamento(produto, vigencia); 
                    //console.log(`[${vigencia + 1} ANO] ${produto}: ${res.status}, Tentativas: ${tentativaTimeOut[produtoUpperCase][vigencia]}`); 
                    return;
                }
                if (res.error && res.status != 200){
                    let stopLoading = true;
                    produtosUpperCase.forEach((plano)=>{ loadingProduto[plano].forEach((loading)=>{ if (loading){ stopLoading = false; } }); });                 
                    if (stopLoading){ loadingScreen.hide(); }
                    tentativaTimeOut[produtoUpperCase][vigencia] = 0; 
                    orcamentos[produto][vigencia] = false;   
                    produtoReady[vigencia][indexProduto] = true;
                    atualizarCard(produto, vigencia, {}, true);
                    //console.log(`[${vigencia + 1} ANO] ${produto}: ${res.status} -`, res.data.messages);
                    return;
                }
                let stopLoading = true;
                produtosUpperCase.forEach((plano)=>{ loadingProduto[plano].forEach((loading)=>{ if (loading){ stopLoading = false; } }); });                 
                if (stopLoading){ loadingScreen.hide(); }
                tentativaTimeOut[produtoUpperCase][vigencia] = 0;  
                orcamentos[produto][vigencia] = res.data;  
                button.css('background-color', '');
                produtoReady[vigencia][indexProduto] = true;
                atualizarCard(produto, vigencia, res.data, false);
                //console.log(`[${vigencia + 1} ANO] ${produto}: OK`);
            },
            error: function(xhr, status, error) {  
                let stopLoading = true;
                produtosUpperCase.forEach((plano)=>{ loadingProduto[plano].forEach((loading)=>{ if (loading){ stopLoading = false; } }); });         
                if (stopLoading){ loadingScreen.hide(); }
                tentativaTimeOut[produtoUpperCase][vigencia] = 0;    
                loadingProduto[produtoUpperCase][vigencia] = false;
                produtoReady[vigencia][indexProduto] = true;
                atualizarCard(produto, vigencia, {}, true);
                //console.log(`[${vigencia + 1} ANO] ${produto}`, 'Error:', error, 'Status:', status); 
            }
        });
    } 
    
    function atualizarVigencia(produto, vigencia){
        //console.log(vigencia)
        let produtos = ['habitual', 'habitual-premium', 'veraneio'];
        let tituloPlano = ['ESSENCIAL', 'EXCLUSIVE', 'CONFORTO'];
        let index = produtos.indexOf(produto);
        index = index + 1;

        tempoVigencia = vigencia;

        let mainContainer = $(`.card-price#card-price-${index}`).parent();
        let priceContainer = $(`.card-price#card-price-${index}`);
        let totalContainer = mainContainer.children('p.text-center');
        let parcelasContainer = $(`.card-price#card-price-${index} > .parcela`);
        let centavosContainer = $(`.card-price#card-price-${index} > .centavos`);
        let inteiroContainer = $(`.card-price#card-price-${index} > .inteiro`);
        let jurosFlag = $(`.card-price#card-price-${index} > .period`);
        let button = $(`#btn-plano-${index}`);

        let cardContainer = mainContainer.parent();
        let titleContainer = cardContainer.children('h5.card-title');
        let cardTitle = (vigencia == 0) ? `${tituloPlano[index-1]}` : `${tituloPlano[index-1]} - ${vigencia + 1} ANOS`;
        titleContainer.html(cardTitle);

        //console.log(dadosCobertura[produto]);
        let cobertura = dadosCobertura[produto] || {};
        let card = cobertura.card[vigencia] || false;
        //console.log('card:', card)
        if (!card){ return; }
        
        let numeroParcelas = card.numeroParcelas; 
        let primeiraParcela = card.primeiraParcela;
        //let demaisParcelas = card.demaisParcelas;
        let valorTotal = card.valorTotal;
        
        let valor = primeiraParcela.split(',');

        //let textParcela = priceContainer.contents().filter(function() { return this.nodeType === 3;});
        //textParcela.each(function() {  this.textContent = valor[0];/*primeiraParcela;*/ });
        inteiroContainer.html(`${valor[0]}`);
        centavosContainer.html(`,${valor[1]}`);
        totalContainer.html(`Valor Total: R$${valorTotal}`);
        parcelasContainer.html(`${numeroParcelas}x`);
        //if (!juros){ jurosFlag.css('display', 'inline'); }else{ jurosFlag.css('display', 'none'); }
        jurosFlag.css('display', 'none');
        if (card.error){ button.css('background-color', 'gray'); }else{ button.css('background-color', ''); }
        return;
    }

    function atualizarCard(produto, vigencia, data, error){
        let produtos = ['habitual', 'habitual-premium', 'veraneio'];
        let tituloPlano = ['ESSENCIAL', 'EXCLUSIVE', 'CONFORTO'];
        let index = produtos.indexOf(produto);
        let cobertura = dadosCobertura[produto];
        if (index < 0){ return; }
        index = index + 1;

        let mainContainer = $(`.card-price#card-price-${index}`).parent();        
        let priceContainer = $(`.card-price#card-price-${index}`);
        let totalContainer = mainContainer.children('p.text-center');
        let parcelasContainer = $(`.card-price#card-price-${index} > .parcela`);
        let inteiroContainer = $(`.card-price#card-price-${index} > .inteiro`);
        let centavosContainer = $(`.card-price#card-price-${index} > .centavos`);
        let jurosFlag = $(`.card-price#card-price-${index} > .period`);

        let cardContainer = mainContainer.parent();
        let titleContainer = cardContainer.children('h5.card-title');

        if (error){
            if (tempoVigencia == vigencia){
                //let textParcela = priceContainer.contents().filter(function() { return this.nodeType === 3;});
                //textParcela.each(function() { this.textContent = '--'; });
                inteiroContainer.html('--');
                centavosContainer.html(',--')
                totalContainer.html(`Valor Total: R$--,--`);
                parcelasContainer.html(`--x`);
                jurosFlag.css('display', 'none');
            }            
            if (!cobertura.card){ cobertura.card = []; }
                cobertura.card = { 
                    vigencia: vigencia,
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

                if (!cobertura.card){ cobertura.card = []; }
                cobertura.card[vigencia] = { 
                    vigencia: vigencia,
                    numeroParcelas: numeroParcelas, 
                    primeiraParcela: primeiraParcela, 
                    demaisParcelas: demaisParcelas, 
                    valorTotal: valorTotal, 
                    displayJuros: 'none',
                    error: false 
                };                
                if (tempoVigencia == vigencia){
                    let cardTitle = (vigencia == 0) ? `${tituloPlano[index-1]}` : `${tituloPlano[index-1]} - ${vigencia + 1} ANOS`;
                    //let textParcela = priceContainer.contents().filter(function() { return this.nodeType === 3;});
                    let valor = primeiraParcela.split(',');
                    //textParcela.each(function() { this.textContent = valor[0];/*primeiraParcela;*/ });
                    inteiroContainer.html(`${valor[0]}`);
                    centavosContainer.html(`,${valor[1]}`);
                    totalContainer.html(`Valor Total: R$${valorTotal}`);
                    parcelasContainer.html(`${numeroParcelas}x`);
                    //if (!juros){ jurosFlag.css('display', 'inline'); }else{ jurosFlag.css('display', 'none'); }
                    jurosFlag.css('display', 'none');
                    titleContainer.html(cardTitle);
                }
            }
        });
        //console.log('dadosCobertura:', dadosCobertura);
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
            success: function(res) { /*console.log('Sucesso:', res);*/ },
            error: function(xhr, status, error) { /*console.error('Error:', error);*/ }
        });
    }

    function configurarJanelaDePlano(){
        let inputsRange = $('input[type="range"]');
        let modalTitle = $('h5#modal-editar-plano1');
        let defaultTitle = 'Personalize Mais Ainda o Seu Plano';        
        modalTitle.html(defaultTitle);
        switch(indexJanela){
            case 1:
                modalTitle.html('Personalize Mais Ainda o Seu Plano Essencial');
                controleCoberturaMain('habitual');
                inputsRange
                    .off('change', controleCoberturaMain )
                    .on('change', {param1: 'habitual'}, controleCoberturaMain );
                break;
            case 2:
                modalTitle.html('Personalize Mais Ainda o Seu Plano Exclusive');
                controleCoberturaMain('habitual-premium');
                inputsRange
                    .off('change', controleCoberturaMain )
                    .on('change', {param1: 'habitual-premium'}, controleCoberturaMain );
                break;
            case 3:
                modalTitle.html('Personalize Mais Ainda o Seu Plano Conforto');
                controleCoberturaMain('veraneio');
                inputsRange
                    .off('change', controleCoberturaMain )
                    .on('change', {param1: 'veraneio'}, controleCoberturaMain );
                break;
        }
    }

    function controleCoberturaMain(event){
        //console.log(event, dadosCobertura);
        var produto = event;
        if (produto != 'habitual' && produto != 'habitual-premium' && produto != 'veraneio'){ produto = event.data.param1; }
        let inputs = {};
        let inputChange = this.id;
        let todasInputRange = $('input[type="range"]');

        var premiumBaseValue = {}
        premiumBaseValue.valorcoberturaincendio = 5000000;
        premiumBaseValue.valorcoberturasubstracaobens = 150000;
        premiumBaseValue.valorcoberturapagamentoaluguel = 40000;
        premiumBaseValue.valorcoberturarcfamiliar = 50000;
        premiumBaseValue.valorcoberturadanoseletricos = 160000;
        premiumBaseValue.valorcoberturavendaval = 60000;
        premiumBaseValue.valorcoberturadesmoronamento = 15000;
        premiumBaseValue.valorcoberturavazamentostanquestubulacoes = 40000;
        premiumBaseValue.valorcoberturaquebravidros = 90000;
        premiumBaseValue.valorcoberturapagamentocondominio = 1300;
        premiumBaseValue.valorcoberturatremorterraterremoto = 15000;
        premiumBaseValue.valorcoberturaalagamento = 20000;
        premiumBaseValue.valorimpactoveiculos = 160000;
        premiumBaseValue.valorsubtracaobicicleta = 2500;
        premiumBaseValue.valornegociocasa = 20000;
        premiumBaseValue.valorpequenasreformas = 60000;
        premiumBaseValue.valordanosmorais = 5000;

        var veraneioBaseValue = {}
        veraneioBaseValue.valorcoberturaincendio = 450000;
        veraneioBaseValue.valorcoberturasubstracaobens = 60000;
        veraneioBaseValue.valorcoberturarcfamiliar = 10000;
        veraneioBaseValue.valorcoberturadanoseletricos = 75000;
        veraneioBaseValue.valorcoberturavendaval = 75000;
        veraneioBaseValue.valorcoberturadesmoronamento = 10000;
        veraneioBaseValue.valorcoberturavazamentostanquestubulacoes = 25000;
        veraneioBaseValue.valorcoberturaquebravidros = 35000;
        veraneioBaseValue.valorcoberturatremorterraterremoto = 10000;
        veraneioBaseValue.valorcoberturaalagamento = 10000;
        veraneioBaseValue.valorimpactoveiculos = 90000;

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
                if (produto == 'habitual-premium'){
                    inputs[input.id] = { 
                        id: input.id, 
                        value: (premiumBaseValue[input.id]) ? premiumBaseValue[input.id] : parseInt(cobertura.value), 
                        min: cobertura.min, 
                        max: cobertura.max, 
                        disabled: (cobertura.disabled) ? true : false, 
                        display: true 
                    };
                }
                if (produto == 'veraneio'){
                    inputs[input.id] = { 
                        id: input.id, 
                        value: (veraneioBaseValue[input.id]) ? veraneioBaseValue[input.id] : parseInt(cobertura.value), 
                        min: cobertura.min, 
                        max: cobertura.max, 
                        disabled: (cobertura.disabled) ? true : false, 
                        display: true 
                    };
                }                
            });
        }else{
            todasInputRange.each((index)=>{ 
                let input = todasInputRange[index];
                let cobertura = dadosCobertura[produto][input.id];

                if (!cobertura){ cobertura = input;}
                if (inputChange && inputChange == input.id){ cobertura.value = this.value; }

                inputs[input.id] = { id: input.id, value: cobertura.value, min: cobertura.min, max: cobertura.max, disabled: (cobertura.disabled) ? true : false, display: true };
            });
        }

        controleValidacaoCoberturas(produto, {inputs: inputs});
    }

    function controleValidacaoCoberturas(produto, data){
        let inputs = data.inputs;

        inputs.valorcoberturaincendio.min = 100000;
        inputs.valorcoberturaincendio.max = (tipoResidencia == 2) ? 700000 : 1000000;

        if (produto == 'habitual-premium'){ inputs.valorcoberturaincendio.min = (tipoResidencia == 2) ? 7100000 : 1100000; inputs.valorcoberturaincendio.max = 20000000; }
        if (produto == 'veraneio'){ inputs.valorcoberturaincendio.max = (tipoResidencia == 3 || tipoResidencia == 8) ? 700000 : 4000000; }

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
    
            inputs.valorcoberturapagamentocondominio.min = 500;
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
            let ativoElement = $(`#${input.id}-ativo`);

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
                //if (input.id == 'valorcoberturapagamentocondominio'){ 
                //    valoresCobertura[produto].valorCoberturaMorteAcidental = 5000; 
                //    dadosCobertura[produto].valorCoberturaMorteAcidental = { value: 5000, min: 5000, max: 5000, disabled: false, display: false, display: false };
                //}
                if (enable){
                    valoresCobertura[produto][nomeCobertura] = input.value;
                    inputElement.prop("disabled", false);

                    toggleElement.css('background-color', '#03A8DB');
                    toggleElement.css('border-color', '#03A8DB');
                    switchElement.css('margin-left', '20px');
                    labelElement.css('display', 'block');
                    inativoElement.css('display', 'none');
                    ativoElement.css('display', 'block');   
                }else{
                    inputElement.prop("disabled", true); 
                    toggleElement.css('background-color', '#C7C7C7'); 
                    toggleElement.css('border-color', '#C7C7C7');
                    switchElement.css('margin-left', '0px');
                    labelElement.css('display', 'none');
                    inativoElement.css('display', 'block');
                    ativoElement.css('display', 'none');
                }
            }else{ //Input Desativada
                inputElement.prop("disabled", true); 
                toggleElement.css('background-color', '#C7C7C7'); 
                toggleElement.css('border-color', '#C7C7C7');
                switchElement.css('margin-left', '0px');
                labelElement.css('display', 'none');
                inativoElement.css('display', 'block');
                ativoElement.css('display', 'none');
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
                //console.log(input.id, !(dadosCobertura[produto][input.id].disabled));

                controleCoberturaMain(produto);
                //console.log(valoresCobertura);
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
    //console.log(encryptedData);
});


// ESSENCIAL -> CONFORTO -> EXCLUSIVE
var valoresCobertura = {};
var dadosCobertura = {};

$(document).ready(function() {
    var armazenarVigencia = [];

    var indexJanela = -1;
    var tempoVigencia = 0;
    var tipoProduto = false;
    var listaProdutos = ['habitual', 'habitual-premium', 'veraneio'];
    var listaPlanos = ['essencial', 'conforto', 'exclusive'];
    var tipoResidencia = 0;
    var formulario = {};

    var tentativaTimeOut = { 
        essencial: [0, 0, 0], 
        conforto: [0, 0, 0], 
        exclusive: [0, 0, 0] 
    };

    var loadingPlanos = { 
        essencial: [false, false, false], 
        conforto: [false, false, false], 
        exclusive: [false, false, false] 
    };

    var planoCarregado = {
        1: [false, false, false],
        2: [false, false, false],
        3: [false, false, false]
    }

    var orcamentos = [];

    var btnEditarPlano = { 1: $("#editar-plano-1"), 2: $("#editar-plano-2"), 3: $("#editar-plano-3") };
    var btnSelecionarPlano = { 1: $("#btn-plano-1"), 2: $("#btn-plano-2"), 3: $("#btn-plano-3") };
    var btnFecharJanela = [$("div#modal-editar-plano1"), $("button#btn-save"), $("button.btn-close"), $("button#btn-cancel")];
    var btnVigencia = { 1: $('#btn-vigencia-1'), 2: $('#btn-vigencia-2') };
    var btnAssistencia = { 1: $('#ver-assistencias-1'), 2: $('#ver-assistencias-2'), 3: $('#ver-assistencias-3') };

    var modalAssistencia = $('#janela-assistencias');

    var slickCarousel = $('.slick-carousel');   
    var modalScreen = $(".modal-dialog");
    var loadingScreen = $("#loading-screen");

    function atualizarCard(produto, plano, vigencia, data, error){
        let produtos = ['habitual', 'habitual-premium', 'veraneio'];
        let tituloPlano = ['ESSENCIAL', 'EXCLUSIVE', 'CONFORTO'];

        let index = listaPlanos.indexOf(plano) + 1;
        let cobertura = dadosCobertura[produto][plano][vigencia];
        if (index <= 0){ return; }

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
            if (!cobertura.card){ cobertura.card = {}; }
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
                cobertura.card = { 
                    vigencia: vigencia,
                    numeroParcelas: numeroParcelas, 
                    primeiraParcela: primeiraParcela, 
                    demaisParcelas: demaisParcelas, 
                    valorTotal: valorTotal, 
                    displayJuros: 'none',
                    error: false 
                };                
                if (tempoVigencia == vigencia){
                    let cardTitle = (vigencia == 1) ? `${plano.toUpperCase()}` : `${plano.toUpperCase()} - ${vigencia} ANOS`;
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

    function apiCallOrcamento(produto, plano, vigencia) {
        //if (!/^[1-3]{1}$/.test(vigencia)){ return; }
        console.log('vigencia', vigencia)
        console.log('AA')

        let indexPlano = listaPlanos.indexOf(plano);
        let payload = {};
        let showLoading = true;
        let button = $(`#btn-plano-${indexPlano + 1}`);

        if (loadingPlanos[plano][vigencia -1]){ return; }
        listaPlanos.forEach((plano)=>{ loadingPlanos[plano].forEach((loading)=>{ if (loading){ showLoading = false; } }); });
        
        if (showLoading){ loadingScreen.show(); }
        loadingPlanos[plano][vigencia - 1] = true;
        
        //payload.items = valoresCobertura[produto][plano][vigencia];
        payload.formulario = formulario;
        payload.produto = produto;
        payload.plano = plano;
        payload.vigencia = vigencia;
        payload.dadosCobertura = {};
        button.css('background-color', 'gray');

        for (let key in dadosCobertura[produto][plano][vigencia]){
            cobertura = dadosCobertura[produto][plano][vigencia][key];
            if (!cobertura){ continue; }
            if (key == 'card'){ continue; }
            if (!payload.dadosCobertura[key]){ payload.dadosCobertura[key] = {}; }
            payload.dadosCobertura[key].value = parseInt(dadosCobertura[produto][plano][vigencia][key].value);            
            payload.dadosCobertura[key].disabled = dadosCobertura[produto][plano][vigencia][key].disabled;
        }
        console.log('payload:', payload);

        $.ajax({
            url: '/planos',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function(res) {
                loadingPlanos[plano][vigencia - 1] = false; 
                if (res.error && (res.status == 504 || res.status == 401 || res.status == 429) && tentativaTimeOut[plano][vigencia - 1] < 4){ 
                    tentativaTimeOut[plano][vigencia - 1] += 1; 
                    orcamentos[produto][plano][vigencia] = false;
                    apiCallOrcamento(produto, plano, plano, vigencia); 
                    console.log(`[${vigencia} ANO] ${produto} - ${plano}: ${res.status}, Tentativas: ${tentativaTimeOut[plano][vigencia - 1]}`); 
                    return;
                }
                if (res.error && res.status > 499 && tentativaTimeOut[plano][vigencia - 1] < 3){ 
                    tentativaTimeOut[plano][vigencia - 1] += 1; 
                    orcamentos[produto][plano][vigencia] = false;
                    apiCallOrcamento(produto, plano, plano, vigencia); 
                    console.log(`[${vigencia} ANO] ${produto} - ${plano}: ${res.status}, Tentativas: ${tentativaTimeOut[plano][vigencia - 1]}`); 
                    return;
                }
                if (res.error && res.status != 200){
                    let stopLoading = true;
                    for(let i in loadingPlanos){
                        let _plano = loadingPlanos[i];
                        for(let k in _plano){ 
                            let loading = _plano[k]; 
                            if (loading){ stopLoading = false; } 
                        }
                    }            
                    if (stopLoading){ loadingScreen.hide(); }

                    tentativaTimeOut[plano][vigencia - 1] = 0; 
                    orcamentos[produto][plano][vigencia] = false;  
                    planoCarregado[vigencia][indexPlano] = true;

                    atualizarCard(produto, plano, vigencia, {}, true);
                    console.log(`[${vigencia} ANO] ${produto} - ${plano}: ${res.status} -`, res.data.messages);
                    return;
                }
                let stopLoading = true;
                for(let i in loadingPlanos){
                    let _plano = loadingPlanos[i];
                    for(let k in _plano){ 
                        let loading = _plano[k]; 
                        if (loading){ stopLoading = false; } 
                    }
                } 
                if (stopLoading){ loadingScreen.hide(); }
                
                tentativaTimeOut[plano][vigencia - 1] = 0;  
                orcamentos[produto][plano][vigencia] = res.data; 
                planoCarregado[vigencia][indexPlano] = true;

                button.css('background-color', '');
                atualizarCard(produto, plano, vigencia, res.data, false);
                console.log(`[${vigencia} ANO] ${produto} - ${plano}: OK`);
                console.log(`[${vigencia} ANO] ${produto} - ${plano}: ${res.status} -`, res.data);
            },
            error: function(xhr, status, error) {  
                let stopLoading = true;
                for(let i in loadingPlanos){
                    let _plano = loadingPlanos[i];
                    for(let k in _plano){ 
                        let loading = _plano[k]; 
                        if (loading){ stopLoading = false; } 
                    }
                } 
                if (stopLoading){ loadingScreen.hide(); }

                tentativaTimeOut[plano][vigencia - 1] = 0;    
                loadingPlanos[plano][vigencia - 1] = false;
                planoCarregado[vigencia][indexPlano] = true;
                
                atualizarCard(produto, plano, vigencia, {}, true);
                console.log(`[${vigencia} ANO] ${produto} - ${plano}`, 'Error:', error, 'Status:', status); 
            }
        });
    }

    async function salvarOrcamento(produto, plano, vigencia){
        let orcamento = orcamentos[produto][plano][vigencia]
        if (/^[1-3]{1}$/.test(vigencia)){ return; }
        if (!orcamento){ return; }
        if (!orcamento.tipo){ return; }
        if (!orcamento.criadoEm){ return; }

        let criadoEm = orcamento.criadoEm.toString().split('T')[0];
        let outdated = new Date() - new Date(criadoEm);
        outdated = (outdated / (1000 * 60 * 60 * 24)) > 5;
        if (outdated){ apiCallOrcamento(produto, plano, vigencia); return; }

        //console.log(encryptedData);
        localStorage.setItem('final-form', JSON.stringify(encryptedData));

        let payload = JSON.parse(JSON.stringify(orcamento));
        payload.coberturas = dadosCobertura;
        $("#loading-screen").show();
        try {
            const response = await fetch("/planos/salvar-orcarmento", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                let data = await response.json();
                $(window).on('beforeunload', ()=>{ $('#loading-screen').hide(); });
                window.location.href = data.redirect;//'./login';
            } else {
                let data = await response.json();
                $(window).on('beforeunload', ()=>{ $('#loading-screen').hide(); });
                window.location.href = data.redirect;//'./login';
            } 
        } catch (error) {
            let data = await response.json();
            $(window).on('beforeunload', ()=>{ $('#loading-screen').hide(); });
            window.location.href = data.redirect;//'./login';
        }      
    }

    function inciarConfiguracaoDOM(){
        slickCarousel.slick({ infinite: false, slidesToShow: 3, slidesToScroll: 1, responsive: [ { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } } ] });

        modalScreen.on("click", function(e) { e.stopPropagation(); });

        for (let i in btnEditarPlano) {
            let index = parseInt(i);
            btnEditarPlano[i].on('click', (e)=>{ indexJanela = index; configurarJanelaDePlano(); });
        }

        for (let i in btnSelecionarPlano) {
            let index = parseInt(i);
            btnSelecionarPlano[i].on('click', (e)=>{ e.preventDefault(); /*if (!loadingProduto[listaPlanos[index]][tempoVigencia]){ /*salvarOrcamento(listaPlanos[index]); }*/ });
        }

        for (let i in btnFecharJanela) {
            btnFecharJanela[i].on("click", ()=>{ salvarItens(); apiCallOrcamento(tipoProduto, listaPlanos[indexJanela], tempoVigencia); }); 
        }

        for (let i in btnVigencia){
            let index = parseInt(i);
            btnVigencia[i].on('click', ()=>{
                let delay = 0;
                if (!planoCarregado[index][0]){ limparCards(1); setTimeout(()=>{ apiCallOrcamento(tipoProduto, 'essencial', index); }, delay); delay += 100; }
                if (!planoCarregado[index][1]){ limparCards(2); setTimeout(()=>{ apiCallOrcamento(tipoProduto, 'conforto', index); }, delay); delay += 100; }
                if (!planoCarregado[index][2]){ limparCards(3); setTimeout(()=>{ apiCallOrcamento(tipoProduto, 'exclusive', index); }, delay); delay += 100; }

                $(".my-pills-link").removeClass('active');
                btnVigencia[index].addClass('active');

                atualizarVigencia(tipoProduto, 'essencial', index);
                atualizarVigencia(tipoProduto, 'conforto', index);
                atualizarVigencia(tipoProduto, 'exclusive', index);
            });
        }

        listaProdutos.map((produto)=>{
            orcamentos[produto] = [];
            listaPlanos.map((plano)=>{
                orcamentos[produto][plano] = [];
                for(let i = 1; i < 4; i++){ orcamentos[produto][plano][i] = false; }
            })
        });
    }

    function atualizarVigencia(produto, plano, vigencia){
        let index = listaPlanos.indexOf(plano) + 1;

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
        let cardTitle = (vigencia == 1) ? `${plano.toUpperCase()}` : `${plano.toUpperCase()} - ${vigencia} ANOS`;
        titleContainer.html(cardTitle);

        //console.log(dadosCobertura[produto]);
        let cobertura = dadosCobertura[produto][plano][vigencia] || {};
        let card = cobertura.card || false;
        if (!card){ return; }
        
        let numeroParcelas = card.numeroParcelas; 
        let primeiraParcela = card.primeiraParcela;
        let demaisParcelas = card.demaisParcelas;
        let valorTotal = card.valorTotal;        
        let valor = primeiraParcela.split(',');

        inteiroContainer.html(`${valor[0]}`);
        centavosContainer.html(`,${valor[1]}`);
        totalContainer.html(`Valor Total: R$${valorTotal}`);
        parcelasContainer.html(`${numeroParcelas}x`);
        //if (!juros){ jurosFlag.css('display', 'inline'); }else{ jurosFlag.css('display', 'none'); }
        jurosFlag.css('display', 'none');
        if (card.error){ button.css('background-color', 'gray'); }else{ button.css('background-color', ''); }
        return;
    }

    function janelaAssistenciaDOM(orcamento){
        modalAssistencia.empty();
        if (!orcamentos){ return false; }
        let todasAssistencias = retornarAssistencia(orcamento.tipo, orcamento.plano, orcamento.vigencia, orcamento.residencia, orcamento.servico);
        let primeiraLinha = true;
        todasAssistencias.map((assistencias)=>{
            assistencias.map((assistencia, index)=>{
                console.log(primeiraLinha);
                let elemento = `<div class="assistencia-linha">${assistencia}</div>`;
                if (index == 0){ 
                    if (primeiraLinha){  
                        elemento = `<h6 class="titulo-assistencia">${assistencia}:</h6>`;
                        primeiraLinha = false;
                    }else{ elemento = `<h6 class="titulo-assistencia" style="margin-top: 15px;">${assistencia}:</h6>`; }
                }
                //if (index == 0 && !primeiraLinha){ elemento = `<h6 class="titulo-assistencia" style="margin-top: 15px;">${assistencia}:</h6>`; }
                modalAssistencia.append(elemento);
            });
        });
    }

    function validacaoInicial(){
        //loadingScreen.show();
        inciarConfiguracaoDOM();

        let storageForm = localStorage.getItem('prime-form');
        let storageDadosCoberturas = localStorage.getItem('prime-dadosCobertura');
        let storageValoresCoberturas = localStorage.getItem('prime-valoresCobertura');

        if (!storageForm || !storageDadosCoberturas || !storageValoresCoberturas){
            $(window).on('beforeunload', ()=>{ loadingScreen.hide(); });
            window.location.href = '/';
            return;
        }

        storageForm = JSON.parse(storageForm);
        dadosCobertura = JSON.parse(storageDadosCoberturas);
        valoresCobertura = JSON.parse(storageValoresCoberturas);

        if (!validarTipoResidencia(storageForm.tipoResidencia)){
            $(window).on('beforeunload', ()=>{ loadingScreen.hide(); });
            window.location.href = '/';
            return;
        }      

        formulario = storageForm;
        tipoResidencia = parseInt(storageForm.tipoResidencia);
        if ([1, 2, 3].includes(tipoResidencia)){ tipoProduto = 'habitual'; }
        if ([4, 8].includes(tipoResidencia)){ tipoProduto = 'veraneio'; }
        if (!tipoProduto){
            $(window).on('beforeunload', ()=>{ loadingScreen.hide(); });
            window.location.href = '/';
            return;
        }

        $('.my-pills-link').removeClass('active');
        $('#btn-vigencia-1').addClass('active');
        
        tempoVigencia = 1;

        gerarToggleSwitch();
        
        inciarCoberturaMain(tipoProduto, 'essencial', tempoVigencia, tipoResidencia, false);
        inciarCoberturaMain(tipoProduto, 'conforto', tempoVigencia, tipoResidencia, false);
        inciarCoberturaMain(tipoProduto, 'exclusive', tempoVigencia, tipoResidencia, false);

        btnAssistencia[1].on('click', ()=>{ 
            if (!['habitual', 'veraneio'].includes(tipoProduto)){ return false; }
            janelaAssistenciaDOM(orcamentos[tipoProduto]['essencial'][tempoVigencia]);
            console.log(orcamentos[tipoProduto]['essencial'][tempoVigencia]); 
        });
        btnAssistencia[2].on('click', ()=>{ 
            if (!['habitual', 'veraneio'].includes(tipoProduto)){ return false; }
            janelaAssistenciaDOM(orcamentos[tipoProduto]['conforto'][tempoVigencia])
            console.log(orcamentos[tipoProduto]['conforto'][tempoVigencia]); 
        });
        btnAssistencia[3].on('click', ()=>{ 
            if (!['habitual', 'veraneio'].includes(tipoProduto)){ return false; }
            janelaAssistenciaDOM(orcamentos[tipoProduto]['exclusive'][tempoVigencia])
            console.log(orcamentos[tipoProduto]['exclusive'][tempoVigencia]); 
        });

        setTimeout(()=>{ apiCallOrcamento(tipoProduto, 'essencial', 1); }, 10); 
        setTimeout(()=>{ apiCallOrcamento(tipoProduto, 'conforto', 1); }, 120); 
        setTimeout(()=>{ apiCallOrcamento(tipoProduto, 'exclusive', 1); }, 240);

        loadingScreen.hide();
    }
    
    function salvarItens(){
        return;
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

    function configurarJanelaDePlano(){
        if (!/^[1-3]{1}$/.test(indexJanela)){ return; }

        let inputsRange = $('input[type="range"]');
        let modalTitle = $('h5#modal-editar-plano1');
        let planosTitle = ['Personalize Mais Ainda o Seu Plano', 'Personalize Mais Ainda o Seu Plano Essencial', 'Personalize Mais Ainda o Seu Plano Conforto', 'Personalize Mais Ainda o Seu Plano Exclusive']; 
        
        modalTitle.html(planosTitle[indexJanela]);

        inciarCoberturaMain(tipoProduto, listaPlanos[indexJanela], tempoVigencia, tipoResidencia, false);

        inputsRange.off('change');
        inputsRange.on('change', (e)=>{ inciarCoberturaMain(tipoProduto, listaPlanos[indexJanela], tempoVigencia, tipoResidencia, e.target.id); });
    }

     

    validacaoInicial();        

});

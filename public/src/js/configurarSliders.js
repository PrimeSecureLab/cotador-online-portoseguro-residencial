/*function contacaCoberturas(){
    let inputsRange = $('input[type="range"]');

    let inputs = {};
    let inputChange = this.id;
    let residencia = $('#tiporesidencia').val();
    
    if (!dadosCobertura['generica'].valorCoberturaIncendio){
        inputsRange.each((index)=>{ 
            let input = inputsRange[index];
            if (inputChange && inputChange == input.id){ input.value = this.value; }
            inputs[input.id] = { id: input.id, value: parseInt(input.value), min: input.min, max: input.max, disabled: !(input.value > 0), display: true };
        });
    }else{
        inputsRange.each((index)=>{
            let input = inputsRange[index];
            let cobertura = dadosCobertura['generica'][input.id];
            if (inputChange && inputChange == input.id){ cobertura.value = this.value; }
            inputs[input.id] = { id: input.id, value: cobertura.value, min: cobertura.min, max: cobertura.max, disabled: cobertura.disabled, display: true };
        });
    }
    
    inputs.valorCoberturaIncendio.min = 100000;
    inputs.valorCoberturaIncendio.max = (residencia == 2) ? 700000 : 1000000;

    if (inputs.valorCoberturaIncendio.value > inputs.valorCoberturaIncendio.max){ 
        inputs.valorCoberturaIncendio.value = inputs.valorCoberturaIncendio.max; 
    }
    if (inputs.valorCoberturaIncendio.value < inputs.valorCoberturaIncendio.min){ 
        inputs.valorCoberturaIncendio.value = inputs.valorCoberturaIncendio.min; 
    }

    let base = inputs.valorCoberturaIncendio.value;

    inputs.valorCoberturaSubstracaoBens.min = 2000;
    inputs.valorCoberturaSubstracaoBens.max = (base * 0.3 > 200000) ? 200000 : base * 0.3;

    inputs.valorCoberturaPagamentoAluguel.min = 3000;
    inputs.valorCoberturaPagamentoAluguel.max = (base * 0.50 > 200000) ? 200000 : base * 0.50;

    inputs.valorCoberturaRCFamiliar.min = 2000;
    inputs.valorCoberturaRCFamiliar.max = (base * 0.5 > 200000) ? 200000 : base * 0.5//base * 0.5;
    inputs.valorCoberturaRCFamiliar.value = (inputs.valorCoberturaRCFamiliar.value > inputs.valorCoberturaRCFamiliar.max) ? inputs.valorCoberturaRCFamiliar.max : inputs.valorCoberturaRCFamiliar.value;

    inputs.valorCoberturaVendaval.min = 2000;
    inputs.valorCoberturaVendaval.max = (base * 0.5 > 500000) ? 500000 : base * 0.5;

    inputs.valorCoberturaDesmoronamento.min = 2000;
    inputs.valorCoberturaDesmoronamento.max = (base * 0.1 > 500000) ? 500000 : base * 0.1;

    inputs.valorCoberturaAlagamento.min = 5000;
    inputs.valorCoberturaAlagamento.max = 300000;//50000;
    //inputs.valorCoberturaAlagamento.disabled = !(residencia == 1 || residencia == 2 || residencia == 4);

    inputs.valorSubtracaoBicicleta.min = 2500;
    inputs.valorSubtracaoBicicleta.max = (base * 0.3 > 15000) ? 15000 : base * 0.3;//(base * 0.3 > 50000) ? 50000 : base * 0.3;
    //inputs.valorSubtracaoBicicleta.disabled = (inputs.valorCoberturaIncendio.value < 250000);

    inputs.valorPequenasReformas.min = 2000;
    inputs.valorPequenasReformas.max = 100000;
    //inputs.valorPequenasReformas.disabled = (residencia == 5 || residencia == 6 || residencia == 7);

    valoresCobertura['generica'] = {};

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
        let inativoElement = $(`#${input.id}-inativo`);
        let ativoElement = $(`#${input.id}-ativo`);

        dadosCobertura['generica'][input.id] = { value: input.value, min: input.min, max: input.max, disabled: input.disabled, display: input.display};
        
        if (!input.disabled){ 
            let enable = true;     
            let nomeCobertura = relacaoItemId[input.id];
            inputElement.prop("disabled", false);

            if (input.id == 'valorSubtracaoBicicleta'){ 
                if (inputs.valorCoberturaIncendio.value < 250000){
                    inativoElement.html('*Liberada quando cobertura de incêndio for maior que R$ 250.000,00');
                    inativoElement.css('font-size', '13px');
                    enable = false; 
                }else{
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                }
            }
            if (input.id == 'valorCoberturaAlagamento'){ 
                if (!(residencia == 1 || residencia == 2 || residencia == 4)){
                    inativoElement.html('*Cobertura não permitida para imóveis desocupados');
                    inativoElement.css('font-size', '13px');
                    enable = false; 
                }else{
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                }
            }
            if (input.id == 'valorPequenasReformas'){ 
                if (residencia == 5 || residencia == 6 || residencia == 7){
                    console.log(residencia)
                    inativoElement.html('*Cobertura não permitida para imóveis desocupados');
                    inativoElement.css('font-size', '13px');
                    enable = false; 
                }else{
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                }
            }
            if (input.id == 'valorCoberturaPagamentoCondominio'){ 
                valoresCobertura['generica'].valorCoberturaMorteAcidental = 5000; 
                dadosCobertura['generica'].valorCoberturaMorteAcidental = { value: 5000, min: 5000, max: 5000, disabled: false, display: false, display: false };
            }
            if (enable){
                valoresCobertura['generica'][nomeCobertura] = input.value;
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

            valoresCobertura['generica'][nomeCobertura] = input.value;
            
        }else{ 
            inputElement.prop("disabled", true); 
            toggleElement.css('background-color', '#C7C7C7'); 
            toggleElement.css('border-color', '#C7C7C7');
            switchElement.css('margin-left', '0px');
            labelElement.css('display', 'none');
            inativoElement.css('display', 'block');
            ativoElement.css('display', 'none');
        }

        toggleElement.off("click").on("click", ()=>{
            if (input.id == 'valorCoberturaIncendio'){ return; }
            dadosCobertura['generica'][input.id].disabled = !(dadosCobertura['generica'][input.id].disabled);
            inputElement.prop("disabled", dadosCobertura['generica'][input.id].disabled);
            controleCoberturasGenerico();
        });

        //let rangeContainer = inputElement.parent();
        //let coberturaContainer = rangeContainer.parent();
        //if (input.display){ coberturaContainer.show(); }else{ coberturaContainer.hide(); }
        //console.log(dadosCobertura)
    }
}*/
function inciarCoberturaMain(produto, plano, residencia, dadosCobertura, valoresCobertura, inputChange_id){
    //console.log(event, dadosCobertura);
    let inputs = {};
    let todasInputRange = $('input[type="range"]');
    let inputChange = inputChange_id || false;
    
    dadosCobertura = dadosCobertura || {};
    valoresCobertura = valoresCobertura || {};

    dadosCobertura.generica = dadosCobertura.generica || {};
    dadosCobertura.essencial = dadosCobertura.essencial || {};
    dadosCobertura.conforto = dadosCobertura.conforto || {};
    dadosCobertura.exclusive = dadosCobertura.exclusive || {};

    valoresCobertura.generica = valoresCobertura.generica || {};
    valoresCobertura.essencial = valoresCobertura.essencial || {};
    valoresCobertura.conforto = valoresCobertura.conforto || {};
    valoresCobertura.exclusive = valoresCobertura.exclusive || {};

    plano = plano || 'generico';

    if (!dadosCobertura[plano].valorCoberturaIncendio){
        todasInputRange.each((index)=>{ 
            let input = todasInputRange[index];
            let cobertura = dadosCobertura[plano][input.id];

            if (!cobertura){ cobertura = input; }
            if (inputChange && inputChange == input.id){ cobertura.value = $(`#${inputChange_id}`).val(); }

            inputs[input.id] = { 
                id: input.id, 
                value: parseInt(cobertura.value), 
                min: cobertura.min, 
                max: cobertura.max, 
                disabled: (cobertura.disabled) ? true : false, 
                display: true 
            };             
        });
        //ajustarValoresCoberturas(produto, plano, residencia, {inputs: inputs});
        return;
    }
        
    todasInputRange.each((index)=>{ 
        let input = todasInputRange[index];
        let cobertura = dadosCobertura[plano][input.id];

        if (!cobertura){ cobertura = input;}
        if (inputChange && inputChange == input.id){ cobertura.value = $(`#${inputChange_id}`).val(); }

        inputs[input.id] = { id: input.id, value: cobertura.value, min: cobertura.min, max: cobertura.max, disabled: (cobertura.disabled) ? true : false, display: true };
    }); 

    //ajustarValoresCoberturas(produto, plano, residencia, {inputs: inputs});
}

function ajustarValoresCoberturas(produto, plano, residencia, dadosCobertura, valoresCobertura, data){
    let inputs = data.inputs;

    inputs.valorCoberturaIncendio.min = 100000;
    inputs.valorCoberturaIncendio.max = (residencia == 2) ? 700000 : 1000000;

    //if (produto == 'habitual-premium'){ inputs.valorCoberturaIncendio.min = (residencia == 2) ? 7100000 : 1100000; inputs.valorCoberturaIncendio.max = 20000000; }
    if (produto == 'veraneio'){ inputs.valorCoberturaIncendio.max = (residencia == 3 || residencia == 8) ? 700000 : 4000000; }

    if (inputs.valorCoberturaIncendio.value > inputs.valorCoberturaIncendio.max){ inputs.valorCoberturaIncendio.value = inputs.valorCoberturaIncendio.max; }
    if (inputs.valorCoberturaIncendio.value < inputs.valorCoberturaIncendio.min){ inputs.valorCoberturaIncendio.value = inputs.valorCoberturaIncendio.min; }

    let base = inputs.valorCoberturaIncendio.value;

    if (produto == 'habitual'){    
        inputs.valorCoberturaDanosEletricos.min = 2000;
        inputs.valorCoberturaDanosEletricos.max = base * 0.5;

        inputs.valorCoberturaSubstracaoBens.min = 2000;
        inputs.valorCoberturaSubstracaoBens.max = (base * 0.3 > 150000) ? 150000 : base * 0.3;

        inputs.valorCoberturaAlagamento.min = 5000;
        inputs.valorCoberturaAlagamento.max = 30000;
        //inputs.valorCoberturaAlagamento.disabled = !(residencia == 1 || residencia == 2 || residencia == 4);

        inputs.valorNegocioCasa.min = 2000;
        inputs.valorNegocioCasa.max = 50000;
        //inputs.valorNegocioCasa.disabled = (inputs.valorCoberturaDanosEletricos.disabled && inputs.valorCoberturaSubstracaoBens.disabled);

        inputs.valorCoberturaRCFamiliar.min = 2000;
        inputs.valorCoberturaRCFamiliar.max = (base * 0.5 > 200000) ? 200000 : base * 0.5; //base * 0.5;
        inputs.valorCoberturaRCFamiliar.value = (inputs.valorCoberturaRCFamiliar.value > inputs.valorCoberturaRCFamiliar.max) ? inputs.valorCoberturaRCFamiliar.max : inputs.valorCoberturaRCFamiliar.value;

        inputs.valorDanosMorais.min = 2000;
        inputs.valorDanosMorais.max = (inputs.valorCoberturaRCFamiliar.value * 0.5 > 50000) ? 50000 : inputs.valorCoberturaRCFamiliar.value * 0.5;
        //inputs.valorDanosMorais.disabled = (inputs.valorCoberturaRCFamiliar.value == 0 || inputs.valorCoberturaRCFamiliar.disabled)

        inputs.valorCoberturaDesmoronamento.min = 2000;
        inputs.valorCoberturaDesmoronamento.max = (base * 0.1 > 100000) ? 100000 : base * 0.1;

        inputs.valorImpactoVeiculos.min = 2000;
        inputs.valorImpactoVeiculos.max = base * 1;
        
        inputs.valorPequenasReformas.min = 2000;
        inputs.valorPequenasReformas.max = 100000;
        //inputs.valorPequenasReformas.disabled = (residencia == 5 || residencia == 6 || residencia == 7);

        inputs.valorCoberturaPagamentoCondominio.min = 300;
        inputs.valorCoberturaPagamentoCondominio.max = 5000;

        inputs.valorCoberturaQuebraVidros.min = 2000;
        inputs.valorCoberturaQuebraVidros.max = base * 0.5;

        inputs.valorCoberturaTremorTerraTerremoto.min = 2000;
        inputs.valorCoberturaTremorTerraTerremoto.max = (base * 0.15 > 500000) ? 500000 : base * 0.15;

        inputs.valorCoberturaVazamentosTanquesTubulacoes.min = 2000;
        inputs.valorCoberturaVazamentosTanquesTubulacoes.max = (base * 0.30 > 100000) ? 100000 : base * 0.30;

        inputs.valorCoberturaVendaval.min = 2000;
        inputs.valorCoberturaVendaval.max = (base * 0.5 > 500000) ? 500000 : base * 0.5;//base * 0.5;

        inputs.valorCoberturaPagamentoAluguel.min = 3000;
        inputs.valorCoberturaPagamentoAluguel.max = (base * 0.50 > 200000) ? 200000 : base * 0.50;

        inputs.valorSubtracaoBicicleta.min = 2500;
        inputs.valorSubtracaoBicicleta.max = (base * 0.3 > 50000) ? 50000 : base * 0.3;
        //inputs.valorSubtracaoBicicleta.disabled = (inputs.valorCoberturaIncendio.value < 250000);
    }

    if (produto == 'veraneio'){
        inputs.valorCoberturaDanosEletricos.min = 2000;
        inputs.valorCoberturaDanosEletricos.max = base * 0.5;

        inputs.valorCoberturaSubstracaoBens.min = 2000;
        inputs.valorCoberturaSubstracaoBens.max = (base * 0.2 > 150000) ? 150000 : base * 0.2;

        inputs.valorCoberturaAlagamento.min = 5000;
        inputs.valorCoberturaAlagamento.max = (base * 0.2 > 30000) ? 30000 : base * 0.2;
        //inputs.valorCoberturaAlagamento.disabled = !(residencia == 1 || residencia == 2 || residencia == 4);

        inputs.valorNegocioCasa.disabled = true;
        inputs.valorNegocioCasa.display = false;

        inputs.valorCoberturaRCFamiliar.min = 2000;
        inputs.valorCoberturaRCFamiliar.max = (base * 0.5 > 200000) ? 200000 : base * 0.5; //(base * 0.5 > 1000000) ? 1000000 : base * 0.5;
        inputs.valorCoberturaRCFamiliar.value = (inputs.valorCoberturaRCFamiliar.value > inputs.valorCoberturaRCFamiliar.max) ? inputs.valorCoberturaRCFamiliar.max : inputs.valorCoberturaRCFamiliar.value;

        inputs.valorDanosMorais.disabled = true;
        inputs.valorDanosMorais.display = false;

        inputs.valorCoberturaDesmoronamento.min = 2000;
        inputs.valorCoberturaDesmoronamento.max = (base * 0.1 > 100000) ? 100000 : base * 0.1;

        inputs.valorImpactoVeiculos.min = 2000;
        inputs.valorImpactoVeiculos.max = base * 1;
        
        inputs.valorPequenasReformas.disabled = true;
        inputs.valorPequenasReformas.display = false;

        inputs.valorCoberturaPagamentoCondominio.disabled = true;
        inputs.valorCoberturaPagamentoCondominio.display = false;

        inputs.valorCoberturaQuebraVidros.min = 2000;
        inputs.valorCoberturaQuebraVidros.max = base * 0.5;

        inputs.valorCoberturaTremorTerraTerremoto.min = 2000;
        inputs.valorCoberturaTremorTerraTerremoto.max = (base * 0.15 > 500000) ? 500000 : base * 0.15;

        inputs.valorCoberturaVazamentosTanquesTubulacoes.min = 2000;
        inputs.valorCoberturaVazamentosTanquesTubulacoes.max = (base * 0.30 > 100000) ? 100000 : base * 0.30;

        inputs.valorCoberturaVendaval.min = 2000;
        inputs.valorCoberturaVendaval.max = (base * 0.5 > 500000) ? 500000 : base * 0.5;//base * 0.5;

        inputs.valorCoberturaPagamentoAluguel.disabled = true;
        inputs.valorCoberturaPagamentoAluguel.display = false;

        inputs.valorSubtracaoBicicleta.disabled = true;
        inputs.valorSubtracaoBicicleta.display = false;
    }

    controladorCoberturaDOM(produto, plano, residencia, dadosCobertura, valoresCobertura, {inputs: inputs});
}

function controladorCoberturaDOM(produto, plano, residencia, dadosCobertura, valoresCobertura, data){
    let inputs = data.inputs;
    let subtracaoSomatoria = 0;

    valoresCobertura[plano] = {};

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
        let inativoElement = $(`#${input.id}-inativo`);
        let ativoElement = $(`#${input.id}-ativo`);

        dadosCobertura[plano][input.id] = { value: input.value, min: input.min, max: input.max, disabled: input.disabled, display: input.display };
        
        if (!input.disabled){ //Input Ativada
            let enable = true;     
            let nomeCobertura = relacaoItemId[input.id];            
            
            if (input.id == 'valorSubtracaoBicicleta' ){ 
                if (produto == 'habitual'){ 
                    if (inputs.valorCoberturaIncendio.value < 250000){    
                        inativoElement.html('*Liberada quando cobertura de incêndio for maior que R$ 250.000,00');
                        inativoElement.css('font-size', '13px');
                        enable = false; 
                    }else{
                        inativoElement.html('(Inativo)');
                        inativoElement.css('font-size', '16px');
                    }
                }
            }
            if (input.id == 'valorNegocioCasa'){ 
                if (inputs.valorCoberturaDanosEletricos.disabled && inputs.valorCoberturaSubstracaoBens.disabled){
                    inativoElement.html('*Liberada quando contratado Danos Elétricos e Subtração de Bens');
                    inativoElement.css('font-size', '13px');
                    enable = false; 
                }else{
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                }
            }
            if (input.id == 'valorPequenasReformas'){ 
                if (residencia == 5 || residencia == 6 || residencia == 7){
                    inativoElement.html('*Cobertura não permitida para imóveis desocupados');
                    inativoElement.css('font-size', '13px');
                    enable = false; 
                }else{
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                }
            }
            if (input.id == 'valorDanosMorais'){ 
                if (inputs.valorCoberturaRCFamiliar.value == 0 || inputs.valorCoberturaRCFamiliar.disabled){
                    inativoElement.html('*Liberada quando contratado Responsabilidade Civil Familiar');
                    inativoElement.css('font-size', '13px');
                    enable = false;
                }else{
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                }
            }
            if (input.id == 'valorCoberturaAlagamento'){ 
                if (!(residencia == 1 || residencia == 2 || residencia == 4)){
                    inativoElement.html('*Cobertura não permitida para imóveis desocupados');
                    inativoElement.css('font-size', '13px');
                    enable = false; 
                }else{
                    inativoElement.html('(Inativo)');
                    inativoElement.css('font-size', '16px');
                }
            }
            if (input.id == 'valorCoberturaPagamentoCondominio'){ 
                valoresCobertura[plano].valorCoberturaMorteAcidental = 5000; 
                dadosCobertura[plano].valorcoberturamorteacidental = { value: 5000, min: 5000, max: 5000, disabled: false, display: false, display: false };
            }
            if (enable){
                valoresCobertura[plano][nomeCobertura] = input.value;
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
            if (input.id == 'valorCoberturaIncendio'){ return; }
            if (input.id == 'valorSubtracaoBicicleta' && inputs.valorCoberturaIncendio.value < 250000){ 
                dadosCobertura[plano][input.id].disabled = true;
                inputElement.prop("disabled", true);
                inativoElement.html('(Inativo)');
                inativoElement.css('font-size', '16px');
                return; 
            }
            if (input.id == 'valorPequenasReformas' && (residencia == 5 || residencia == 6 || residencia == 7)){ 
                dadosCobertura[plano][input.id].disabled = true;
                inputElement.prop("disabled", true);
                inativoElement.html('(Inativo)');
                inativoElement.css('font-size', '16px');
                return;
            }
            if (input.id == 'valorNegocioCasa' && (inputs.valorCoberturaDanosEletricos.disabled && inputs.valorCoberturaSubstracaoBens.disabled)){ 
                dadosCobertura[plano][input.id].disabled = true;
                inputElement.prop("disabled", true);
                inativoElement.html('(Inativo)');
                inativoElement.css('font-size', '16px');
                return; 
            }
            if (input.id == 'valorDanosMorais' && (inputs.valorCoberturaRCFamiliar.value == 0 || inputs.valorCoberturaRCFamiliar.disabled)){ 
                dadosCobertura[plano][input.id].disabled = true;
                inputElement.prop("disabled", true);
                inativoElement.html('(Inativo)');
                inativoElement.css('font-size', '16px');
                return; 
            }
            if (input.id == 'valorCoberturaAlagamento' && (!(residencia == 1 || residencia == 2 || residencia == 4))){ 
                dadosCobertura[plano][input.id].disabled = true;
                inputElement.prop("disabled", true);
                inativoElement.html('(Inativo)');
                inativoElement.css('font-size', '16px');
                return; 
            }
            dadosCobertura[plano][input.id].disabled = !(dadosCobertura[plano][input.id].disabled);
            inputElement.prop("disabled", dadosCobertura[plano][input.id].disabled);
            //console.log(input.id, !(dadosCobertura[produto][input.id].disabled));

            controleCoberturaMain(produto);
            //console.log(valoresCobertura);
            //controleCoberturasHabitual();
            return;
        });
    }
    /*let coberturas = {
        essencial: {}, conforto: {}, exclusive: {}
        habitual: dadosCobertura['habitual'],
        habitualPremium: dadosCobertura['habitual-premium'],
        veraneio: dadosCobertura['veraneio']
    }
    localStorage.setItem('dadosCobertura', JSON.stringify(coberturas));*/
}


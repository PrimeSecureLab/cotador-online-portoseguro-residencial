var newLead = true;
var relacaoItemId = [];
var allItems = [ 'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 
    'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaAlagamento','valorSubtracaoBicicleta', 'valorPequenasReformas' ];

allItems.map((item, index)=>{ relacaoItemId[item.toLowerCase()] = item; });

var dadosCobertura = [];
var valoresCobertura = [];

$(document).ready(function() {
    dadosCobertura['generica'] = {};
    valoresCobertura['generica'] = {};

    var inputsRange = $('input[type="range"]');
    inputsRange.on('change', controleCoberturasGenerico );

    gerarToggleSwitch();
    controleCoberturasGenerico();

    $.ajax({
        url: '/formulario',
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(form) { 
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
            //console.log(form);
            //console.log(dadosCobertura['generica']);            
        },
        error: function(xhr, status, error) { console.error('Error:', error); }
    });

    //Aplica Mascaras nos Inputs
    $("#cpf").mask("999.999.999-99");
    $("#cep").mask("00000-000",{
        translation: { 0: { pattern: /[0-9]/, }, },
        pattern: /^[0-9]{5}-[0-9]{3}/      
    });

    $(".datanascimento").mask("00/00/0000", {
        translation: { 0: { pattern: /[0-9]/, }, },
        pattern: /^[0-9]{4}\/(1[0-2]{1}|0[0-9]{1})\/([0-2]{1}[0-9]{1}|3[0-1]{1})/
    });
    
    let numeroTelefone = $(".numerotelefone");

    numeroTelefone.mask("(00) 0000-00000", { translation: { 0: { pattern: /^[0-9]{1,2}/, }, }, });

    let maskFixo = 1;
    numeroTelefone.on("input, keyup", (e)=>{
        if (numeroTelefone.val().length < 15 && maskFixo == 0){
            maskFixo = 1;
            numeroTelefone.unmask();
            numeroTelefone.mask("(00) 0000-00000", { translation: { 0: { pattern: /^[0-9]{1,2}/, }, }, });
            e.target.selectionStart = numeroTelefone.val().length; //Posiciona o cursor no final do input
        }
        if (numeroTelefone.val().length > 14 && maskFixo == 1){
            maskFixo = 0;
            numeroTelefone.unmask();
            numeroTelefone.mask("(00) 00000-0000", { translation: { 0: { pattern: /^[0-9]{1,2}/, }, }, });
            e.target.selectionStart = numeroTelefone.val().length; //Posiciona o cursor no final do input
        }
    });

    // Ao clicar no botão "next-step", avança para a próxima etapa do formulário
    $(".next-step").click(async function() {
        var currentStep = $(this).closest(".form-step");
        var nextStep = currentStep.next(".form-step");
        let errorList = [];
        let data = {};

        if (currentStep.length > 0){
            let inputArray = currentStep[0].querySelectorAll('input');
            let selectArray = currentStep[0].querySelectorAll('select');

            inputArray.forEach((input)=>{ data[input.id] = input.value; });
            selectArray.forEach((select)=>{ data[select.id] = select.value; });
            data.etapa = currentStep[0].id;
            data.newLead = newLead;
            newLead = false;

            $.ajax({
                url: '/datalayer',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(res) { console.log('Sucesso:', res); },
                error: function(xhr, status, error) { console.error('Error:', error); }
            });

            if (data.etapa == 'step-1'){
                if (data.cpf.replace(/[^0-9]+/g, '').length != 11){ errorList.push({id: 'cpf'}); }
                if (!data.nome){ errorList.push({id: 'nome'}); }
                if (!data.tipotelefone){ errorList.push({id: 'tipotelefone'}); }
                if (data.numerotelefone.replace(/[^0-9]+/g, '').length < 10){ errorList.push({id: 'numerotelefone'}); }
                if (data.datanascimento.replace(/[^0-9]+/g, '').length < 8){ errorList.push({id: 'datanascimento'}); }
                if (data.tipotelefone == 3 && data.numerotelefone.replace(/[^0-9]+/g, '').length != 11){ 
                    if (!errorList.includes('tipotelefone')){ errorList.push({id: 'tipotelefone'}); }
                }
                if (data.tipotelefone == 1 && data.numerotelefone.replace(/[^0-9]+/g, '').length != 10){ 
                    if (!errorList.includes('tipotelefone')){ errorList.push({id: 'tipotelefone'}); }
                }
            }
            if (data.etapa == 'step-2'){
                if (data.cep.replace(/[^0-9]+/g, '').length != 8){ errorList.push({id: 'cep'}); }
                if (!data.tiporesidencia){ errorList.push({id: 'tiporesidencia'}); }else{ tiporResidencia = data.tiporesidencia; }
                if (!data.tiporua){ errorList.push({id: 'tiporua'}); }
                if (!data.logradouro){ errorList.push({id: 'logradouro'}); }
                if (!/^[0-9]{1,4}$/.test(data.numero)){ errorList.push({id: 'numero'}); }
                if (!data.bairro){ errorList.push({id: 'bairro'}); }
                if (!data.cidade){ errorList.push({id: 'cidade'}); }
                if (!data.uf){ errorList.push({id: 'uf'}); }
                controleCoberturasGenerico();
            }
            console.log(data.etapa)
        }
        if (errorList.length > 0){
            errorList.map((error, index)=>{
                let input = $(`#${error.id}`); //Input do campo com erro
                let label = $(`label[for="${error.id}"]`); //Label do campo com erro
                input.addClass('error');
                label.addClass('error');
                if (error.id == 'tipotelefone'){
                    let errorLabel = $('label#telefoneError');
                    if (data.tipotelefone == 3 && data.numerotelefone.replace(/[^0-9]+/g, '').length != 11){
                        errorLabel.css('display', 'block');
                        errorLabel.html('Celular deve ter 11 dígitos');
                    }
                    if (data.tipotelefone == 1 && data.numerotelefone.replace(/[^0-9]+/g, '').length != 10){
                        errorLabel.css('display', 'block');
                        errorLabel.html('Telefone fixo deve ter 10 dígitos');
                    }
                    let telefoneInput = $('#numerotelefone');
                    telefoneInput.on('change keydown paste input', {label: label, input: input} ,(e)=>{ 
                        $('#telefoneError').css('display', 'none');
                        errorLabel.html('');
                        e.data.label.removeClass('error'); 
                        e.data.input.removeClass('error'); 
                    });
                }
                input.on('change keydown paste input', {label: label, input: input} ,(e)=>{ 
                    errorLabel.html('');
                    $('#telefoneError').css('display', 'none');
                    e.data.label.removeClass('error'); 
                    e.data.input.removeClass('error'); 
                });
            });
            return;
        }
        if (nextStep.length > 0) {
            currentStep.removeClass("active").fadeOut(250, function() { nextStep.addClass("active").fadeIn(250); });
        }
    });

    // Ao clicar no botão "prev-step", volta para a etapa anterior do formulário
    $(".prev-step").click(function() {
        newLead = false;
        var currentStep = $(this).closest(".form-step");
        var prevStep = currentStep.prev(".form-step");
        if (prevStep.length > 0) {
            currentStep.removeClass("active").fadeOut(250, function() { prevStep.addClass("active").fadeIn(250); });
        }
    });    

    function formatCurrency(value) {
        if (value < 1000) { return value + ""; }
        if (value < 1000000) { return (value / 1000) + " mil"; } 
        if (value >=  2000000) { return (value / 1000000) + " milhões"; } 
        return (value / 1000000) + " milhão";
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

    function controleCoberturasGenerico(){
        let inputs = {};
        let inputChange = this.id;
        let residencia = $('#tiporesidencia').val();
        
        if (!dadosCobertura['generica'].valorcoberturaincendio){
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
        
        inputs.valorcoberturaincendio.min = 100000;
        inputs.valorcoberturaincendio.max = (residencia == 2) ? 700000 : 1000000;

        if (inputs.valorcoberturaincendio.value > inputs.valorcoberturaincendio.max){ 
            inputs.valorcoberturaincendio.value = inputs.valorcoberturaincendio.max; 
        }
        if (inputs.valorcoberturaincendio.value < inputs.valorcoberturaincendio.min){ 
            inputs.valorcoberturaincendio.value = inputs.valorcoberturaincendio.min; 
        }

        let base = inputs.valorcoberturaincendio.value;

        inputs.valorcoberturasubstracaobens.min = 2000;
        inputs.valorcoberturasubstracaobens.max = (base * 0.3 > 200000) ? 200000 : base * 0.3;

        inputs.valorcoberturapagamentoaluguel.min = 3000;
        inputs.valorcoberturapagamentoaluguel.max = (base * 0.50 > 200000) ? 200000 : base * 0.50;

        inputs.valorcoberturarcfamiliar.min = 2000;
        inputs.valorcoberturarcfamiliar.max = (base * 0.5 > 200000) ? 200000 : base * 0.5//base * 0.5;
        inputs.valorcoberturarcfamiliar.value = (inputs.valorcoberturarcfamiliar.value > inputs.valorcoberturarcfamiliar.max) ? inputs.valorcoberturarcfamiliar.max : inputs.valorcoberturarcfamiliar.value;

        inputs.valorcoberturavendaval.min = 2000;
        inputs.valorcoberturavendaval.max = (base * 0.5 > 500000) ? 500000 : base * 0.5;

        inputs.valorcoberturadesmoronamento.min = 2000;
        inputs.valorcoberturadesmoronamento.max = (base * 0.1 > 500000) ? 500000 : base * 0.1;

        inputs.valorcoberturaalagamento.min = 5000;
        inputs.valorcoberturaalagamento.max = 300000;//50000;
        //inputs.valorcoberturaalagamento.disabled = !(residencia == 1 || residencia == 2 || residencia == 4);

        inputs.valorsubtracaobicicleta.min = 2500;
        inputs.valorsubtracaobicicleta.max = (base * 0.3 > 15000) ? 15000 : base * 0.3;//(base * 0.3 > 50000) ? 50000 : base * 0.3;
        //inputs.valorsubtracaobicicleta.disabled = (inputs.valorcoberturaincendio.value < 250000);

        inputs.valorpequenasreformas.min = 2000;
        inputs.valorpequenasreformas.max = 100000;
        //inputs.valorpequenasreformas.disabled = (residencia == 5 || residencia == 6 || residencia == 7);

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

            dadosCobertura['generica'][input.id] = { value: input.value, min: input.min, max: input.max, disabled: input.disabled, display: input.display};
            
            if (!input.disabled){ 
                let enable = true;     
                let nomeCobertura = relacaoItemId[input.id];
                inputElement.prop("disabled", false);

                if (input.id == 'valorsubtracaobicicleta'){ 
                    if (inputs.valorcoberturaincendio.value < 250000){
                        inativoElement.html('*Liberada quando cobertura de incêndio for maior que R$ 250.000,00');
                        inativoElement.css('font-size', '13px');
                        enable = false; 
                    }else{
                        inativoElement.html('(Inativo)');
                        inativoElement.css('font-size', '16px');
                    }
                }
                if (input.id == 'valorcoberturaalagamento'){ 
                    if (!(residencia == 1 || residencia == 2 || residencia == 4)){
                        inativoElement.html('*Cobertura não permitida para imóveis desocupados');
                        inativoElement.css('font-size', '13px');
                        enable = false; 
                    }else{
                        inativoElement.html('(Inativo)');
                        inativoElement.css('font-size', '16px');
                    }
                }
                if (input.id == 'valorpequenasreformas'){ 
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
                if (input.id == 'valorcoberturapagamentocondominio'){ 
                    valoresCobertura['generica'].valorCoberturaMorteAcidental = 5000; 
                    dadosCobertura['generica'].valorcoberturamorteacidental = { value: 5000, min: 5000, max: 5000, disabled: false, display: false, display: false };
                }
                if (enable){
                    valoresCobertura['generica'][nomeCobertura] = input.value;
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

                valoresCobertura['generica'][nomeCobertura] = input.value;
                
            }else{ 
                inputElement.prop("disabled", true); 
                toggleElement.css('background-color', '#C7C7C7'); 
                toggleElement.css('border-color', '#C7C7C7');
                switchElement.css('margin-left', '0px');
                labelElement.css('display', 'none');
                inativoElement.css('display', 'block');
            }

            toggleElement.off("click").on("click", ()=>{
                if (input.id == 'valorcoberturaincendio'){ return; }
                dadosCobertura['generica'][input.id].disabled = !(dadosCobertura['generica'][input.id].disabled);
                inputElement.prop("disabled", dadosCobertura['generica'][input.id].disabled);
                controleCoberturasGenerico();
            });

            //let rangeContainer = inputElement.parent();
            //let coberturaContainer = rangeContainer.parent();
            //if (input.display){ coberturaContainer.show(); }else{ coberturaContainer.hide(); }
            //console.log(dadosCobertura)
        }
    }
    
    controleCoberturasGenerico();
});

$('#form').submit((e)=>{ e.preventDefault(); return false; });
//document.getElementById("form").addEventListener("submit", async (event)=>{
$('#btn-submit').on('click', async (event)=>{
    event.preventDefault();
    var data = {};

    let inputArray = document.querySelectorAll('#form input');
    let selectArray = document.querySelectorAll('#form select');

    // Insere as inputs e selects no objeto data
    inputArray.forEach((input)=>{ data[input.id] = input.value; });
    selectArray.forEach((select)=>{ data[select.id] = select.value; });
    
    data.inputRange = dadosCobertura['generica'];
    let dataLayer = {};
    Object.assign(dataLayer, data);
    dataLayer.etapa = 'step-3';

    $.ajax({
        url: '/datalayer',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataLayer),
        success: function(res) { /*console.log('Sucesso:', res);*/ },
        error: function(xhr, status, error) { /*console.error('Error:', error);*/ }
    });
  
    try {
        const response = await fetch("/enviar-dados", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const formData = await response.json(); // Recebe os dados da resposta
            let storage = {formData: formData, tipoResidencia: data.tiporesidencia, dadosCoberturaGenerica: dadosCobertura['generica'] };
            localStorage.setItem("formData", JSON.stringify(storage)); // Adiciona o form encriptado ao localStorage
            localStorage.removeItem("dadosCobertura");
            window.location.href = "./planos"; // Redireciona para página de planos
        } else if (response.status === 400) {
            const errorData = await response.json();
            //console.error("Erros:", errorData);
            //Loop por array com erros vindos da API
            errorData.map((error, index)=>{ 
                //erro = {error: mensagem de erro, field: id do campo com erro, step: etapa com erro}
                let input = $(`#${error.field}`); //Input do campo com erro
                let label = $(`label[for="${error.field}"]`); //Label do campo com erro
                input.addClass('error');
                label.addClass('error');
                input.on('change keydown paste input', {label: label, input: input} ,(e)=>{ 
                    e.data.label.removeClass('error'); 
                    e.data.input.removeClass('error'); 
                });
            });
            let currentStep = $(".form-step.active"); //JQuery para etapa atual
            let nextStep = $("#step-" + errorData[0].step); //JQuery para primeira etapa com um erro associado
            //Mudança para etapa com erro
            currentStep.removeClass("active").fadeOut(250, function() { nextStep.addClass("active").fadeIn(250); });
        } else {
            //console.error("Ocorreu um erro ao enviar os dados Porto Seguro");
        }
    } catch (error) {
        //console.error(error);
        //console.error("Ocorreu um erro ao enviar os dados para a Porto Seguro");
    }
});
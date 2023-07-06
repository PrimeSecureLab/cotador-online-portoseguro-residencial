var newLead = true;

var dadosCobertura = {};
var valoresCobertura = {};

var tipoProduto = 'habitual';
var tipoResidencia = 1;

$(document).ready(function() {

    gerarToggleSwitch();
    aplicarMascaras();
    $('#loading-screen').hide();

    var inputsRange = $('input[type="range"]');

    inputsRange.on('change', (e)=>{ inciarCoberturaMain(tipoProduto, 'generico', tipoResidencia, 1, e.target.id); });

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
            
            /*if (!form.itens){ form.itens = {}; }
            if (!form.itens.generico){ form.itens.generico = {}; }
            
            for(let key in form.itens.generico){
                if (!dadosCobertura['generico'][key]){ continue; }
                dadosCobertura['generico'][key].value = form.itens.generico[key].value || dadosCobertura['generica'][key].value;
                dadosCobertura['generico'][key].disabled = (form.itens.generico[key].disable);
                valoresCobertura['generico'][key] = form.itens.generico[key].value || dadosCobertura['generica'][key].value;
            }*/
            
            //controleCoberturasGenerico();
            //console.log(form);
            //console.log(dadosCobertura['generica']);            
        },
        error: function(xhr, status, error) { console.error('Error:', error); }
    });

    function aplicarMascaras(){
        //Aplica Mascaras nos Inputs
        $("#cpf").mask("999.999.999-99");
        $("#cep").mask("00000-000");
        $(".datanascimento").mask("00/00/0000");

        let maskFixo = 1;    
        $(".numerotelefone").mask("(00) 0000-00000");
        $(".numerotelefone").on("input, keyup", (e)=>{
            if ($(".numerotelefone").val().length < 15 && maskFixo == 0){
                maskFixo = 1;
                $(".numerotelefone").unmask();
                $(".numerotelefone").mask("(00) 0000-00000");
                e.target.selectionStart = $(".numerotelefone").val().length; //Posiciona o cursor no final do input
            }
            if ($(".numerotelefone").val().length > 14 && maskFixo == 1){
                maskFixo = 0;
                $(".numerotelefone").unmask();
                $(".numerotelefone").mask("(00) 00000-0000");
                e.target.selectionStart = $(".numerotelefone").val().length; //Posiciona o cursor no final do input
            }
        });
    }

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
                if (!validarCPF(data.cpf)){ errorList.push({id: 'cpf'}); }
                if (!validarNome(nome)){ errorList.push({id: 'nome'}); }
                if (!validarData(data.datanascimento)){ errorList.push({id: 'datanascimento'}); }

                if (data.numerotelefone.replace(/[^0-9]+/g, '').length < 10){ errorList.push({id: 'numerotelefone'}); }

                if (data.tipotelefone != 1 && data.tipotelefone != 3){ errorList.push({id: 'tipotelefone'}); }

                if (data.tipotelefone == 1 && data.numerotelefone.replace(/[^0-9]+/g, '').length != 10 && !errorList.includes('tipotelefone')){ errorList.push({id: 'tipotelefone'}); }
                
                if (data.tipotelefone == 3 && data.numerotelefone.replace(/[^0-9]+/g, '').length != 11 && !errorList.includes('tipotelefone')){ errorList.push({id: 'tipotelefone'}); } }          
            
            if (data.etapa == 'step-2'){
                if (!validarCEP(data.cep)){ errorList.push({id: 'cep'}); }
                if (!validarTipoResidencia(data.tiporesidencia)){ errorList.push({id: 'tiporesidencia'}); }else{ tipoResidencia = data.tiporesidencia; }
                if (!validarTipoRua(data.tiporua)){ errorList.push({id: 'tiporua'}); }
                if (!validarLogradouro(data.logradouro)){ errorList.push({id: 'logradouro'}); }
                if (!validarNumero(data.numero)){ errorList.push({id: 'numero'}); }
                if (!validarBairro(data.bairro)){ errorList.push({id: 'bairro'}); }
                if (!validarMunicipio(data.cidade)){ errorList.push({id: 'cidade'}); }
                if (!validarUF(data.uf)){ errorList.push({id: 'uf'}); }

                if (errorList.length == 0){  
                    tipoResidencia = data.tiporesidencia;
                    if (tipoResidencia == 8 || tipoResidencia == 4){ tipoProduto = 'veraneio'; }else{ tipoProduto = 'habitual'; }
                }
            }
            console.log(data.etapa);
        }
        if (errorList.length > 0){
            errorList.map((error, index)=>{
                let input = $(`#${error.id}`); //Input do campo com erro
                let label = $(`label[for="${error.id}"]`); //Label do campo com erro
                input.addClass('error');
                label.addClass('error');
                let errorLabel = false;
                if (error.id == 'tipotelefone'){
                    errorLabel = $('label#telefoneError');
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
                    e.data.label.removeClass('error'); 
                    e.data.input.removeClass('error'); 
                });                
            });
            return;
        }
        if (nextStep.length > 0) { currentStep.removeClass("active").fadeOut(250, function() { nextStep.addClass("active").fadeIn(250); }); }
        
        inciarCoberturaMain(tipoProduto, 'generico', tipoResidencia, 1, false);
        inputsRange.off('change');
        inputsRange.on('change', (e)=>{ inciarCoberturaMain(tipoProduto, 'generico', tipoResidencia, 1, e.target.id); });
    });
    
    $(".prev-step").click(function() {
        newLead = false;
        var currentStep = $(this).closest(".form-step");
        var prevStep = currentStep.prev(".form-step");
        if (prevStep.length > 0) { currentStep.removeClass("active").fadeOut(250, function() { prevStep.addClass("active").fadeIn(250); }); }
    });    


    $('#btn-submit').on('click', async (event)=>{
        event.preventDefault();
        var data = {dadosCobertura: dadosCobertura, valoresCobertura: valoresCobertura};

        let inputArray = document.querySelectorAll('#form input');
        let selectArray = document.querySelectorAll('#form select');

        // Insere as inputs e selects no objeto data
        inputArray.forEach((input)=>{ data[input.id] = input.value; });
        selectArray.forEach((select)=>{ data[select.id] = select.value; });
        
        data.inputRange = dadosCobertura[tipoProduto]['generica'];
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

        $('#loading-screen').show();
        try {
            const res = await fetch("/enviar-dados", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const response = await res.json(); // Recebe os dados da resposta
                console.log(response);
                
                let dadosGenericos = {};
                let valoresGenericos = {};                

                if (response.formulario){ localStorage.setItem('prime-form', JSON.stringify(response.formulario)); }
                if (response.dadosCobertura){
                    dadosGenericos = dadosCobertura[tipoProduto]['generico'][1];
                    for(let i in dadosCobertura[tipoProduto]){                        
                        for(let k in dadosCobertura[tipoProduto][i]){ 
                            dadosCobertura[tipoProduto][i][k] = dadosGenericos; 
                        }
                    }
                    localStorage.setItem('prime-dadosCobertura', JSON.stringify(dadosCobertura)); 
                }
                if (response.valoresCobertura){ 
                    valoresGenericos = valoresCobertura[tipoProduto]['generico'][1];
                    for(let i in valoresCobertura[tipoProduto]){                        
                        for(let k in valoresCobertura[tipoProduto][i]){ 
                            valoresCobertura[tipoProduto][i][k] = valoresGenericos;
                        }
                    }
                    localStorage.setItem('prime-valoresCobertura', JSON.stringify(valoresCobertura)); 
                }

                //console.log(dadosCobertura);
                //console.log(valoresCobertura);
                //$('#loading-screen').hide();
                $(window).on('beforeunload', ()=>{ $('#loading-screen').hide(); });
                window.location.href = "./planos";

                //let storage = {formData: formData, tipoResidencia: data.tiporesidencia, dadosCoberturaGenerica: dadosCobertura['generica'] };
                //localStorage.setItem("formData", JSON.stringify(storage)); // Adiciona o form encriptado ao localStorage
                //localStorage.removeItem("dadosCobertura");

                //window.location.href = "./planos"; // Redireciona para página de planos
            } else {
                const errors = await res.json();
                if (res.status === 400) {
                    errors.map((error, index)=>{ //erro = {error: mensagem de erro, field: id do campo com erro, step: etapa com erro}
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
                    let nextStep = $("#step-" + errors[0].step); //JQuery para primeira etapa com um erro associado            
                    currentStep.removeClass("active").fadeOut(250, function() { nextStep.addClass("active").fadeIn(250); }); //Mudança para etapa com erro
                    console.log(errors);
                    $('#loading-screen').hide();
                    return;
                } 
                //console.error("Ocorreu um erro ao enviar os dados Porto Seguro");
                $('#loading-screen').hide();
            }
        } catch (error) {
            console.log(error);
            $('#loading-screen').hide();
            //console.error("Ocorreu um erro ao enviar os dados para a Porto Seguro");
        }
    });
});
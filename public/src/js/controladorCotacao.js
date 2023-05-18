var newLead = true;
$(document).ready(function() {
    // Ao clicar no botão "next-step", avança para a próxima etapa do formulário
    $(".next-step").click(async function() {
        var currentStep = $(this).closest(".form-step");
        var nextStep = currentStep.next(".form-step");
        let errorList = [];

        if (currentStep.length > 0){
            let data = {};
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
                if (data.numerotelefone.replace(/[^0-9]+/g, '').length < 10){ errorList.push({id: 'numerotelefone'}); }
                if (data.datanascimento.replace(/[^0-9]+/g, '').length < 8){ errorList.push({id: 'datanascimento'}); }
            }
            if (data.etapa == 'step-2'){
                if (data.cep.replace(/[^0-9]+/g, '').length != 8){ errorList.push({id: 'cep'}); }
                if (!data.logradouro){ errorList.push({id: 'logradouro'}); }
                if (!/^[0-9]{1,4}$/.test(data.numero)){ errorList.push({id: 'numero'}); }
                if (!data.bairro){ errorList.push({id: 'bairro'}); }
                if (!data.cidade){ errorList.push({id: 'cidade'}); }
                if (!data.uf){ errorList.push({id: 'uf'}); }
            }
        }
        if (errorList.length > 0){
            errorList.map((error, index)=>{
                let input = $(`input#${error.id}`); //Input do campo com erro
                let label = $(`label[for="${error.id}"]`); //Label do campo com erro
                input.addClass('error');
                label.addClass('error');
                input.on('change keydown paste input', {label: label, input: input} ,(e)=>{ 
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
});

document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    var data = {};

    let inputArray = document.querySelectorAll('#form input');
    let selectArray = document.querySelectorAll('#form select');

    // Insere as inputs e selects no objeto data
    inputArray.forEach((input)=>{ data[input.id] = input.value; });
    selectArray.forEach((select)=>{ data[select.id] = select.value; });

    let _data = data;
    _data.etapa = 'step-3';

    $.ajax({
        url: '/datalayer',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(_data),
        success: function(res) { console.log('Sucesso:', res); },
        error: function(xhr, status, error) { console.error('Error:', error); }
    });
  
    try {
        const response = await fetch("/enviar-dados", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const formData = await response.json(); // Recebe os dados da resposta
            localStorage.setItem("formData", JSON.stringify(formData)); // Adiciona o form encriptado ao localStorage
            window.location.href = "./planos"; // Redireciona para página de planos
        } else if (response.status === 400) {
            const errorData = await response.json();
            console.error("Erros:", errorData);
            //Loop por array com erros vindos da API
            errorData.map((erro, index)=>{ 
                //erro = {error: mensagem de erro, field: id do campo com erro, step: etapa com erro}
                let input = $(`input#${erro.field}`); //Input do campo com erro
                let label = $(`label[for="${erro.field}"]`); //Label do campo com erro
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
            console.error("Ocorreu um erro ao enviar os dados Porto Seguro");
        }
    } catch (error) {
        console.error(error);
        console.error("Ocorreu um erro ao enviar os dados para a Porto Seguro");
    }
});
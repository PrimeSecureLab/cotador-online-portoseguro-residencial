$("#loading-screen").hide();
$(document).ready(function () {

});

var loading = false;
var finalData = localStorage.getItem("finalData");
finalData = JSON.parse(finalData);

if (!finalData){ finalData = {}; }
if (!finalData.orcamento){ finalData.orcamento = {}; }

var orcamento = finalData.orcamento;
if (orcamento.tipo == "habitual"){ $("input#plano-escolhido").val("Essencial"); }
if (orcamento.tipo == "veraneio"){ $("input#plano-escolhido").val("Conforto"); }
if (orcamento.tipo == "premium"){ $("input#plano-escolhido").val("Exclusive"); }
if (orcamento.numeroOrcamento){ $("input#protocolo").val(orcamento.numeroOrcamento); }

if (orcamento.listaParcelamento){
    orcamento.listaParcelamento.map((parcela, index)=>{
        if (parcela.codigo == 62){  
            if (parcela.quantidadeParcelas == 1){
                let valor = parcela.valorPrimeiraParcela.toFixed(2);
                valor = valor.split(".");
                $("span#value-120").html(`R$${valor[0]},<span class="small-zero-120">${valor[1]}</span>`);
            }
            if (orcamento.listaParcelamento[index + 1].codigo != 62){
                let valor = parcela.valorPrimeiraParcela.toFixed(2);
                valor = valor.split(".");
                $("h2.price > span.value").html(`R$${valor[0]},<span class="small-zero">${valor[1]}</span>`);
                $("span.installment").html(`${parcela.quantidadeParcelas}x&nbsp;`)
            }
        }
    });
}

console.log(finalData);
$("input#email").on("input", ()=>{ 
    if ($('label#_email-error').length){  $('label#_email-error').html(""); } 
});
$("input#senha").on("input", ()=>{ 
    if ($('label#_senha-error').length){ $('label#_senha-error').html(""); } });
$("select").on("change", (e)=>{
    let selectId = e.target.id;
    if ($(`select#${selectId}`).hasClass('error')){ $(`select#${selectId}`).removeClass('error'); $(`label#${selectId}-error`).remove(); }
})

document.getElementById("form-register").addEventListener("submit", async (event)=>{
    event.preventDefault(); 
    let fatalError = false;

    if ($('label#orgao_expedidor-error').length){ $('label#orgao_expedidor-error').html("Campo Obrigatório"); }
    if ($('input#email').val() != $('input#confirm_email').val()){ fatalError = true; }
    if ($('input#senha').val() != $('input#confirm_senha').val()){ fatalError = true; }

    var formCadastro = {};
    let inputArray = document.querySelectorAll('#form-register input');
    let selectArray = document.querySelectorAll('#form-register select');

    inputArray.forEach((input)=>{ formCadastro[input.id] = input.value; });
    selectArray.forEach((select)=>{ formCadastro[select.id] = select.value; });

    console.log(formCadastro);

    for(let [key, value] of Object.entries(formCadastro)){
        if (key == "visualizar_senha"){ continue; }
        if (key == "email"){ continue; }
        if (key == "confirm_email"){ continue; }
        if (key == "senha"){ continue; }
        if (key == "confirm_senha"){ continue; }

        let element = $(`#${key}`);
        let label = $(`label#${key}-error`);
        if (!value){
            if (!element){ continue; }  
            fatalError = true;
            if (!element.hasClass('error')){ element.addClass('error'); }
            if (!label.length){ element.after(`<label id='${key}-error' class='error' for='${key}'>Campo Obrigatório</label>`); }
        }
    }
    if (fatalError){ return; }
    try{
        const response = await fetch( "/cadastro", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({form: formCadastro, data: finalData})
        });
        if (response.ok) {
            let data = await response.json();
            console.log(data);
            //window.location.href = "/pagamento";
        } else if (response.status === 400) {
            $('#form-register input').removeClass('error');
            $('#form-register select').removeClass('error');
            $('label.error').remove();
            let data = await response.json();
            console.log(data);
            data.errors.map((error, index)=>{
                if ($(`input#${error.id}`).length){
                    $(`input#${error.id}`).addClass('error');
                    if (!($(`label#${error.id}-error`).length)){
                        $(`input#${error.id}`).after(`<label id='${error.id}-error' class='error' for='${error.id}'>${error.message}</label>`);
                    }
                }
                if ($(`select#${error.id}`).length){
                    $(`select#${error.id}`).addClass('error');
                    if (!($(`label#${error.id}-error`).length)){
                        $(`select#${error.id}`).after(`<label id='${error.id}-error' class='error' for='${error.id}'>${error.message}</label>`);
                    }
                }
            });
        }
    } catch (error) {
        console.error(error);
        console.error("Não foi possível estabeleces uma conexão com o servidor.");
        //$("#loading-screen").hide();
    }
    
    /*let form = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        confirmSenha: document.getElementById("confirm_senha").value
    }
    let errorLabels = {
        email: document.getElementById("email-error"),
        senha: document.getElementById("senha-error"),
        confirm_senha: document.getElementById("confirm_senha-error")
    }
    if (form.email.length < 5 || !form.email.includes('@') || !form.email.includes('.')){ 
        if (!$("label#_email-error").length){ 
            $('<label id="_email-error" class="_error" for="email" style="color: red"></label>').insertAfter('input#email'); 
        }
        $('label#_email-error').html('O e-mail inserido não é válido');
        loading = false; 
        return; 
    }
    if (form.senha.length < 8){ 
        if (!$("label#_senha-error").length){ 
            $('<label id="_senha-error" class="_error" for="senha" style="color: red"></label>').insertAfter('input#senha'); 
        }
        $('label#_senha-error').html('Sua senha deve ter no mínimo 8 caracteres');
        loading = false; 
        return; 
    }
    if (form.senha != form.confirmSenha){ loading = false; return; }

    let data = { login: { email: form.email, senha: form.senha }, data: finalData};
    try{
        $("#loading-screen").show();
        const response = await fetch( "/cadastro", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(data)
        });
        if (response.ok) {
            let data = await response.json();
            $("#loading-screen").hide();
            window.location.href = "/pagamento";
        } else if (response.status === 400) {
            let data = await response.json();
            if (!data.fatal){
                if (data.id == "email"){
                    if (!$("label#_email-error").length){ 
                        $('<label id="_email-error" class="_error" for="email" style="color: red"></label>').insertAfter('input#email'); 
                    }
                    $('label#_email-error').html(data.message);
                }
                if (data.id == "senha"){
                    if (!$("label#_senha-error").length){ 
                        $('<label id="_senha-error" class="_error" for="senha" style="color: red"></label>').insertAfter('input#senha'); 
                    }
                    $('label#_senha-error').html(data.message);
                }
            }
            //if (data.code == 30){
            //    if (!$("label#_email-error").length){ 
            //        $('<label id="_email-error" class="_error" for="email" style="color: red"></label>').insertAfter('input#email'); 
            //    }
            //    $('label#_email-error').html('Já existe uma conta utilizando este endereço de e-mail');
            //}
            console.error("Erro:", data);
        } else {
            console.error("Ocorreu um erro inesperado.");
        }
        $("#loading-screen").hide();
    } catch (error) {
        console.error(error);
        console.error("Não foi possível estabeleces uma conexão com o servidor.");
        $("#loading-screen").hide();
    }*/
});

function visualizarSenha() {
    var senha = document.getElementById("senha");
    var confirmSenha = document.getElementById("confirm_senha");
    var checkBox = document.getElementById("visualizar_senha");

    if (checkBox.checked) { senha.type = "text";
        confirmSenha.type = "text";
    } else {
        senha.type = "password";
        confirmSenha.type = "password";
    }
}

/*$(document).ready(function () {
    if (loading){ loading = false; }
    //$('#numero-cartao').mask('0000 0000 0000 0000');
    
});*/

$("#loading-screen").hide();
var loading = false;
var formulario = {};
var orcamento = {};

$(document).ready(function () { 
    function validacaoInicial(){
        formulario = localStorage.getItem('prime-form');
        formulario = JSON.parse(formulario);
        if (!formulario){ window.location.href = '/cotacao'; return; }

        orcamento = localStorage.getItem('prime-orcamento');
        orcamento = JSON.parse(orcamento);

        if (!orcamento){ window.location.href = '/planos'; return; }
        orcamento.produto = orcamento.tipo;

        $('input#cpf_pessoa_exposta').mask('000.000.000-00');

        //let inputDocumento = $('input#numero_documento');
        //let tipoDocumento = $('select#tipo_documento');

        //if (tipoDocumento.val() == 2){ inputDocumento.mask('000.000.000-00'); }
        //tipoDocumento.on('change', (e)=>{ if (e.target.value == 2){ inputDocumento.mask('000.000.000-00'); }else{ inputDocumento.unmask() } });

        if (orcamento.numeroOrcamento){ $("input#protocolo").val(orcamento.numeroOrcamento); }

        if (orcamento.plano == 'essencial'){ let title = (orcamento.vigencia > 1) ? `Essencial - ${orcamento.vigencia} Anos` : 'Essencial - 1 Ano'; $("input#plano-escolhido").val(title); }
        if (orcamento.plano == 'conforto'){ let title = (orcamento.vigencia > 1) ? `Conforto - ${orcamento.vigencia} Anos` : 'Conforto - 1 Ano'; $("input#plano-escolhido").val(title); }
        if (orcamento.plano == 'exclusive'){ let title = (orcamento.vigencia > 1) ? `Exclusive - ${orcamento.vigencia} Anos` : 'Exclusive - 1 Ano'; $("input#plano-escolhido").val(title); }

        $.ajax({
            url: '/cadastro/carregar',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({etapa: 'step-5', page: 'cadastro', orcamento: orcamento}),
            success: function(res) { if (res.email){ $('input#numero_documento').val(res.cpf); $('input#email').val(res.email); } },
            error: function(xhr, status, error) { /*console.error('Error:', error);*/ }
        });
        
        $.ajax({
            url: '/datalayer',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({etapa: 'step-5', page: 'cadastro', orcamento: orcamento}),
            success: function(res) { /*console.log('Sucesso:', res);*/ },
            error: function(xhr, status, error) { /*console.error('Error:', error);*/ }
        });

        if (orcamento.listaParcelamento){
            let valorSemJuros = 0;
            let juros = true;
            orcamento.listaParcelamento.map((parcela, index)=>{
                if (parcela.codigo == 62){  
                    if (parcela.quantidadeParcelas == 1){ valorSemJuros = parcela.valorPrimeiraParcela; }
                    if (orcamento.listaParcelamento[index + 1].codigo != 62){
                        let numeroParcelas = parcela.quantidadeParcelas;
                        let primeiraParcela = parcela.valorPrimeiraParcela;
                        let demaisParcelas = parcela.valorDemaisParcelas;
                        let valorTotal = (numeroParcelas - 1) * demaisParcelas + primeiraParcela;
        
                        if (Math.abs(valorSemJuros - valorTotal) < 0.05){ juros = false; }
        
                        valorTotal = valorTotal.toFixed(2).split(".");
                        primeiraParcela = primeiraParcela.toFixed(2).split(".");
        
                        $("span#value-120").html(`R$${valorTotal[0]},<span class="small-zero-120">${valorTotal[1]}</span>`);
                        $("h2.price > span.value").html(`R$${primeiraParcela[0]},<span class="small-zero">${primeiraParcela[1]}</span>`);
                        $("span.installment").html(`${numeroParcelas}x&nbsp;`);
                    }
                }
            });
        }

        $("input#email").on("input", ()=>{ if ($('label#_email-error').length){ $('label#_email-error').html(""); } });
        $("input#senha").on("input", ()=>{ if ($('label#_senha-error').length){ $('label#_senha-error').html(""); } });
        $("select").on("change", (e)=>{
            let selectId = e.target.id;
            if ($(`select#${selectId}`).hasClass('error')){ $(`select#${selectId}`).removeClass('error'); $(`label#${selectId}-error`).remove(); }
        });
    }

    validacaoInicial();
});

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

    //console.log(formCadastro);

    for(let [key, value] of Object.entries(formCadastro)){
        if (key == "visualizar_senha"){ continue; }
        if (key == "email"){ continue; }
        if (key == "confirm_email"){ continue; }
        if (key == "senha"){ continue; }
        if (key == "confirm_senha"){ continue; }
        if ($('#politicamente_exposta').val() != 3){ 
            if (key == "grau_parentesco_pessoa_exposta"){ continue; }
            if (key == "cpf_pessoa_exposta"){ continue; }
            if (key == "nome_pessoa_exposta"){ continue; } 
        }
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
        $("#loading-screen").show();
        const response = await fetch( "/cadastro", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({cadastro: formCadastro, formulario: formulario})
        });
        if (response.ok) {
            let data = await response.json();
            console.log(data);
            $(window).on('beforeunload', ()=>{ $('#loading-screen').hide(); });
            window.location.href = "/pagamento";
        } else if (response.status === 400) {
            $('#form-register input').removeClass('error');
            $('#form-register select').removeClass('error');
            $('label.error').remove();
            let data = await response.json();
            console.log(data);
            $('#loading-screen').hide(); 
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
        $("#loading-screen").hide();
        //console.error("Não foi possível estabeleces uma conexão com o servidor.");
    }
});

function visualizarSenha() {
    var senha = document.getElementById("senha");
    var confirmSenha = document.getElementById("confirm_senha");
    var checkBox = document.getElementById("visualizar_senha");

    if (checkBox.checked) { senha.type = "text"; confirmSenha.type = "text"; } else { senha.type = "password"; confirmSenha.type = "password"; }
}

$(function () {
    $.validator.setDefaults({
        messages: {
          minlength: jQuery.validator.format("Por favor, digite pelo menos {0} caracteres.")
        }
    });
    $("#form-register").validate({
        lang: 'pt_BR',
        rules: {
            senha: { required: true },
            confirm_senha: { equalTo: "#senha" },
            email: { required: true },
            confirm_email: { equalTo: "#email" }
        },
        messages: {
            nome: { required: "Preencha o Campo Nome" },
            email: { 
                required: "Campo Obrigatório",
                email: "Email inválido"
            },
            confirm_email: {
                required: "Campo Obrigatório",
                equalTo: "Os campos de email precisam ser iguais.",
                email: "Email inválido"
            },
            senha: { required: "Campo Obrigatório" },
            confirm_senha: {
                required: "Campo Obrigatório",
                equalTo: "Os campos de senha devem ser iguais",
            },
            cpf: { required: "Campo Obrigatório" },
            nome_impresso: { required: "Campo Obrigatório" },
            data_expedicao: { required: "Campo Obrigatório", minlength: "Data inválida" },
            numero_documento: { required: "Campo Obrigatório" },
            orgao_expedidor: { required: "Campo Obrigatório" }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("error");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("error");
        },
    });
});


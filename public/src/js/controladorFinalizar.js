
$("#loading-screen").hide();

var localData = localStorage.getItem("finalData");
var loading = false;

if (localData){ localData = JSON.parse(localData); }
if (!localData.itemData){ window.location.href = './planos'; loading = true; }
if (!localData.orcamento && !loading){ window.location.href = './planos'; loading = true; }

var orcamento = localData.orcamento;
if (!orcamento.numeroOrcamento && !loading){ window.location.href = './planos'; loading = true; }
if (!orcamento.criadoEm && !loading){ window.location.href = './planos'; loading = true; }

if (!loading){
    let dataOrcamento = new Date(orcamento.criadoEm.toString());
    let hoje = new Date();
    let outdated = Math.abs(hoje - dataOrcamento);
    outdated = Math.ceil(outdated / (1000 * 60 * 60 * 24));
    if (outdated > 10){ localStorage.removeItem("finalData"); window.location.href = './planos'; loading = true; }
}

//console.log(localData);

$(document).ready(function () {
    $('#numero-cartao').mask('0000 0000 0000 0000');

    $("input#cpf").on("input", ()=>{ 
        if ($('label#_cpf-error').length){ $('label#_cpf-error').html(""); } 
    });
    $("input#nome_impresso").on("input", ()=>{ 
        if ($('label#_nome_impresso-error').length){ $('label#_nome_impresso-error').html(""); } 
    });
    $("input#numero-cartao").on("input", ()=>{ 
        if ($('label#_numero-cartao-error').length){ $('label#_numero-cartao-error').html(""); } 
    });
    $("input#cvc").on("input", ()=>{ 
        if ($('label#_cvc-error').length){ $('label#_cvc-error').html(""); } 
    });
    $("input#mes").on("input", ()=>{ 
        if ($('label#_mes-error').length){ $('label#_mes-error').html(""); } 
    });
    $("input#ano").on("input", ()=>{ 
        if ($('label#_ano-error').length){ $('label#_ano-error').html(""); } 
    });
    
    $("input#protocolo").val(orcamento.numeroOrcamento);

    if (localData.orcamento.tipo == "habitual"){ $("input#plano-escolhido").val("Essencial"); }
    if (localData.orcamento.tipo == "veraneio"){ $("input#plano-escolhido").val("Conforto"); }
    if (localData.orcamento.tipo == "premium"){ $("input#plano-escolhido").val("Exclusive"); }

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
    $("#btn-enviar").on("click", async function(){
        let errorList = [];
        let form = {
            cpf: $("#cpf").val().replace(/[^\d]/g, ""),
            nome: $("#nome_impresso").val(),
            numero: $("#numero-cartao").val().replace(/[^\d]/g, ""),
            cvc: $("#cvc").val().replace(/[^\d]/g, ""),
            mes: $("#mes").val().replace(/[^\d]/g, ""),
            ano: $("#ano").val().replace(/[^\d]/g, "")
        };

        if (!/^\d{11}$/.test(form.cpf)){ errorList.push({message: "CPF inválido", id: "cpf"}); }
        if (form.nome.length < 3){ 
            errorList.push({message: "Nome inválido", id: "nome_impresso"}); 
        }else{
            if (!/^[A-zÀ-ú/\s]+$/.test(form.nome)){ errorList.push({message: "Nome inválido", id: "nome_impresso"}); }
        }
        if (!/^\d{3}$/.test(form.cvc)){ errorList.push({message: "CVC inválido", id: "cvc"}); }
        if (!/^\d{2}$/.test(form.mes)){ 
            if (/^[1-9]$/.test(form.mes)){ 
                form.mes = `0${form.mes}`; 
                $("#mes").val(form.mes); 
            }else{ 
                errorList.push({message: "Mês inválido", id: "mes"}); 
            }
        }else{
            if (parseInt(form.mes) > 12){ errorList.push({message: "Mês inválido", id: "mes"}); }
        }
        if (!/^\d{4}$/.test(form.ano)){ 
            if (/^\d{2}$/.test(form.ano)){
                $("#ano").val(`20${form.ano}`);
                if (parseInt(form.ano) < 23){ errorList.push({message: "Ano inválido", id: "ano"}); }
            }else{
                errorList.push({message: "Ano inválido", id: "ano"});
            }  
        }
        if (!/^\d{16}$/.test(form.numero)){ 
            errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); 
        }else{
            let soma = 0;
            let dobrar = false;
            for (var i = form.numero.length - 1; i >= 0; i--) {
                let digito = parseInt(form.numero.charAt(i), 10);
                if (dobrar) { if ((digito *= 2) > 9){ digito -= 9; }}
                soma += digito;
                dobrar = !dobrar;
            }
            if ((soma % 10) != 0){ errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); }
        }
        if (errorList.length){
            errorList.map((error, index)=>{
                if (!$(`label#_${error.id}-error`).length){ 
                $(`<label id="_${error.id}-error" class="_error" for="${error.id}" style="color: red"></label>`).insertAfter(`input#${error.id}`); 
                }
                $(`label#_${error.id}-error`).html(error.message);
            });
            return;
        }
        localData.pagamento = {
            parcelas: 1,
            nomeImpresso: $("input#nome_impresso").val(),
            numeroCpf: $("input#cpf").val(),
            numeroCartao: $("input#numero-cartao").val(),
            numeroCvc: $("input#cvc").val(),
            mesValidade: $("input#mes").val(),// MM
            anoValidade: $("input#ano").val() //AAAA
        }
        try{
            $("#loading-screen").show();
            const response = await fetch( "/pagamento", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(localData)
            });
            if (response.ok) {
                let data = await response.json();
                localStorage.removeItem("finalData");
                $("#loading-screen").hide();
                window.location.href = "./obrigado";
            } else if (response.status === 400) {
                let data = await response.json();
                if (!data.fatal && data.errors){
                    data.errors.map((error, index)=>{
                        if (!$(`label#_${error.id}-error`).length){ 
                            $(`<label id="_${error.id}-error" class="_error" for="${error.id}" style="color: red"></label>`).insertAfter(`input#${error.id}`); 
                        }
                        $(`label#_${error.id}-error`).html(error.message);
                    });
                }
                console.error("Erro:", data);
            } else {
                console.error("Ocorreu um erro inesperado.");
            }
            $("#loading-screen").hide();
        } catch (error) {
            $("#loading-screen").hide();
            console.error(error);
            console.error("Não foi possível estabeleces uma conexão com o servidor.");
        }
    });
});

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

        console.log(formulario);
        console.log(orcamento);

        if (!validarOrcamento(orcamento)){ console.log('orcamento'); return; }

        $.ajax({
            url: '/datalayer',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({etapa: 'step-6', page: 'pagamento', orcamento: orcamento}),
            success: function(res) { console.log('Sucesso:', res); },
            error: function(xhr, status, error) { console.error('Error:', error); }
        });

        $('#numero-cartao').mask('0000 0000 0000 0000');

        $("input#cpf").on("input", ()=>{ if ($('label#_cpf-error').length){ $('label#_cpf-error').html(""); } });

        $("input#nome_impresso").on("input", ()=>{ if ($('label#_nome_impresso-error').length){ $('label#_nome_impresso-error').html(""); } });

        $("input#numero-cartao").on("input", ()=>{ if ($('label#_numero-cartao-error').length){ $('label#_numero-cartao-error').html(""); } });

        $("input#cvc").on("input", ()=>{ if ($('label#_cvc-error').length){ $('label#_cvc-error').html(""); } });

        $("input#mes").on("input", ()=>{ if ($('label#_mes-error').length){ $('label#_mes-error').html(""); } });

        $("input#ano").on("input", ()=>{ if ($('label#_ano-error').length){ $('label#_ano-error').html(""); } });

        $("input#protocolo").val(orcamento.numeroOrcamento);

        if (orcamento.plano == "essencial"){ $("input#plano-escolhido").val((orcamento.vigencia > 1) ? `Essencial - ${orcamento.vigencia} Anos` : 'Essencial - 1 Ano'); }

        if (orcamento.plano == "conforto"){ $("input#plano-escolhido").val((orcamento.vigencia > 1) ? `Conforto - ${orcamento.vigencia} Anos` : 'Conforto - 1 Ano'); }

        if (orcamento.plano == "exclusive"){ $("input#plano-escolhido").val((orcamento.vigencia > 1) ? `Exclusive - ${orcamento.vigencia} Anos` : 'Exclusive - 1 Ano'); }

        let juros = true;
        let valorSemJuros = 0;
        let maximoParcelas = 1
        
        orcamento.listaParcelamento.map((parcela, index)=>{
            if (parcela.codigo == 62){  
                if (parcela.quantidadeParcelas == 1){ valorSemJuros = parcela.valorPrimeiraParcela; }
                if (orcamento.listaParcelamento[index + 1].codigo != 62){
                    let numeroParcelas = parcela.quantidadeParcelas;
                    let primeiraParcela = parcela.valorPrimeiraParcela;
                    let demaisParcelas = parcela.valorDemaisParcelas;
                    let valorTotal = (numeroParcelas - 1) * demaisParcelas + primeiraParcela;
                    maximoParcelas = numeroParcelas;

                    if (Math.abs(valorSemJuros - valorTotal) < 0.05){ juros = false; }

                    valorTotal = valorTotal.toFixed(2).split(".");
                    primeiraParcela = primeiraParcela.toFixed(2).split(".");

                    $("span#value-120").html(`R$${valorTotal[0]},<span class="small-zero-120">${valorTotal[1]}</span>`);
                    $("h2.price > span.value").html(`R$${primeiraParcela[0]},<span class="small-zero">${primeiraParcela[1]}</span>`);
                    $("span.installment").html(`${numeroParcelas}x&nbsp;`)
                }
            }
        });
   
        $("#btn-enviar").on("click", async ()=>{
            let errorList = [];
            let form = {
                cpf: $("#cpf").val().replace(/[^\d]/g, ""),
                nome: $("#nome_impresso").val(),
                numero: $("#numero-cartao").val().replace(/[^\d]/g, ""),
                cvc: $("#cvc").val().replace(/[^\d]/g, ""),
                mes: $("#mes").val().replace(/[^\d]/g, ""),
                ano: $("#ano").val().replace(/[^\d]/g, "")
            };

            if (!validarCPF(form.cpf)){ errorList.push({message: "CPF inválido", id: "cpf"}); }
        
            if (!validarNome(form.nome)){ errorList.push({message: "Nome inválido", id: "nome_impresso"}); }else{
                if (!/^[A-zÀ-ú/\s]+$/.test(form.nome)){ errorList.push({message: "Nome inválido", id: "nome_impresso"}); }
            }
            
            if (!/^\d{3,4}$/.test(form.cvc)){ errorList.push({message: "CVC inválido", id: "cvc"}); }
            
            if (!/^\d{2}$/.test(form.mes)){ 
                if (/^[1-9]$/.test(form.mes)){ form.mes = `0${form.mes}`; $("#mes").val(form.mes); }else{ errorList.push({message: "Mês inválido", id: "mes"}); }
            }else{ if (parseInt(form.mes) > 12){ errorList.push({message: "Mês inválido", id: "mes"}); } }
            
            if (!/^\d{4}$/.test(form.ano)){ 
                if (/^\d{2}$/.test(form.ano)){ 
                    $("#ano").val(`20${form.ano}`); 
                    if (parseInt(form.ano) < 23){ errorList.push({message: "Ano inválido", id: "ano"}); }
                }else{ errorList.push({message: "Ano inválido", id: "ano"}); }  
            }        

            if (!validarNumeroCartao(form.numero)){  errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); }

            if (errorList.length){
                errorList.map((error, index)=>{
                    if (!$(`label#_${error.id}-error`).length){ $(`<label id="_${error.id}-error" class="_error" for="${error.id}" style="color: red"></label>`).insertAfter(`input#${error.id}`); }
                    $(`label#_${error.id}-error`).html(error.message);
                });
                return;
            }

            let pagamento = {
                parcelas: maximoParcelas,
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
                    body: JSON.stringify({orcamento: orcamento, pagamento: pagamento, formulario: formulario})
                });
                if (response.ok) {
                    let data = await response.json();
                    /*$.ajax({
                        url: '/datalayer',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({etapa: 'step-7', page: 'pagamento', proposta: data}),
                        success: function(res) { console.log('Sucesso:', res); },
                        error: function(xhr, status, error) { console.error('Error:', error); }
                    });*/
                    //localStorage.removeItem("finalData");
                    //localStorage.removeItem("formData");
                    console.log('OK:', data);
                    $("#loading-screen").hide();
                    //window.location.href = "./obrigado";
                } else {
                    let data = await response.json();
                    if (response.status == 400) {                
                        if (!data.fatal && data.errors){
                            data.errors.map((error, index)=>{
                                if (!$(`label#_${error.id}-error`).length){ 
                                    $(`<label id="_${error.id}-error" class="_error" for="${error.id}" style="color: red"></label>`).insertAfter(`input#${error.id}`); 
                                }
                                $(`label#_${error.id}-error`).html(error.message);
                            });
                        }
                    }else{ console.log("Erro:", data); }
                }
                $("#loading-screen").hide();
            } catch (error) {
                $("#loading-screen").hide();
                console.log(error);
                //console.error("Não foi possível estabeleces uma conexão com o servidor.");
            }
        });
    }
    validacaoInicial();
});


/*
var localData = localStorage.getItem("finalData");

if (localData){ localData = JSON.parse(localData); }
if (!localData.itemData){ window.location.href = './planos'; loading = true; }
if (!localData.orcamento && !loading){ window.location.href = './planos'; loading = true; }
//console.log(localData)

var orcamento = localData.orcamento;
if (!orcamento.numeroOrcamento && !loading){ window.location.href = './planos'; loading = true; }
if (!orcamento.criadoEm && !loading){ window.location.href = './planos'; loading = true; }

$.ajax({
    url: '/datalayer',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({etapa: 'step-6', page: 'pagamento', orcamento: orcamento}),
    success: function(res) { console.log('Sucesso:', res); },
    error: function(xhr, status, error) { console.error('Error:', error); }
});

if (!loading){
    let dataOrcamento = new Date(orcamento.criadoEm.toString());
    let hoje = new Date();
    let outdated = Math.abs(hoje - dataOrcamento);
    outdated = Math.ceil(outdated / (1000 * 60 * 60 * 24));
    if (outdated > 10){ 
        localStorage.removeItem("finalData"); 
        window.location.href = './planos'; 
        loading = true; 
    }
}*/

//console.log(localData);
/*
$(document).ready(function () {
    $('#numero-cartao').mask('0000 0000 0000 0000');

    $("input#cpf").on("input", ()=>{ if ($('label#_cpf-error').length){ $('label#_cpf-error').html(""); } });

    $("input#nome_impresso").on("input", ()=>{ if ($('label#_nome_impresso-error').length){ $('label#_nome_impresso-error').html(""); } });

    $("input#numero-cartao").on("input", ()=>{ if ($('label#_numero-cartao-error').length){ $('label#_numero-cartao-error').html(""); } });

    $("input#cvc").on("input", ()=>{ if ($('label#_cvc-error').length){ $('label#_cvc-error').html(""); } });

    $("input#mes").on("input", ()=>{ if ($('label#_mes-error').length){ $('label#_mes-error').html(""); } });

    $("input#ano").on("input", ()=>{ if ($('label#_ano-error').length){ $('label#_ano-error').html(""); } });
    
    $("input#protocolo").val(orcamento.numeroOrcamento);

    if (localData.orcamento.tipo == "habitual"){ $("input#plano-escolhido").val((orcamento.vigencia > 1) ? `Essencial - ${orcamento.vigencia} Anos` : 'Essencial - 1 Ano'); }
    if (localData.orcamento.tipo == "veraneio"){ $("input#plano-escolhido").val((orcamento.vigencia > 1) ? `Conforto - ${orcamento.vigencia} Anos` : 'Conforto - 1 Ano'); }
    if (localData.orcamento.tipo == "habitual-premium"){ $("input#plano-escolhido").val((orcamento.vigencia > 1) ? `Exclusive - ${orcamento.vigencia} Anos` : 'Exclusive - 1 Ano'); }

    let juros = true;
    let valorSemJuros = 0;
    let maximoParcelas = 1
    orcamento.listaParcelamento.map((parcela, index)=>{
        if (parcela.codigo == 62){  
            if (parcela.quantidadeParcelas == 1){ valorSemJuros = parcela.valorPrimeiraParcela; }
            if (orcamento.listaParcelamento[index + 1].codigo != 62){
                let numeroParcelas = parcela.quantidadeParcelas;
                let primeiraParcela = parcela.valorPrimeiraParcela;
                let demaisParcelas = parcela.valorDemaisParcelas;
                let valorTotal = (numeroParcelas - 1) * demaisParcelas + primeiraParcela;
                maximoParcelas = numeroParcelas;

                if (Math.abs(valorSemJuros - valorTotal) < 0.05){ juros = false; }

                valorTotal = valorTotal.toFixed(2).split(".");
                primeiraParcela = primeiraParcela.toFixed(2).split(".");

                $("span#value-120").html(`R$${valorTotal[0]},<span class="small-zero-120">${valorTotal[1]}</span>`);
                $("h2.price > span.value").html(`R$${primeiraParcela[0]},<span class="small-zero">${primeiraParcela[1]}</span>`);
                $("span.installment").html(`${numeroParcelas}x&nbsp;`)
            }
        }
    });
    $("#btn-enviar").on("click", async ()=>{
        let errorList = [];
        let form = {
            cpf: $("#cpf").val().replace(/[^\d]/g, ""),
            nome: $("#nome_impresso").val(),
            numero: $("#numero-cartao").val().replace(/[^\d]/g, ""),
            cvc: $("#cvc").val().replace(/[^\d]/g, ""),
            mes: $("#mes").val().replace(/[^\d]/g, ""),
            ano: $("#ano").val().replace(/[^\d]/g, "")
        };

        if (!validarCPF(form.cpf)){ errorList.push({message: "CPF inválido", id: "cpf"}); }
        
        if (!validarNome(form.nome)){ errorList.push({message: "Nome inválido", id: "nome_impresso"}); }else{
            if (!/^[A-zÀ-ú/\s]+$/.test(form.nome)){ errorList.push({message: "Nome inválido", id: "nome_impresso"}); }
        }
        
        if (!/^\d{3,4}$/.test(form.cvc)){ errorList.push({message: "CVC inválido", id: "cvc"}); }
        
        if (!/^\d{2}$/.test(form.mes)){ 
            if (/^[1-9]$/.test(form.mes)){ form.mes = `0${form.mes}`; $("#mes").val(form.mes); }else{ errorList.push({message: "Mês inválido", id: "mes"}); }
        }else{ if (parseInt(form.mes) > 12){ errorList.push({message: "Mês inválido", id: "mes"}); } }
        
        if (!/^\d{4}$/.test(form.ano)){ 
            if (/^\d{2}$/.test(form.ano)){ 
                $("#ano").val(`20${form.ano}`); 
                if (parseInt(form.ano) < 23){ errorList.push({message: "Ano inválido", id: "ano"}); }
            }else{ errorList.push({message: "Ano inválido", id: "ano"}); }  
        }        

        if (!validarNumeroCartao(form.numero)){  errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); }

        if (errorList.length){
            errorList.map((error, index)=>{
                if (!$(`label#_${error.id}-error`).length){ $(`<label id="_${error.id}-error" class="_error" for="${error.id}" style="color: red"></label>`).insertAfter(`input#${error.id}`); }
                $(`label#_${error.id}-error`).html(error.message);
            });
            return;
        }

        let pagamento = {
            parcelas: maximoParcelas,
            nomeImpresso: $("input#nome_impresso").val(),
            numeroCpf: $("input#cpf").val(),
            numeroCartao: $("input#numero-cartao").val(),
            numeroCvc: $("input#cvc").val(),
            mesValidade: $("input#mes").val(),// MM
            anoValidade: $("input#ano").val() //AAAA
        }

        try{
            $("#loading-screen").show();
            let _localData = localData;
            _localData.produto = localData.orcamento.tipo;
            const response = await fetch( "/pagamento", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({orcamento: orcamento, pagamento: pagamento, formulario: formulario})
            });
            if (response.ok) {
                let data = await response.json();
                $.ajax({
                    url: '/datalayer',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({etapa: 'step-7', page: 'pagamento', proposta: data}),
                    success: function(res) { console.log('Sucesso:', res); },
                    error: function(xhr, status, error) { console.error('Error:', error); }
                });
                //localStorage.removeItem("finalData");
                //localStorage.removeItem("formData");
                $("#loading-screen").hide();
                //window.location.href = "./obrigado";
            } else {
                let data = await response.json();
                if (response.status == 400) {                
                    if (!data.fatal && data.errors){
                        data.errors.map((error, index)=>{
                            if (!$(`label#_${error.id}-error`).length){ 
                                $(`<label id="_${error.id}-error" class="_error" for="${error.id}" style="color: red"></label>`).insertAfter(`input#${error.id}`); 
                            }
                            $(`label#_${error.id}-error`).html(error.message);
                        });
                    }
                }else{
                    console.log("Erro:", data); 
                }
            }
            $("#loading-screen").hide();
        } catch (error) {
            $("#loading-screen").hide();
            console.log(error);
            //console.error("Não foi possível estabeleces uma conexão com o servidor.");
        }
    });
});*/
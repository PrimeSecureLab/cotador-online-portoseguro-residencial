$(document).ready(function() {
    // Ao clicar no botão "next-step", avança para a próxima etapa do formulário
    $(".next-step").click(async function() {
        var currentStep = $(this).closest(".form-step");
        var nextStep = currentStep.next(".form-step");
        if (nextStep.length > 0) {
            console.log(currentStep[0].id);
            currentStep.removeClass("active").fadeOut(250, function() {
                nextStep.addClass("active").fadeIn(250);
            });
        }
    });

    // Ao clicar no botão "prev-step", volta para a etapa anterior do formulário
    $(".prev-step").click(function() {
        var currentStep = $(this).closest(".form-step");
        var prevStep = currentStep.prev(".form-step");
        if (prevStep.length > 0) {
            currentStep.removeClass("active").fadeOut(250, function() {
                prevStep.addClass("active").fadeIn(250);
            });
        }
    });
});

// Adicionar máscara ao campo de CPF
$(document).ready(function () {
    $("#cpf").mask("999.999.999-99");
  });

  document.getElementById("form").addEventListener("submit", function (event) {
    // Obter o valor atual do campo de CPF
    const cpfField = document.getElementById("cpf");
    let cpf = cpfField.value;
  
    // Remover tudo o que não é dígito
    cpf = cpf.replace(/\D/g, "");
  
    // Fazer a conversão para o formato esperado pela API
    cpf = cpf.replace(/\D/g, "").substring(0, 11);
  
    // Atualizar o valor do campo de CPF antes de enviar o formulário
    cpfField.value = cpf;
  });

//Aplica Mascaras nos Inputs
$(document).ready(function () {
  $(".datanascimento").mask("00-00-0000", {
      translation: {
          0: {
              pattern: /[0-9]/,
          },
      },
      pattern:
          /^[0-9]{4}-(1[0-2]{1}|0[0-9]{1})-([0-2]{1}[0-9]{1}|3[0-1]{1})/,
  });
  $(".numerotelefone").mask("(00) 00000-0000", {
      translation: {
          0: {
              pattern: /^[0-9]{1,2}/,
          },
      },
  });
});

$(document).ready(function() {
    // Função para converter o valor em texto por extenso
    function formatCurrency(value) {
        if (value < 1000) {
            return value + "";
        } else if (value < 1000000) {
            return (value / 1000) + " mil";
        } else {
            return (value / 1000000) + " milhão";
        }
    }

    function setupRangeInput(config) {
        // Atualiza o valor formatado ao carregar a página
        $("." + config.rangeValueClass).text(formatCurrency($("#" + config.inputId).val()));

        // Atualiza o valor formatado quando o usuário ajusta o range
        $("#" + config.inputId).on("input", function() {
            $("." + config.rangeValueClass).text(formatCurrency($(this).val()));
            $("." + config.rangeValueClass).css("left", "calc(100% * (" + $(this).val() + " - " + $(this).attr("min") + ") / (" + $(this).attr("max") + " - " + $(this).attr("min") + "))");
        });
    }

    // Configuração dos Sliders
    const incendioConfig = {
        inputId: "valorcoberturaincendio",
        rangeValueClass: "range-value0",
        min: 10000,
        max: 1000000
    };
    const substracaoBensConfig = {
        inputId: "valorcoberturasubstracaobens",
        rangeValueClass: "range-value1",
        min: 10000,
        max: 1000000
    };
    const valorcoberturapagamentoaluguelConfig = {
        inputId: "valorcoberturapagamentoaluguel",
        rangeValueClass: "range-value2",
        min: 10000,
        max: 1000000
    };
    const valorcoberturarcfamiliar = {
        inputId: "valorcoberturarcfamiliar",
        rangeValueClass: "range-value3",
        min: 10000,
        max: 1000000
    };
    const valorCoberturaVendaval = {
        inputId: "valorcoberturavendaval",
        rangeValueClass: "range-value5",
        min: 10000,
        max: 1000000
    };
    const valorcoberturadesmoronamento = {
        inputId: "valorcoberturadesmoronamento",
        rangeValueClass: "range-value6",
        min: 10000,
        max: 1000000
    }
    const valorcoberturaalagamento = {
        inputId: "valorcoberturaalagamento",
        rangeValueClass: "range-value12",
        min: 10000,
        max: 1000000
    };
    const flaglmidiscriminado = {
        inputId: "flaglmidiscriminado",
        rangeValueClass: "range-value14",
        min: 10000,
        max: 1000000
    };
    const valorsubtracaobicicleta = {
        inputId: "valorsubtracaobicicleta",
        rangeValueClass: "range-value18",
        min: 10000,
        max: 1000000
    };
    const valorpequenasreformas = {
        inputId: "valorpequenasreformas",
        rangeValueClass: "range-value20",
        min: 10000,
        max: 1000000
    };

    // Inicializa os controles deslizantes com suas respectivas configurações
    setupRangeInput(incendioConfig);
    setupRangeInput(substracaoBensConfig);
    setupRangeInput(valorcoberturapagamentoaluguelConfig);
    setupRangeInput(valorcoberturarcfamiliar);
    setupRangeInput(valorCoberturaVendaval);
    setupRangeInput(valorcoberturadesmoronamento);
    setupRangeInput(valorcoberturaalagamento);
    setupRangeInput(flaglmidiscriminado);
    setupRangeInput(valorsubtracaobicicleta);
    setupRangeInput(valorpequenasreformas);
});


//Função que traduz o DatePicker e converte para o formato internacional.
$(function() {
  $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
  $("#datanascimento").datepicker({
      dateFormat: 'dd/mm/yy', // Define o formato da data
      changeMonth: true, // Permite a mudança do mês
      changeYear: true, // Permite a mudança do ano
      yearRange: '-100:+0', // Define o range de anos
      maxDate: new Date(), // Define a data máxima como a data atual
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'], // Define os nomes dos dias da semana
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'], // Define os nomes abreviados dos dias da semana
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'], // Define os nomes dos meses
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], // Define os nomes abreviados dos meses
      onSelect: function() {
          var date = $(this).datepicker('getDate');
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
      }
  });
});

//Função que adiciona um scroll lateral na div onde contem o ID "step-3"
$(document).ready(function () {
    var $div = $("#step-3");
    $div.animate({
        scrollLeft: $div.width()
    }, 1000);
});

$(function () {
  $("#form-register").validate({
    rules: {
      senha: { required: true },
      confirm_senha: { equalTo: "#senha" },
      email: { required: true },
      confirm_email: { equalTo: "#email" },
    },
    messages: {
      nome: { required: "Preencha o Campo Nome" },
      email: { required: "Campo Obrigatório" },
      confirm_email: {
        required: "Campo Obrigatório",
        equalTo: "Os campos de email precisam ser iguais.",
      },
      senha: { required: "Campo Obrigatório" },
      confirm_senha: {
        required: "Campo Obrigatório",
        equalTo: "Os campos de senha devem ser iguais",
      },
      cpf: { required: "Campo Obrigatório" },
      nome_impresso: { required: "Campo Obrigatório" },
      data_expedicao: { required: "Campo Obrigatório" },
      numero_documento: { required: "Campo Obrigatório" },
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

  $("#form-total").steps({
    headerTag: "h2",
    bodyTag: "section",
    transitionEffect: "fade",
    autoFocus: true,
    transitionEffectSpeed: 500,
    titleTemplate: '<div class="title">#title#</div>',
    labels: {
      previous: "Voltar",
      next: '<i class=""></i>',
      finish: '<i class=""></i>',
      current: "",
    },
    onStepChanging: function (event, currentIndex, newIndex) {
      var nome = $("#nome").val();
      var email = $("#email").val();
      var cpf = $("#cpf").val();
      var numerocartao = $("#numero-cartao").val();
      var cvc = $("#cvc").val();
      var month = $("#mes").val();
      var year = $("#ano").val();
      $("#nome-val").text(nome);
      $("#email-val").text(email);
      $("#cpf-val").text(cpf);
      $("#numero-cartao-val").text(numerocartao);
      $("#cvc-val").text(cvc);
      $("#mes-val").text(month);
      $("#ano-val").text(year);
      $("#form-register").validate().settings.ignore = ":disabled,:hidden";
      return $("#form-register").valid();
    },
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

$(document).ready(function () {
  $("#numero-cartao").mask("0000 0000 0000 0000");
});

//Função que traduz o DatePicker e converte para o formato internacional.
$(function () {
  $.datepicker.setDefaults($.datepicker.regional["pt-BR"]);
  $("#datanascimento").datepicker({
    dateFormat: "dd-mm-yy", // Define o formato da data
    changeMonth: true, // Permite a mudança do mês
    changeYear: true, // Permite a mudança do ano
    yearRange: "-100:+0", // Define o range de anos
    maxDate: new Date(), // Define a data máxima como a data atual
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ], // Define os nomes dos dias da semana
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"], // Define os nomes abreviados dos dias da semana
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ], // Define os nomes dos meses
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ], // Define os nomes abreviados dos meses
    onSelect: function () {
      var date = $(this).datepicker("getDate");
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
    },
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
    pattern: /^[0-9]{4}-(1[0-2]{1}|0[0-9]{1})-([0-2]{1}[0-9]{1}|3[0-1]{1})/,
  });
  $(".numerotelefone").mask("(00) 00000-0000", {
    translation: {
      0: {
        pattern: /^[0-9]{1,2}/,
      },
    },
  });
});

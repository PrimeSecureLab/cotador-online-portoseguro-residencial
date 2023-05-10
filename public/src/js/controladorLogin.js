function visualizarSenha() {
  var senha = document.getElementById("senha-login");
  var checkBox = document.getElementById("visualizar_senha");

  if (checkBox.checked) {
    senha.type = "text";
    confirmSenha.type = "text";
  } else {
    senha.type = "password";
    confirmSenha.type = "password";
  }
}
var loading = false;
$("#loading-screen").hide();

document.getElementById("form-login").addEventListener("submit", async (event) => {
  event.preventDefault(); 
  let form = { login: $("#login").val(), senha: $("#senha-login").val() }
  if (form.login.length < 5){ 
    if (!$("#error-message").length){ $("#form-login").before('<label id="error-message" style="color: red;"></label>'); } 
    $("#error-message").html("Email/CPF ou senha incorretos");
    return; 
  }
  if (form.senha.length < 8){ 
    if (!$("#error-message").length){ $("#form-login").before('<label id="error-message" style="color: red;"></label>'); } 
    $("#error-message").html("Email/CPF ou senha incorretos");
    return; 
  }

  try{
    $("#loading-screen").show();
    const response = await fetch( "/login", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(form)
    });
    if (response.ok) {
      let data = await response.json();
      $("#loading-screen").hide();
      window.location.href = "/pagamento";
      console.log(data);
    } else if (response.status === 400) {
      let data = await response.json();
      if (!$("#error-message").length){ $("#form-login").before('<label id="error-message" style="color: red;"></label>'); } 
      $("#error-message").html(data.message); 
      console.error("Erro:", data);
    } else {
      if (!$("#error-message").length){ $("#form-login").before('<label id="error-message" style="color: red;"></label>'); } 
      $("#error-message").html("Ocorreu um erro inesperado, tente novamente em alguns instantes");
      console.error("Ocorreu um erro inesperado");
    }
    $("#loading-screen").hide();
  } catch (error) {
    if (!$("#error-message").length){ $("#form-login").before('<label id="error-message" style="color: red;"></label>'); } 
    $("#error-message").html("Ocorreu um erro inesperado, tente novamente em alguns instantes");
    $("#loading-screen").hide();
  }
});
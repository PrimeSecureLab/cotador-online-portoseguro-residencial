// Função que preenche os campos com as informações do endereço
function preencherCamposEndereco(dados) {
    document.querySelector("#logradouro").value = dados.logradouro || '';
    document.querySelector("#bairro").value = dados.bairro || '';
    document.querySelector("#cidade").value = dados.localidade || '';
    document.querySelector("#uf").value = dados.uf || '';
    if (!dados.logradouro && !dados.bairro && !dados.cidade && !dados.uf){
        let input = $(`input#cep`); //Input do campo com erro
        let label = $(`label[for="cep"]`); //Label do campo com erro
        input.addClass('error');
        label.addClass('error');
        input.on('change keydown paste input', {label: label, input: input} ,(e)=>{ 
            e.data.label.removeClass('error'); 
            e.data.input.removeClass('error'); 
        });
    }
}
  
// função que limpa os campos do endereço
function limparCamposEndereco() {
    document.querySelector("#logradouro").value = "";
    document.querySelector("#bairro").value = "";
    document.querySelector("#cidade").value = "";
    document.querySelector("#uf").value = "";
}

// evento que é disparado ao preencher o campo de CEP
document.querySelector("#cep").addEventListener("blur", function () {
    // obtém o valor do CEP digitado
    var cep = this.value.replace(/\D/g, "");

    // se o CEP não tiver sido digitado corretamente
    if (cep.length != 8) { limparCamposEndereco(); return; }

    // chama a API do ViaCEP para obter as informações do endereço
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://viacep.com.br/ws/" + cep + "/json/");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var dados = JSON.parse(xhr.responseText);
            preencherCamposEndereco(dados);
        } else {
            limparCamposEndereco();
        }
    };
    xhr.send();
});
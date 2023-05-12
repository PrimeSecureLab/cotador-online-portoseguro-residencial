document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    var data = {};
    let inputArray = document.querySelectorAll('#form input');
    let selectArray = document.querySelectorAll('#form select');

    // Insere as inputs e selects no objeto data
    inputArray.forEach((input)=>{ data[input.id] = input.value; });
    selectArray.forEach((select)=>{ data[select.id] = select.value; });

    /*const cpfField = document.getElementById("cpf");
    let cpf = cpfField.value;

    cpf = cpf.replace(/\D/g, "");

    console.log("Valor do CPF antes da verificação:", cpf); // Adicione essa linha

    if (!validaCPF(cpf)) {
        cpfField.classList.add("is-invalid");
        return;
    }

    cpf = cpf.replace(/\D/g, "").substring(0, 11);

    cpfField.value = cpf;

    // Adicionar console.log para verificar o objeto data
    console.log("Dados enviados ao servidor:", JSON.stringify(data));*/
  
    try {
        const response = await fetch("/enviar-dados", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const { form_data } = await response.json(); // Recebe os dados da resposta
            //localStorage.setItem("token", token); // Adiciona o token ao localStorage
            localStorage.setItem("formData", form_data); // Adiciona o form encriptado ao localStorage
            window.location.href = "./planos"; // Redireciona para página de planos
        } else if (response.status === 400) {
            const errorData = await response.json();
            console.error("Erro no campo:", errorData.field);
            console.error("Mensagem de erro:", errorData.error);

            //Loop por array com erros vindos da API
            errorData.map((erro, index)=>{ 
                //erro = {error: mensagem de erro, field: id do campo com erro, step: etapa com erro}
                let input = $(`input#${erro.field}`); //Input do campo com erro
                let label = $(`label[for="${erro.field}"]`); //Label do campo com erro
                label.css("color", "red");
                input.css("color", "red");
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
$("#loading-screen").hide();
$(document).ready(function() {
    let input = {
        email: $('#confirmar-email'),
        emailLabel: $('label[for="confirmar-email"]'),
        novaSenha: $('#nova-senha'),
        novaSenhaLabel: $('label[for="nova-senha"]'),
        confirmarSenha: $('#confirmar-nova-senha'),
        confirmarSenhaLabel: $('label[for="confirmar-nova-senha"]'),
        checkSenha: $('#visualizar-senha'),
        divError: $('#lista-errors > div')
    };

    input.checkSenha.on('change', (e)=>{ 
        let checked = input.checkSenha.prop('checked');
        if (checked){ 
            input.novaSenha.attr('type', 'text');
            input.confirmarSenha.attr('type', 'text');
        }else{
            input.novaSenha.attr('type', 'password');
            input.confirmarSenha.attr('type', 'password');
        } 
    });

    $('#btn-confirmar').on('click', (e)=>{ validarDados(); });     

    function validarDados(){
        let errorList = [];                        
        $('#lista-erros').css('display', 'none'); 
        $('#lista-erros > div').empty();

        for(let i in input){ if (input[i].hasClass('error')){ input[i].removeClass('error'); } }

        if (!input.email.val()){
            if (!input.email.hasClass('error')){ input.email.addClass('error'); }
            if (!input.emailLabel.hasClass('error')){ input.emailLabel.addClass('error'); }
            errorList.push('O endereço de e-mail fornecido não é válido.');
        }

        if (input.novaSenha.val() != input.confirmarSenha.val()){ 
            if (!input.novaSenha.hasClass('error')){ input.novaSenha.addClass('error') };
            if (!input.novaSenhaLabel.hasClass('error')){ input.novaSenhaLabel.addClass('error') }; 
            if (!input.confirmarSenha.hasClass('error')){ input.confirmarSenha.addClass('error') }; 
            if (!input.confirmarSenhaLabel.hasClass('error')){ input.confirmarSenhaLabel.addClass('error') }; 
            errorList.push('As senhas não coincidem.');
        }

        if (input.novaSenha.val().length < 8){ 
            if (!input.novaSenha.hasClass('error')){ input.novaSenha.addClass('error'); }
            if (!input.novaSenhaLabel.hasClass('error')){ input.novaSenhaLabel.addClass('error'); }
            errorList.push('Sua senha de ter ao menos 8 caracteres.');
        }
        if (errorList.length > 0){ 
            $('#lista-erros').css('display', 'block');
            for(let i in errorList){
                let error = errorList[i];                
                $('#lista-erros > div').prepend(error + '<br>');
            }
        }
    }

    input.email.on('change keydown paste input', ()=>{
        if (input.email.hasClass('error')){ input.email.removeClass('error'); }
        if (input.emailLabel.hasClass('error')){ input.emailLabel.removeClass('error'); }
    });
    input.novaSenha.on('change keydown paste input', ()=>{
        if (input.novaSenha.hasClass('error')){ input.novaSenha.removeClass('error'); }
        if (input.novaSenhaLabel.hasClass('error')){ input.novaSenhaLabel.removeClass('error'); }
    });
    input.confirmarSenha.on('change keydown paste input', ()=>{
        if (input.confirmarSenha.hasClass('error')){ input.confirmarSenha.removeClass('error'); }
        if (input.confirmarSenhaLabel.hasClass('error')){ input.confirmarSenhaLabel.removeClass('error'); }
    });

});
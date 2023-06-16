const dotenv = require('dotenv');
dotenv.config();

class emailSenhaAlterada {
    contructor(){ }

    gerarEmailHTML(user){
        console.log(user);
        let nome = user.pessoaFisica.nome;
        let url = `${process.env.URL_RAIZ}`;
        let html =`
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-type" content="text/html; charset=UTF-8"> 
            </head>
            <html style='background-color:#F0F0F0'>
                <body style='background-color:transparent; font-family:Tahoma; margin:0px'>
                    <div style='max-width:640px; margin:20px auto 0 auto; background-color:white; border-radius: 5px;'>
                        <div style="width:100%; height:80px; display:flex; background-image: linear-gradient(30deg, #323d93 10%, #03a8db 60%);">
                            <a href="${url}" style="text-decoration:none; margin:auto 0px auto 35px;">
                                <img src="${process.env.URL_RAIZ}/src/img/logo.png" alt="Prime Secure Residencial" class="img-fluid" style="width: 280px;">
                            </a> 
                        </div>
                        <div style='font-size:13px; border-bottom:1px solid #FFDBBF;'>
                            <div style='padding:35px 0px; margin-left:40px;'>Olá, ${nome}.</div>
                            <div style='padding-bottom:35px; margin-left:40px;'>Você pediu e sua senha foi alterada!</div>
                            <div style='padding-bottom:80px; margin-left:40px;'>Sempre que quiser, você pode solicitar uma nova senha na página inicial do aplicativo.</div>
                            <div style='padding-bottom:8px; text-align:center; font-weight:bold;'>Não foi você que alterou a senha?</div>
                            <div style='padding-bottom:45px; text-align:center;'>Envie um e-mail para: <a style='text-decoration:none !important; color:black !important;'>contato@primesecure.com.br</a></div>
                        </div>      
                        <div style='width:100%; background-image: linear-gradient(30deg, #323d93 10%, #03a8db 60%);'>
                            <div style='padding:15px 0; font-size:14px; text-align:center; color:white'>
                                Dúvidas? Envie um e-mail para: <a style='text-decoration:none !important; color:white !important;'>contato@primesecure.com.br</a>
                            </div>
                        </div>
                    </div>
                </body>
            </html>  
        `;
        return html;
    }
}

module.exports = emailSenhaAlterada;
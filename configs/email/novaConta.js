const dotenv = require('dotenv');
dotenv.config();

class emailNovaConta {
    contructor(){ }

    gerarEmailHTML(user){
        console.log(user);
        let nome = user.pessoaFisica.nome;
        let html = `
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-type" content="text/html; charset=UTF-8"> 
            </head>
            <html style='background-color:#F0F0F0'>
                <body style='background-color:transparent; font-family:Tahoma; margin:0px'>
                    <div style='max-width:640px; margin:20px auto 0 auto; background-color:white; border-radius: 5px;'>
                        <div style='margin:0 40px; font-size:13px; padding-top: 30px;'>
                            <div style="font-size:14px; margin-bottom: 20px;">Olá ${nome}!</div>
                            <div style="font-size:14px; margin-bottom: 30px;">Seja bem vindo à Prime Secure.</div>
                        </div>
                    </div>
                </body>
            </html> 
        `;
        return html;
    }
}

module.exports = emailNovaConta;
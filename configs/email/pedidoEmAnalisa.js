const dotenv = require('dotenv');
dotenv.config();

class emailPedidoEmAnalise {
    contructor(){ }

    gerarEmailHTML(data){
        let user = data.user;
        let proposta = data.proposta;
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
                                <img src="${url}/src/img/logo.png" alt="Prime Secure Residencial" class="img-fluid" style="width: 280px;">
                            </a> 
                        </div> 
                        <div style='font-size:13px; border-bottom:1px solid #FFDBBF;'>
                            <div style='padding:35px 0px 15px 0px; margin-left:40px;'>Olá, ${nome}.</div>
                            <div style='padding-bottom:10px; margin-left:40px;'>Nós da Prime Secure agradecemos a preferência!</div>
                            <div style='padding-bottom:10px; margin-left:40px;'>O Seu Pagamento Está Sendo Processado!</div>                            
                            <div style='padding-bottom:40px; margin:0px 40px;'>Dentro de 5 Dias Corridos você será avisado(a) através dos email se a sua proposta foi aprovada.</div>
                            <div style='padding-bottom:40px; margin:0px 40px;'>Número da proposta: ${proposta.numeroProposta}</div>
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

module.exports = emailPedidoEmAnalise;
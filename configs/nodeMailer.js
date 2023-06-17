const nodemailer = require('nodemailer');
const emailNovaSenha = require('./email/novaSenha');
const emailNovaConta = require('./email/novaConta');
const emailSenhaAlterada = require('./email/senhaAlterada');
const emailPedidoEmAnalise = require('./email/pedidoEmAnalisa');
const dotenv = require('dotenv');

dotenv.config();

class NodeMailer {
    constructor(){
        this.endpoint = process.env.SMTP_ENDPOINT;
        this.port = process.env.SMTP_PORTA;
        this.user = process.env.SMTP_USER;
        this.password = process.env.SMTP_PASSWORD;
        this.emailFrom = 'matheus.marques.prime@gmail.com';
    }
    controladorEmail(data, action){
        if (!action){ return; }
        
        let email = 'matheus.marques.aquino@gmail.com';
        var html = '';
        var assunto = ''
        var template = ''
        switch(action){
            case 'recuperar-senha':
                if (!data){ return; }
                template = new emailNovaSenha();
                html = template.gerarEmailHTML(data).toString();
                assunto = 'Prime Secure - Alterar Senha';
                this.enviarEmail(assunto, html, email);
                break;

            case 'senha-alterada':
                if (!data){ return; }
                template = new emailSenhaAlterada();
                html = template.gerarEmailHTML(data).toString();
                assunto = 'Prime Secure - Sua Senha Foi Alterada';
                this.enviarEmail(assunto, html, email);
                break;   
            
            case 'conta-criada':
                if (!data){ return; }
                template = new emailNovaConta();
                html = template.gerarEmailHTML(data).toString();
                assunto = 'Prime Secure - Conta Criada';
                this.enviarEmail(assunto, html, email);
                break; 

            case 'proposta-criada':
                if (!data){ return; }
                template = new emailPedidoEmAnalise();
                html = template.gerarEmailHTML(data).toString();
                assunto = 'Prime Secure - Conta Criada';
                this.enviarEmail(assunto, html, email);
                break; 
        }
    }
    enviarEmail(subject, html, emailTo){
        return; //Cancela o envio de emails por enquanto

        if (!html){ return; }

        var mailOptions = { from: this.emailFrom, to: emailTo, subject: subject, html: html };

        var transporter = nodemailer.createTransport({
            host: this.endpoint,
            port: this.port,
            secure: true,
            auth: { user: this.user, pass: this.password },
            tls: { rejectUnauthorized: false } 
        });

        transporter.sendMail(mailOptions, (error, info)=>{
            if (error) { console.log('Error:', error); return; }
            console.log('Email sent:', info.response);             
        });
    }
}

module.exports = NodeMailer;
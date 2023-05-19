const nodemailer = require('nodemailer');
const emailNovaSenha = require('./email/novaSenha');
const dotenv = require('dotenv');

dotenv.config();

class NodeMailer {
    constructor(){
        this.endpoint = 'email-smtp.us-east-1.amazonaws.com';
        this.port = 465;
        this.user = process.env.SMTP_USER;
        this.password = process.env.SMTP_PASSWORD;
    }
    sendEmail(user, action){
        if (!user){ return; }
        if (!action){ return; }
        var transporter = nodemailer.createTransport({
            host: this.endpoint,
            port: this.port,
            secure: true,
            auth: { user: this.user, pass: this.password },
            tls: { rejectUnauthorized: false } 
        });
        var html = '';
        if (action == 'recuperar-senha'){
            //let user = user;
            //console.log(user);
            //if (!user){ return; }
            //if (!user.recuperarSenha){ return; }
            //if (!user.recuperarSenha.token){ return; }
            //if (!user.recuperarSenha.tokenCancelar){ return; }
            let template = new emailNovaSenha();
            html = template.gerarEmailHTML(user).toString();
            //return;
        }
        if (!html){ return; }

        var mailOptions = {
            from: 'matheus.marques.aquino@gmail.com',
            to: 'matheus.marques.aquino@gmail.com',
            subject: 'Teste Nodemailer',
            html: html
        };

        transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
}

module.exports = NodeMailer;
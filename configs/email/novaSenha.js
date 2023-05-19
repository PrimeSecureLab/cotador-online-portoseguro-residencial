class emailNovaSenha {
    contructor(){
        
    }
    gerarEmailHTML(user){
        console.log(user);
        let nome = this.user.pessoaFisica.nome;
        let url = `http://localhost:3000/recuperar-senha/${this.user.recuperarSenha.token}`;
        let urlCancelar = `http://localhost:3000/recuperar-senha/${this.user.recuperarSenha.tokenCancelar}`;
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
                            <div style="font-size:14px; margin-bottom: 30px;">Recebemos uma solicitação de recuperação de senha. Para cadastrar uma nova senha acesse clique no botão abaixo.</div>
                            <a href='${url}' style='text-decoration:none !important; color:white !important;'>
                                <div style='width:195px; height:40px; margin:0 auto 10px auto; background-color:#007bff; border-radius:8px; font-size:14px; text-align:center; color:white; display:flex'>
                                    <div style='margin:auto'>CRIAR NOVA SENHA</div>
                                </div>
                            </a>
                            <div style='margin-bottom:40px; font-size:13px; text-align:center; color:#999;'>*O link expira em 24 horas</div>
                        </div>   
                        <div style='margin:0 40px; padding-bottom: 40px; font-size:14px; text-align:center;'>
                            <div style='margin-bottom:25px; text-align: left;'>Se o botão não funcionar, é só copiar e colar o link abaixo no seu navegador e continuar com o cadastro da nova senha.</div>
                            <a style='margin-bottom:40px; text-align: left;'>${url}</a>
                            <div>Não foi você? <a href='${urlCancelar}' style='font-weight:600; color:#007AF3; cursor: pointer; text-decoration: none;'>Clique aqui!</a></div>    
                        </div>            
                    </div>
                </body>
            </html> 
        `;
        return html;
    }
}

module.exports = emailNovaSenha;
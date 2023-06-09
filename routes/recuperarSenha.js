const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const Usuarios = require('../collections/usuarios');
const NodeMailer = require('../configs/nodeMailer');

dotenv.config()

router.get('/', async (req, res) => { res.sendFile('recuperar-senha.html', { root: 'public' }); });

router.post('/cancelar/:token', async (req, res) => {
    let body = req.body;
    let token = req.params.token;

    if (!token){ return res.status(400).json({message: 'Desculpe, ocorreu um erro ao tentar cancelar a recuperação de senha.'}); }

    let user = await Usuarios.findOne({'recuperarSenha.tokenCancelar': token});
    if (!user){ return res.status(400).json({message: 'Desculpe, ocorreu um erro ao tentar cancelar a recuperação de senha.'}); }

    user.recuperarSenha = undefined;
    await user.save();

    return res.status(200).json({message: 'Recuperação de senha cancelada com sucesso.'});
});

router.post('/esqueceu-a-senha', async (req, res) => {
    let data = req.body;
    if (!data){ return res.status(400).json({message: ''}); }
    if (!data.email){ return res.status(400).json({message: ''}); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){ return res.status(400).json({message: ''}); }

    data.email = data.email.toLowerCase();
    let user = await Usuarios.findOne({email: data.email});
    if (!user){ return res.status(400).json({message: ''}); }

    if (user.recuperarSenha){
        var criadoEm = new Date(user.recuperarSenha.criadoEm);
        var hoje = new Date();
        if (isNaN(criadoEm.getTime())){ criadoEm = new Date(); }

        let outdated = Math.abs(hoje.getTime() - criadoEm.getTime());
        outdated = outdated / (1000 * 60);

        if (outdated < 15){ return res.status(400).json({message: 'Aguarde mais alguns minutos antes de solicitar a alteração de senha novamente.'}); }
    }

    let tokenA = '';
    let tokenB = '';
    for(let i=0; i < 10; i++){ 
        tokenA += Math.random(0).toString(36).slice(-10); 
        tokenB += Math.random(0).toString(36).slice(-10); 
    }
    user = await Usuarios.findOneAndUpdate(
        { email: data.email }, 
        { recuperarSenha: { token: tokenA, criadoEm: new Date(), tokenCancelar: tokenB }}
    );
    user = await user.save();

    let mailer = new NodeMailer();
    mailer.controladorEmail(user, 'recuperar-senha');

    return res.status(200).json({message: ''});
});

router.post('/:token', async (req, res)=>{
    let data = req.body;
    let token = req.params.token;

    if (!token){ return res.status(400).json({message: '', redirect: '/login'}); }
    token = token.toString();

    if (!data){ return res.status(400).json({message: ''}); }
    if (!data.email){ return res.status(400).json({message: '', id: 'email'}); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){ return res.status(400).json({message: '', id: 'email'}); }
    data.email = data.email.toLowerCase();

    if (!data.senha){ return res.status(400).json({message: '', id: 'senha'}); }
    if (!/^.{8,32}$/.test(data.senha)){ return res.status(400).json({message: 'Sua senha deve ter no mínimo 8 caracteres', id: 'senha'}); }
    
    let user = await Usuarios.findOne({'recuperarSenha.token': token});
    if (!user){ return res.status(400).json({message: '', redirect: '/login'}); }

    if (!user.recuperarSenha){ return res.status(400).json({message: '', redirect: '/login'}); }
    if (!user.recuperarSenha.token){ return res.status(400).json({message: '', redirect: '/login'}); }

    let hoje = new Date();
    let criadoEm = new Date(user.recuperarSenha.criadoEm);
    
    let outdated = Math.abs(hoje - criadoEm);
    outdated = Math.ceil(outdated / (1000 * 60 * 60 * 24));

    if (outdated > 24){ return res.status(400).json({message: '', redirect: '/login'}); }

    user.recuperarSenha = undefined;
    user.senha = CryptoJS.MD5(data.senha).toString();
    user = await user.save();

    let mailer = new NodeMailer();
    mailer.controladorEmail(user, 'senha-alterada');

    return res.status(200).json({message: 'Senha alterada com sucesso!', redirect: '/login'});
});

module.exports = router;
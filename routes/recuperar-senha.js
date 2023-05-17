const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const Usuarios = require('../collections/usuarios');

router.post('/esqueceu-a-senha', async (req, res) => {
    let data = req.body;
    if (!data){ return res.status(400).json({message: ''}); }
    if (!data.email){ return res.status(400).json({message: ''}); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){ return res.status(400).json({message: ''}); }

    data.email = data.email.toLowerCase();
    let user = await Usuarios.findOne({email: data.email});
    if (!user){ return res.status(400).json({message: ''}); }

    let token = '';
    for(let i=0; i < 5; i++){ token += Math.random(0).toString(36).slice(-10); }
    user = await Usuarios.findOneAndUpdate({ email: data.email }, { recuperarSenha: { token: token, criadoEm: new Date() }});
    user = await user.save();

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
    let criadoEm = new Date(user.recuperarSenha.criadoEm.toString());
    
    let outdated = Math.abs(hoje - criadoEm);
    outdated = Math.ceil(outdated / (1000 * 60 * 60));

    if (outdated > 24){ return res.status(400).json({message: '', redirect: '/login'}); }

    user.recuperarSenha = undefined;
    user.senha = CryptoJS.MD5(data.senha).toString();
    user = await user.save();

    return res.status(200).json({message: 'Senha alterada com sucesso!', redirect: '/login'});
});

module.exports = router;
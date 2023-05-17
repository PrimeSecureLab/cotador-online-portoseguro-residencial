const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const DataLayer = require('../collections/dataLayer');
const Usuarios = require('../collections/usuarios');

dotenv.config();

router.post("/", async (req, res)=>{
    let session = req.session ? req.session : {};
    let data = req.body;
    let user = false;
    let dados = {};

    if (session.user_id){
        user = await Usuarios.findOne({_id: session.user_id});
        if (!user){ 
            user = false; 
        }else{ 
            user = {
                _id: user.id, 
                email: user.email, 
                nome: user.pessoaFisica.nome, 
                cpf: user.pessoaFisica.cpf
            }; 
        }
    }

    if (!session.accessToken){
        let token = '' ;
        for(i=0; i < 10; i++){ token += Math.random(0).toString(36).slice(-10); } 
        session.accessToken = token;
    }

    let etapa = data.etapa || '0';
    etapa = etapa.replace(/[^0-9]+/g, '');
    etapa = `etapa_${etapa}`;

    let entry = await DataLayer.findOne({session_id: session.accessToken});
    if (!entry){
        if (data){ 
            if (!dados[etapa]){ dados[etapa] = {}; }
            for(let key in data){ 
                if (key == 'etapa'){ continue; }
                let value = data[key]; 
                dados[etapa][key] = [value]; 
            } 
        }
        let entry = new DataLayer({    
            session_id: session.accessToken,
            primeiraInteracao: new Date(),
            ultimaInteracao: new Date(),
            dados: dados
        });
        entry = await entry.save();
        return res.status(200).json({message: '0'});
    }

    dados = entry.dados;

    if (!dados){ dados = {}; }
    if (!dados[etapa]){ dados[etapa] = {}; }
    if (!dados.user){ dados.user = []; }
    dados.user.push(user);


    for(let key in data){
        if (key == 'etapa'){ continue; }
        let value = data[key];
        if (!dados[etapa][key]){ dados[etapa][key] = [value]; continue; }
        if (dados[etapa][key][dados[etapa][key].length - 1] == value){ continue; }
        dados[etapa][key].push(value);
    }
    entry.ultimaInteracao = new Date();
    entry.dados = undefined;
    await entry.save();

    entry.dados = dados;
    await entry.save();
    //entry.set({'dados': dados});
    //await entry.updateOne({session_id: session.accessToken}, {'$set':{'dados': dados}});
    //console.log(dados);
    //await entry.save();
    
            
               
/*
    if (!entry){
        entry = 
    }
    if (!entry.dados){ entry.dados = {}; }
    if (!data){ entry = await entry.save(); return res.status(200).json({message: 'ok'}); }
    
    //let dados = entry.dados;
    for(let i in data){
        let key = i;
        let value = data[i];
        if (!dados[key]){ dados[key] = [value]; continue; }
        if (dados[key][dados[key].length - 1] == value){ continue; }
        dados[key].push(value);
    }
    entry.dados = dados;
    entry.ultimaInteracao = new Date();
    console.log(entry);
    entry = await DataLayer.findOneAndUpdate({session_id: session.accessToken}, $set({dados: dados}));//entry.save();*/

    return res.status(200).json({message: 'ok'});
});

module.exports = router;

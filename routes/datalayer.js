const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const DataLayer = require('../collections/dataLayer');
<<<<<<< Updated upstream
=======
const Usuarios = require('../collections/usuarios');
const PortoCoberturas = require('../configs/coberturas');
>>>>>>> Stashed changes
const Usuarios = require('../collections/usuarios');

dotenv.config();

router.post("/", async (req, res)=>{
    let session = req.session ? req.session : {};
<<<<<<< Updated upstream
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
=======
    let data = req.body || {};
    let user = false;
    let dados = {};

    let etapa = data.etapa || '0';
    let newLead = data.newLead || false;

    etapa = etapa.replace(/[^0-9]+/g, '');
    etapa = `etapa_${etapa}`;

    if (etapa == 'etapa_1' && newLead){
        let token = '';
        for(i=0; i < 10; i++){ token += Math.random(0).toString(36).slice(-10); } 
        session.accessToken = token;
    }else{
        if (!session.accessToken){
            let token = '';
            for(i=0; i < 10; i++){ token += Math.random(0).toString(36).slice(-10); } 
            session.accessToken = token;
        }
    }

    if (session.user_id){
        user = await Usuarios.findOne({_id: session.user_id});
        if (!user){ user = false; }
        if (user){ user = { _id: user.id, email: user.email, nome: user.pessoaFisica.nome, cpf: user.pessoaFisica.cpf }; }
    }
    
    let entry = await DataLayer.findOne({session_id: session.accessToken});
    let relacaoCoberturas = [];
    let listaCoberturas = [];

    if (!entry){
        if (!dados[etapa]){ dados[etapa] = {}; }

        for(let key in data){ 
            if (key == 'etapa'){ continue; }
            if (key == 'newLead'){ continue; }
            if (key == 'codigocanal'){ continue; }
            if (key == 'susep'){ continue; }
            if (key == 'flagimprimircodigooperacaoorcamento'){ continue; }
            if (key == 'codigooperacao'){ continue; }
            if (etapa == 'etapa_3'){ continue; }

            let value = data[key]; 
            dados[etapa][key] = [value]; 
        } 

        if (etapa == 'etapa_3'){
            let portoCoberturas = new PortoCoberturas;
            listaCoberturas = portoCoberturas.listaCoberturas('all', false);
            listaCoberturas.map((item)=>{ relacaoCoberturas[item.toLowerCase()] = item; });
            for(let key in data){
                let value = data[key];
                let item = relacaoCoberturas[key];
                if (item){ dados[etapa][item] = [value]; }
            }
        }

        let entry = new DataLayer({    
            session_id: session.accessToken,
            primeiraInteracao: new Date(),
            ultimaInteracao: new Date(),
            listaInteracoes: [new Date()],
            dados: dados
        });

        entry = await entry.save();
        return res.status(200).json({message: '0'});
    }

    dados = entry.dados;

    if (!dados){ dados = {}; }
    if (!dados[etapa]){ dados[etapa] = {}; }

    if (!entry.user){ 
        entry.user = [user]; 
    }else{
        let lastUser = entry.user[entry.user.length - 1];
        lastUser = JSON.stringify(lastUser);
        if (JSON.stringify(user) != lastUser){ entry.user.push(user); }
    }

    if (etapa == 'etapa_3'){
        let portoCoberturas = new PortoCoberturas;
        listaCoberturas = portoCoberturas.listaCoberturas('all', false);
        listaCoberturas.map((item)=>{ relacaoCoberturas[item.toLowerCase()] = item; });
        for(let key in data){
            let value = data[key];
            let item = relacaoCoberturas[key];
            if (!dados[etapa][item]){ dados[etapa][item] = [value]; continue; }
            if (dados[etapa][item][dados[etapa][item].length - 1] == value){ continue; }
            if (item){ dados[etapa][item].push(value); }
        }
    }

    for(let key in data){
        if (key == 'etapa'){ continue; }
        if (key == 'newLead'){ continue; }
        if (key == 'codigocanal'){ continue; }
        if (key == 'susep'){ continue; }
        if (key == 'flagimprimircodigooperacaoorcamento'){ continue; }
        if (key == 'codigooperacao'){ continue; }
        if (etapa == 'etapa_3' ){ continue; }

        let value = data[key];
        if (!dados[etapa][key]){ dados[etapa][key] = [value]; continue; }
        if (dados[etapa][key][dados[etapa][key].length - 1] == value){ continue; }
        dados[etapa][key].push(value);
    }

    if (!entry.listaInteracoes){ entry.listaInteracoes = [new Date()]; }else{ entry.listaInteracoes.push(new Date()); }
    entry.ultimaInteracao = new Date();

    console.log(dados)

    const lastEntry = { user: entry.user, listaInteracoes: entry.listaInteracoes };
    entry.dados = undefined;
    entry.user = undefined;
    entry.listaInteracoes = undefined;
    await entry.save();

    entry.dados = dados;
    entry.user = lastEntry.user;
    entry.listaInteracoes = lastEntry.listaInteracoes;
    await entry.save();

    if (etapa == 'etapa_7'){ req.session.accessToken = ''; }

    return res.status(200).json({message: 'ok'});
>>>>>>> Stashed changes
});

module.exports = router;

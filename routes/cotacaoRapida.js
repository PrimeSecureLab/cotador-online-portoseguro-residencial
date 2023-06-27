const express = require("express");
const CryptoJS = require("crypto-js");
const router = express.Router();
const dotenv = require('dotenv');

const ValidarCotacao = require('../configs/validarCotacao');
var validacaoCotacao = new ValidarCotacao;

dotenv.config();

// Define a rota para a página HTML
router.get("/", async (req, res) => {   
    try{
        const landpageData = req.query;
        let lead = validacaoCotacao.validarDadosLandPage(landpageData);
        console.log(lead);

        if (!req.session){ req.session = {}; }
        if (!req.session.cotacao){ req.session.cotacao = {}; }

        req.session.cotacao.nome = lead.nome || '';
        req.session.cotacao.email = lead.email || '';
        req.session.cotacao.numerotelefone = lead.telefone || '';

        req.session.save((error) => { if (error){ console.error(error); } res.redirect('/'); });
        
    }catch(error){ if (error){ console.error(error); } res.redirect('/'); }
});

module.exports = router;

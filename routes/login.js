const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const Usuarios = require('../collections/usuarios');
const validation = require('../configs/validation');

router.get("/", async (req, res) => {
    let session = (req.session) ? req.session : {};
    if (!session.user_id){ return res.sendFile("login.html", { root: "public" })}

    let user = await Usuarios.findOne({_id: req.session.user_id})
    if (!user){ req.session.destroy(); return res.sendFile("login.html", { root: "public" }); }

    return res.redirect('/pagamento');
});

router.post("/", async (req, res)=>{
    let data = req.body;
    let fatalError = false;
    let session = (req.session) ? req.session : {};

    if (session.user_id){ 
        let user = await Usuarios.findOne({_id: session.user_id});
        if (user){ return res.status(200).json({redirect: "/pagamento"}); }
    }

    if (!data){ arrayErros.push({message: "Ocorreu um erro durante o envio dos dados"}); }
    if (!data.login){ fatalError = { code: 1 }; }
    if (!data.senha){ fatalError = { code: 2 }; }
    if (fatalError){ return res.status(400).json({message: "Email/CPF ou senha incorretos"}) }

    if (data.login.length < 5){ fatalError = { code: 3 }; }
    if (data.senha.length < 8){ fatalError = { code: 4 }; }
    if (fatalError){ return res.status(400).json({message: "Email/CPF ou senha incorretos"}); }

    let user = await Usuarios.findOne({'usuario.email': data.login.trim()});
    if (!user){ user = await Usuarios.findOne({'usuario.cpf': data.login.trim().replace(/[^0-9]+/g, "")}); }
    if (!user){ fatalError = { code: 5 }; }
    if (fatalError){ return res.status(400).json({message: "Email/CPF ou senha incorretos"}); }

    if (data.senha != user.usuario.senha){ fatalError = { code: 6 }; }
    if (fatalError){ return res.status(400).json({message: "Email/CPF ou senha incorretos"}); }

    req.session.user_id = user.id;
    req.session.sessionStart = new Date(); 

    return res.status(200).json({redirect: "/pagamento"});    
})

module.exports = router;
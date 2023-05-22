const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");
const axios = require("axios");

const Usuarios = require('../collections/usuarios');

router.get("/", (req, res) => { res.sendFile("obrigado.html", { root: "public" }); });

module.exports = router;
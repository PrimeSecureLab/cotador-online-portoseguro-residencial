const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const DataLayer = require('../collections/dataLayer');

dotenv.config();

router.post("/", async (req, res)=>{
    let session = req.session ? req.session : {};
    if (!session.accessToken){
        let token = '' ;
        for(i=0; i < 15; i++){ token += Math.random(0).toString(36).slice(-10); } 
        session.accessToken = token;
    }
    console.log(req.session);
});

module.exports = router;

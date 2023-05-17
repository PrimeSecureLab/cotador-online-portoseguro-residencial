const express = require("express");
const axios = require("axios");
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const Tokens = require('../collections/tokens');
dotenv.config();

const authToken = async ()=>{
    return new Promise( async function (resolve, reject){
        let lastToken = await Tokens.findOne({}).sort({'created_at': -1});
        if (lastToken){
            let tokenAccess = lastToken.access_token;
            let tokenDate = lastToken.created_at;  
            if (tokenDate && tokenAccess){
                let now = new Date();
                let difference = now.getTime() - tokenDate.getTime();
                let timeThreshold = 55;
                difference = difference / ( 1000 * 60 );
                if (difference < timeThreshold){ 
                    if (tokenAccess){ return resolve(tokenAccess); } 
                }
            }
        } 
        let url = 'https://portoapi-sandbox.portoseguro.com.br/oauth/v2/access-token';
        let buffer =  Buffer.from(process.env.AUTH_USERNAME + ':' + process.env.AUTH_PASSWORD);
        let dataBase64 = buffer.toString('base64');
        let header = { headers: { "Content-Type": "application/json", "Authorization": `Basic ${dataBase64}` } };
        let newToken = await axios.post( url, { grant_type : "client_credentials"}, header );
        let token = {
            access_token: newToken.data.access_token,
            token_type: newToken.data.token_type,
            expires_in: newToken.data.expires_in,
            created_at: new Date()
        };
        token = new Tokens(token);
        token = await token.save();
        setTimeout(() => { resolve( token.access_token ); }, 200);
    });
}

module.exports = authToken;
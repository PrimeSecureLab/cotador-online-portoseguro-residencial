const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");
const validation = require('../configs/validation');

dotenv.config();

class ValidarCotacao extends Object{
    constructor(){ 
        super();
        this.regex = {
            nomeCartao: /^[a-zA-ZÀ-ÿ\s']+$/,
            cartaoElo: /^(40117[8-9]|4011[8-9][0-9]|4[23][0-9]{2}|5[1-5][0-9]{2}|5[6][0-9][0-9]|6[0-9]{3})[0-9]{10}$/,
            cartaoDiners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            cartaoVisa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            cartaoMaster: /^5[1-5][0-9]{14}$/,
        } 
    }
    validarCartao(nome, numero, cvc, validade){
        var errorList = [];
        var cartao = { nome: nome, numero: numero, cvc: cvc, validade: [], valido: true }

        // Nome
        if (nome.length < 3){ errorList.push({message: "Nome inválido", id: "nome_impresso"}); 
        }else{
            if (!this.regex.nomeCartao.test(nome)){ errorList.push({message: "Nome inválido"}); }
        }

        // CVC
        if (!/^\d{2,4}$/.test(cvc)){ errorList.push({message: "CVC inválido", id: "cvc"}); } 

        //Validade        
        cartao.validade[0] = parseInt(validade[0]) || 0;
        cartao.validade[1] = parseInt(validade[1]) || 0;

        if (/^[1-9]$/.test(cartao.validade[0])){ cartao.validade[0] = `0${cartao.validade[0]}`; }
        if (parseInt(cartao.validade[0]) < 1 || parseInt(cartao.validade[0]) > 12){ errorList.push({message: "Mês inválido", id: "mes"}); }

        if (/^[0-9]{2}$/.test(cartao.validade[1])){ cartao.validade[1] = `20${cartao.validade[1]}`; }
        if (parseInt(cartao.validade[1]) < 2023){ errorList.push({message: "Ano inválido", id: "ano"}); }

        // Número
        if (cartao.numero){ cartao.numero = numero.replace(/[^0-9]+/g, ""); }
        if (!/^\d{16}$/.test(cartao.numero)){ 
            errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); 
        }else{
            let soma = 0;
            let dobrar = false;
            for (var i = cartao.numero.toString().length - 1; i >= 0; i--) {
                let digito = parseInt(cartao.numero.toString().charAt(i), 10);
                if (dobrar) { if ((digito *= 2) > 9){ digito -= 9; } }
                soma += digito; dobrar = !dobrar;
            }
            if ((soma % 10) != 0){ errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); }
        }
    
        if (errorList.length){ cartao.valido = false; cartao.errors = errorList; return cartao; }else{ return true; }    
    }
    identificarBandeira(numeroCartao){
        let numero = numeroCartao.replace(/[^0-9]+/g, "");
        let codigoBandeira = false;
        if (!cartaoElo.test(numero)){ codigoBandeira = 5; }
        if (!cartaoDiners.test(numero)){ codigoBandeira = 3; }
        if (!cartaoMaster.test(numero)){ codigoBandeira = 2; }
        if (!cartaoVisa.test(numero)){ codigoBandeira = 1; }

        return codigoBandeira;
    }

}

module.exports = ValidarCotacao;
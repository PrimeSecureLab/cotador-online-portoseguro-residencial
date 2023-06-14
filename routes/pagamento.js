const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const Usuarios = require('../collections/usuarios');
const Propostas = require('../collections/propostas');
const authToken = require('../configs/authToken');
const validation = require('../configs/validation');

const ValidarCotacao = require('../configs/validarCotacao');
var validacaoCotacao = new ValidarCotacao;

dotenv.config();

router.get("/", async (req, res) => {
    if (!req.session){ return res.redirect('/cadastro'); }
    if (!req.session.user_id){ return res.redirect('/cadastro'); }
    if (req.session.user_id){ 
        let user = await Usuarios.findOne({_id: req.session.user_id})
        if (!user){ req.session.destroy((e) => { return res.redirect('/cadastro'); }); }
    }
    res.sendFile("pagamento.html", { root: "public" });
});

router.post("/", async (req, res) => {
    // Verifica se sessão possui user_id;
    let session = (req.session) ? req.session : {};
    if (!session.user_id){ return res.status(400).json({fatal: 1}); }

    // Verifica se user_id é válido
    let user = await Usuarios.findOne({_id: session.user_id});
    if (!user){ req.session.destroy((e) => { return res.status(400).json({redirect: '/login'}); }); }

    let errorList = [];
    let body = req.body;

    console.log(body);

    if (!body){ return res.status(400).json({fatal: 3}); }
    if (!body.formData){ return res.status(400).json({redirect: '/'}); } //Verifica se dados da Cotação ainda são válidos
    if (!body.pagamento){ return res.status(400).json({fatal: 4}); }

    if (!body.produto){ return res.status(400).json({fatal: 5}); }
    let produto = data.produto;

    if (produto != 'habitual' && produto != 'habitual-premium' && produto != 'veraneiro'){ return res.status(400).json({fatal: 6}); }
    let bytes = CryptoJS.AES.decrypt(data.formData, process.env.CRYPTO_TOKEN);
    if (!bytes){ return res.status(400).json({redirect: '/'}); }
    
    let formData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (!formData){ return res.status(400).json({redirect: '/'}); }

    formData.item = data.itemData;    

    let pagamento = data.pagamento || {};
    pagamento.codigoBandeira = 0;

    if (pagamento.nomeImpresso.length < 3){ 
        errorList.push({message: "Nome inválido", id: "nome_impresso"}); 
    }else{
        if (!/^[A-zÀ-ú/\s]+$/.test(pagamento.nomeImpresso)){ errorList.push({message: "Nome inválido"}); }
    }
    if (!/^\d{2,4}$/.test(pagamento.numeroCvc)){ errorList.push({message: "CVC inválido", id: "cvc"}); } 
    if (!/^\d{2}$/.test(pagamento.mesValidade)){ 
        if (/^[1-9]$/.test(pagamento.mesValidade)){// Caso tenha apenas 1 dígito 
            pagamento.mesValidade = `0${pagamento.mesValidade}`; 
            $("#mes").val(pagamento.mesValidade); 
        }else{ // Caso tenha mais de 2 digitos
            errorList.push({message: "Mês inválido", id: "mes"}); 
        }
    }else{
        if (parseInt(pagamento.mesValidade) > 12){ errorList.push({message: "Mês inválido", id: "mes"}); }
    }
    if (!/^\d{4}$/.test(pagamento.anoValidade)){ 
        if (/^\d{2}$/.test(pagamento.anoValidade)){
            $("#ano").val(`20${pagamento.anoValidade}`);
            if (parseInt(pagamento.anoValidade) < 23){ errorList.push({message: "Ano inválido", id: "ano"}); }
        }else{
            errorList.push({message: "Ano inválido", id: "ano"});
        }  
    }
    if (pagamento.numeroCartao){ pagamento.numeroCartao = pagamento.numeroCartao.replace(/[^0-9]+/g, ""); }
    if (!/^\d{16}$/.test(pagamento.numeroCartao)){ 
        errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); 
    }else{
        let soma = 0;
        let dobrar = false;
        for (var i = pagamento.numeroCartao.length - 1; i >= 0; i--) {
            let digito = parseInt(pagamento.numeroCartao.charAt(i), 10);
            if (dobrar) { if ((digito *= 2) > 9){ digito -= 9; } }
            soma += digito;
            dobrar = !dobrar;
        }
        if ((soma % 10) != 0){ errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); }
    }

    if (errorList.length){ return res.status(400).json({fatal: false, errors: errorList}); }

    if (!validation.eloCardPattern.test(pagamento.numeroCartao)){ pagamento.codigoBandeira = 5; }
    if (!validation.dinersCardPattern.test(pagamento.numeroCartao)){ pagamento.codigoBandeira = 3; }
    if (!validation.masterCardPattern.test(pagamento.numeroCartao)){ pagamento.codigoBandeira = 2; }
    if (!validation.visaCardPattern.test(pagamento.numeroCartao)){ pagamento.codigoBandeira = 1; }

    let segurado = formData.segurado || {};
    let endereco = segurado.endereco || {};
    let pessoaFisica = user.pessoaFisica || {};    
    
    endereco.cep = endereco.cep || '';
    endereco.cep = endereco.cep.replace(/\D/g, '');

    segurado.numeroTelefone = segurado.numeroTelefone || '';
    segurado.numeroTelefone = segurado.numeroTelefone.replace(/\D/g, '');

    documento.numero  = documento.numero || '';
    documento.numero = documento.numero.replace(/\D/g, '');

    let dataNascimeto = pessoaFisica.dataNascimento || '';
    dataNascimeto = dataNascimeto.formatarDataAmericana(dataNascimento);

    let dataExpedicao = documento.dataExpedicao || '';
    dataExpedicao = dataExpedicao.formatarDataAmericana(dataExpedicao);

    pagamento.numeroParcelas = 1;
    pagamento.formaPagamento = "CARTAO_DE_CREDITO_62";

    let proposta = {        
        "numeroOrcamento": data.orcamento.numeroOrcamento,
        "codigoPessoaPoliticamenteExposta": pessoaFisica.pessoaPoliticamenteExposta,
        "segurado": {
            "enderecoCobranca": {
                "cep": endereco.cep,
                "tipoLogradouro": endereco.tipo,
                "logradouro": endereco.logradouro,
                "numero": endereco.numero,
                "bairro": endereco.bairro,
                "cidade": endereco.cidade,
                "uf": endereco.uf
            },
            "enderecoCorrespondencia": {
                "cep": endereco.cep,
                "tipoLogradouro": endereco.tipo,
                "logradouro": endereco.logradouro,
                "numero": endereco.numero,
                "bairro": endereco.bairro,
                "cidade": endereco.cidade,
                "uf": endereco.uf
            },
            //"contato": {
            //   "email": segurado.email
            //},
            //"pessoaPoliticamenteExposta": {
            //    "cpf": "64010333049",
            //    "nome": "Gilbor Baohon Koxyorim",
            //    "codigoGrauRelacionamento": 1
            //},
            "pessoaFisica": {
                "dataNascimento": dataNascimeto,
                "codigoSexo": pessoaFisica.sexo,
                "codigoEstadoCivil": pessoaFisica.estadoCivil,
                "codigoPaisResidencia": 237,
                "codigoFaixaRenda": pessoaFisica.faixaRenda,
                "documentoIdentificacao": {
                    "tipoDocumento": documento.tipo,
                    "numeroDocumento": documento.numero,
                    "orgaoExpedidor": documento.orgaoExpedidor,
                    "dataExpedicao": dataExpedicao
                }
            }
        },
        "pagamento": {
            "formaPagamento": pagamento.formaPagamento,
            "quantidadeParcelas": pagamento.numeroParcelas,
            "cartao": {
                "numeroCartao": "5408094831763990",
                "codigoBandeira": pagamento.codigoBandeira,
                "mesValidade": pagamento.mesValidade,
                "anoValidade": pagamento.anoValidade
            }
        }
    };

    let contato = { email: user.email || '' };
    if (numeroTelefone.length == 10){ contato.numeroTelefoneResidencial = numeroTelefone; }
    if (numeroTelefone.length == 11){ contato.numeroTelefoneCelular = numeroTelefone; }    

    let politicamenteExposta = pessoaFisica.politicamenteExposta || {};
    politicamenteExposta.cpf = politicamenteExposta.cpf || '';
    politicamenteExposta.cpf = politicamenteExposta.cpf.replace(/\D/g, '');
    politicamenteExposta.nome = politicamenteExposta.nome || '';
    politicamenteExposta.grauRelacionamento = politicamenteExposta.grauRelacionamento;

    proposta.segurado.contato = contato;
    proposta.segurado.pessoaPoliticamenteExposta = politicamenteExposta;
    
    /*
    let politicamenteExposta = {
        "cpf": pessoaFisica.politicamenteExposta.cpf,
        "nome": pessoaFisica.politicamenteExposta.nome,
        "codigoGrauRelacionamento": pessoaFisica.politicamenteExposta.grauRelacionamento
    };*/
    /*

    if (formData.segurado.numeroTelefone){ formData.segurado.numeroTelefone = formData.segurado.numeroTelefone.replace(/\D/g, ''); }

    let pessoaFisica = user.pessoaFisica;
    
    let dataNascimento = pessoaFisica.dataNascimento.toString();
    dataNascimento = dataNascimento.split('-');
    dataNascimento = `${dataNascimento[2]}-${dataNascimento[1]}-${dataNascimento[0]}`;
    
    let documento = pessoaFisica.documento;

    let dataExpedicao = documento.dataExpedicao.toString();
    dataExpedicao = dataExpedicao.split('-');
    dataExpedicao = `${dataExpedicao[2]}-${dataExpedicao[1]}-${dataExpedicao[0]}`;
    
    let proposta = {
        "numeroOrcamento": data.orcamento.numeroOrcamento,
        "codigoPessoaPoliticamenteExposta": user.pessoaFisica.pessoaPoliticamenteExposta, // 1 - Sim, 2 - Não
        "segurado": {
            "enderecoCobranca": {
                "cep": formData.segurado.endereco.cep.replace(/\D/g, ''),
                "tipoLogradouro": formData.segurado.endereco.tipo,
                "logradouro": formData.segurado.endereco.logradouro,
                "numero": formData.segurado.endereco.numero,
                "bairro": formData.segurado.endereco.bairro,
                //"complemento": formData.segurado.endereco.complemento,
                "cidade": formData.segurado.endereco.cidade,
                "uf": formData.segurado.endereco.uf
            },
            "enderecoCorrespondencia": {
                "cep": formData.segurado.endereco.cep.replace(/\D/g, ''),
                "tipoLogradouro": formData.segurado.endereco.tipo,
                "logradouro": formData.segurado.endereco.logradouro,
                "numero": formData.segurado.endereco.numero,
                "bairro": formData.segurado.endereco.bairro,
                //"complemento": formData.segurado.endereco.complemento,
                "cidade": formData.segurado.endereco.cidade,
                "uf": formData.segurado.endereco.uf
            },
            "contato": {
                "email": formData.segurado.email
            },
            "pessoaFisica": {
                "dataNascimento": dataNascimento,
                "codigoSexo": pessoaFisica.sexo,
                "codigoEstadoCivil": pessoaFisica.estadoCivil,
                "codigoPaisResidencia": 237,
                "codigoFaixaRenda": pessoaFisica.faixaRenda,
                "documentoIdentificacao": {
                    "tipoDocumento": documento.tipo,
                    "numeroDocumento": documento.numero,
                    "orgaoExpedidor": documento.orgaoExpedidor,
                    "dataExpedicao": '2022-05-25'//documento.dataExpedicao
                },
                //"pessoaPoliticamenteExposta": {
                //     "cpf": "64010333049",
                //     "nome": "Gilbor Baohon Koxyorim",
                //     "codigoGrauRelacionamento": 1
                //}
            },
        },        
        "pagamento": {
            "formaPagamento": "CARTAO_DE_CREDITO_62",
            "quantidadeParcelas": data.pagamento.parcelas,
            "cartao": {
                "numeroCartao": "",
                "codigoBandeira": data.pagamento.codigoBandeira,
                "mesValidade": data.pagamento.mesValidade,
                "anoValidade": data.pagamento.anoValidade
            }
        },
        "contatoInspecao": {
          "numeroTelefone": formData.segurado.numeroTelefone.replace(/[^0-9]+/g, ""),
          "contato": formData.segurado.nome
        }
    };

    let numeroTelefone = formData.segurado.numeroTelefone.replace(/[^0-9]+/g, "");
    if (numeroTelefone.length == 10){ proposta.segurado.contato.numeroTelefoneResidencial = numeroTelefone; }
    if (numeroTelefone.length == 11){ proposta.segurado.contato.numeroTelefoneCelular = numeroTelefone; }

    let politicamenteExposta = {
        "cpf": pessoaFisica.politicamenteExposta.cpf,
        "nome": pessoaFisica.politicamenteExposta.nome,
        "codigoGrauRelacionamento": pessoaFisica.politicamenteExposta.grauRelacionamento
    };
    console.log('A:', proposta);
    if (pessoaFisica.pessoaPoliticamenteExposta == 3){ proposta.segurado.pessoaFisica.pessoaPoliticamenteExposta = politicamenteExposta; }
    console.log('B:', proposta);

    let token = await authToken();
    let subUrl = '-sandbox';
    if (process.env.AMBIENTE == 'HOMOLOGACAO'){ subUrl = '-hml'; }
    if (process.env.AMBIENTE == 'PRODUCAO'){ subUrl = ''; }

    let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };

    let card_url = `https://portoapi${subUrl}.portoseguro.com.br/re/cartoes/v1/cartoes?numeroCartao=${data.pagamento.numeroCartao}`;
    let payload = {"numeroCartao": data.pagamento.numeroCartao};

    let cardResult = await axios.post(card_url, payload, header).catch((error)=>{ 
        console.log(error.response.data); 
        return res.status(400).json({fatal: false, errors: [{message: "Número de cartão inválido", id: "numero-cartao"}]});
    });

    if (!cardResult){ 
        return res.status(400).json({fatal: true, errors: [{message: "Ocorreu um erro inesperado", id: ""}]}); 
    }    
    if (!cardResult.data){ 
        console.log(cardResult);
        return res.status(400).json({fatal: true, errors: [{message: "Ocorreu um erro inesperado", id: ""}]}); 
    }
    if (cardResult.data.status != 200){ 
        console.log(cardResult.data); 
        return res.status(400).json({fatal: false, errors: [{message: "Número de cartão inválido", id: "numero-cartao"}]});
    }
    if (!cardResult.data.ticket){
        console.log(cardResult.data); 
        return res.status(400).json({fatal: false, errors: [{message: "Número de cartão inválido", id: "numero-cartao"}]});
    }
    
    proposta.pagamento.cartao.numeroCartao = "5162921368678181"//cardResult.data.ticket;
    console.log('C:', proposta);

    console.log('pessoaFisica:', proposta.segurado.pessoaFisica);
   
    let _proposta = {        
        "numeroOrcamento": 1686676073829,
        "codigoPessoaPoliticamenteExposta": 1,
        "segurado": {
            "enderecoCobranca": {
                "cep": "09571020",
                "tipoLogradouro": "R",
                "logradouro": "Rua Coronel Camisão",
                "numero": 91,
                "bairro": "Oswaldo Cruz",
                "cidade": "São Caetano do Sul",
                "uf": "SP"
            },
            "enderecoCorrespondencia": {
                "cep": "09571020",
                "tipoLogradouro": "R",
                "logradouro": "Rua Coronel Camisão",
                "numero": 91,
                "bairro": "Oswaldo Cruz",
                "cidade": "São Caetano do Sul",
                "uf": "SP"
            },
            "contato": {
                "email": "matheus.marques.aquino@gmail.com"
            },
            "pessoaPoliticamenteExposta": {
                "cpf": "64010333049",
                "nome": "Gilbor Baohon Koxyorim",
                "codigoGrauRelacionamento": 1
            },
            "pessoaFisica": {
                "dataNascimento": "1997-08-29",
                "codigoSexo": 1,
                "codigoEstadoCivil": 1,
                "codigoPaisResidencia": 237,
                "codigoFaixaRenda": 6,
                "documentoIdentificacao": {
                    "tipoDocumento": 1,
                    "numeroDocumento": "441498486",
                    "orgaoExpedidor": "SSP",
                    "dataExpedicao": "2022-05-25"
                }
            }
        },
        "pagamento": {
            "formaPagamento": "CARTAO_DE_CREDITO_62",
            "quantidadeParcelas": 1,
            "cartao": {
                "numeroCartao": "5408094831763990",
                "codigoBandeira": 2,
                "mesValidade": 12,
                "anoValidade": 2026
            }
        }
    };
 */
    let token = await authToken();
    let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
    let url = 'https://portoapi-hml.portoseguro.com.br/re/residencial/v1/habitual/propostas';
    let result = await axios.post(url, _proposta, header).catch((error)=>{ console.log(error.response.data); });
    console.log(result);
    console.log(result.data);
    /*let request_url = `https://portoapi${subUrl}.portoseguro.com.br/re/residencial/v1/${produto}/propostas`;
    let result = await axios.post(request_url, _proposta, header).catch((error)=>{ console.log(error.response.data); });
    
    let novaProposta = {  
        criadoEm: new Date(),      
        proposta: {
            numeroProposta: result.data.numeroProposta,
            numeroVersaoProposta: result.data.numeroVersaoProposta
        },
        usuario: {
            id: user.id,
            nome: user.pessoaFisica.nome,
            cpf: user.pessoaFisica.cpf,
            email: user.email
        },
        pagamento: {
            formaPagamento: "CARTAO_DE_CREDITO_62",
            quantidadeParcelas: data.pagamento.parcelas,
            codigoBandeira: data.pagamento.codigoBandeira
        },
        orcamento: data.orcamento
    };

    proposta = new Propostas(novaProposta);
    proposta = await proposta.save();
    //console.log(result.data);*/
    return res.status(400).json({mesage: "", proposta: result.data});
});

module.exports = router;
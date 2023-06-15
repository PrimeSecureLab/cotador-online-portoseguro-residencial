const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const Usuarios = require('../collections/usuarios');
const Propostas = require('../collections/propostas');
const Orcamentos = require('../collections/orcamentos');
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
    if (!session.user_id){ return res.status(400).json({fatal: 1, id: 0}); }

    // Verifica se user_id é válido
    let user = await Usuarios.findOne({_id: session.user_id});
    if (!user){ req.session.destroy((e) => { return res.status(400).json({redirect: '/login', id: 1}); }); }

    let errorList = [];
    let body = req.body || {};
    let produto = body.produto || {};

    if (!body){ return res.status(400).json({fatal: 3, id: 2}); }
    if (!body.formData){ return res.status(400).json({redirect: '/', id: 3}); } //Verifica se dados da Cotação ainda são válidos
    if (!body.pagamento){ return res.status(400).json({fatal: 4, id: 4}); }
    if (!body.produto){ return res.status(400).json({redirect: '/planos', id: 5}); } // Verifica se registrou o plano
    
    let orcamento = await Orcamentos.findOne({numeroOrcamento: body.orcamento.numeroOrcamento});
    if (!orcamento){ orcamento = {}; }//.propostaCriada = true; await orcamento.save(); }
    
    if (orcamento.propostaCriada){ return res.status(400).json({redirect: '/planos', id: 6}); } // Orçamento ja teve proposta realizada

    let formData = validacaoCotacao.decriptarDados(body.formData);
    if (!formData){ return res.status(400).json({redirect: '/', id: 7}); }

    if (!['habitual', 'habitual-premium', 'veraneio'].includes(produto)){ return res.status(400).json({redirect: '/planos', id: 8}); }

    formData.item = body.itemData;    

    let pagamento = body.pagamento || {};
    let numeroParcelas = pagamento.parcelas || 0;

    if (numeroParcelas < 1){ numeroParcelas = orcamento.listaParcelamento.length; }

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
        }else{ // Caso tenha mais de 2 digitos
            errorList.push({message: "Mês inválido", id: "mes"}); 
        }
    }else{
        if (parseInt(pagamento.mesValidade) > 12){ errorList.push({message: "Mês inválido", id: "mes"}); }
    }
    if (!/^\d{4}$/.test(pagamento.anoValidade)){ 
        if (/^\d{2}$/.test(pagamento.anoValidade)){
            pagamento.anoValidade = `20${pagamento.anoValidade}`; 
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
            soma += digito; dobrar = !dobrar;
        }
        if ((soma % 10) != 0){ errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); }
    }

    if (errorList.length){ return res.status(400).json({fatal: false, errors: errorList, id: 9}); }

    if (!validation.eloCardPattern.test(pagamento.numeroCartao)){ pagamento.codigoBandeira = 5; }
    if (!validation.dinersCardPattern.test(pagamento.numeroCartao)){ pagamento.codigoBandeira = 3; }
    if (!validation.masterCardPattern.test(pagamento.numeroCartao)){ pagamento.codigoBandeira = 2; }
    if (!validation.visaCardPattern.test(pagamento.numeroCartao)){ pagamento.codigoBandeira = 1; }

    let segurado = formData.segurado || {};
    let endereco = segurado.endereco || {};
    let pessoaFisica = user.pessoaFisica || {};  
    let documento = pessoaFisica.documento || {};  
    
    endereco.cep = endereco.cep || '';
    endereco.cep = endereco.cep.replace(/\D/g, '');

    segurado.numeroTelefone = segurado.numeroTelefone || '';
    segurado.numeroTelefone = segurado.numeroTelefone.replace(/\D/g, '');

    documento.numero  = documento.numero || '';
    documento.numero = documento.numero.replace(/\D/g, '');

    let dataNascimento = pessoaFisica.dataNascimento || '';
    dataNascimento = validacaoCotacao.formatarDataAmericana(dataNascimento);

    let dataExpedicao = documento.dataExpedicao || '';
    dataExpedicao = validacaoCotacao.formatarDataAmericana(dataExpedicao);

    pagamento.numeroParcelas = numeroParcelas;
    pagamento.formaPagamento = "CARTAO_DE_CREDITO_62";

    let proposta = {        
        "numeroOrcamento": body.orcamento.numeroOrcamento,
        "codigoPessoaPoliticamenteExposta": pessoaFisica.pessoaPoliticamenteExposta, // 1 - Sim; 2 - Não; 3 - Relacionamento Próximo;
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
            "pessoaFisica": {
                "dataNascimento": dataNascimento,
                "codigoSexo": parseInt(pessoaFisica.sexo),
                "codigoEstadoCivil": parseInt(pessoaFisica.estadoCivil),
                "codigoPaisResidencia": 237,
                "codigoFaixaRenda": parseInt(pessoaFisica.faixaRenda),
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
                "numeroCartao": "5502093811848651",
                "codigoBandeira": pagamento.codigoBandeira,
                "mesValidade": parseInt(pagamento.mesValidade),
                "anoValidade": parseInt(pagamento.anoValidade)
            }
        }
    };

    let contato = { email: user.email || '' };
    if (segurado.numeroTelefone.length == 10){ contato.numeroTelefoneResidencial = segurado.numeroTelefone; }
    if (segurado.numeroTelefone.length == 11){ contato.numeroTelefoneCelular = segurado.numeroTelefone; }    
    
    proposta.segurado.contato = contato;    
    
    let politicamenteExposta = pessoaFisica.politicamenteExposta || {};
    politicamenteExposta.cpf = politicamenteExposta.cpf || '';
    politicamenteExposta.cpf = politicamenteExposta.cpf.replace(/\D/g, '');
    politicamenteExposta.nome = politicamenteExposta.nome || '';
    politicamenteExposta.grauRelacionamento = parseInt(politicamenteExposta.grauRelacionamento) || '';
    
    proposta.segurado.pessoaPoliticamenteExposta = politicamenteExposta;
    
    let token = await authToken();
    let subUrl = '-sandbox';
    let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };

    if (process.env.AMBIENTE == 'HOMOLOGACAO'){ subUrl = '-hml'; }
    if (process.env.AMBIENTE == 'PRODUCAO'){ subUrl = ''; }
    
    if (process.env.AMBIENTE != 'SANDBOX'){
        try{
            let url = `https://portoapi${subUrl}.portoseguro.com.br/re/cartoes/v1/cartoes?numeroCartao=${pagamento.numeroCartao}`;
            let payload = {"numeroCartao": pagamento.numeroCartao};
            let result = await axios.post(url, payload, header).catch((error)=>{ 
                console.log(error.response.data); 
                return res.status(400).json({fatal: false, errors: [{message: "Número de cartão inválido", id: "numero-cartao", id: 10}]});
            });
            if (result.status == 200){ 
                console.log(result.data); 
                proposta.pagamento.cartao.numeroCartao = result.data.ticket;
            }
        }catch(error){ console.log(error); }
    }    

    try{
        let url = `https://portoapi${subUrl}.portoseguro.com.br/re/residencial/v1/${produto}/propostas`;
        let result = await axios.post(url, proposta, header).catch((error)=>{ console.log(error.response.data); });
        if (result.status == 200){            
            let proposta = {
                criadoEm: new Date(),
                proposta: { 
                    numeroProposta: result.data.numeroProposta || '', 
                    numeroVersaoProposta: result.data.numeroVersaoProposta || '' },
                    numeroOrcamento: body.orcamento.numeroOrcamento || '',
                usuario:{ 
                    id: user.id || '', 
                    nome: user.pessoaFisica.nome || '', 
                    cpf: user.pessoaFisica.cpf || '', 
                    email: user.email || '' 
                },
                pagamento: {
                    formaPagamento: pagamento.formaPagamento || '',
                    quantidadeParcelas: pagamento.numeroParcelas || '',
                    codigoBandeira: pagamento.codigoBandeira || '',
                    ticket: '' || '' ,
                }
            }
            orcamento.propostaCriada = true;
            await orcamento.save();
            
            let entry = new Propostas(proposta); 
            entry = await entry.save();

            console.log(result.data);
        }
    }catch(error){
        console.log(error);
    }
    //console.log('---');
    //console.log(result);
    //console.log(result.data);
    return res.status(400).json({mesage: "", id: 11});//proposta: result.data, id: 11});

    
    /*let request_url = `https://portoapi${subUrl}.portoseguro.com.br/re/residencial/v1/${produto}/propostas`;
    let result = await axios.post(request_url, _proposta, header).catch((error)=>{ console.log(error.response.data); });



    
    

    /*

    if (formData.segurado.numeroTelefone){ formData.segurado.numeroTelefone = formData.segurado.numeroTelefone.replace(/\D/g, ''); }

    let pessoaFisica = user.pessoaFisica;
    

    
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
 
    let token = await authToken();
    let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
    let url = 'https://portoapi-hml.portoseguro.com.br/re/residencial/v1/habitual/propostas';
    let result = await axios.post(url, _proposta, header).catch((error)=>{ console.log(error.response.data); });
    console.log(result);
    console.log(result.data);*/
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
    
});

module.exports = router;
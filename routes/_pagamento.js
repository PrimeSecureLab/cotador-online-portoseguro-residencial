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
const NodeMailer = require('../configs/nodeMailer');

const ValidarCotacao = require('../configs/validarCotacao');
var validacaoCotacao = new ValidarCotacao;

const FuncoesProposta = require('../configs/funcoesProposta');
var funcoesProposta = new FuncoesProposta;

const ValidadorGeral = require('../configs/validacaoGeral');
var validador = new ValidadorGeral;

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
    if (!session.user_id){ return res.status(400).json({message:'Você deve estar logado para finalizar a transação.', fatal: true, id: 0}); }

    // Verifica se user_id é válido
    let user = await Usuarios.findOne({_id: session.user_id});
    if (!user){ req.session.destroy((e) => { return res.status(400).json({redirect: '/login', id: 1}); }); }

    let errorList = [];
    let body = req.body || {};

    let pagamento = body.pagamento || {};
    let formulario = body.formulario || {};
    let orcamento = body.orcamento || {};

    let segurado = formulario.segurado || {};
    let endereco = segurado.endereco || {};
    //let produto = body.produto || {};

    //console.log(user);

    if (!body){ return res.status(400).json({fatal: 3, id: 2}); }

    if (!formulario){ return res.status(400).json({redirect: '/', id: 3}); } //Verifica se dados da Cotação ainda são válidos
    if (!orcamento){ return res.status(400).json({redirect: '/planos', id: 4}); } // Verifica se registrou o plano
    if (!pagamento){ return res.status(400).json({fatal: 4, id: 5}); }
    
    if (!orcamento.numeroOrcamento){ return res.status(400).json({redirect: '/planos', id: 6}); }
    if (!(['habitual', 'habitual-premium', 'veraneio'].includes(orcamento.tipo))){ return res.status(400).json({redirect: '/', id: 7}); }
    if (!(['essencial', 'conforto', 'exclusive'].includes(orcamento.plano))){ return res.status(400).json({redirect: '/planos', id: 8}); }
    if (!/^[1-3]{1}$/.test(orcamento.vigencia)){ return res.status(400).json({redirect: '/planos', id: 9}); }

    if (!/^[0-9]{8}$/.test(endereco.cep)){ return res.status(400).json({redirect: '/', id: 10}); }
    if (!validador.validarTipoResidencia(formulario.tipoResidencia)){ return res.status(400).json({redirect: '/', id: 11}); }
    if (!validador.validarLogradouro(endereco.logradouro)){ return res.status(400).json({redirect: '/', id: 12}); }
    if (!validador.validarTipoRua(endereco.tipo)){ return res.status(400).json({redirect: '/', id: 13}); }
    if (!validador.validarNumero(endereco.numero)){ return res.status(400).json({redirect: '/', id: 14}); }
    if (!validador.validarBairro(endereco.bairro)){ return res.status(400).json({redirect: '/', id: 15}); }
    if (!validador.validarMunicipio(endereco.cidade)){ return res.status(400).json({redirect: '/', id: 16}); }
    if (!validador.validarUF(endereco.uf)){ return res.status(400).json({redirect: '/', id: 17}); }
    if (!validador.validarComplemento(endereco.complemento)){ return res.status(400).json({redirect: '/', id: 18}); }

    pagamento.numeroCartao = pagamento.numeroCartao.replace(/[^\d]/g, "");
    let codigoBandeira = validador.retornarCodigoBandeira(pagamento.numeroCartao);

    if (!codigoBandeira){ errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); }

    if (!validador.validarNumeroCartao(pagamento.numeroCartao)){ errorList.push({message: "Número de cartão inválido", id: "numero-cartao"}); }
    
    if (!/^\d{2,4}$/.test(pagamento.numeroCvc)){ errorList.push({message: "CVC inválido", id: "cvc"}); } 
    
    if (!/^[0-9]{2}$/.test(pagamento.mesValidade)){ 
        if (/^[1-9]{1}$/.test(pagamento.mesValidade)){// Caso tenha apenas 1 dígito 
            pagamento.mesValidade = `0${pagamento.mesValidade}`; 
        }else{ // Caso tenha mais de 2 digitos
            errorList.push({message: "Mês inválido", id: "mes"}); 
        }
    }else{ 
        if (/^[0-9]{2}$/.test(pagamento.mesValidade)){
            if (parseInt(pagamento.mesValidade) > 12){ errorList.push({message: "Mês inválido", id: "mes"}); }
        }else{
            errorList.push({message: "Mês inválido", id: "mes"});
        }         
    }

    if (!/^\d{4}$/.test(pagamento.anoValidade)){ 
        if (/^\d{2}$/.test(pagamento.anoValidade)){
            pagamento.anoValidade = `20${pagamento.anoValidade}`; 
            if (parseInt(pagamento.anoValidade) < 23){ errorList.push({message: "Ano inválido", id: "ano"}); }
        }else{
            errorList.push({message: "Ano inválido", id: "ano"});
        }  
    }

    if (errorList.length){ return res.status(400).json({fatal: false, errors: errorList, id: 9}); }

    let numeroParcelas = pagamento.parcelas || 0;

    pagamento.numeroParcelas = numeroParcelas;
    pagamento.formaPagamento = "CARTAO_DE_CREDITO_62";

    if (numeroParcelas < 1){ 
        orcamento.listaParcelamento.map((parcela, index)=>{
            if (parcela.codigo == 62 && orcamento.listaParcelamento[index + 1].codigo != 62){ 
                numeroParcelas = quantidadeParcelas; 
            }
        });
    }

    let proposta = {        
        "numeroOrcamento": orcamento.numeroOrcamento,
        "codigoPessoaPoliticamenteExposta": user.pessoaFisica.pessoaPoliticamenteExposta, // 1 - Sim; 2 - Não; 3 - Relacionamento Próximo;
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
                "dataNascimento": user.pessoaFisica.dataNascimento,
                "codigoSexo": parseInt(user.pessoaFisica.sexo),
                "codigoEstadoCivil": parseInt(user.pessoaFisica.estadoCivil),
                "codigoPaisResidencia": 237,
                "codigoFaixaRenda": parseInt(user.pessoaFisica.faixaRenda),
                "documentoIdentificacao": {
                    "tipoDocumento": user.pessoaFisica.documento.tipo,
                    "numeroDocumento": user.pessoaFisica.documento.numero,
                    "orgaoExpedidor": user.pessoaFisica.documento.orgaoExpedidor,
                    "dataExpedicao": user.pessoaFisica.dataExpedicao
                }
            }
        },
        "pagamento": {
            "formaPagamento": pagamento.formaPagamento,
            "quantidadeParcelas": pagamento.numeroParcelas,
            "cartao": {
                "numeroCartao": "5502093811848651",
                "codigoBandeira": codigoBandeira,
                "mesValidade": parseInt(pagamento.mesValidade),
                "anoValidade": parseInt(pagamento.anoValidade)
            }
        }
    };

    if (endereco.complemento){ 
        proposta.segurado.enderecoCobranca.complemento = endereco.complemento; 
        proposta.segurado.enderecoCorrespondencia.complemento = endereco.complemento;
    }

    let contato = { email: user.email || '' };
    if (segurado.numeroTelefone.length == 10){ contato.numeroTelefoneResidencial = segurado.numeroTelefone; }
    if (segurado.numeroTelefone.length == 11){ contato.numeroTelefoneCelular = segurado.numeroTelefone; } 
    proposta.segurado.contato = contato;

   
    let politicamenteExposta = user.pessoaFisica.politicamenteExposta || {};
    politicamenteExposta.cpf = politicamenteExposta.cpf || '';
    politicamenteExposta.cpf = politicamenteExposta.cpf.replace(/\D/g, '');
    politicamenteExposta.nome = politicamenteExposta.nome || '';
    politicamenteExposta.grauRelacionamento = parseInt(politicamenteExposta.grauRelacionamento) || '';
    
    //proposta.segurado.pessoaPoliticamenteExposta = politicamenteExposta;
    
    let token = await authToken();
    let subUrl = '-sandbox';
    let header = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };

    if (process.env.AMBIENTE == 'HOMOLOGACAO'){ subUrl = '-hml'; }
    if (process.env.AMBIENTE == 'PRODUCAO'){ subUrl = ''; }

    //pagamento.numeroCartao = 5162921368678181;
    //console.log(pagamento.numeroCartao);
    
    let url = `https://portoapi${subUrl}.portoseguro.com.br/re/cartoes/v1/cartoes?numeroCartao=${pagamento.numeroCartao}`;
    let cardPayload = { "numeroCartao": parseInt(pagamento.numeroCartao) };
    await axios.post(url, cardPayload, header)
        .then(function (response) {
            console.log('Cartao criado:', response.data);
        })
        .catch(function (error) {
            if (error.response) {
                console.log('1-AAA:', error.response.status);
                console.log('1-AAB:', error.response.data);
            } else if (error.request) {
                console.log('1-BBB');
            } else {
                console.log('1-CCC', error.message);
            }
        });
        


    proposta.pagamento.cartao.numeroCartao = pagamento.numeroCartao;

    let _payload = {
        "numeroOrcamento": 1689182015124,
        "codigoPessoaPoliticamenteExposta": 1,
        "segurado": {
            "enderecoCobranca": {
                "cep": "09571020",
                "tipoLogradouro": "R",
                "logradouro": "Rua Coronel CamisC#o",
                "numero": 91,
                "bairro": "Oswaldo Cruz",
                "cidade": "SC#o Caetano do Sul",
                "uf": "SP"
            },
            "enderecoCorrespondencia": {
                "cep": "09571020",
                "tipoLogradouro": "R",
                "logradouro": "Rua Coronel CamisC#o",
                "numero": 91,
                "bairro": "Oswaldo Cruz",
                "cidade": "SC#o Caetano do Sul",
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
    }
    
    let __payload = funcoesProposta.criarObjetoProposta( 
        orcamento.numeroOrcamento, 1, 
        { "cep": "09571020", "tipoLogradouro": "R", "logradouro": "Rua Coronel CamisC#o", "numero": 91, "bairro": "Oswaldo Cruz", "cidade": "SC#o Caetano do Sul", "uf": "SP" }, 
        { "email": "matheus.marques.aquino@gmail.com", "numeroTelefoneCelular": "11979544109", "numeroTelefoneResidencial": "11979544109" }, 
        { "dataNascimento": "1997-08-29", "codigoSexo": 1, "codigoEstadoCivil": 1, "codigoPaisResidencia": 237, "codigoFaixaRenda": 6 }, 
        { "tipoDocumento": 1, "numeroDocumento": "441498486", "orgaoExpedidor": "SSP", "dataExpedicao": "2022-05-25" }, 
        { "cpf": "64010333049", "nome": "Gilbor Baohon Koxyorim", "codigoGrauRelacionamento": 1 }, 
        { "formaPagamento": "CARTAO_DE_CREDITO_62", "quantidadeParcelas": 1 }, 
        { "numeroCartao": "5408094831763990", "codigoBandeira": 2, "mesValidade": 12, "anoValidade": 2026 }
    );

    
    
    console.log(__payload);
    
    url = `https://portoapi${subUrl}.portoseguro.com.br/re/residencial/v1/${orcamento.tipo}/propostas`;
    await axios.post(url, __payload, header)
        .then(function (response) {
            console.log('Proposta Criada:', response.data);
        })
        .catch(function (error) {
            if (error.response) {
                console.log('2-AAA:', error.response.status);
                console.log('2-AAB:', error.response.data);
            } else if (error.request) { 
                console.log('Error-Request:', error.request); 
            } else { 
                console.log('2-CCC', error.message); 
            }
        });





    //console.log(proposta);
    
    return res.status(200).json('teste');
    //let orcamento = await Orcamentos.findOne({numeroOrcamento: body.orcamento.numeroOrcamento});
    //if (!orcamento){ orcamento = {}; }//.propostaCriada = true; await orcamento.save(); }
    
    /*if (orcamento.propostaCriada && process.env.AMBIENTE != 'SANDBOX'){ return res.status(400).json({redirect: '/planos', id: 6}); } // Orçamento ja teve proposta realizada

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
    }else{ if (parseInt(pagamento.mesValidade) > 12){ errorList.push({message: "Mês inválido", id: "mes"}); } }



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
                console.log('cartão-erro:', error.response.data); 
                return res.status(400).json({fatal: false, errors: [{message: "Número de cartão inválido", id: "numero-cartao", id: 10}]});
            });
            if (result.status == 200){ 
                console.log('cartão-sucesso:', result.data); 
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
            let mailer = new NodeMailer();
            mailer.controladorEmail({user: user, proposta: result.data}, 'proposta-criada');
            return res.status(200).json({mesage: "Proposta foi criada com sucesso."});//proposta: result.data, id: 11});
        }
    }catch(error){
        console.log(error);
    }
    //console.log('---');
    //console.log(result);
    //console.log(result.data);
    

    
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
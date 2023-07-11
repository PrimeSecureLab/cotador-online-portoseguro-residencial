const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const Usuarios = require('../collections/usuarios');
const validation = require('../configs/validation');
const orgaoEmissor = require('../configs/orgaoEmissor');

const NodeMailer = require('../configs/nodeMailer');

const ValidarCotacao = require('../configs/validarCotacao');
var validacaoCotacao = new ValidarCotacao;

const ValidadorGeral = require('../configs/validacaoGeral');
var validador = new ValidadorGeral;

dotenv.config();

router.get("/", async (req, res) => {
    let session = req.session;
    if (!session.user_id){ return res.sendFile("cadastro.html", { root: "public" }); }    

    let user = await Usuarios.findOne({_id: session.user_id});
    if (!user){ req.session.destroy(); return res.sendFile("cadastro.html", { root: "public" }); }
    
    return res.redirect('/pagamento');
});

router.post("/carregar", async (req, res)=>{
    const session = req.session || {};
    const cotacao = session.cotacao || {};
    
    let email = cotacao.email || '';
    let cpf = cotacao.cpf || '';

    email = email.toString().trim();
    cpf = cpf.toString().trim();

    return res.status(200).json({email: email, cpf: cpf}); 
});

router.post("/", async (req, res)=>{
    let body = req.body;

    let cadastro = body.cadastro || null;
    if (!cadastro){ return res.status(400).json({message: '', id: 'Error 001'}); }

    let formulario = body.formulario;
    if (!formulario){ return res.status(400).json({message: '', id: 'Error 002', redirect: '/'}); }

    let session = req.session;
    let errorList = [];
    
    if (session.user_id){ 
        let user = await Usuarios.findOne({_id: session.user_id});
        if (!user){ req.session.destroy(); }
    }

    if (!validador.validarEmail(cadastro.email)){ errorList.push({message: 'Email inválido', id: 'email'}); }
    if (validador.validarEmail(cadastro.email)){
        let user = await Usuarios.findOne({ email: cadastro.email.toString().trim().toLowerCase() });
        if (user){ errorList.push({message: 'O email já esta em uso', id: 'email', value: cadastro.email}); }
    }

    cadastro.senha = cadastro.senha || '';
    cadastro.senha = cadastro.senha.toString();

    if (cadastro.senha.length < 8){ errorList.push({message: 'Sua senha deve ter no mínimo 8 caracteres', id: 'senha', value: cadastro.senha}); }
    
    let segurado = formulario.segurado || {};
    let endereco = segurado.endereco || {};

    segurado.nome = segurado.nome || '';

    segurado.cpf = segurado.cpf || ''; 
    
    segurado.cep = segurado.cep || '';

    segurado.numeroTelefone = segurado.numeroTelefone || '';

    cadastro.numero_documento = cadastro.numero_documento || '';
    cadastro.numero_documento = cadastro.numero_documento.replace(/[^0-9]+/g, '');

    cadastro.cpf_pessoa_exposta = cadastro.cpf_pessoa_exposta || '';
    cadastro.cpf_pessoa_exposta = cadastro.cpf_pessoa_exposta.replace(/[^0-9]+/g, '');

    segurado.dataNascimento = segurado.dataNascimento || '';

    cadastro.data_expedicao = cadastro.data_expedicao || '';
    cadastro.data_expedicao = validacaoCotacao.formatarDataAmericana(cadastro.data_expedicao) || "0000-00-00";

    cadastro.orgao_expedidor = cadastro.orgao_expedidor || '';
    cadastro.orgao_expedidor = cadastro.orgao_expedidor.toUpperCase();

    endereco.uf = endereco.uf || '';
    endereco.uf = endereco.uf.toUpperCase();

    //if (!segurado){ errorList.push({message: '', id: 'primeira-etapa', redirect: '/cotacao'}); segurado = {}; }

    if (!validador.validarNome(segurado.nome)){ errorList.push({message: 'Nome inválido', id: 'nome-step-1', value: segurado.nome, redirect: '/'}); }

    if (!validador.validarCPF(segurado.cpf)){ errorList.push({message: 'CPF inválido', id: 'cpf-step-1', value: segurado.cpf, redirect: '/'}); }

    if (!/^[1-3]{1}$/.test(segurado.tipoTelefone)){ errorList.push({message: 'Campo Obrigatório', id: 'tipo_telefone-step-1', value: tipoTelefone, redirect: '/'}); }

    if (!/^[0-9]{10,11}$/.test(segurado.numeroTelefone)){ errorList.push({message: 'Número inválido', id: 'numero_telefone-step-1', value: segurado.numeroTelefone, redirect: '/'}); }

    if (!/^(\d{4})\-(\d{2})\-(\d{2})$/.test(segurado.dataNascimento)){ errorList.push({message: 'Data de nascimento inválida', id: 'data_nascimento-step-1', value: segurado.dataNascimento, redirect: '/'}); }

    if (!/^[0-9]{8}$/.test(endereco.cep)){ errorList.push({message: 'CEP inválido', id: 'cep-step-2', value: endereco.cep, redirect: '/'}); }

    if (!/^.{1,10}$/.test(endereco.tipo)){ errorList.push({message: 'Campo Obrigatório', id: 'tipo_logradouro-step-2', value: endereco.tipo, redirect: '/'}); }

    if (!validador.validarLogradouro(endereco.logradouro)){ errorList.push({message: 'Logradouro inválido', id: 'logradouro-step-2', value: endereco.logradouro, redirect: '/'}); }

    if(!validador.validarNumero(endereco.numero)){ errorList.push({message: 'Número inválido', id: 'numero-step-2', value: endereco.numero, redirect: '/'}); }

    if (!validador.validarBairro(endereco.bairro)){ errorList.push({message: 'Bairro inválido', id: 'bairro-step-2', value: endereco.bairro, redirect: '/'}); }

    if (!validador.validarMunicipio(endereco.cidade)){ errorList.push({message: 'Cidade inválida', id: 'cidade-step-2', value: endereco.cidade, redirect: '/'}); }   

    if (!validador.validarUF(endereco.uf)){ errorList.push({message: 'UF inválido', id: 'uf-step-2', value: endereco.uf, redirect: '/'}); }    

    if (!/^[1-2]{1}$/.test(cadastro.sexo) || !cadastro.sexo){ errorList.push({message: 'Campo Obrigatório', id: 'sexo', value: cadastro.sexo}); }

    if (!/^[1-5]{1}$/.test(cadastro.estado_civil) || !cadastro.estado_civil){ errorList.push({message: 'Campo Obrigatório', id: 'estado_civil', value: cadastro.estado_civil}); }

    if (!/^[1-6]{1}$/.test(cadastro.faixa_renda) || !cadastro.faixa_renda){ errorList.push({message: 'Campo Obrigatório', id: 'faixa_renda', value: cadastro.faixa_renda}); }

    if (!/^[1-2]{1}$/.test(cadastro.tipo_documento) || !cadastro.tipo_documento){ errorList.push({message: 'Campo Obrigatório', id: 'tipo_documento', value: cadastro.tipo_documento}); }

    if (!/^[0-9]{5,20}$/.test(cadastro.numero_documento)){ errorList.push({message: 'Número inválido', id: 'numero_documento', value: cadastro.numero_documento}); }

    if (!(cadastro.orgao_expedidor in orgaoEmissor)){ errorList.push({message: 'Orgão de expedição inválido', id: 'orgao_expedidor', value: cadastro.orgao_expedidor}); }

    if (!/^(\d{4})\-(\d{2})\-(\d{2})$/.test(cadastro.data_expedicao)){ errorList.push({message: 'Data de expedicão inválida', id: 'data_expedicao', value: cadastro.data_expedicao}); }

    if (/^[1-3]{1}$/.test(cadastro.politicamente_exposta)){
        if (cadastro.politicamente_exposta == 3){
            if (!/^[0-9]{11}$/.test(cadastro.cpf_pessoa_exposta.replace(/[^0-9]+/g, '')) || !cadastro.cpf_pessoa_exposta){
                errorList.push({message: 'CPF inválido', id: 'cpf_pessoa_exposta', value: cadastro.cpf_pessoa_exposta});
            }
            if (!/^.{5,100}$/.test(cadastro.nome_pessoa_exposta) || !cadastro.nome_pessoa_exposta){
                errorList.push({message: 'Nome inválido', id: 'nome_pessoa_exposta', value: cadastro.nome_pessoa_exposta})
            }
            if (/^[0-9]{1,2}$/.test(cadastro.grau_parentesco_pessoa_exposta)){
                if (cadastro.grau_parentesco_pessoa_exposta < 1 || cadastro.grau_parentesco_pessoa_exposta > 5){
                    if (cadastro.grau_parentesco_pessoa_exposta != 11){ errorList.push({message: 'Campo Obrigatório', id: 'grau_parentesco_pessoa_exposta', value: cadastro.grau_parentesco_pessoa_exposta}); }
                }
            }else{
                errorList.push({message: 'Campo Obrigatório', id: 'grau_parentesco_pessoa_exposta', value: cadastro.grau_parentesco_pessoa_exposta});
            }
        }
    }else{
        errorList.push({message: 'Campo Obrigatório', id: 'politicamente_exposta', value: cadastro.politicamente_exposta});
    }
    if (errorList.length > 0){ return res.status(400).json({ errors: errorList }); }

    let entry = {
        dataCadastro: new Date(),
        email: cadastro.email.trim().toLowerCase(),
        senha: CryptoJS.MD5(cadastro.senha).toString(),
        pessoaFisica: {
            nome: segurado.nome,
            cpf: segurado.cpf,
            telefone: {
                tipo: segurado.tipoTelefone,
                numero: segurado.numeroTelefone
            },
            dataNascimento: segurado.dataNascimento,
            sexo: cadastro.sexo,
            estadoCivil: cadastro.estado_civil,
            paisResidencia: 237,
            faixaRenda: cadastro.faixa_renda,
            documento: {
                tipo: cadastro.tipo_documento,
                numero: cadastro.numero_documento,
                orgaoExpedidor: cadastro.orgao_expedidor.toUpperCase(),
                dataExpedicao: cadastro.data_expedicao
            },
            pessoaPoliticamenteExposta: cadastro.politicamente_exposta,
            politicamenteExposta: {
                cpf: cadastro.cpf_pessoa_exposta,
                nome: cadastro.nome_pessoa_exposta,
                grauRelacionamento: cadastro.grau_parentesco_pessoa_exposta
            }
        },
        endereco: {
            cep: endereco.cep,
            tipoRua: endereco.tipo,
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            uf: endereco.uf.toUpperCase()
        }   
    }

    let conta = new Usuarios(entry);
    try { 
        conta = await conta.save(); 
        req.session.user_id = conta.id;
        req.session.sessionStart = new Date();
        //console.log(conta);
        let mailer = new NodeMailer();
        mailer.controladorEmail(conta, 'conta-criada');

        return res.status(200).json({message: 'Cadastro realizado com sucesso!'});
    } catch (err) { 
        console.log(err); 
        return res.status(400).json({message: '', id: 'Error'});
    }   
});

module.exports = router;
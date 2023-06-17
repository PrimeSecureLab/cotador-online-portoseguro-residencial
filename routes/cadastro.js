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

dotenv.config();

router.get("/", async (req, res) => {
    let session = req.session;
    if (!session.user_id){ return res.sendFile("cadastro.html", { root: "public" }); }

    let user = await Usuarios.findOne({_id: session.user_id});
    if (!user){ req.session.destroy(); return res.sendFile("cadastro.html", { root: "public" }); }
    
    return res.redirect('/pagamento');
});

router.post("/", async (req, res)=>{
    let body = req.body;
    let form = body.form || {};
    let firstForm = body.data || {};
    let session = req.session;
    let fatalError = false;
    let errorList = [];
    let formData = {};
    
    if (session.user_id){ 
        let user = await Usuarios.findOne({_id: session.user_id});
        if (!user){ req.session.destroy(); }
    }
    
    if (form.email.length < 5 || !form.email.includes('@') || !form.email.includes('.')){
        errorList.push({message: 'Email inválido', id: 'email'});
    }else{
        let user = await Usuarios.findOne({ email: form.email.trim().toLowerCase() });
        if (user){ errorList.push({message: 'O email já esta em uso', id: 'email', value: form.email}); }
        
    }
    if (form.senha.length < 8){
        if (!form.senha){
            errorList.push({message: 'Senha Inválida', id: 'senha', value: form.senha});
        }
        errorList.push({message: 'Sua senha deve ter no mínimo 8 caracteres', id: 'senha', value: form.senha});
    }

    formData = validacaoCotacao.decriptarDados(body.data.formData);
    if (!formData){ errorList.push({message: 'Desculpe, ocorreu um erro inesperado.', id: 'cotacao', redirect: '/'}) }
    
    let segurado = formData.segurado || {};
    let endereco = segurado.endereco || {};

    segurado.nome = segurado.nome || '';

    segurado.cpf = segurado.cpf || ''; 
    segurado.cpf = segurado.cpf.replace(/[^0-9]+/g, '');   
    
    segurado.cep = segurado.cep || '';
    segurado.cep = segurado.cep.replace(/[^0-9]+/g, '');

    segurado.numeroTelefone = segurado.numeroTelefone || '';
    segurado.numeroTelefone = segurado.numeroTelefone.replace(/[^0-9]+/g, '');

    form.numero_documento = form.numero_documento || '';
    form.numero_documento = form.numero_documento.replace(/[^0-9]+/g, '');

    form.cpf_pessoa_exposta = form.cpf_pessoa_exposta || '';
    form.cpf_pessoa_exposta = form.cpf_pessoa_exposta.replace(/[^0-9]+/g, '');

    segurado.dataNascimento = segurado.dataNascimento || '';
    segurado.dataNascimento = validacaoCotacao.formatarDataAmericana(segurado.dataNascimento) || "0000-00-00";

    form.data_expedicao = form.data_expedicao || '';
    form.data_expedicao = validacaoCotacao.formatarDataAmericana(form.data_expedicao) || "0000-00-00";

    form.orgao_expedidor = form.orgao_expedidor || '';
    form.orgao_expedidor = form.orgao_expedidor.toUpperCase();

    endereco.uf = endereco.uf || '';
    endereco.uf = endereco.uf.toUpperCase();

    if (!segurado){ errorList.push({message: '', id: 'primeira-etapa'}); segurado = {}; }

    if (!/^.{1,160}$/.test(segurado.nome)){ errorList.push({message: 'Nome inválido', id: 'nome-step-1', value: segurado.nome}); }

    if (!/^[0-9]{11}$/.test(segurado.cpf)){ errorList.push({message: 'CPF inválido', id: 'cpf-step-1', value: segurado.cpf}); }

    if (!/^[0-9]{1}$/.test(segurado.tipoTelefone)){ errorList.push({message: 'Campo Obrigatório', id: 'tipo_telefone-step-1', value: tipoTelefone}); }

    if (!/^[0-9]{10,11}$/.test(segurado.numeroTelefone)){ errorList.push({message: 'Número inválido', id: 'numero_telefone-step-1', value: segurado.numeroTelefone}); }

    if (!/^(\d{4})\-(\d{2})\-(\d{2})$/.test(segurado.dataNascimento)){ 
        errorList.push({message: 'Data de nascimento inválida', id: 'data_nascimento-step-1', value: segurado.dataNascimento}); 
    }

    if (!/^[0-9]{8}$/.test(endereco.cep)){
        errorList.push({message: 'CEP inválido', id: 'cep-step-2', value: endereco.cep});
    }
    if (!/^.{1,10}$/.test(endereco.tipo) || !endereco.tipo){
        errorList.push({message: 'Campo Obrigatório', id: 'tipo_logradouro-step-2', value: endereco.tipo});
    }
    if (!/^.{1,200}$/.test(endereco.logradouro) || !endereco.logradouro){
        errorList.push({message: 'Logradouro inválido', id: 'logradouro-step-2', value: endereco.logradouro});
    }
    if(!/^[0-9]{1,4}$/.test(endereco.numero)){
        errorList.push({message: 'Número inválido', id: 'numero-step-2', value: endereco.numero});
    }
    if (!/^.{1,40}$/.test(endereco.bairro) || !endereco.bairro){
        errorList.push({message: 'Bairro inválido', id: 'bairro-step-2', value: endereco.bairro});
    }
    if (!/^.{1,40}$/.test(endereco.cidade) || !endereco.cidade){
        errorList.push({message: 'Cidade inválida', id: 'cidade-step-2', value: endereco.cidade});
    }   

    if (!/^[A-Z]{2}$/.test(endereco.uf) || !endereco.uf){
        errorList.push({message: 'UF inválido', id: 'uf-step-2', value: endereco.uf});
    }    
    if (!/^[1-2]{1}$/.test(form.sexo) || !form.sexo){
        errorList.push({message: 'Campo Obrigatório', id: 'sexo', value: form.sexo});
    }
    if (!/^[1-5]{1}$/.test(form.estado_civil) || !form.estado_civil){
        errorList.push({message: 'Campo Obrigatório', id: 'estado_civil', value: form.estado_civil});
    }
    if (!/^[1-6]{1}$/.test(form.faixa_renda) || !form.faixa_renda){
        errorList.push({message: 'Campo Obrigatório', id: 'faixa_renda', value: form.faixa_renda});
    }
    if (!/^[1-2]{1}$/.test(form.tipo_documento) || !form.tipo_documento){
        errorList.push({message: 'Campo Obrigatório', id: 'tipo_documento', value: form.tipo_documento});
    }
    if (!/^[0-9]{5,20}$/.test(form.numero_documento)){
        errorList.push({message: 'Número inválido', id: 'numero_documento', value: form.numero_documento});
    }
    if (!(form.orgao_expedidor in orgaoEmissor)){
        errorList.push({message: 'Orgão de expedição inválido', id: 'orgao_expedidor', value: form.orgao_expedidor});
    }
    if (!/^(\d{4})\-(\d{2})\-(\d{2})$/.test(form.data_expedicao)){ 
        errorList.push({message: 'Data de expedicão inválida', id: 'data_expedicao', value: form.data_expedicao}); 
    }

    if (/^[1-3]{1}$/.test(form.politicamente_exposta)){
        if (form.politicamente_exposta == 3){
            if (!/^[0-9]{11}$/.test(form.cpf_pessoa_exposta.replace(/[^0-9]+/g, '')) || !form.cpf_pessoa_exposta){
                errorList.push({message: 'CPF inválido', id: 'cpf_pessoa_exposta', value: form.cpf_pessoa_exposta});
            }
            if (!/^.{5,100}$/.test(form.nome_pessoa_exposta) || !form.nome_pessoa_exposta){
                errorList.push({message: 'Nome inválido', id: 'nome_pessoa_exposta', value: form.nome_pessoa_exposta})
            }
            if (/^[0-9]{1,2}$/.test(form.grau_parentesco_pessoa_exposta)){
                if (form.grau_parentesco_pessoa_exposta < 1 || form.grau_parentesco_pessoa_exposta > 5){
                    if (form.grau_parentesco_pessoa_exposta != 11){ errorList.push({message: 'Campo Obrigatório', id: 'grau_parentesco_pessoa_exposta', value: form.grau_parentesco_pessoa_exposta}); }
                }
            }else{
                errorList.push({message: 'Campo Obrigatório', id: 'grau_parentesco_pessoa_exposta', value: form.grau_parentesco_pessoa_exposta});
            }
        }
    }else{
        errorList.push({message: 'Campo Obrigatório', id: 'politicamente_exposta', value: form.politicamente_exposta});
    }
    if (errorList.length > 0){ return res.status(400).json({ errors: errorList }); }

    let entry = {
        dataCadastro: new Date(),
        email: form.email.trim().toLowerCase(),
        senha: CryptoJS.MD5(form.senha).toString(),
        pessoaFisica: {
            nome: segurado.nome,
            cpf: segurado.cpf,
            telefone: {
                tipo: segurado.tipoTelefone,
                numero: segurado.numeroTelefone
            },
            dataNascimento: segurado.dataNascimento,
            sexo: form.sexo,
            estadoCivil: form.estado_civil,
            paisResidencia: 55,
            faixaRenda: form.faixa_renda,
            documento: {
                tipo: form.tipo_documento,
                numero: form.numero_documento,
                orgaoExpedidor: form.orgao_expedidor.toUpperCase(),
                dataExpedicao: form.data_expedicao
            },
            pessoaPoliticamenteExposta: form.politicamente_exposta,
            politicamenteExposta: {
                cpf: form.cpf_pessoa_exposta,
                nome: form.nome_pessoa_exposta,
                grauRelacionamento: form.grau_parentesco_pessoa_exposta
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
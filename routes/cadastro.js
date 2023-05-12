const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");

const Usuarios = require('../collections/usuarios');
const validation = require('../configs/validation');
const orgaoEmissor = require('../configs/orgaoEmissor');

dotenv.config();

router.get("/", async (req, res) => {
    let session = req.session;
    if (!session.user_id){ return res.sendFile("cadastro.html", { root: "public" }); }

    let user = await Usuarios.findOne({_id: session.user_id});
    if (!user){ req.session.destroy(); return res.sendFile("cadastro.html", { root: "public" }); }
    
    return res.redirect('/pagamento');
});

router.post("/", async (req, res)=>{
    let data = req.body;
    let form = data.form || {};
    let firstForm = data.data || {};
    let session = req.session;
    let fatalError = false;
    let errorList = [];
    
    if (session.user_id){ 
        let user = await Usuarios.findOne({_id: session.user_id});
        if (!user){ req.session.destroy(); }
    }
    
    if (form.email.length < 5 || !form.email.includes('@') || !form.email.includes('.')){
        errorList.push({message: 'Email inválido', id: 'email'});
    }else{
        let user = await Usuarios.findOne({email: form.email.trim()});
        if (user){ errorList.push({message: 'O email já esta em uso', id: 'email'}); }
    }
    if (form.senha.length < 8){
        if (!form.senha){
            errorList.push({message: 'Senha Inválida', id: 'senha'});
        }
        errorList.push({message: 'Sua senha deve ter no mínimo 8 caracteres', id: 'senha'});
    }
    //if (errorList.length > 0){ return res.status(400).json({ errors: errorList }); }
    
    let segurado = firstForm.segurado;

    if (!segurado){
        errorList.push({message: '', id: 'primeira-etapa'});
        segurado = {};
    }
    if (!/^.{1,160}$/.test(segurado.nome) || !segurado.nome){
        errorList.push({message: 'Nome inválido', id: '-nome'});
    }
    if (!/^[0-9]{11}$/.test(segurado.cpf) || !segurado.cpf){
        errorList.push({message: 'CPF inválido', id: '-cpf'});
    }
    if (!/^[0-9]{1}$/.test(segurado.tipoTelefone)){
        errorList.push({message: 'Campo Obrigatório', id: '-tipo_telefone'});
    }

    let numeroTelefone = segurado.numeroTelefone || '';
    numeroTelefone = numeroTelefone.replace(/[^0-9]+/g, '');

    if (!/^[0-9]{10,11}$/.test(numeroTelefone) || !numeroTelefone){
        errorList.push({message: 'Número inválido', id: '-numero_telefone'});
    }

    let dataNascimento = segurado.dataNascimento || '00-00-0000';
    dataNascimento = dataNascimento.replace(/\//g, '-');
    dataNascimento = dataNascimento.split('-');

    if (dataNascimento.length < 3){
        errorList.push({message: '', id: ''});
        dataNascimento = [00, 00, 0000]
    }
    if (dataNascimento[0] < 1 || dataNascimento[0] > 31){
        errorList.push({message: 'Data de nascimento inválida', id: '-data_nascimento'});
    }
    if (dataNascimento[1] < 1 || dataNascimento[1] > 12){
        errorList.push({message: 'Data de nascimento inválida', id: '-data_nascimento'});
    }
    if (dataNascimento[2] < 1800 || dataNascimento[2] > 2023){
        errorList.push({message: 'Data de nascimento inválida', id: '-data_nascimento'});
    }

    let endereco = segurado.endereco || {};

    if (!/^[0-9]{8}$/.test(endereco.cep) || !endereco.cep){
        errorList.push({message: 'CEP inválido', id: '-cep'});
    }
    if (!/^.{1,10}$/.test(endereco.tipo) || !endereco.tipo){
        errorList.push({message: 'Campo Obrigatório', id: '-tipo_logradouro'});
    }
    if (!/^.{1,200}$/.test(endereco.logradouro) || !endereco.logradouro){
        errorList.push({message: 'Logradouro inválido', id: '-logradouro'});
    }
    if(!/^[0-9]{1,4}$/.test(endereco.numero)){
        errorList.push({message: 'Número inválido', id: '-numero'});
    }
    if (!/^.{1,40}$/.test(endereco.bairro) || !endereco.bairro){
        errorList.push({message: 'Bairro inválido', id: '-bairro'});
    }
    if (!/^.{1,40}$/.test(endereco.cidade) || !endereco.cidade){
        errorList.push({message: 'Cidade inválida', id: '-cidade'});
    }

    endereco.uf = (endereco.uf) ? endereco.uf.toUpperCase() : '';

    if (!/^[A-Z]{2}$/.test(endereco.uf) || !endereco.uf){
        errorList.push({message: 'UF inválido', id: '-uf'});
    }
    //if (errorList.length > 0){ return res.status(400).json({ errors: errorList }); }
    
    if (!/^[1-2]{1}$/.test(form.sexo) || !form.sexo){
        errorList.push({message: 'Campo Obrigatório', id: 'sexo'});
    }
    if (!/^[1-5]{1}$/.test(form.estado_civil) || !form.estado_civil){
        errorList.push({message: 'Campo Obrigatório', id: 'estado_civil'});
    }
    if (!/^[1-6]{1}$/.test(form.faixa_renda) || !form.faixa_renda){
        errorList.push({message: 'Campo Obrigatório', id: 'faixa_renda'});
    }
    if (!/^[1-2]{1}$/.test(form.tipo_documento) || !form.tipo_documento){
        errorList.push({message: 'Campo Obrigatório', id: 'tipo_documento'});
    }
    if (!/^[0-9]{5,20}$/.test(form.numero_documento) || !form.numero_documento){
        errorList.push({message: 'Número inválido', id: 'numero_documento'});
    }

    form.orgao_expedidor = (form.orgao_expedidor) ? form.orgao_expedidor.toUpperCase() : '';

    if (!(form.orgao_expedidor in orgaoEmissor)){
        errorList.push({message: 'Orgão de expedição inválido', id: 'orgao_expedidor'});
    }

    let dataExpedicao = form.data_expedicao || '00/00/0000';
    dataExpedicao = dataExpedicao.replace(/\//g, '-');
    dataExpedicao = dataExpedicao.split('-');

    if (dataExpedicao.length < 3){ 
        errorList.push({message: 'Data de expedicão inválida', id: 'data_expedicao'}); 
        dataExpedicao = [00, 00, 0000];
    }
    if (dataExpedicao[0] > 31 || dataExpedicao[0] < 1){ 
        errorList.push({message: 'Data de expedicão inválida', id: 'data_expedicao'}); 
    }
    if (dataExpedicao[1] > 12 || dataExpedicao[1] < 1){ 
        errorList.push({message: 'Data de expedicão inválida', id: 'data_expedicao'}); 
    }
    if (dataExpedicao[2] > 2023 || dataExpedicao[2] < 1800){ 
        errorList.push({message: 'Data de expedicão inválida', id: 'data_expedicao'}); 
    }

    form.dataExpedicao = dataExpedicao[0] + '-' + dataExpedicao[1] + '-' + dataExpedicao[2];

    if (/^[1-3]{1}$/.test(form.politicamente_exposta)){
        if (form.politicamente_exposta == 3){
            if (!/^[0-9]{11}$/.test(form.cpf_pessoa_exposta) || !form.cpf_pessoa_exposta){
                errorList.push({message: 'CPF inválido', id: 'cpf_pessoa_exposta'});
            }
            if (!/^.{5,100}$/.test(form.nome_pessoa_exposta) || !form.nome_pessoa_exposta){
                errorList.push({message: 'Nome inválido', id: 'nome_pessoa_exposta'})
            }
            if (/^[0-9]{1,2}$/.test(form.grau_parentesco_pessoa_exposta)){
                if (form.grau_parentesco_pessoa_exposta < 1 || form.grau_parentesco_pessoa_exposta > 5){
                    if (form.grau_parentesco_pessoa_exposta != 11){ errorList.push({message: 'Campo Obrigatório', id: 'grau_parentesco_pessoa_exposta'}); }
                }
            }else{
                errorList.push({message: 'Campo Obrigatório', id: 'grau_parentesco_pessoa_exposta'});
            }
        }
    }else{
        errorList.push({message: 'Campo Obrigatório', id: 'politicamente_exposta'});
    }
    if (errorList.length > 0){ return res.status(400).json({ errors: errorList }); }

    let entry = {
        dataCadastro: new Date(),
        email: form.email.trim(),
        senha: CryptoJS.MD5(form.senha).toString(),
        pessoaFisica: {
            nome: segurado.nome,
            cpf: segurado.cpf,
            telefone: {
                tipo: segurado.tipoTelefone,
                numero: segurado.numeroTelefone.replace(/[^0-9]+/g, '')
            },
            dataNascimento: segurado.dataNascimento.replace(/\//g, '-'),
            sexo: form.sexo,
            estadoCivil: form.estado_civil,
            paisResidencia: 55,
            faixaRenda: form.faixa_renda,
            documento: {
                tipo: form.tipo_documento,
                numero: form.numero_documento,
                orgaoExpedidor: form.orgao_expedidor.toUpperCase(),
                dataExpedicao: form.dataExpedicao
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
        return res.status(200).json({message: 'Cadastro realizado com sucesso!'});
    } catch (err) { 
        console.log(err); 
        return res.status(400).json({message: '', id: 'Error'});
    } 
    
    return res.status(200).json(entry);

    if (session.user_id){ 
        let _user = await Usuarios.findOne({_id: session.user_id});
        if (!_user){ req.session.destroy(); }
    }

    if (!data){ fatalError = { code: 1 }; data = {login:{}, data: {}}; }
    let user = data.data.segurado;
    let login = data.login;
    if (!user){ fatalError = { code: 2 }; user = {}; }
    if (!user.cpf){ fatalError = { code: 3 }; }
    if (!user.dataNascimento){ fatalError = { code: 4 }; }
    if (!user.nome){ fatalError = { code: 5 }; }
    if (!user.numeroTelefone){ fatalError = { code: 6 }; }
    //let endereco = user.endereco;
    if (!endereco){ fatalError = { code: 7 }; endereco = {};  }
    if (!endereco.cep){ fatalError = { code: 8 }; }
    if (!endereco.logradouro){ fatalError = { code: 8 }; }
    if (!endereco.numero){ fatalError = { code: 10 }; }
    if (!endereco.bairro){ fatalError = { code: 11 }; }
    if (!endereco.cidade){ fatalError = { code: 12 }; }
    if (!endereco.uf){ fatalError = { code: 13 }; }
    
    if (!login.email){ fatalError = { code: 14 }; }
    if (!login.senha){ fatalError = { code: 15 }; }

    if (fatalError){ return res.status(400).json({fatal: fatalError}); }

    if (!validation.cpfPattern.test(user.cpf)) { fatalError = { code: 16 }; }
    if (!validation._nomePattern.test(user.nome)) { fatalError = { code: 17 }; }
    if (!validation.numeroTelefonePattern.test(user.numeroTelefone.replace(/[^0-9]+/g, ""))) { fatalError = { code: 18 }; }
    if (!validation._tipoTelefonePattern.test(user.tipoTelefone)) { fatalError = { code: 19 }; }
    if (!validation._dataNascimentoPattern.test(user.dataNascimento)) { fatalError = { code: 20 }; }

    if (!validation._cepPattern.test(endereco.cep.replace(/[^0-9]+/g, ""))) { fatalError = { code: 21 }; }
    if (!validation._enderecoPattern.test(endereco.logradouro)) { fatalError = { code: 22 }; }
    if (!validation._tipoRuaPattern.test(endereco.tipo)) { fatalError = { code: 23 }; }
    if (!validation.numeroPattern.test(endereco.numero)) { fatalError = { code: 24 }; }
    if (!validation.bairroPattern.test(endereco.bairro)) { fatalError = { code: 25 }; }
    if (!validation._cidadePattern.test(endereco.cidade)) { fatalError = { code: 26 }; }
    if (!validation.ufPattern.test(endereco.uf.toUpperCase())) { fatalError = { code: 27 }; }

    if (login.email.length < 5 || !login.email.includes('@') || !login.email.includes('.')){ 
        return res.status(400).json({fatal: false, message: "O email informado não é válido.", id: "email"});    
    }
    if (login.senha.length < 8){ 
        return res.status(400).json({fatal: false, message: "Sua senha deve ter no mínimo 8 caracteres.", id: "senha"}); 
    }

    if (fatalError){ return res.status(400).json({fatal: fatalError}); }

    user = {
        usuario: {
            nome: user.nome,
            numeroTelefone: user.numeroTelefone,
            cpf: user.cpf,
            dataNascimento: user.dataNascimento,
            dataCadastro: new Date(),
            email: login.email.trim(),
            senha: login.senha
        },
        endereco: {
            cep: endereco.cep,
            logradouro: endereco.logradouro,
            tipo: endereco.tipo,
            numero: endereco.numero,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            uf: endereco.uf,
            complemento: endereco.complemento
        }
    }; 
    let usuario = await Usuarios.findOne({'usuario.email': login.email.trim()});
    if (usuario){ 
        return res.status(400).json({fatal: false, message: "Já existe uma conta utilizando este endereço de email", id: "email"}); 
    }
    usuario = new Usuarios(user);
    try { 
        usuario = await usuario.save(); 
        req.session.user_id = usuario.id;
        req.session.sessionStart = new Date();
        return res.status(200).json({message: "Cadastro realizado com sucesso!"});
    } catch (err) { 
        console.log(err); 
        return res.status(400).json({code: 31});
    }   
});

module.exports = router;
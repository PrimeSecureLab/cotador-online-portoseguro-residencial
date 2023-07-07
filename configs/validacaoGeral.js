const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");
dotenv.config();

class ValidadorGeral extends Object {
    constructor(){
        super();
        this.pattern = {
            cpf: /^\d{11}$/,
            nome: /^[A-Za-z\s]+$/,
            _nome: /^([^0-9]*).{1,}$/,
            numeroTelefone: /^\d{10,11}$/,
            tipotelefone: /^(fixo|celular)$/,
            _tipoTelefone: /^[0-1]{1}$/,
            datanascimento: /^\d{4}\-\d{2}\-\d{2}$/,
            _dataNascimento: /^\d{2}\-\d{2}\-\d{4}$/,
            cep: /^\d{5}\-\d{3}$/,
            _cep: /^\d{8}$/,
            endereco: /^[A-Za-z0-9\s\,\.\-]+$/,
            _endereco: /^.{2,200}$/,
            tiporua: /^(rua|avenida|travessa|alameda)$/,
            _tipoRua: /^[0-7]{1}$/,
            numero: /^\d+$/,
            bairro: /^[A-Za-z\s\.\-]+$/,
            _bairro: /^.{2,200}$/,
            cidade: /^[A-Za-z\s\.\-]+$/,
            _cidade: /^([^0-9]*).{2,}$/,
            uf: /^[A-Z]{2}$/,
            tipoResidencia: /^[1-7]{1}$/,
            eloCard: /^(40117[8-9]|4011[8-9][0-9]|4[23][0-9]{2}|5[1-5][0-9]{2}|5[6][0-9][0-9]|6[0-9]{3})[0-9]{10}$/,
            dinersCard: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            visaCard: /^4[0-9]{12}(?:[0-9]{3})?$/,
            masterCard: /^5[1-5][0-9]{14}$/,
            _geral: /^[A-zÀ-ú0-9\s]+$/,
            listaTipoRua: [ "R", "AV", "AL", "CH", "COND", "CJ", "EST", "LD", "LRG", "PRQ", "PC", "PR", "Q", "ROD", "TV", "V" ],
            listaUF: [ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO' ],
            
            celular: /^\([0-9]{2}\)\s[0-9]{5}\-[0-9]{4}$/,
            _celular: /^\([0-9]{2}\)\s[0-9]{4}\-[0-9]{5}$/,
            telefone: /^\([0-9]{2}\)\s[0-9]{4}\-[0-9]{4}$/,
            _cpf: /^(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})$/,

            data: /^(\d{2})\/(\d{2})\/(\d{4})$/,
            _data: /^(\d{2})\-(\d{2})\-(\d{4})$/,
            dataAmerica: /^(\d{4})\-(\d{2})\-(\d{2})$/,
        };
        
        this.listaUF = [ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO' ];
        this.listaTipoRua = [ "R", "AV", "AL", "CH", "COND", "CJ", "EST", "LD", "LRG", "PRQ", "PC", "PR", "Q", "ROD", "TV", "V" ];
        this.objCoberturas = [];

        this.iniciar();
    }

    iniciar(){
        this.objCoberturas['habitual'] = [ //Itens Habitual
            'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', /*'codigoClausulasPortoSeguroServicos',*/
            'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes',
            'valorCoberturaQuebraVidros', 'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto',
            'valorCoberturaAlagamento', /*'flagContratarValorDeNovo', 'flagLMIDiscriminado',*/ 'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos',
            'valorSubtracaoBicicleta', 'valorNegocioCasa', 'valorPequenasReformas', 'valorFuneralFamiliar', 'valorDanosMorais', 'valorRCEmpregador'
        ];
        this.objCoberturas['veraneio'] = [ 
            'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', /*'codigoClausulasPortoSeguroServicos',*/
            'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes', 
            'valorCoberturaQuebraVidros', 'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto', 
            'valorCoberturaAlagamento', /*'flagContratarValorDeNovo', 'flagLMIDiscriminado',*/ 'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos'
        ];
    }

    retornarCoberturas(produto){
        if (produto == 'habitual'){ return this.objCoberturas[produto]; }
        if (produto == 'veraneio'){ return this.objCoberturas[produto]; }
        return false;
    }

    retornarProduto(tipoResidencia){
        if (!/^[1-8]{1}$/.test(tipoResidencia)){ return false; }
        tipoResidencia = parseInt(tipoResidencia);
        if (tipoResidencia == 4 || tipoResidencia == 8){ return 'veraneio'; }
        return 'habitual';
    }

    validarNome(nome){
        nome = nome || '';
        nome = nome.toString().trim();
        if (nome.length < 4 || !nome.includes(' ')){ return false; }
        return true;
    }

    validarCPF(cpf){
        if (!this.pattern._cpf.test(cpf)){ return false; }
        let numeroCpf = cpf.replace(/\D/g, '');
    
        let soma = 0;
        for (let i = 1; i <= 9; i++){ soma = soma + parseInt(numeroCpf.substring(i-1, i)) * (11 - i); }
        let resto = (soma * 10) % 11;
        
        if ((resto == 10) || (resto == 11)){ resto = 0; }
        if (resto != parseInt(numeroCpf.substring(9, 10)) ){ return false; }
        
        soma = 0;
        for (let i = 1; i <= 10; i++){ soma = soma + parseInt(numeroCpf.substring(i-1, i)) * (12 - i); }
        resto = (soma * 10) % 11;
    
        if ((resto == 10) || (resto == 11)){ resto = 0; }
        if (resto != parseInt(numeroCpf.substring(10, 11) ) ){ return false; }
        return true;
    }

    validarTelefone(numero){
        if (this.pattern.celular.test(numero) || this.pattern._celular.test(numero) || this.pattern.telefone.test(numero)){ return true; }
        return false;
    }

    validarTipoTelefone(tipoTelefone){
        if (!tipoTelefone){ return false; }
        if (tipoTelefone != 1 && tipoTelefone != 3){ return false; }
        return true;
    }

    validarTelefoneCompleto(numeroTelefone, tipoTelefone){
        if (!this.validarTelefone(numeroTelefone)){ return false; }
        if (!this.validarTipoTelefone(tipoTelefone)){ return false; }
        if (tipoTelefone == 1 && numeroTelefone.replace(/[^0-9]+/g, '').length != 10){ return false; } 
        if (tipoTelefone == 3 && numeroTelefone.replace(/[^0-9]+/g, '').length != 11){ return false; } 
        return true;
    }

    validarTipoRua(tipoRua){
        if (!tipoRua){ return false; }
        tipoRua = tipoRua.toUpperCase();
        if (!this.pattern.listaTipoRua.includes(tipoRua)){ return false; }
        return true;
    }

    validarTipoResidencia(tipoResidencia){ 
        if (!/^[1-8]{1}$/.test(tipoResidencia)){ return false; }
        tipoResidencia = parseInt(tipoResidencia);
        return [1, 2, 3, 4, 8].includes(tipoResidencia); 
    }

    validarEmail(email){
        email = email || '';
        email = email.toString().trim();
        if (email.length < 5 || !email.includes('@') || !email.includes('.')){ return false; }
        return true;
    }

    validarCEP(cep){ return this.pattern.cep.test(cep); }

    validarMunicipio(municipio){ return /^.{2,50}$/.test(municipio); }
    
    validarLogradouro(logradouro){ return /^.{2,60}$/.test(logradouro); }
    
    validarNumero(numero){ return /^.{1,20}$/.test(numero); }
    
    validarComplemento(complemento){ return /^.{0,35}$/.test(complemento); }
    
    validarBairro(bairro){ return /^.{1,33}$/.test(bairro); }
    
    validarUF(uf){
        uf = uf || '';
        uf = uf.toUpperCase();
        if (!this.pattern.listaUF.includes(uf)){ return false; }
        return true;
    }
    
    validarData(date){
        if (!this.pattern.data.test(date)){ return false; } 
    
        var [, dia, mes, ano] = this.pattern.data.exec(date);
        var data = new Date(ano, mes - 1, dia);
    
        return (
            data.getFullYear() === parseInt(ano, 10) &&
            data.getMonth() === parseInt(mes, 10) - 1 &&
            data.getDate() === parseInt(dia, 10) &&
            !isNaN(data.getTime())
        );
    }

    decriptarDados(body){
        //console.log('A:', body);
        let bytes = CryptoJS.AES.decrypt(body, process.env.CRYPTO_TOKEN);
        if (!bytes){ return false; }   
        let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
        if (!data){ return false; }else{ return data; } 
    }

    formatarDataAmericana(date){
        if (this.pattern.data.test(date)){ 
            let [data, dia, mes, ano] = this.pattern.data.exec(date);
            return `${ano}-${mes}-${dia}`; 
        }
        if (this.pattern._data.test(date)){ 
            let [data, dia, mes, ano] = this.pattern._data.exec(date);
            return `${ano}-${mes}-${dia}`; 
        }
        if (this.pattern.dataAmerica.test(date)){ return date; }
        return false;
    }

    validarDataAmericana(data){ return /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/.test(data); }

    validarProduto(produto){
        if (!produto){ return false; }
        produto = produto.toString().toLowerCase();
        if (!['habitual', 'habitual-premium', 'veraneio'].includes(produto)){ return false; }
        return true;
    }

    validarPlano(plano){
        if (!plano){ return false; }
        plano = plano.toString().toLowerCase();
        if (!['essencial', 'conforto', 'exclusive'].includes(plano)){ return false; }
        return true;
    }

    validarVigencia(vigencia){ return /^[1-3]{1}$/.test(vigencia); }

    validarDadosCobertura(dadosCobertura){
        if (!dadosCobertura){ return false; }
        if (!dadosCobertura.valorCoberturaIncendio){ return false; }
        if (!dadosCobertura.valorCoberturaIncendio.value){ return false; }
        if (!dadosCobertura.valorCoberturaIncendio.hasOwnProperty('disabled')){ return false; }
        return true;
    }

    formatarItensCobertura(dadosCobertura){
        let items = {};
        for(let key in dadosCobertura){
            let cobertura = dadosCobertura[key];
            if (cobertura.disabled){ continue; }
            items[key] = cobertura.value;            
        }
        return items;
    }

    validarSeguradoEndereco(endereco){
        if (!endereco){ return false; }
        endereco.complemento = endereco.complemento || '';
        if (!/^[0-9]{8}$/.test(endereco.cep)){ return false; }
        if (!this.validarBairro(endereco.bairro)){ return false; }
        if (!this.validarMunicipio(endereco.cidade)){ return false; }
        if (!this.validarComplemento(endereco.complemento)){ return false; }
        if (!this.validarLogradouro(endereco.logradouro)){ return false; }
        if (!this.validarNumero(endereco.numero)){ return false; }
        if (!this.validarTipoRua(endereco.tipo)){ return false; }
        if (!this.validarUF(endereco.uf)){ return false; }
        return true;
    }

    validarFormularioSegurado(segurado){  
        if (!segurado){ return false; }
        if (!this.validarSeguradoEndereco(segurado.endereco)){ return false; }
        if (!/^[0-9]{11}$/.test(segurado.cpf)){ return false; }
        if (!this.validarDataAmericana(segurado.dataNascimento)){ return false; }
        if (!this.validarNome(segurado.nome)){ return false; }
        if (!/^[0-9]{10,11}$/.test(segurado.numeroTelefone)){ return false; }
        if (segurado.numeroTelefone.toString().length == 11 && segurado.tipoTelefone != 3){ return false; }
        if (segurado.numeroTelefone.toString().length == 10 && segurado.tipoTelefone != 1){ return false; }
        return true;
    }

    validarFormulario(formulario){
        if (!this.validarTipoResidencia(formulario.tipoResidencia)){ return false; }
        if (!this.validarFormularioSegurado(formulario.segurado)){ return false; }
        return true;
    }

};
module.exports = ValidadorGeral;
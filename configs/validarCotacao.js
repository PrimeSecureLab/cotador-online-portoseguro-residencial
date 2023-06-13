class ValidarCotacao extends Object{
    constructor(){ 
        super();
        this.patterns = {
            data_1: /^(\d{2})\/(\d{2})\/(\d{4})$/,
            data_2: /^(\d{2})\-(\d{2})\-(\d{4})$/,
            data_3: /^(\d{4})\-(\d{2})\-(\d{2})$/
        }
    }
    decriptarDados(body){
        let bytes = CryptoJS.AES.decrypt(body, process.env.CRYPTO_TOKEN);
        if (!bytes){ return false; }   
        let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
        if (!data){ return false; }else{ return data; } 
    }
    formatarDataAmericana(date){
        if (this.patterns.data_1.test(date)){ 
            let [data, dia, mes, ano] = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date);
            return `${ano}-${mes}-${dia}`; 
        }
        if (this.patterns.data_2.test(date)){ 
            let [data, dia, mes, ano] = /^(\d{2})\-(\d{2})\-(\d{4})$/.exec(date);
            return `${ano}-${mes}-${dia}`; 
        }
        if (this.patterns.data_3.test(date)){ return date; }
        return false;
    }
    validarDadosCotacao(body, campo){
        /*let data = {
            cpf: body.cpf || '',
            nome: body.nome || '',
            tipoTelefone: body.tipoTelefone || '',
            numeroTelefone: body.numeroTelefone || '',
            dataNascimento: body.dataNascimento || '',
            cep: body.cep || '',
            tipoResidencia: body.tipoResidencia || '',
            logradouro: body.logradouro || '',
            tipoRua: body.tipoRua || '',
            numero: body.numero || '',
            bairro: body.bairro || '',
            cidade: body.cidade || '',
            uf: body.uf || ''
        };*/
        let errorList = [];

        if (campo == 'endereco'){
            let basePattern = {
                cep: /^$/,
                logradouro: /^$/,
                tipo: /^$/,
                numero: /^$/,
                bairro: /^$/,
                cidade: /^$/, 
                uf: /^$/,
                complemento: /^.{0,10}$/
            }
            let endereco = {
                cep: body.cep || '',
                logradouro: body.logradouro || '',
                tipo: body.tipo || '',
                numero: body.numero || '',
                bairro: body.bairro || '',
                cidade: body.cidade || '', 
                uf: body.uf || '',
                complemento: body.complemento || ''
            }
        }
        return data;
    }
    relacaoLowerCaseUpperCase(input, fromLowerCase){
        var parametros = [ "susep", "codigoOperacao", "flagImprimirCodigoOperacaoOrcamento", "codigoCanal", "melhorDataPagamento", 
        "tipoResidencia", "tipoVigencia", "dataInicioVigencia", "dataFimVigencia", "flagSinistrosUltimos12Meses", "segurado", 
        "nome", "numeroTelefone", "tipoTelefone", "cpfCnpj", "dataNascimento", "endereco", "cep", "logradouro", "tipo", "numero", 
        "bairro", "cidade", "uf", "complemento" ];
        var _parametros = [ "numeroOrcamento", "codigoPessoaPoliticamenteExposta", "segurado", "enderecoCobranca", "cep", "tipoLogradouro", 
        "logradouro", "numero", "bairro", "complemento", "cidade", "uf", "enderecoCorrespondencia", "cep", "tipoLogradouro", "logradouro", 
        "numero", "bairro", "complemento", "cidade", "uf", "contato", "email", "numeroTelefoneResidencial", "numeroTelefoneComercial", 
        "numeroTelefoneCelular", "pessoaFisica", "dataNascimento", "codigoSexo", "codigoEstadoCivil", "codigoPaisResidencia", 
        "codigoFaixaRenda", "documentoIdentificacao", "tipoDocumento", "numeroDocumento", "orgaoExpedidor", "dataExpedicao", 
        "dataValidade", "pessoaPoliticamenteExposta", "cpf", "nome", "codigoGrauRelacionamento", "pessoaJuridica", "codigoTipoEmpresa", 
        "codigoAtividadeProfissional", "codigoPatrimonioLiquido", "codigoReceitaOperacionalBrutaAnual", "socios", "codigoTipo", 
        "nome", "cpfCnpj", "codigoAtividadeProfissional", "pessoaPoliticamenteExposta", "cpf", "nome", "codigoGrauRelacionamento", 
        "endereco", "cep", "logradouro", "tipo", "numero", "bairro", "cidade", "uf", "complemento", "pagamento", "formaPagamento", 
        "quantidadeParcelas", "contaCorrente", "cpfCnpj", "codigoBanco", "numeroAgencia", "numeroConta", "digitoConta", 
        "nomeResponsavelPagamento", "cartao", "numeroCartao", "codigoBandeira", "mesValidade", "anoValidade", "beneficiarios", 
        "cpfCnpj", "nome", "codigoAtividadeProfissional", "valorEdificio", "valorConteudo", "endereco", "cep", "logradouro", 
        "tipo", "numero", "bairro", "cidade", "uf", "complemento", "contatoInspecao", "numeroTelefone", "ramal", "contato" ];
    }
    
    mensagensDeErro(id){
        var errorMessages = [
            'CPF inválido.', //Cotação
            'Nome inválido.',
            'Tipo de telefone inválido.',
            'Número de telefone inválido.',
            'Telefone fixo deve ter 10 digitos.',
            'Telefone celular deve ter 11 digitos.',
            'Data de nascimento inválida',
            'Tipo de residencia inválido.',
            'Endereço inválido.',
            'Tipo de rua inválido.',
            'Número inválido.',
            'Bairro inválido.',
            'Cidade inválida.',
            'UF inválido.', 
            'Email, CPF ou senha incorretos', //Login
            'Email inválido', //Cadastro
            'O email já esta em uso',
            'Senha Inválida',
            'Sua senha deve ter no mínimo 8 caracteres',
            'Campo Obrigatório',
            'Data de nascimento inválida',
            'Logradouro inválido',
            'Orgão de expedição inválido',
            'Data de expedicão inválida'
        ]
    } 

}

module.exports = ValidarCotacao;
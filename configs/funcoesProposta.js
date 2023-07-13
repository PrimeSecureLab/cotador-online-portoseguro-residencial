const dotenv = require('dotenv');
const CryptoJS = require("crypto-js");
dotenv.config();

class FuncoesProposta extends Object {
    constructor(){
        super();
    }   

    decriptarDados(body){
        let bytes = CryptoJS.AES.decrypt(body, process.env.CRYPTO_TOKEN);
        if (!bytes){ return false; }   
        let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
        if (!data){ return false; }else{ return data; } 
    }

    retornarCodigoBandeira(numero){
        if (this.pattern.eloCard.test(numero)){ return 5; } 
        if (this.pattern.dinersCard.test(numero)){ return 3; }
        if (this.pattern.visaCard.test(numero)){ return 2; }
        if (this.pattern.masterCard.test(numero)){ return 1; }
        return false;
    }

    criarObjetoProposta(numeroOrcamento, codigoPessoaPoliticamenteExposta, endereco, contato, pessoaFisica, documentoIdentificacao, pessoaPoliticamenteExposta, pagamento, cartao ){
        numeroOrcamento = parseInt(numeroOrcamento) || 0;
        codigoPessoaPoliticamenteExposta = parseInt(codigoPessoaPoliticamenteExposta) || 3;
        
        endereco.cep = endereco.cep.toString().replace(/[^\d]/g, '');
        endereco.tipoLogradouro = endereco.tipoLogradouro.toString();
        endereco.logradouro = endereco.logradouro.toString();

        endereco.numero = endereco.numero.toString().replace(/[^\d]/g, '');
        endereco.numero = parseInt(endereco.numero);

        endereco.bairro = endereco.bairro.toString();
        endereco.cidade = endereco.cidade.toString();
        endereco.uf = endereco.uf.toUpperCase();
        endereco.complemento = endereco.complemento || '';

        pessoaFisica.codigoSexo = pessoaFisica.codigoSexo.toString().replace(/[^\d]/g, '');
        pessoaFisica.codigoSexo = parseInt(pessoaFisica.codigoSexo);

        pessoaFisica.dataNascimento = pessoaFisica.dataNascimento.toString();
        pessoaFisica.codigoEstadoCivil = parseInt(pessoaFisica.codigoEstadoCivil.toString().replace(/[^\d]/g, ''));
        
        pessoaFisica.codigoFaixaRenda = pessoaFisica.codigoFaixaRenda.toString().replace(/[^\d]/g, '');
        pessoaFisica.codigoFaixaRenda = parseInt(pessoaFisica.codigoFaixaRenda);

        pessoaFisica.codigoPaisResidencia = pessoaFisica.codigoPaisResidencia.toString().replace(/[^\d]/g, '');
        pessoaFisica.codigoPaisResidencia = parseInt(pessoaFisica.codigoPaisResidencia);

        documentoIdentificacao.tipoDocumento = documentoIdentificacao.tipoDocumento.toString().replace(/[^\d]/g, '');
        documentoIdentificacao.tipoDocumento = parseInt(documentoIdentificacao.tipoDocumento);

        documentoIdentificacao.numeroDocumento = documentoIdentificacao.numeroDocumento.toString().replace(/[^\d]/g, '').toString();
        documentoIdentificacao.orgaoExpedidor = documentoIdentificacao.orgaoExpedidor.toString();
        documentoIdentificacao.dataExpedicao = documentoIdentificacao.dataExpedicao.toString();

        pessoaPoliticamenteExposta.cpf = pessoaPoliticamenteExposta.cpf || '';
        pessoaPoliticamenteExposta.cpf = pessoaPoliticamenteExposta.cpf.toString();

        pessoaPoliticamenteExposta.nome = pessoaPoliticamenteExposta.nome || '';
        pessoaPoliticamenteExposta.nome = pessoaPoliticamenteExposta.nome.toString(); 

        pessoaPoliticamenteExposta.codigoGrauRelacionamento = pessoaPoliticamenteExposta.codigoGrauRelacionamento.toString().replace(/[^\d]/g, '') || '0'; 
        pessoaPoliticamenteExposta.codigoGrauRelacionamento = parseInt(pessoaPoliticamenteExposta.codigoGrauRelacionamento);

        pagamento.formaPagamento = "CARTAO_DE_CREDITO_62";
        pagamento.quantidadeParcelas = pagamento.quantidadeParcelas.toString().replace(/[^\d]/g, '');
        pagamento.quantidadeParcelas = parseInt(pagamento.quantidadeParcelas);

        cartao.numeroCartao = cartao.numeroCartao.toString();

        cartao.codigoBandeira = cartao.codigoBandeira || 0;
        cartao.codigoBandeira = parseInt(cartao.codigoBandeira);

        cartao.mesValidade = cartao.mesValidade;
        cartao.anoValidade = cartao.anoValidade;

        contato.email = contato.email.toString().trim();
        contato.numeroTelefoneCelular = contato.numeroTelefoneCelular.toString().replace(/[^\d]/g, '');
        contato.numeroTelefoneResidencial = contato.numeroTelefoneResidencial.toString().replace(/[^\d]/g, '');

        let proposta = {
            "numeroOrcamento": numeroOrcamento,
            "codigoPessoaPoliticamenteExposta": codigoPessoaPoliticamenteExposta,
            "segurado": {
                "enderecoCobranca": {
                    "cep": endereco.cep,
                    "tipoLogradouro": endereco.tipoLogradouro,
                    "logradouro": endereco.logradouro,
                    "numero": endereco.numero,
                    "bairro": endereco.bairro,
                    "cidade": endereco.cidade,
                    "uf": endereco.uf,
                    "complemento": endereco.complemento
                },
                "enderecoCorrespondencia": {
                    "cep": endereco.cep,
                    "tipoLogradouro": endereco.tipoLogradouro,
                    "logradouro": endereco.logradouro,
                    "numero": endereco.numero,
                    "bairro": endereco.bairro,
                    "cidade": endereco.cidade,
                    "uf": endereco.uf,
                    "complemento": endereco.complemento
                },
                "contato": {
                    "email": contato.email,
                    "numeroTelefoneCelular": contato.numeroTelefoneCelular,
                    "numeroTelefoneResidencial": contato.numeroTelefoneResidencial
                },
                "pessoaPoliticamenteExposta": {
                    "cpf": pessoaPoliticamenteExposta.cpf,
                    "nome": pessoaPoliticamenteExposta.nome,
                    "codigoGrauRelacionamento": pessoaPoliticamenteExposta.codigoGrauRelacionamento
                },
                "pessoaFisica": {
                    "dataNascimento": pessoaFisica.dataNascimento,
                    "codigoSexo": pessoaFisica.codigoSexo,
                    "codigoEstadoCivil": pessoaFisica.codigoEstadoCivil,
                    "codigoPaisResidencia": 237,
                    "codigoFaixaRenda": pessoaFisica.codigoFaixaRenda,
                    "documentoIdentificacao": {
                        "tipoDocumento": documentoIdentificacao.tipoDocumento,
                        "numeroDocumento": documentoIdentificacao.numeroDocumento,
                        "orgaoExpedidor": documentoIdentificacao.orgaoExpedidor,
                        "dataExpedicao": documentoIdentificacao.dataExpedicao
                    }
                }
            },
            "pagamento": {
                "formaPagamento": pagamento.formaPagamento,
                "quantidadeParcelas": pagamento.quantidadeParcelas,
                "cartao": {
                    "numeroCartao": cartao.numeroCartao,
                    "codigoBandeira": cartao.codigoBandeira,
                    "mesValidade": cartao.mesValidade,
                    "anoValidade": cartao.anoValidade
                }
            }
        }

        if (contato.numeroTelefoneCelular.length != 11){ delete proposta.segurado.contato.numeroTelefoneCelular; }
        if (contato.numeroTelefoneResidencial.length != 10){ delete proposta.segurado.contato.numeroTelefoneResidencial; }
        if (codigoPessoaPoliticamenteExposta != 3){ delete proposta.segurado.pessoaPoliticamenteExposta; }

        return proposta;        
    }  
    
};
module.exports = FuncoesProposta;
function retornarCodigoAssistencias(produto, plano, vigencia, residencia/*, codAssistencia*/){
    if (!(['habitual', 'veraneio'].includes(produto.toLowerCase()))){ return false; }
    if (!(['essencial', 'conforto', 'exclusive'].includes(plano.toLowerCase()))){ return false; }
    if (!/^[1-3]{1}$/.test(vigencia)){ return false; }
    //if (!/^[0-9]{1,4}$/.test(codAssistencia)){ return false; }
    if (!/^[1-8]{1}$/.test(residencia)){ return false; }

    produto = produto.toLowerCase();
    plano = plano.toLowerCase();
    vigencia = parseInt(vigencia);
    //codAssistencia = parseInt(codAssistencia);
}

function retornarAssistencia(produto, plano, vigencia, residencia, codAssistencia){
    if (!/^[0-9]{1,4}$/.test(codAssistencia)){ return false; }
    if (!(['habitual', 'veraneio'].includes(produto.toLowerCase()))){ return false; }
    if (!(['essencial', 'conforto', 'exclusive'].includes(plano.toLowerCase()))){ return false; }
    if (!/^[1-3]{1}$/.test(vigencia)){ return false; }
    if (!/^[1-8]{1}$/.test(residencia)){ return false; }

    codAssistencia = parseInt(codAssistencia);
    vigencia = parseInt(vigencia);
    residencia = parseInt(residencia);
   
    let listaAssistencia = {
        1: { //Casa Alvenaria - Habitual
            1: { // 1 ANO
                572: [],// Essencial
                505: [],// Conforto
                509: [],// Exclusive
            },
            2: { // 2 ANOS
                1192: [],// Essencial
                1194: [],// Conforto
                1200: [],// Exclusive
            },
            3 : { // 3 ANOS
                1206: [],// Essencial
                1208: [],// Conforto
                1215: [],// Exclusive
            }
        },
        2: { //Apartamento - Habitual
            1: {// 1 ANO
                577: [],// Essencial
                580: [],// Conforto
                593: [],// Exclusive
            },
            2: {// 2 ANOS
                1193: [],// Essencial
                1195: [],// Conforto
                1201: [],// Exclusive
            },
            3: {// 3 ANOS
                1207: [],// Essencial
                1209: [],// Conforto
                1217: [],// Exclusive
            }
        },
        3: { //Casa de Madeira (Urbana) - Habitual
            1: {// 1 ANO
                572: [],// Essencial
                505: [],// Conforto
                509: [],// Exclusive
            },
            2: {// 2 ANOS
                1192: [],// Essencial
                1194: [],// Conforto
                1200: [],// Exclusive
            },
            3: {// 3 ANOS
                1206: [],// Essencial
                1208: [],// Conforto
                1215: [],// Exclusive
            }
        },
        8: { //Casa de Madeira (Rural) - Veraneio
            1: {// 1 ANO
                576: [],// Essencial
                582: [],// Conforto
                501: [],// Exclusive
            },
            2: {// 2 ANOS
                1237: [],// Essencial
                1239: [],// Conforto
                1248: [],// Exclusive
            },
            3: {// 3 ANOS
                1257: [],// Essencial
                1259: [],// Conforto
                1267: [],// Exclusive
            }
        },
        4: { //Chácara - Veraneio
            1: {// 1 ANO
                576: [],// Essencial
                582: [],// Conforto
                501: [],// Exclusive
            },
            2: {// 2 ANOS
                1237: [],// Essencial
                1239: [],// Conforto
                1248: [],// Exclusive
            },
            3: {// 3 ANOS
                1257: [],// Essencial
                1259: [],// Conforto
                1267: [],// Exclusive
            }
        }
        
    }
    //Casa Alvenaria - 1 ANO - Essencial
    listaAssistencia[1][1][572].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            REPAROS EM GELADEIRA e FRIGOBAR;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS DE CONGELADOR FREEZER;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            CHAVEIRO COMUM;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            ENCANADOR;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            REPAROS DE TELEFONIA;
            REPAROS DE FORNO MICROONDAS;
            REPARO MÁQUINA DE LAVAR ROUPA;
            VIDRACEIRO;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            LAVADORA DE ROUPAS LAVA E SECA;
            ELETRICISTA
        `
    });
    listaAssistencia[1][1][572].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            GUARDA DA RESIDENCIA;
            LIMPEZA;
            COBERTURA PROVISÓRIA DE TELHADOS;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            HOSPEDAGEM;
            CAÇAMBA;
            TRANSFERÊNCIA DE MÓVEIS
        `
    });

    //Casa Alvenaria - 1 ANO - Conforto
    listaAssistencia[1][1][505].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            REPAROS DE FORNO MICROONDAS;
            ENCANADOR;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            REPAROS DE TELEFONIA;
            VIDRACEIRO;
            DESENTUPIMENTO;
            REPAROS AR CONDICIONADO;
            CHAVEIRO COMUM;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            REPAROS EM GELADEIRA e FRIGOBAR;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            REPAROS DE CONGELADOR FREEZER;
            ELETRICISTA;
            LAVADORA DE ROUPAS LAVA E SECA;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA
        `
    });
    listaAssistencia[1][1][505].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            GUARDA DA RESIDENCIA;
            HOSPEDAGEM;
            LIMPEZA;
            CAÇAMBA;
            COBERTURA PROVISÓRIA DE TELHADOS;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            CUIDADOR DE CRIANÇAS E IDOSOS
        `
    });
    listaAssistencia[1][1][505].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK ATENDIMENTO MICRO;
            HELP DESK TABLET;
            HELP DESK CELULAR OU SMARTPHONE;
            HELP DESK EM MICRO RESIDENCIAL;
            HELP DESK VIDEO GAME;
            HELP DESK SMART TV
        `
    });
    listaAssistencia[1][1][505].push({
        titulo: 'PET RESIDENCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Alvenaria - 1 ANO - Exclusive    
    listaAssistencia[1][1][509].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            DESINSETIZAÇÃO;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            DESENTUPIMENTO;
            MUDANÇA DE MOBILIÁRIO;
            INSTALAÇÃO DE VENTILADOR DE TETO;
            CAÇA VAZAMENTO;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            VIDRACEIRO;
            ENCANADOR;
            LAVADORA DE ROUPAS LAVA E SECA;
            REPAROS EM GELADEIRA e FRIGOBAR;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            REPAROS DE CONGELADOR FREEZER;
            REPAROS DE FORNO MICROONDAS;
            INSTALACAO DE FECHADURA TRAVA TETRA;
            LIMPEZA E DESENTUPIMENTO DE CALHAS;
            ASSISTÊNCIA EM ANTENAS;
            DESCARTE SUSTENTAVEL;
            LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
            CHAVEIRO COMUM;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            REPAROS AR CONDICIONADO;
            ELETRICISTA;
            INSTALAÇÃO DE KIT FIXAÇÃO;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REVERSÃO DE GÁS PARA FOGÃO;
            BARRA DE APOIO;
            REPAROS DE TELEFONIA;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS
        `
    });
    listaAssistencia[1][1][509].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            GUARDA DA RESIDENCIA;
            CAÇAMBA;
            HOSPEDAGEM;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            COBERTURA PROVISÓRIA DE TELHADOS;
            LIMPEZA;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS
        `
    });
    listaAssistencia[1][1][509].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK VIDEO GAME;
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK CELULAR OU SMARTPHONE;
            HELP DESK TABLET;
            HELP DESK SMART TV;
            HELP DESK ATENDIMENTO MICRO
        `
    });
    listaAssistencia[1][1][509].push({
        titulo: 'SERVICOS DE BICICLETA',
        assistencias: `ASSISTENCIA A BIKE`
    });
    listaAssistencia[1][1][509].push({
        titulo: 'PET RESIDENCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //APARTAMENTO - 1 ANO - Essencial
    listaAssistencia[2][1][577].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            REPAROS DE CONGELADOR FREEZER;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            ELETRICISTA;
            REPAROS DE FORNO MICROONDAS;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            REPAROS DE TELEFONIA;
            REVERSÃO DE GÁS PARA FOGÃO;
            LAVADORA DE ROUPAS LAVA E SECA;
            CHAVEIRO COMUM;
            REPAROS EM GELADEIRA e FRIGOBAR;
            ENCANADOR;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            VIDRACEIRO;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA
        `
    });
    listaAssistencia[2][1][577].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            LIMPEZA;
            HOSPEDAGEM;
            CAÇAMBA;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            CUIDADOR DE CRIANÇAS E IDOSOS
        `
    });

    //APARTAMENTO - 1 ANO - Conforto
    listaAssistencia[2][1][580].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            REPAROS EM GELADEIRA e FRIGOBAR;
            CHAVEIRO COMUM;
            REPAROS AR CONDICIONADO;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            ELETRICISTA;
            LAVADORA DE ROUPAS LAVA E SECA;
            REPAROS DE CONGELADOR FREEZER;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            REPAROS DE FORNO MICROONDAS;
            REPAROS DE TELEFONIA;
            VIDRACEIRO;
            REPARO MÁQUINA DE LAVAR ROUPA;
            ENCANADOR;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            DESENTUPIMENTO
        `
    });
    listaAssistencia[2][1][580].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            HOSPEDAGEM;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            LIMPEZA;
            CAÇAMBA
        `
    });
    listaAssistencia[2][1][580].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK TABLET;
            HELP DESK VIDEO GAME;
            HELP DESK CELULAR OU SMARTPHONE;
            HELP DESK SMART TV;
            HELP DESK ATENDIMENTO MICRO
        `
    });
    listaAssistencia[2][1][580].push({
        titulo: 'PET RESIDENCIA',
        assistencias: `PET RESIDÊNCIA`
    });
    
    //APARTAMENTO - 1 ANO - Exclusive
    listaAssistencia[2][1][593].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            INSTALAÇÃO DE VENTILADOR DE TETO;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            ASSISTÊNCIA EM ANTENAS;
            REPAROS DE FORNO MICROONDAS;
            ENCANADOR;
            DESENTUPIMENTO;
            REPAROS DE CONGELADOR FREEZER;
            INSTALACAO DE FECHADURA TRAVA TETRA;
            REPAROS DE TELEFONIA;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            REVERSÃO DE GÁS PARA FOGÃO;
            MUDANÇA DE MOBILIÁRIO;
            VIDRACEIRO;
            DESCARTE SUSTENTAVEL;
            DESINSETIZAÇÃO;
            REPAROS EM GELADEIRA e FRIGOBAR;
            CHAVEIRO COMUM;
            REPAROS AR CONDICIONADO;
            ELETRICISTA;
            REPARO MÁQUINA DE LAVAR ROUPA;
            BARRA DE APOIO;
            INSTALAÇÃO DE KIT FIXAÇÃO;
            CAÇA VAZAMENTO;
            LAVADORA DE ROUPAS LAVA E SECA
        `
    });
    listaAssistencia[2][1][593].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            HOSPEDAGEM;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            LIMPEZA;
            CAÇAMBA    
        `
    });    
    listaAssistencia[2][1][593].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK SMART TV;
            HELP DESK TABLET;
            HELP DESK CELULAR OU SMARTPHONE;
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK VIDEO GAME;
            HELP DESK ATENDIMENTO MICRO  
        `
    });
    listaAssistencia[2][1][593].push({
        titulo: 'PET RESIDENCIA',
        assistencias: `PET RESIDENCIA`
    });
    listaAssistencia[2][1][593].push({
        titulo: 'SERVICOS DE BICICLETA',
        assistencias: `ASSISTENCIA A BIKE`
    });

    //CASA MADEIRA URBANA - 1 ANO - Essencial
    listaAssistencia[3][1][572].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            REPAROS EM GELADEIRA e FRIGOBAR;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS DE CONGELADOR FREEZER;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            CHAVEIRO COMUM;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            ENCANADOR;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            REPAROS DE TELEFONIA;
            REPAROS DE FORNO MICROONDAS;
            REPARO MÁQUINA DE LAVAR ROUPA;
            VIDRACEIRO;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            LAVADORA DE ROUPAS LAVA E SECA;
            ELETRICISTA
        `
    });
    listaAssistencia[3][1][572].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            GUARDA DA RESIDENCIA;
            LIMPEZA;
            COBERTURA PROVISÓRIA DE TELHADOS;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            HOSPEDAGEM;
            CAÇAMBA;
            TRANSFERÊNCIA DE MÓVEIS
        `
    });

    //CASA MADEIRA URBANA - 1 ANO - Conforto
    listaAssistencia[3][1][505].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            REPAROS DE FORNO MICROONDAS;
            ENCANADOR;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            REPAROS DE TELEFONIA;
            VIDRACEIRO;
            DESENTUPIMENTO;
            REPAROS AR CONDICIONADO;
            CHAVEIRO COMUM;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            REPAROS EM GELADEIRA e FRIGOBAR;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            REPAROS DE CONGELADOR FREEZER;
            ELETRICISTA;
            LAVADORA DE ROUPAS LAVA E SECA;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA
        `
    });
    listaAssistencia[3][1][505].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            GUARDA DA RESIDENCIA;
            HOSPEDAGEM;
            LIMPEZA;
            CAÇAMBA;
            COBERTURA PROVISÓRIA DE TELHADOS;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            CUIDADOR DE CRIANÇAS E IDOSOS
        `
    });
    listaAssistencia[3][1][505].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK ATENDIMENTO MICRO;
            HELP DESK TABLET;
            HELP DESK CELULAR OU SMARTPHONE;
            HELP DESK EM MICRO RESIDENCIAL;
            HELP DESK VIDEO GAME;
            HELP DESK SMART TV
        `
    });
    listaAssistencia[3][1][505].push({
        titulo: 'PET RESIDENCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //CASA MADEIRA URBANA - 1 ANO - Exclusive
    listaAssistencia[3][1][509].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            DESINSETIZAÇÃO;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            DESENTUPIMENTO;
            MUDANÇA DE MOBILIÁRIO;
            INSTALAÇÃO DE VENTILADOR DE TETO;
            CAÇA VAZAMENTO;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            VIDRACEIRO;
            ENCANADOR;
            LAVADORA DE ROUPAS LAVA E SECA;
            REPAROS EM GELADEIRA e FRIGOBAR;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            REPAROS DE CONGELADOR FREEZER;
            REPAROS DE FORNO MICROONDAS;
            INSTALACAO DE FECHADURA TRAVA TETRA;
            LIMPEZA E DESENTUPIMENTO DE CALHAS;
            ASSISTÊNCIA EM ANTENAS;
            DESCARTE SUSTENTAVEL;
            LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
            CHAVEIRO COMUM;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            REPAROS AR CONDICIONADO;
            ELETRICISTA;
            INSTALAÇÃO DE KIT FIXAÇÃO;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REVERSÃO DE GÁS PARA FOGÃO;
            BARRA DE APOIO;
            REPAROS DE TELEFONIA;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS
        `
    });
    listaAssistencia[3][1][509].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            GUARDA DA RESIDENCIA;
            CAÇAMBA;
            HOSPEDAGEM;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            COBERTURA PROVISÓRIA DE TELHADOS;
            LIMPEZA;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS
        `
    });
    listaAssistencia[3][1][509].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK VIDEO GAME;
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK CELULAR OU SMARTPHONE;
            HELP DESK TABLET;
            HELP DESK SMART TV;
            HELP DESK ATENDIMENTO MICRO
        `
    });
    listaAssistencia[3][1][509].push({
        titulo: 'SERVICOS DE BICICLETA',
        assistencias: `PET RESIDÊNCIA`
    });
    listaAssistencia[3][1][509].push({
        titulo: 'PET RESIDENCIA',
        assistencias: `ASSISTENCIA A BIKE`
    });

    //Casa Alvenaria - 2 ANOS - Essencial
    listaAssistencia[1][2][1192].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            REPAROS DE FORNO MICROONDAS;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            ENCANADOR;
            CHAVEIRO COMUM;
            REPAROS DE TELEFONIA;
            REPAROS EM GELADEIRA e FRIGOBAR;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            LAVADORA DE ROUPAS LAVA E SECA;
            VIDRACEIRO;
            ELETRICISTA;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            REPAROS DE CONGELADOR FREEZER
        `
    });
    listaAssistencia[1][2][1192].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            CAÇAMBA;
            GUARDA DA RESIDENCIA;
            HOSPEDAGEM;
            LIMPEZA;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            COBERTURA PROVISÓRIA DE TELHADOS;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS
        `
    });

    //Casa Alvenaria - 2 ANOS - Conforto
    listaAssistencia[1][2][1194].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            CHAVEIRO COMUM;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            REPAROS DE CONGELADOR FREEZER;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            ELETRICISTA;
            REPAROS DE TELEFONIA;
            REPAROS EM GELADEIRA e FRIGOBAR;
            VIDRACEIRO;
            ENCANADOR;
            REPAROS AR CONDICIONADO;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            REVERSÃO DE GÁS PARA FOGÃO;
            LAVADORA DE ROUPAS LAVA E SECA;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            DESENTUPIMENTO;
            REPAROS DE FORNO MICROONDAS
        `
    });
    listaAssistencia[1][2][1194].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            COBERTURA PROVISÓRIA DE TELHADOS;
            HOSPEDAGEM;
            CAÇAMBA;
            LIMPEZA;
            GUARDA DA RESIDENCIA;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS
        `
    });
    listaAssistencia[1][2][1194].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK ATENDIMENTO MICRO;
            HELP DESK VIDEO GAME;
            HELP DESK SMART TV;
            HELP DESK TABLET;
            HELP DESK CELULAR OU SMARTPHONE;
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK EM MICRO RESIDENCIAL
        `
    });
    listaAssistencia[1][2][1194].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Alvenaria - 2 ANOS - Exclusive
    listaAssistencia[1][2][1200].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            ENCANADOR;
            MUDANÇA DE MOBILIÁRIO;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS AR CONDICIONADO;
            REPAROS DE FORNO MICROONDAS;
            CHAVEIRO COMUM;
            LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
            REPAROS DE TELEFONIA;
            ASSISTÊNCIA EM ANTENAS;
            DESINSETIZAÇÃO;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            INSTALACAO DE FECHADURA TRAVA TETRA;
            DESENTUPIMENTO;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            CAÇA VAZAMENTO;
            LAVADORA DE ROUPAS LAVA E SECA;
            BARRA DE APOIO;
            INSTALAÇÃO DE KIT FIXAÇÃO;
            INSTALAÇÃO DE VENTILADOR DE TETO;
            REPAROS EM GELADEIRA e FRIGOBAR;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            LIMPEZA E DESENTUPIMENTO DE CALHAS;
            DESCARTE SUSTENTAVEL;
            SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            ELETRICISTA;
            REPAROS DE CONGELADOR FREEZER;
            VIDRACEIRO
        `
    });
    listaAssistencia[1][2][1200].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            HOSPEDAGEM;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            GUARDA DA RESIDENCIA;
            COBERTURA PROVISÓRIA DE TELHADOS;
            LIMPEZA;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            CAÇAMBA        
        `
    });
    listaAssistencia[1][2][1200].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK ATENDIMENTO MICRO;
            HELP DESK SMART TV;
            HELP DESK TABLET;
            HELP DESK VIDEO GAME;
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK CELULAR OU SMARTPHONE
        `
    });
    listaAssistencia[1][2][1200].push({
        titulo: 'SERVICOS DE BICICLETA',
        assistencias: `ASSISTENCIA A BIKE`
    });
    listaAssistencia[1][2][1200].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Apartamento - 2 ANOS - Essencial
    listaAssistencia[2][2][1193].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            REPAROS DE FORNO MICROONDAS;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS DE TELEFONIA;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS DE CONGELADOR FREEZER;
            VIDRACEIRO;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            CHAVEIRO COMUM;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            LAVADORA DE ROUPAS LAVA E SECA;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            ENCANADOR;
            ELETRICISTA;
            REPAROS EM GELADEIRA e FRIGOBAR
        `
    });
    listaAssistencia[2][2][1193].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            LIMPEZA;
            HOSPEDAGEM;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            CAÇAMBA
        `
    });

    //Apartamento - 2 ANOS - Conforto
    listaAssistencia[2][2][1195].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            DESENTUPIMENTO;
            REPAROS DE TELEFONIA;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            REPAROS DE FORNO MICROONDAS;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            ELETRICISTA;
            REPAROS AR CONDICIONADO;
            LAVADORA DE ROUPAS LAVA E SECA;
            VIDRACEIRO;
            REPAROS DE CONGELADOR FREEZER;
            CHAVEIRO COMUM;
            ENCANADOR;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS EM GELADEIRA e FRIGOBAR;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE
        `
    });
    listaAssistencia[2][2][1195].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            HOSPEDAGEM;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            CAÇAMBA;
            LIMPEZA
        `
    });
    listaAssistencia[2][2][1195].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK EM MICRO RESIDENCIAL;
            HELP DESK ATENDIMENTO MICRO;
            HELP DESK SMART TV;
            HELP DESK TABLET;
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK CELULAR OU SMARTPHONE;
            HELP DESK VIDEO GAME
        `
    });
    listaAssistencia[2][2][1195].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Apartamento - 2 ANOS - Exclusive
    listaAssistencia[2][2][1201].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            MUDANÇA DE MOBILIÁRIO;
            BARRA DE APOIO;
            INSTALAÇÃO DE KIT FIXAÇÃO;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            CAÇA VAZAMENTO;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            LAVADORA DE ROUPAS LAVA E SECA;
            ENCANADOR;
            REPAROS AR CONDICIONADO;
            INSTALAÇÃO DE VENTILADOR DE TETO;
            ASSISTÊNCIA EM ANTENAS;
            REPAROS DE CONGELADOR FREEZER;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            REPAROS DE FORNO MICROONDAS;
            INSTALACAO DE FECHADURA TRAVA TETRA;
            REPAROS EM GELADEIRA e FRIGOBAR;
            DESINSETIZAÇÃO;
            REPAROS DE TELEFONIA;
            DESCARTE SUSTENTAVEL;
            ELETRICISTA;
            DESENTUPIMENTO;
            VIDRACEIRO;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            CHAVEIRO COMUM
        `
    });
    listaAssistencia[2][2][1201].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            HOSPEDAGEM;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            CAÇAMBA;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            LIMPEZA
        `
    });
    listaAssistencia[2][2][1201].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK VIDEO GAME;
            HELP DESK SMART TV;
            HELP DESK ATENDIMENTO MICRO;
            HELP DESK TABLET;
            HELP DESK CELULAR OU SMARTPHONE;
            HELP DESK EQUIPAMENTO APPLE
        `
    });
    listaAssistencia[2][2][1201].push({
        titulo: 'SERVICOS DE BICICLETA',
        assistencias: `ASSISTENCIA A BIKE`
    });
    listaAssistencia[2][2][1201].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Madeira Urbana - 2 ANOS - Essencial
    listaAssistencia[3][2][1192].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            REPAROS DE FORNO MICROONDAS;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            ENCANADOR;
            CHAVEIRO COMUM;
            REPAROS DE TELEFONIA;
            REPAROS EM GELADEIRA e FRIGOBAR;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            LAVADORA DE ROUPAS LAVA E SECA;
            VIDRACEIRO;
            ELETRICISTA;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            REPAROS DE CONGELADOR FREEZER
        `
    });
    listaAssistencia[3][2][1192].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            CAÇAMBA;
            GUARDA DA RESIDENCIA;
            HOSPEDAGEM;
            LIMPEZA;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            COBERTURA PROVISÓRIA DE TELHADOS;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS
        `
    });
    
    //Casa Madeira Urbana - 2 ANOS - Conforto
    listaAssistencia[3][2][1194].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            CHAVEIRO COMUM;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            REPAROS DE CONGELADOR FREEZER;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            ELETRICISTA;
            REPAROS DE TELEFONIA;
            REPAROS EM GELADEIRA e FRIGOBAR;
            VIDRACEIRO;
            ENCANADOR;
            REPAROS AR CONDICIONADO;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            REVERSÃO DE GÁS PARA FOGÃO;
            LAVADORA DE ROUPAS LAVA E SECA;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            DESENTUPIMENTO;
            REPAROS DE FORNO MICROONDAS
        `
    });
    listaAssistencia[3][2][1194].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            COBERTURA PROVISÓRIA DE TELHADOS;
            HOSPEDAGEM;
            CAÇAMBA;
            LIMPEZA;
            GUARDA DA RESIDENCIA;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS
        `
    });
    listaAssistencia[3][2][1194].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK ATENDIMENTO MICRO;
            HELP DESK VIDEO GAME;
            HELP DESK SMART TV;
            HELP DESK TABLET;
            HELP DESK CELULAR OU SMARTPHONE;
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK EM MICRO RESIDENCIAL;
        `
    });
    listaAssistencia[3][2][1194].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });
    
    //Casa Madeira Urbana - 2 ANOS - Exclusive
    listaAssistencia[3][2][1200].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            ENCANADOR;
            MUDANÇA DE MOBILIÁRIO;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS AR CONDICIONADO;
            REPAROS DE FORNO MICROONDAS;
            CHAVEIRO COMUM;
            LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
            REPAROS DE TELEFONIA;
            ASSISTÊNCIA EM ANTENAS;
            DESINSETIZAÇÃO;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            INSTALACAO DE FECHADURA TRAVA TETRA;
            DESENTUPIMENTO;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            CAÇA VAZAMENTO;
            LAVADORA DE ROUPAS LAVA E SECA;
            BARRA DE APOIO;
            INSTALAÇÃO DE KIT FIXAÇÃO;
            INSTALAÇÃO DE VENTILADOR DE TETO;
            REPAROS EM GELADEIRA e FRIGOBAR;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            LIMPEZA E DESENTUPIMENTO DE CALHAS;
            DESCARTE SUSTENTAVEL;
            SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            ELETRICISTA;
            REPAROS DE CONGELADOR FREEZER;
            VIDRACEIRO
        `
    });
    listaAssistencia[3][2][1200].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            HOSPEDAGEM;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            GUARDA DA RESIDENCIA;
            COBERTURA PROVISÓRIA DE TELHADOS;
            LIMPEZA;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            CAÇAMBA
        `
    });
    listaAssistencia[3][2][1200].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK ATENDIMENTO MICRO;
            HELP DESK SMART TV;
            HELP DESK TABLET;
            HELP DESK VIDEO GAME;
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK CELULAR OU SMARTPHONE
        `   
    });
    listaAssistencia[3][2][1200].push({
        titulo: 'SERVICOS DE BICICLETA',
        assistencias: `ASSISTENCIA A BIKE`
    });
    listaAssistencia[3][2][1200].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Alvenaria - 3 ANOS - Essencial
    listaAssistencia[1][3][1206].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS EM GELADEIRA e FRIGOBAR;
            LAVADORA DE ROUPAS LAVA E SECA;
            REPAROS DE FORNO MICROONDAS;
            VIDRACEIRO;
            REPAROS DE CONGELADOR FREEZER;
            ENCANADOR;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            CHAVEIRO COMUM;
            ELETRICISTA;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR
        `
    });
    listaAssistencia[1][3][1206].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            CUIDADOR DE CRIANÇAS E IDOSOS;
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            CAÇAMBA;
            LIMPEZA;
            COBERTURA PROVISÓRIA DE TELHADOS;
            GUARDA DA RESIDENCIA;
            HOSPEDAGEM
        `
    });
    
    //Casa Alvenaria - 3 ANOS - Conforto
    listaAssistencia[1][3][1208].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
            REPAROS DE CONGELADOR FREEZER;
            ENCANADOR;
            CHAVEIRO COMUM;
            ELETRICISTA;
            REPARO MÁQUINA DE LAVAR ROUPA;
            REPAROS DE TELEFONIA;
            VIDRACEIRO;
            REPAROS DE FORNO MICROONDAS;
            REPAROS DE MÁQUINA DE SECAR ROUPA;
            REVERSÃO DE GÁS PARA FOGÃO;
            REPAROS EM GELADEIRA e FRIGOBAR;
            LAVADORA DE ROUPAS LAVA E SECA;
            REPAROS DE MÁQUINA DE LAVAR LOUÇA;
            REPAROS EM DEPURADOR E EXAUSTOR DE AR;
            DESENTUPIMENTO;
            REPAROS AR CONDICIONADO;
            REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
            REPAROS EM GELADEIRA MODELO SIDE BY SIDE
        `
    });
    listaAssistencia[1][3][1208].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
            HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
            HOSPEDAGEM;
            LIMPEZA;
            CUIDADOR DE CRIANÇAS E IDOSOS;
            COBERTURA PROVISÓRIA DE TELHADOS;
            CAÇAMBA;
            GUARDA DA RESIDENCIA
        `
    });
    listaAssistencia[1][3][1208].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
            HELP DESK EQUIPAMENTO APPLE;
            HELP DESK SMART TV;
            HELP DESK VIDEO GAME;
            HELP DESK ATENDIMENTO MICRO;
            HELP DESK EM MICRO RESIDENCIAL;
            HELP DESK TABLET;
            HELP DESK CELULAR OU SMARTPHONE
        `
    });
    listaAssistencia[1][3][1208].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Alvenaria - 3 ANOS - Exclusive
    listaAssistencia[1][3][1215].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS DE CONGELADOR FREEZER;
        INSTALACAO DE FECHADURA TRAVA TETRA;
        DESCARTE SUSTENTAVEL;
        DESENTUPIMENTO;
        CHAVEIRO COMUM;
        ENCANADOR;
        INSTALAÇÃO DE KIT FIXAÇÃO;
        INSTALAÇÃO DE VENTILADOR DE TETO;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        DESINSETIZAÇÃO;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        VIDRACEIRO;
        BARRA DE APOIO;
        REPAROS DE FORNO MICROONDAS;
        LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
        REPAROS AR CONDICIONADO;
        ASSISTÊNCIA EM ANTENAS;
        ELETRICISTA;
        MUDANÇA DE MOBILIÁRIO;
        LAVADORA DE ROUPAS LAVA E SECA;
        LIMPEZA E DESENTUPIMENTO DE CALHAS;
        REPAROS DE TELEFONIA;
        REPARO MÁQUINA DE LAVAR ROUPA;
        SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR
        `
    });
    listaAssistencia[1][3][1215].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        CAÇAMBA;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        GUARDA DA RESIDENCIA;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        COBERTURA PROVISÓRIA DE TELHADOS;
        HOSPEDAGEM;
        LIMPEZA
        `
    });
    listaAssistencia[1][3][1215].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
        HELP DESK VIDEO GAME;
        HELP DESK ATENDIMENTO MICRO;
        HELP DESK SMART TV;
        HELP DESK CELULAR OU SMARTPHONE;
        HELP DESK TABLET;
        HELP DESK EQUIPAMENTO APPLE
        `
    });
    listaAssistencia[1][3][1215].push({
        titulo: 'SERVICOS DE BICICLETA',
        assistencias: `ASSISTENCIA A BIKE`
    });
    listaAssistencia[1][3][1215].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Apartamento - 3 ANOS - Essencial
    listaAssistencia[2][3][1207].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS EM GELADEIRA e FRIGOBAR;
        ENCANADOR;
        REPARO MÁQUINA DE LAVAR ROUPA;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS DE CONGELADOR FREEZER;
        ELETRICISTA;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPAROS DE FORNO MICROONDAS;
        CHAVEIRO COMUM;
        REPAROS DE TELEFONIA;
        LAVADORA DE ROUPAS LAVA E SECA
        `
    });
    listaAssistencia[2][3][1207].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        CUIDADOR DE CRIANÇAS E IDOSOS;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        CAÇAMBA;
        LIMPEZA;
        HOSPEDAGEM
        `   
    });

    //Apartamento - 3 ANOS - Conforto
    listaAssistencia[2][3][1209].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        ELETRICISTA;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPAROS DE TELEFONIA;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        ENCANADOR;
        VIDRACEIRO;
        REPAROS AR CONDICIONADO;
        REPAROS DE CONGELADOR FREEZER;
        CHAVEIRO COMUM;
        DESENTUPIMENTO;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPARO MÁQUINA DE LAVAR ROUPA;
        LAVADORA DE ROUPAS LAVA E SECA;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS DE FORNO MICROONDAS
        `
    });
    listaAssistencia[2][3][1209].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        HOSPEDAGEM;
        CAÇAMBA;
        LIMPEZA;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS
        `
    });
    listaAssistencia[2][3][1209].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
        HELP DESK TABLET;
        HELP DESK ATENDIMENTO MICRO;
        HELP DESK CELULAR OU SMARTPHONE;
        HELP DESK EQUIPAMENTO APPLE;
        HELP DESK SMART TV;
        HELP DESK VIDEO GAME
        `
    });
    listaAssistencia[2][3][1209].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Apartamento - 3 ANOS - Exclusive
    listaAssistencia[2][3][1217].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPARO MÁQUINA DE LAVAR ROUPA;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        DESCARTE SUSTENTAVEL;
        DESINSETIZAÇÃO;
        INSTALACAO DE FECHADURA TRAVA TETRA;
        MUDANÇA DE MOBILIÁRIO;
        REPAROS AR CONDICIONADO;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        DESENTUPIMENTO;
        CHAVEIRO COMUM;
        BARRA DE APOIO;
        INSTALAÇÃO DE VENTILADOR DE TETO;
        ELETRICISTA;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        VIDRACEIRO;
        REPAROS EM GELADEIRA e FRIGOBAR;
        ASSISTÊNCIA EM ANTENAS;
        REPAROS DE CONGELADOR FREEZER;
        REPAROS DE TELEFONIA;
        INSTALAÇÃO DE KIT FIXAÇÃO;
        CAÇA VAZAMENTO;
        ENCANADOR;
        REPAROS DE FORNO MICROONDAS
        `
    });
    listaAssistencia[2][3][1217].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        CAÇAMBA;
        LIMPEZA;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        HOSPEDAGEM;
        CUIDADOR DE CRIANÇAS E IDOSOS
        `
    });
    listaAssistencia[2][3][1217].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
        HELP DESK ATENDIMENTO MICRO;
        HELP DESK SMART TV;
        HELP DESK TABLET;
        HELP DESK EQUIPAMENTO APPLE;
        HELP DESK CELULAR OU SMARTPHONE;
        HELP DESK VIDEO GAME
        `
    });
    listaAssistencia[2][3][1217].push({
        titulo: 'SERVICOS DE BICICLETA',
        assistencias: `ASSISTENCIA A BIKE`
    });
    listaAssistencia[2][3][1217].push({
        titulo: 'PET RESIDENCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Madeira - 3 ANOS - Essencial
    listaAssistencia[3][3][1206].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPARO MÁQUINA DE LAVAR ROUPA;
        REPAROS EM GELADEIRA e FRIGOBAR;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPAROS DE FORNO MICROONDAS;
        VIDRACEIRO;
        REPAROS DE CONGELADOR FREEZER;
        ENCANADOR;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        CHAVEIRO COMUM;
        ELETRICISTA;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR
        `
    });
    listaAssistencia[3][3][1206].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        CUIDADOR DE CRIANÇAS E IDOSOS;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        CAÇAMBA;
        LIMPEZA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        GUARDA DA RESIDENCIA;
        HOSPEDAGEM
        `
    });

    //Casa Madeira - 3 ANOS - Conforto
    listaAssistencia[3][3][1208].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS DE CONGELADOR FREEZER;
        ENCANADOR;
        CHAVEIRO COMUM;
        ELETRICISTA;
        REPARO MÁQUINA DE LAVAR ROUPA;
        REPAROS DE TELEFONIA;
        VIDRACEIRO;
        REPAROS DE FORNO MICROONDAS;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS EM GELADEIRA e FRIGOBAR;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        DESENTUPIMENTO;
        REPAROS AR CONDICIONADO;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE
        `
    });
    listaAssistencia[3][3][1208].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        HOSPEDAGEM;
        LIMPEZA;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        COBERTURA PROVISÓRIA DE TELHADOS;
        CAÇAMBA;
        GUARDA DA RESIDENCIA
        `
    });
    listaAssistencia[3][3][1208].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
        HELP DESK EQUIPAMENTO APPLE;
        HELP DESK SMART TV;
        HELP DESK VIDEO GAME;
        HELP DESK ATENDIMENTO MICRO;
        HELP DESK EM MICRO RESIDENCIAL;
        HELP DESK TABLET;
        HELP DESK CELULAR OU SMARTPHONE
        `
    });
    listaAssistencia[3][3][1208].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Madeira - 3 ANOS - Exclusive
    listaAssistencia[3][3][1215].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS DE CONGELADOR FREEZER;
        INSTALACAO DE FECHADURA TRAVA TETRA;
        DESCARTE SUSTENTAVEL;
        DESENTUPIMENTO;
        CHAVEIRO COMUM;
        ENCANADOR;
        INSTALAÇÃO DE KIT FIXAÇÃO;
        INSTALAÇÃO DE VENTILADOR DE TETO;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        DESINSETIZAÇÃO;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        VIDRACEIRO;
        BARRA DE APOIO;
        REPAROS DE FORNO MICROONDAS;
        LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
        REPAROS AR CONDICIONADO;
        ASSISTÊNCIA EM ANTENAS;
        ELETRICISTA;
        MUDANÇA DE MOBILIÁRIO;
        LAVADORA DE ROUPAS LAVA E SECA;
        LIMPEZA E DESENTUPIMENTO DE CALHAS;
        REPAROS DE TELEFONIA;
        REPARO MÁQUINA DE LAVAR ROUPA;
        SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR
        `
    });
    listaAssistencia[3][3][1215].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        CAÇAMBA;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        GUARDA DA RESIDENCIA;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        COBERTURA PROVISÓRIA DE TELHADOS;
        HOSPEDAGEM;
        LIMPEZA
        `
    });
    listaAssistencia[3][3][1215].push({
        titulo: 'SERVIÇOS DE HELP DESK TELEFONICO',
        assistencias: `
        HELP DESK VIDEO GAME;
        HELP DESK ATENDIMENTO MICRO;
        HELP DESK SMART TV;
        HELP DESK CELULAR OU SMARTPHONE;
        HELP DESK TABLET;
        HELP DESK EQUIPAMENTO APPLE
        `
    });
    listaAssistencia[3][3][1215].push({
        titulo: 'SERVICOS DE BICICLETA',
        assistencias: `ASSISTENCIA A BIKE`
    });
    listaAssistencia[3][3][1215].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //VERANEIO
    //Casa Madeira Rural - 1 ANO - Essencial
    listaAssistencia[8][1][576].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        ELETRICISTA;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS DE CONGELADOR FREEZER;
        CHECKUP VERANEIO;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPARO MÁQUINA DE LAVAR ROUPA;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPAROS EM GELADEIRA e FRIGOBAR;
        CHAVEIRO COMUM;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        ENCANADOR;
        REPAROS DE FORNO MICROONDAS
        `
    });
    listaAssistencia[8][1][576].push({
        titulo: '',
        assistencias: `
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        GUARDA DA RESIDENCIA;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        CAÇAMBA;
        HOSPEDAGEM;
        LIMPEZA;
        COBERTURA PROVISÓRIA DE TELHADOS
        `
    });

    //Casa Madeira Rural - 1 ANO - Conforto
    listaAssistencia[8][1][582].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        CHECKUP VERANEIO;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS EM GELADEIRA e FRIGOBAR;
        ENCANADOR;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        REPAROS DE CONGELADOR FREEZER;
        ELETRICISTA;
        REPAROS DE FORNO MICROONDAS;
        CHAVEIRO COMUM;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPARO MÁQUINA DE LAVAR ROUPA;
        DESENTUPIMENTO;
        REPAROS AR CONDICIONADO
        `
    });
    listaAssistencia[8][1][582].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        CAÇAMBA;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        LIMPEZA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        HOSPEDAGEM;
        GUARDA DA RESIDENCIA
        `
    });
    listaAssistencia[8][1][582].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Madeira Rural - 1 ANO - Exclusive
    listaAssistencia[8][1][501].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        INSTALAÇÃO DE VENTILADOR DE TETO;
        ELETRICISTA;
        REPARO MÁQUINA DE LAVAR ROUPA;
        DESCARTE SUSTENTAVEL;
        DESENTUPIMENTO;
        INSTALACAO DE FECHADURA TRAVA TETRA;
        LAVADORA DE ROUPAS LAVA E SECA;
        CHECKUP VERANEIO;
        INSTALAÇÃO DE KIT FIXAÇÃO;
        BARRA DE APOIO;
        REPAROS DE FORNO MICROONDAS;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        ENCANADOR;
        REPAROS DE CONGELADOR FREEZER;
        SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS;
        CHAVEIRO COMUM;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        MUDANÇA DE MOBILIÁRIO;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPAROS AR CONDICIONADO
        `
    });
    listaAssistencia[8][1][501].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        CAÇAMBA;
        HOSPEDAGEM;
        LIMPEZA;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        GUARDA DA RESIDENCIA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS
        `
    });
    listaAssistencia[8][1][501].push({
        titulo: 'PET RESIDENCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Chacara - 1 ANOS - Essencial
    listaAssistencia[4][1][576].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        ELETRICISTA;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS DE CONGELADOR FREEZER;
        CHECKUP VERANEIO;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPARO MÁQUINA DE LAVAR ROUPA;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPAROS EM GELADEIRA e FRIGOBAR;
        CHAVEIRO COMUM;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        ENCANADOR;
        REPAROS DE FORNO MICROONDAS
        `
    });
    listaAssistencia[4][1][576].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        GUARDA DA RESIDENCIA;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        CAÇAMBA;
        HOSPEDAGEM;
        LIMPEZA;
        COBERTURA PROVISÓRIA DE TELHADOS
        `
    });

    //Chacara - 1 ANOS - Conforto
    listaAssistencia[4][1][582].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        CHECKUP VERANEIO;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS EM GELADEIRA e FRIGOBAR;
        ENCANADOR;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        REPAROS DE CONGELADOR FREEZER;
        ELETRICISTA;
        REPAROS DE FORNO MICROONDAS;
        CHAVEIRO COMUM;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPARO MÁQUINA DE LAVAR ROUPA;
        DESENTUPIMENTO;
        REPAROS AR CONDICIONADO
        `
    });
    listaAssistencia[4][1][582].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        CAÇAMBA;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        LIMPEZA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        HOSPEDAGEM;
        GUARDA DA RESIDENCIA
        `
    });
    listaAssistencia[4][1][582].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Chacara - 1 ANOS - Exclusive
    listaAssistencia[4][1][501].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        INSTALAÇÃO DE VENTILADOR DE TETO;
        ELETRICISTA;
        REPARO MÁQUINA DE LAVAR ROUPA;
        DESCARTE SUSTENTAVEL;
        DESENTUPIMENTO;
        INSTALACAO DE FECHADURA TRAVA TETRA;
        LAVADORA DE ROUPAS LAVA E SECA;
        CHECKUP VERANEIO;
        INSTALAÇÃO DE KIT FIXAÇÃO;
        BARRA DE APOIO;
        REPAROS DE FORNO MICROONDAS;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        ENCANADOR;
        REPAROS DE CONGELADOR FREEZER;
        SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS;
        CHAVEIRO COMUM;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        MUDANÇA DE MOBILIÁRIO;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPAROS AR CONDICIONADO
        `
    });
    listaAssistencia[4][1][501].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        CAÇAMBA;
        HOSPEDAGEM;
        LIMPEZA;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        GUARDA DA RESIDENCIA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS
        `
    });
    listaAssistencia[4][1][501].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Madeira Rural - 2 ANOS - Essencial
    listaAssistencia[8][2][1237].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        ELETRICISTA;
        CHAVEIRO COMUM;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPAROS DE CONGELADOR FREEZER;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        ENCANADOR;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        CHECKUP VERANEIO;
        REPAROS DE FORNO MICROONDAS;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPARO MÁQUINA DE LAVAR ROUPA;
        `
    });
    listaAssistencia[8][2][1237].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        GUARDA DA RESIDENCIA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        CAÇAMBA;
        HOSPEDAGEM;
        LIMPEZA;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        `
    });

    //Casa Madeira Rural - 2 ANOS - Conforto
    listaAssistencia[8][2][1239].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS DE FORNO MICROONDAS;
        ENCANADOR;
        ELETRICISTA;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        CHECKUP VERANEIO;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPARO MÁQUINA DE LAVAR ROUPA;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPAROS DE CONGELADOR FREEZER;
        REPAROS AR CONDICIONADO;
        CHAVEIRO COMUM;
        DESENTUPIMENTO;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        `
    });
    listaAssistencia[8][2][1239].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        HOSPEDAGEM;
        LIMPEZA;
        CAÇAMBA;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        `
    });
    listaAssistencia[8][2][1239].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Madeira Rural - 2 ANOS - Exclusive
    listaAssistencia[8][2][1248].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        INSTALACAO DE FECHADURA TRAVA TETRA;
        LAVADORA DE ROUPAS LAVA E SECA;
        SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS;
        INSTALAÇÃO DE KIT FIXAÇÃO;
        LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
        MUDANÇA DE MOBILIÁRIO;
        ENCANADOR;
        REPAROS DE FORNO MICROONDAS;
        DESENTUPIMENTO;
        REPAROS AR CONDICIONADO;
        REPAROS DE CONGELADOR FREEZER;
        CHECKUP VERANEIO;
        BARRA DE APOIO;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPARO MÁQUINA DE LAVAR ROUPA;
        INSTALAÇÃO DE VENTILADOR DE TETO;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        CHAVEIRO COMUM;
        DESCARTE SUSTENTAVEL;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        ELETRICISTA;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR
        `
    });
    listaAssistencia[8][2][1248].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        HOSPEDAGEM;
        LIMPEZA;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        GUARDA DA RESIDENCIA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        CAÇAMBA
        `
    });
    listaAssistencia[8][2][1248].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Chacara - 2 ANOS - Essencial
    listaAssistencia[4][2][1237].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        ELETRICISTA;
        CHAVEIRO COMUM;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPAROS DE CONGELADOR FREEZER;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        ENCANADOR;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        CHECKUP VERANEIO;
        REPAROS DE FORNO MICROONDAS;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPARO MÁQUINA DE LAVAR ROUPA
        `
    });
    listaAssistencia[4][2][1237].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        GUARDA DA RESIDENCIA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        CAÇAMBA;
        HOSPEDAGEM;
        LIMPEZA;
        CUIDADOR DE CRIANÇAS E IDOSOS
        `
    });

    //Chacara - 2 ANOS - Conforto
    listaAssistencia[4][2][1239].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS DE FORNO MICROONDAS;
        ENCANADOR;
        ELETRICISTA;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        CHECKUP VERANEIO;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPARO MÁQUINA DE LAVAR ROUPA;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REPAROS DE CONGELADOR FREEZER;
        REPAROS AR CONDICIONADO;
        CHAVEIRO COMUM;
        DESENTUPIMENTO;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS
        `
    });
    listaAssistencia[4][2][1239].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        HOSPEDAGEM;
        LIMPEZA;
        CAÇAMBA;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        CUIDADOR DE CRIANÇAS E IDOSOS
        `
    });
    listaAssistencia[4][2][1239].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Chacara - 2 ANOS - Exclusive
    listaAssistencia[4][2][1248].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        INSTALACAO DE FECHADURA TRAVA TETRA;
        LAVADORA DE ROUPAS LAVA E SECA;
        SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS;
        INSTALAÇÃO DE KIT FIXAÇÃO;
        LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
        MUDANÇA DE MOBILIÁRIO;
        ENCANADOR;
        REPAROS DE FORNO MICROONDAS;
        DESENTUPIMENTO;
        REPAROS AR CONDICIONADO;
        REPAROS DE CONGELADOR FREEZER;
        CHECKUP VERANEIO;
        BARRA DE APOIO;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPARO MÁQUINA DE LAVAR ROUPA;
        INSTALAÇÃO DE VENTILADOR DE TETO;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        CHAVEIRO COMUM;
        DESCARTE SUSTENTAVEL;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        ELETRICISTA;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR
        `
    });
    listaAssistencia[4][2][1248].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        HOSPEDAGEM;
        LIMPEZA;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        GUARDA DA RESIDENCIA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        CAÇAMBA
        `
    });
    listaAssistencia[4][2][1248].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Madeira Rural - 3 ANOS - Essencial
    listaAssistencia[8][3][1257].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS DE CONGELADOR FREEZER;
        CHECKUP VERANEIO;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        LAVADORA DE ROUPAS LAVA E SECA;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        ENCANADOR;
        REPARO MÁQUINA DE LAVAR ROUPA;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        REPAROS DE FORNO MICROONDAS;
        ELETRICISTA;
        CHAVEIRO COMUM;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPAROS DE MÁQUINA DE SECAR ROUPA
        `
    });
    listaAssistencia[8][3][1257].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        CUIDADOR DE CRIANÇAS E IDOSOS;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        CAÇAMBA;
        LIMPEZA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        GUARDA DA RESIDENCIA;
        HOSPEDAGEM
        `
    });

    //Casa Madeira Rural - 3 ANOS - Conforto
    listaAssistencia[8][3][1259].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        DESENTUPIMENTO;
        REPAROS DE FORNO MICROONDAS;
        CHAVEIRO COMUM;
        REPAROS DE CONGELADOR FREEZER;
        CHECKUP VERANEIO;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        ENCANADOR;
        REPARO MÁQUINA DE LAVAR ROUPA;
        ELETRICISTA;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPAROS AR CONDICIONADO;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS DE MÁQUINA DE SECAR ROUPA
        `
    });
    listaAssistencia[8][3][1259].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        LIMPEZA;
        GUARDA DA RESIDENCIA;
        CAÇAMBA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        HOSPEDAGEM
        `
    });
    listaAssistencia[8][3][1259].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Casa Madeira Rural - 3 ANOS - Exclusive
    listaAssistencia[8][3][1267].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        CHAVEIRO COMUM;
        INSTALAÇÃO DE KIT FIXAÇÃO;
        INSTALACAO DE FECHADURA TRAVA TETRA;
        CHECKUP VERANEIO;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS DE CONGELADOR FREEZER;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        INSTALAÇÃO DE VENTILADOR DE TETO;
        ENCANADOR;
        DESENTUPIMENTO;
        LAVADORA DE ROUPAS LAVA E SECA;
        SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        DESCARTE SUSTENTAVEL;
        LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
        REPARO MÁQUINA DE LAVAR ROUPA;
        REPAROS DE FORNO MICROONDAS;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        BARRA DE APOIO;
        ELETRICISTA;
        REPAROS EM GELADEIRA e FRIGOBAR;
        MUDANÇA DE MOBILIÁRIO;
        REPAROS AR CONDICIONADO
        `
    });
    listaAssistencia[8][3][1267].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        LIMPEZA;
        CAÇAMBA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        HOSPEDAGEM;
        GUARDA DA RESIDENCIA
        `
    });
    listaAssistencia[8][3][1267].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Chacara - 3 ANOS - Essencial
    listaAssistencia[4][3][1257].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        REPAROS DE CONGELADOR FREEZER;
        CHECKUP VERANEIO;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        LAVADORA DE ROUPAS LAVA E SECA;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        ENCANADOR;
        REPARO MÁQUINA DE LAVAR ROUPA;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        REPAROS DE FORNO MICROONDAS;
        ELETRICISTA;
        CHAVEIRO COMUM;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPAROS DE MÁQUINA DE SECAR ROUPA
        `
    });
    listaAssistencia[4][3][1257].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        CUIDADOR DE CRIANÇAS E IDOSOS;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        CAÇAMBA;
        LIMPEZA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        GUARDA DA RESIDENCIA;
        HOSPEDAGEM
        `
    });

    //Chacara - 3 ANOS - Conforto
    listaAssistencia[4][3][1259].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        DESENTUPIMENTO;
        REPAROS DE FORNO MICROONDAS;
        CHAVEIRO COMUM;
        REPAROS DE CONGELADOR FREEZER;
        CHECKUP VERANEIO;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        ENCANADOR;
        REPARO MÁQUINA DE LAVAR ROUPA;
        ELETRICISTA;
        REPAROS EM GELADEIRA e FRIGOBAR;
        REPAROS AR CONDICIONADO;
        LAVADORA DE ROUPAS LAVA E SECA;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        REPAROS DE MÁQUINA DE SECAR ROUPA
        `
    });
    listaAssistencia[4][3][1259].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        LIMPEZA;
        GUARDA DA RESIDENCIA;
        CAÇAMBA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        HOSPEDAGEM
        `
    });
    listaAssistencia[4][3][1259].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    //Chacara - 3 ANOS - Exclusive
    listaAssistencia[4][3][1267].push({
        titulo: 'SERVIÇOS EMERGENCIAIS',
        assistencias: `
        CHAVEIRO COMUM;
        INSTALAÇÃO DE KIT FIXAÇÃO;
        INSTALACAO DE FECHADURA TRAVA TETRA;
        CHECKUP VERANEIO;
        REPAROS DE MÁQUINA DE SECAR ROUPA;
        REVERSÃO DE GÁS PARA FOGÃO;
        REPAROS DE CONGELADOR FREEZER;
        REPAROS DE MÁQUINA DE LAVAR LOUÇA;
        REPAROS DE FOGÃO, COOK TOP E FORNO, A GÁS;
        INSTALAÇÃO DE VENTILADOR DE TETO;
        ENCANADOR;
        DESENTUPIMENTO;
        LAVADORA DE ROUPAS LAVA E SECA;
        SUBSTITUIÇÃO DE TELHAS E CUMEEIRAS;
        REPAROS EM GELADEIRA MODELO SIDE BY SIDE;
        DESCARTE SUSTENTAVEL;
        LIMPEZA CAIXA DE ÁGUA ATÉ 4000L;
        REPARO MÁQUINA DE LAVAR ROUPA;
        REPAROS DE FORNO MICROONDAS;
        REPAROS EM DEPURADOR E EXAUSTOR DE AR;
        BARRA DE APOIO;
        ELETRICISTA;
        REPAROS EM GELADEIRA e FRIGOBAR;
        MUDANÇA DE MOBILIÁRIO;
        REPAROS AR CONDICIONADO
        `
    });
    listaAssistencia[4][3][1267].push({
        titulo: 'SERVIÇOS DE SINISTRO',
        assistencias: `
        HOSPEDAGEM DE ANIMAIS DOMÉSTICOS;
        LIMPEZA;
        CAÇAMBA;
        COBERTURA PROVISÓRIA DE TELHADOS;
        CUIDADOR DE CRIANÇAS E IDOSOS;
        HOSPEDAGEM;
        GUARDA DA RESIDENCIA
        `
    });
    listaAssistencia[4][3][1267].push({
        titulo: 'PET RESIDÊNCIA',
        assistencias: `PET RESIDÊNCIA`
    });

    if (!Array.isArray(listaAssistencia[residencia][vigencia][codAssistencia])){ return listaAssistencia[residencia][vigencia][codAssistencia]; }
    
    let arrayAssistencia = [];
    listaAssistencia[residencia][vigencia][codAssistencia].map((assistencia, index)=>{ 
        let listaString = assistencia.assistencias.replace(/\n/g, '');
        let listaArray = [assistencia.titulo];
        listaString = listaString.split(';');
        listaString.map((a)=>{ listaArray.push(a.trim()); });
        arrayAssistencia[index] = listaArray;
    });    
    
    return arrayAssistencia;
    //listaAssistencia[Residencia][Vigencia][CodigoAssistencia]
}
var assistencias = retornarAssistencia('habitual', 'essencial', 1, 1, 572);
console.log(assistencias);
        /*
        //Casa Alvenaria | Habitual | 1 ANO
        572: [],// Essencial
        505: [],// Conforto
        509: [],// Exclusive
        //Aparamento | Habitual | 1 ANO
        577: [],// Essencial
        580: [],// Conforto
        593: [],// Exclusive
        //Casa Madeira URBANA | Habitual | 1 ANO
        572: [],// Essencial
        505: [],// Conforto
        509: [],// Exclusive
        //Chácara | Veraneio | 1 ANO
        576: [],// Essencial
        582: [],// Conforto
        501: [],// Exclusive
        //Casa Madeira RURAL | Veraneio | 1 ANO 
        576: [],// Essencial
        582: [],// Conforto
        501: [],// Exclusive
        
        //-------------------------------------------//
        //Casa Alvenaria | Habitual | 2 ANO
        1192: [],// Essencial
        1194: [],// Conforto
        1200: [],// Exclusive
        //Aparamento | Habitual | 2 ANO
        1193: [],// Essencial
        1195: [],// Conforto
        1201: [],// Exclusive
        //Casa Madeira URBANA | Habitual | 2 ANO
        1192: [],// Essencial
        1194: [],// Conforto
        1200: [],// Exclusive
        //Chácara | Veraneio | 2 ANO
        1237: [],// Essencial
        1239: [],// Conforto
        1248: [],// Exclusive
        //Casa Madeira RURAL | Veraneio | 2 ANO 
        1237: [],// Essencial
        1239: [],// Conforto
        1248: [],// Exclusive
        
        //-------------------------------------------//
        //Casa Alvenaria | Habitual | 3 ANO
        1206: [],// Essencial
        1208: [],// Conforto
        1215: [],// Exclusive
        //Aparamento | Habitual | 3 ANO
        1207: [],// Essencial
        1209: [],// Conforto
        1217: [],// Exclusive
        //Casa Madeira URBANA | Habitual | 3 ANO
        1206: [],// Essencial
        1208: [],// Conforto
        1215: [],// Exclusive
        //Chácara | Veraneio | 3 ANO
        1257: [],// Essencial
        1259: [],// Conforto
        1267: [],// Exclusive
        //Casa Madeira RURAL | Veraneio | 3 ANO 
        1257: [],// Essencial
        1259: [],// Conforto
        1267: [],// Exclusive
        */
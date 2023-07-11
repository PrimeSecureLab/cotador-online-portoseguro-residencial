class CodigoServicos {
    constructor(){

    }
    listaServicosHabitual(plano, vigencia, residencia){
        vigencia = parseInt(vigencia);
        residencia = parseInt(residencia);
        
        let servicos = [];
        for(let i = 1; i <= 3; i++){ // Vigencias (1 ano, 2 anos, 3 anos)
            servicos[i] = [];
            for(let k = 1; k <= 8; k++){ // Tipo de residencia
                servicos[i][k] = [];
                for(let l = 1; l <= 3; l++){ // Plano (Essencial, Conforto, Exclusive)
                    servicos[i][k][l] = [];
                }
            } 
        }
        let codPlano = 0;
        if (plano.toString().toLowerCase() == 'essencial'){ codPlano = 1; }
        if (plano.toString().toLowerCase() == 'conforto'){ codPlano = 2; }
        if (plano.toString().toLowerCase() == 'exclusive'){ codPlano = 3; }

        // 1 ANO

        // CASA DE ALVENARIA
        servicos[1][1][1].push({cod: 572, desc: 'GRATUITO GERAL'});
        //servicos[1][1][2].push({cod: 506, desc: 'LIVRE ESCOLHA - GERAL'});
        //servicos[1][1][2].push({cod: 507, desc: 'GRATUITO CORRETOR - GERAL'});
        servicos[1][1][2].push({cod: 505, desc: 'REDE REFERENCIADA - GERAL'});
        servicos[1][1][3].push({cod: 509, desc: 'REDE REFERENCIADA GERAL'});
        //servicos[1][1][3].push({cod: 510, desc: 'LIVRE ESCOLHA - GERAL'});
        //servicos[1][1][3].push({cod: 511, desc: 'REDE REFERENCIADA CORRETOR GERAL'});

        // APARTAMENTO
        servicos[1][2][1].push({cod: 577, desc: 'GRATUITO APARTAMENTO'});
        //servicos[1][2][2].push({cod: 583, desc: 'LIVRE ESCOLHA - APARTAMENTO'});
        servicos[1][2][2].push({cod: 580, desc: 'REDE REFERENCIADA - APARTAMENTO'});
        //servicos[1][2][2].push({cod: 508, desc: 'GRATUITO CORRETOR - APARTAMENTO'});
        servicos[1][2][3].push({cod: 593, desc: 'REDE REFERENCIADA APARTAMENTO'});
        //servicos[1][2][3].push({cod: 630, desc: 'LIVRE ESCOLHA APARTAMENTO'});
        //servicos[1][2][3].push({cod: 615, desc: 'REDE REFERENCIADA CORRETOR APARTAMENTO'});

        // CASA DE MADEIRA (ZONA URBANA)
        servicos[1][3][1].push({cod: 572, desc: 'GRATUITO GERAL'});
        //servicos[1][3][2].push({cod: 506, desc: 'LIVRE ESCOLHA - GERAL'});
        //servicos[1][3][2].push({cod: 507, desc: 'GRATUITO CORRETOR - GERAL'});
        servicos[1][3][2].push({cod: 505, desc: 'REDE REFERENCIADA - GERAL'});
        servicos[1][3][3].push({cod: 509, desc: 'REDE REFERENCIADA GERAL'});
        //servicos[1][3][3].push({cod: 510, desc: 'LIVRE ESCOLHA - GERAL'});
        //servicos[1][3][3].push({cod: 511, desc: 'REDE REFERENCIADA CORRETOR GERAL'});

        // CHÁCARA, SÍTIO OU FAZENDA
        servicos[1][4][1].push({cod: 572, desc: 'GRATUITO GERAL'});
        //servicos[1][4][2].push({cod: 506, desc: 'LIVRE ESCOLHA - GERAL'});
        //servicos[1][4][2].push({cod: 507, desc: 'GRATUITO CORRETOR - GERAL'});
        servicos[1][4][2].push({cod: 505, desc: 'REDE REFERENCIADA - GERAL'});
        servicos[1][4][3].push({cod: 509, desc: 'REDE REFERENCIADA GERAL'});
        //servicos[1][4][3].push({cod: 510, desc: 'LIVRE ESCOLHA - GERAL'});
        //servicos[1][4][3].push({cod: 511, desc: 'REDE REFERENCIADA CORRETOR GERAL'});

        // CASA DE ALVENARIA DESOCUPADA
        servicos[1][5][1].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[1][5][2].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[1][5][3].push({cod: null, desc: 'SEM CÓDIGOS'});

        // APARTAMENTO DESOCUPADO
        servicos[1][6][1].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[1][6][2].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[1][6][3].push({cod: null, desc: 'SEM CÓDIGOS'});

        // CHÁCARA, SÍTIO OU FAZENDA DESOCUPADA
        servicos[1][7][1].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[1][7][2].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[1][7][3].push({cod: null, desc: 'SEM CÓDIGOS'});

        //CASA DE MADEIRA (ZONA RURAL)
        servicos[1][8][1].push({cod: 572, desc: 'GRATUITO GERAL'});
        //servicos[1][8][2].push({cod: 506, desc: 'LIVRE ESCOLHA - GERAL'});
        //servicos[1][8][2].push({cod: 507, desc: 'GRATUITO CORRETOR - GERAL'});
        servicos[1][8][2].push({cod: 505, desc: 'REDE REFERENCIADA - GERAL'});
        servicos[1][8][3].push({cod: 509, desc: 'REDE REFERENCIADA GERAL'});
        //servicos[1][8][3].push({cod: 510, desc: 'LIVRE ESCOLHA - GERAL'});
        //servicos[1][8][3].push({cod: 511, desc: 'REDE REFERENCIADA CORRETOR GERAL'});

        // 2 ANOS

        // CASA DE ALVENARIA
        servicos[2][1][1].push({cod: 1192, desc: 'Gratuito Geral - Plurianual 2 anos'});
        servicos[2][1][2].push({cod: 1194, desc: 'Rede Referenciada - Plurianual 2 anos'});
        //servicos[2][1][2].push({cod: 1196, desc: 'Livre Escolha - Res - Plurianual 2 anos'});
        //servicos[2][1][2].push({cod: 1198, desc: 'Gratuito Corretor - Res (Geral) - Plurianual 2 anos'});
        servicos[2][1][3].push({cod: 1200, desc: 'Rede Referenciada - Res - Plurianual 2 anos'});
        //servicos[2][1][3].push({cod: 1202, desc: 'Livre Escolha - Res - Plurianual 2 anos'});
        //servicos[2][1][3].push({cod: 1204, desc: 'Rede Referenciada Corretor Geral - Plurianual 2 anos'});

        // APARTAMENTO
        servicos[2][2][1].push({cod: 1193, desc: 'Apartamento - Plurianual 2 anos'});
        servicos[2][2][2].push({cod: 1195, desc: 'Rede Referenciada - Apartamento - Plurianual 2 anos'});
        //servicos[2][2][2].push({cod: 1197, desc: 'Livre Escolha (Apartamento) - Plurianual 2 anos'});
        //servicos[2][2][2].push({cod: 1199, desc: 'Gratuito Corretor - Res (Apartamento) - Plurianual 2 anos'});
        servicos[2][2][3].push({cod: 1201, desc: 'Rede Referenciada - Res (Apartamento) - Plurianual 2 anos'});
        //servicos[2][2][3].push({cod: 1203, desc: 'Livre Escolha - Res (Apartamento) - Plurianual 2 anos'});
        //servicos[2][2][3].push({cod: 1205, desc: 'Rede Referenciada Corretor Apartamento - Plurianual 2 anos'});

        // CASA DE MADEIRA (ZONA URBANA)
        servicos[2][3][1].push({cod: 1192, desc: 'Gratuito Geral - Plurianual 2 anos'});
        servicos[2][3][2].push({cod: 1194, desc: 'Rede Referenciada - Plurianual 2 anos'});
        //servicos[2][3][2].push({cod: 1196, desc: 'Livre Escolha - Res - Plurianual 2 anos'});
        //servicos[2][3][2].push({cod: 1198, desc: 'Gratuito Corretor - Res (Geral) - Plurianual 2 anos'});
        servicos[2][3][3].push({cod: 1200, desc: 'Rede Referenciada - Res - Plurianual 2 anos'});
        //servicos[2][3][3].push({cod: 1202, desc: 'Livre Escolha - Res - Plurianual 2 anos'});
        //servicos[2][3][3].push({cod: 1204, desc: 'Rede Referenciada Corretor Geral - Plurianual 2 anos'});

        // CHÁCARA, SÍTIO OU FAZENDA
        servicos[2][4][1].push({cod: 1192, desc: 'Gratuito Geral - Plurianual 2 anos'});
        servicos[2][4][2].push({cod: 1194, desc: 'Rede Referenciada - Plurianual 2 anos'});
        //servicos[2][4][2].push({cod: 1196, desc: 'Livre Escolha - Res - Plurianual 2 anos'});
        //servicos[2][4][2].push({cod: 1198, desc: 'Gratuito Corretor - Res (Geral) - Plurianual 2 anos'});
        servicos[2][4][3].push({cod: 1200, desc: 'Rede Referenciada - Res - Plurianual 2 anos'});
        //servicos[2][4][3].push({cod: 1202, desc: 'Livre Escolha - Res - Plurianual 2 anos'});
        //servicos[2][4][3].push({cod: 1204, desc: 'Rede Referenciada Corretor Geral - Plurianual 2 anos'});

        // CASA DE ALVENARIA DESOCUPADA
        servicos[2][5][1].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[2][5][2].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[2][5][3].push({cod: null, desc: 'SEM CÓDIGOS'});

        // APARTAMENTO DESOCUPADO
        servicos[2][6][1].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[2][6][2].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[2][6][3].push({cod: null, desc: 'SEM CÓDIGOS'});

        // CHÁCARA, SÍTIO OU FAZENDA DESOCUPADA
        servicos[2][7][1].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[2][7][2].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[2][7][3].push({cod: null, desc: 'SEM CÓDIGOS'});

        // CASA DE MADEIRA (ZONA URBANA)
        servicos[2][8][1].push({cod: 1192, desc: 'Gratuito Geral - Plurianual 2 anos'});
        servicos[2][8][2].push({cod: 1194, desc: 'Rede Referenciada - Plurianual 2 anos'});
        //servicos[2][8][2].push({cod: 1196, desc: 'Livre Escolha - Res - Plurianual 2 anos'});
        //servicos[2][8][2].push({cod: 1198, desc: 'Gratuito Corretor - Res (Geral) - Plurianual 2 anos'});
        servicos[2][8][3].push({cod: 1200, desc: 'Rede Referenciada - Res - Plurianual 2 anos'});
        //servicos[2][8][3].push({cod: 1202, desc: 'Livre Escolha - Res - Plurianual 2 anos'});
        //servicos[2][8][3].push({cod: 1204, desc: 'Rede Referenciada Corretor Geral - Plurianual 2 anos'});

        // 3 ANOS

        // CASA DE ALVENARIA
        servicos[3][1][1].push({cod: 1206, desc: 'Gratuito Geral - Plurianual 3 anos'});
        servicos[3][1][2].push({cod: 1208, desc: 'Rede Referenciada - Plurianual 3 anos'});
        //servicos[3][1][2].push({cod: 1210, desc: 'Livre Escolha - Res - Plurianual 3 anos'});
        //servicos[3][1][2].push({cod: 1212, desc: 'Gratuito Corretor - Res (Geral) - Plurianual 3 anos'});
        servicos[3][1][3].push({cod: 1215, desc: 'Rede Referenciada - Res - Plurianual 3 anos'});
        //servicos[3][1][3].push({cod: 1220, desc: 'Livre Escolha - Res - Plurianual 3 anos'});
        //servicos[3][1][3].push({cod: 1222, desc: 'Rede Referenciada Corretor Geral - Plurianual 3 anos'});

        // APARTAMENTO
        servicos[3][2][1].push({cod: 1207, desc: 'Apartamento - Plurianual 3 anos'});
        servicos[3][2][2].push({cod: 1209, desc: 'Rede Referenciada - Apartamento - Plurianual 3 anos'});
        //servicos[3][2][2].push({cod: 1211, desc: 'Livre Escolha (Apartamento) - Plurianual 3 anos'});
        //servicos[3][2][2].push({cod: 1214, desc: 'Gratuito Corretor - Res (Apartamento) - Plurianual 3 anos'});
        servicos[3][2][3].push({cod: 1217, desc: 'Rede Referenciada - Res (Apartamento) - Plurianual 3 anos'});
        //servicos[3][2][3].push({cod: 1221, desc: 'Livre Escolha - Res (Apartamento) - Plurianual 3 anos'});

        // CASA DE MADEIRA (ZONA URBANA)
        servicos[3][3][1].push({cod: 1206, desc: 'Gratuito Geral - Plurianual 3 anos'});
        servicos[3][3][2].push({cod: 1208, desc: 'Rede Referenciada - Plurianual 3 anos'});
        //servicos[3][3][2].push({cod: 1210, desc: 'Livre Escolha - Res - Plurianual 3 anos'});
        //servicos[3][3][2].push({cod: 1212, desc: 'Gratuito Corretor - Res (Geral) - Plurianual 3 anos'});
        servicos[3][3][3].push({cod: 1215, desc: 'Rede Referenciada - Res - Plurianual 3 anos'});
        //servicos[3][3][3].push({cod: 1220, desc: 'Livre Escolha - Res - Plurianual 3 anos'});
        //servicos[3][3][3].push({cod: 1222, desc: 'Rede Referenciada Corretor Geral - Plurianual 3 anos'});

        // CHÁCARA, SÍTIO OU FAZENDA
        servicos[3][4][1].push({cod: 1206, desc: 'Gratuito Geral - Plurianual 3 anos'});
        servicos[3][4][2].push({cod: 1208, desc: 'Rede Referenciada - Plurianual 3 anos'});
        //servicos[3][4][2].push({cod: 1210, desc: 'Livre Escolha - Res - Plurianual 3 anos'});
        //servicos[3][4][2].push({cod: 1212, desc: 'Gratuito Corretor - Res (Geral) - Plurianual 3 anos'});
        servicos[3][4][3].push({cod: 1215, desc: 'Rede Referenciada - Res - Plurianual 3 anos'});
        //servicos[3][4][3].push({cod: 1220, desc: 'Livre Escolha - Res - Plurianual 3 anos'});
        //servicos[3][4][3].push({cod: 1222, desc: 'Rede Referenciada Corretor Geral - Plurianual 3 anos'});

        // CASA DE ALVENARIA DESOCUPADA
        servicos[3][5][1].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[3][5][2].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[3][5][3].push({cod: null, desc: 'SEM CÓDIGOS'});

        // APARTAMENTO DESOCUPADO
        servicos[3][6][1].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[3][6][2].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[3][6][3].push({cod: null, desc: 'SEM CÓDIGOS'});

        // CHÁCARA, SÍTIO OU FAZENDA DESOCUPADA
        servicos[3][7][1].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[3][7][2].push({cod: null, desc: 'SEM CÓDIGOS'});
        servicos[3][7][3].push({cod: null, desc: 'SEM CÓDIGOS'});

        // CASA DE MADEIRA (ZONA RURAL)
        servicos[3][8][1].push({cod: 1206, desc: 'Gratuito Geral - Plurianual 3 anos'});
        servicos[3][8][2].push({cod: 1208, desc: 'Rede Referenciada - Plurianual 3 anos'});
        //servicos[3][8][2].push({cod: 1210, desc: 'Livre Escolha - Res - Plurianual 3 anos'});
        //servicos[3][8][2].push({cod: 1212, desc: 'Gratuito Corretor - Res (Geral) - Plurianual 3 anos'});
        servicos[3][8][3].push({cod: 1215, desc: 'Rede Referenciada - Res - Plurianual 3 anos'});
        //servicos[3][8][3].push({cod: 1220, desc: 'Livre Escolha - Res - Plurianual 3 anos'});
        //servicos[3][8][3].push({cod: 1222, desc: 'Rede Referenciada Corretor Geral - Plurianual 3 anos'});

        return servicos[vigencia][residencia][codPlano];
    }
    listaServicosHabitualPremium(plano, vigencia, residencia){
        let servicos = [];
        for(let i = 1; i <= 3; i++){ // Vigencias (1 ano, 2 anos, 3 anos)
            servicos[i] = [];
            for(let k = 1; k <= 8; k++){ // Tipo de residencia
                servicos[i][k] = [];
                for(let l = 1; l <= 3; l++){ // Plano (Essencial, Conforto, Exclusive)
                    servicos[i][k][l] = [];
                }
            } 
        }

        let codPlano = 0;
        if (plano.toString().toLowerCase() == 'essencial'){ codPlano = 1; }
        if (plano.toString().toLowerCase() == 'conforto'){ codPlano = 2; }
        if (plano.toString().toLowerCase() == 'exclusive'){ codPlano = 3; }

        // 1 ANO
        // CASA DE ALVENARIA
        servicos[1][1][1].push({cod: 512, desc: 'ESSENCIAL - GRATUITO - GERAL'});
        servicos[1][1][2].push({cod: 513, desc: 'CONFORTO REFERENCIADA - GERAL'});
        //servicos[1][1][2].push({cod: 514, desc: 'CONFORTO LIVRE ESCOLHA - GERAL'});
        //servicos[1][1][2].push({cod: 515, desc: 'CONFORTO GRATUITO CORRETOR - GERAL'});
        servicos[1][1][3].push({cod: 516, desc: 'EXCLUSIVE REFERENCIADA - GERAL'});
        //servicos[1][1][3].push({cod: 517, desc: 'EXCLUSIVE LIVRE ESCOLHA - GERAL'});
        //servicos[1][1][3].push({cod: 518, desc: 'EXCLUSIVE CORRETOR - GERAL'});

        // APARTAMENTO
        servicos[1][2][1].push({cod: 573, desc: 'ESSENCIAL - GRATUITO APARTAMENTO'});
        servicos[1][2][2].push({cod: 587, desc: 'CONFORTO REFERENCIADA - APARTAMENTO'});
        //servicos[1][2][2].push({cod: 599, desc: 'CONFORTO LIVRE ESCOLHA - APARTAMENTO'});
        //servicos[1][2][2].push({cod: 641, desc: 'CONFORTO GRATUITO CORRETOR - APARTAMENTO'});
        servicos[1][2][3].push({cod: 642, desc: 'EXCLUSIVE REFERENCIADA - APARTAMENTO'});
        //servicos[1][2][3].push({cod: 643, desc: 'EXCLUSIVE LIVRE ESCOLHA - APARTAMENTO'});
        //servicos[1][2][3].push({cod: 644, desc: 'EXCLUSIVE CORRETOR - APARTAMENTO'});

        // CASA DE MADEIRA (ZONA URBANA)
        servicos[1][3][1].push({cod: 512, desc: 'ESSENCIAL - GRATUITO - GERAL'});
        servicos[1][3][2].push({cod: 513, desc: 'CONFORTO REFERENCIADA - GERAL'});
        //servicos[1][3][2].push({cod: 514, desc: 'CONFORTO LIVRE ESCOLHA - GERAL'});
        //servicos[1][3][2].push({cod: 515, desc: 'CONFORTO GRATUITO CORRETOR - GERAL'});
        servicos[1][3][3].push({cod: 516, desc: 'EXCLUSIVE REFERENCIADA - GERAL'});
        //servicos[1][3][3].push({cod: 517, desc: 'EXCLUSIVE LIVRE ESCOLHA - GERAL'});
        //servicos[1][3][3].push({cod: 518, desc: 'EXCLUSIVE CORRETOR - GERAL'});

        // CHÁCARA, SÍTIO OU FAZENDA
        servicos[1][4][1].push({cod: 512, desc: 'ESSENCIAL - GRATUITO - GERAL'});
        servicos[1][4][2].push({cod: 513, desc: 'CONFORTO REFERENCIADA - GERAL'});
        //servicos[1][4][2].push({cod: 514, desc: 'CONFORTO LIVRE ESCOLHA - GERAL'});
        //servicos[1][4][2].push({cod: 515, desc: 'CONFORTO GRATUITO CORRETOR - GERAL'});
        servicos[1][4][3].push({cod: 516, desc: 'EXCLUSIVE REFERENCIADA - GERAL'});
        //servicos[1][4][3].push({cod: 517, desc: 'EXCLUSIVE LIVRE ESCOLHA - GERAL'});
        //servicos[1][4][3].push({cod: 518, desc: 'EXCLUSIVE CORRETOR - GERAL'});

        // CASA DE ALVENARIA DESOCUPADA
        servicos[1][5][1].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[1][5][2].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[1][5][3].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});

        // APARTAMENTO DESOCUPADO
        servicos[1][6][1].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[1][6][2].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[1][6][3].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});

        // CHÁCARA, SÍTIO OU FAZENDA DESOCUPADA
        servicos[1][7][1].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[1][7][2].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[1][7][3].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});

        // CASA DE MADEIRA (ZONA RURAL)
        servicos[1][8][1].push({cod: 512, desc: 'ESSENCIAL - GRATUITO - GERAL'});
        servicos[1][8][2].push({cod: 513, desc: 'CONFORTO REFERENCIADA - GERAL'});
        //servicos[1][8][2].push({cod: 514, desc: 'CONFORTO LIVRE ESCOLHA - GERAL'});
        //servicos[1][8][2].push({cod: 515, desc: 'CONFORTO GRATUITO CORRETOR - GERAL'});
        servicos[1][8][3].push({cod: 516, desc: 'EXCLUSIVE REFERENCIADA - GERAL'});
        //servicos[1][8][3].push({cod: 517, desc: 'EXCLUSIVE LIVRE ESCOLHA - GERAL'});
        //servicos[1][8][3].push({cod: 518, desc: 'EXCLUSIVE CORRETOR - GERAL'});

        // 2 ANOS
        // CASA DE ALVENARIA
        servicos[2][1][1].push({cod: 1213, desc: 'Essencial - Gratuito - Geral - Plurianual 2 anos'});
        servicos[2][1][2].push({cod: 1219, desc: 'Conforto - Rede Referenciada - Geral - Plurianual 2 anos'});
        //servicos[2][1][2].push({cod: 1225, desc: 'Conforto Livre Escolha - Geral - Plurianual 2 anos'});
        //servicos[2][1][2].push({cod: 1227, desc: 'Conforto Gratuito Corretor - Geral - Plurianual 2 anos'});
        servicos[2][1][3].push({cod: 1228, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 2 anos'});
        //servicos[2][1][3].push({cod: 1230, desc: 'Exclusive Livre Escolha - Geral - Plurianual 2 anos'});
        //servicos[2][1][3].push({cod: 1233, desc: 'Exclusive Corretor - Geral - Plurianual 2 anos'});

        // APARTAMENTO
        servicos[2][2][1].push({cod: 1216, desc: 'Essencial - Gratuito Apartamento - Plurianual 2 anos'});
        servicos[2][2][2].push({cod: 1223, desc: 'Conforto - Rede Referenciada - Apartamento - Plurianual 2 anos'});
        //servicos[2][2][2].push({cod: 1226, desc: 'Conforto Livre Escolha - Apartamento - Plurianual 2 anos'});
        //servicos[2][2][2].push({cod: 1276, desc: 'CONFORTO GRATUITO CORRETOR - APARTAMENTO 0 PLURIANUAL 02 ANOS'});
        servicos[2][2][3].push({cod: 1229, desc: 'Exclusive - Rede Referenciada - Apartamento - Plurianual 2 anos'});
        //servicos[2][2][3].push({cod: 1231, desc: 'Exclusive Livre Escolha - Apartamento - Plurianual 2 anos'});
        //servicos[2][2][3].push({cod: 1235, desc: 'Exclusive Corretor - Apartamento - Plurianual 2 anos'});

        // CASA DE MADEIRA (ZONA URBANA)
        servicos[2][3][1].push({cod: 1213, desc: 'Essencial - Gratuito - Geral - Plurianual 2 anos'});
        servicos[2][3][2].push({cod: 1219, desc: 'Conforto - Rede Referenciada - Geral - Plurianual 2 anos'});
        //servicos[2][3][2].push({cod: 1225, desc: 'Conforto Livre Escolha - Geral - Plurianual 2 anos'});
        //servicos[2][3][2].push({cod: 1227, desc: 'Conforto Gratuito Corretor - Geral - Plurianual 2 anos'});
        servicos[2][3][3].push({cod: 1228, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 2 anos'});
        //servicos[2][3][3].push({cod: 1230, desc: 'Exclusive Livre Escolha - Geral - Plurianual 2 anos'});
        //servicos[2][3][3].push({cod: 1233, desc: 'Exclusive Corretor - Geral - Plurianual 2 anos'});

        // CHÁCARA, SÍTIO OU FAZENDA
        servicos[2][4][1].push({cod: 1213, desc: 'Essencial - Gratuito - Geral - Plurianual 2 anos'});
        servicos[2][4][2].push({cod: 1219, desc: 'Conforto - Rede Referenciada - Geral - Plurianual 2 anos'});
        //servicos[2][4][2].push({cod: 1225, desc: 'Conforto Livre Escolha - Geral - Plurianual 2 anos'});
        //servicos[2][4][2].push({cod: 1227, desc: 'Conforto Gratuito Corretor - Geral - Plurianual 2 anos'});
        servicos[2][4][3].push({cod: 1228, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 2 anos'});
        //servicos[2][4][3].push({cod: 1230, desc: 'Exclusive Livre Escolha - Geral - Plurianual 2 anos'});
        //servicos[2][4][3].push({cod: 1233, desc: 'Exclusive Corretor - Geral - Plurianual 2 anos'});

        // CASA DE ALVENARIA DESOCUPADA
        servicos[2][5][1].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[2][5][2].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[2][5][3].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});

        // APARTAMENTO DESOCUPADO
        servicos[2][6][1].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[2][6][2].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[2][6][3].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});

        // CHÁCARA, SÍTIO OU FAZENDA DESOCUPADA
        servicos[2][7][1].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[2][7][2].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[2][7][3].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});

        // CASA DE MADEIRA (ZONA RURAL)
        servicos[2][8][1].push({cod: 1213, desc: 'Essencial - Gratuito - Geral - Plurianual 2 anos'});
        servicos[2][8][2].push({cod: 1219, desc: 'Conforto - Rede Referenciada - Geral - Plurianual 2 anos'});
        //servicos[2][8][2].push({cod: 1225, desc: 'Conforto Livre Escolha - Geral - Plurianual 2 anos'});
        //servicos[2][8][2].push({cod: 1227, desc: 'Conforto Gratuito Corretor - Geral - Plurianual 2 anos'});
        servicos[2][8][3].push({cod: 1228, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 2 anos'});
        //servicos[2][8][3].push({cod: 1230, desc: 'Exclusive Livre Escolha - Geral - Plurianual 2 anos'});
        //servicos[2][8][3].push({cod: 1233, desc: 'Exclusive Corretor - Geral - Plurianual 2 anos'});

        // 3 ANOS
        // CASA DE ALVENARIA
        servicos[3][1][1].push({cod: 1232, desc: 'Essencial - Gratuito - Geral - Plurianual 3 anos'});
        servicos[3][1][2].push({cod: 1236, desc: 'Conforto - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][1][2].push({cod: 1243, desc: 'Conforto Livre Escolha - Geral - Plurianual 3 anos'});
        //servicos[3][1][2].push({cod: 1251, desc: 'Conforto Gratuito Corretor - Geral - Plurianual 3 anos'});
        servicos[3][1][3].push({cod: 1256, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][1][3].push({cod: 1266, desc: 'Exclusive Livre Escolha - Geral - Plurianual 3 anos'});
        //servicos[3][1][3].push({cod: 1275, desc: 'Exclusive Corretor - Geral - Plurianual 3 anos'});

        // APARTAMENTO
        servicos[3][2][1].push({cod: 1234, desc: 'Essencial - Gratuito Apartamento - Plurianual 3 anos'});
        servicos[3][2][2].push({cod: 1240, desc: 'Conforto - Rede Referenciada - Apartamento - Plurianual 3 anos'});
        //servicos[3][2][2].push({cod: 1247, desc: 'Conforto Livre Escolha - Apartamento - Plurianual 3 anos'});
        //servicos[3][2][2].push({cod: 1254, desc: 'Conforto Gratuito Corretor - Apartamento - Plurianual 3 anos'});
        servicos[3][2][3].push({cod: 1261, desc: 'Exclusive - Rede Referenciada - Apartamento - Plurianual 3 anos'});
        //servicos[3][2][3].push({cod: 1272, desc: 'Exclusive Livre Escolha - Apartamento - Plurianual 3 anos'});
        //servicos[3][2][3].push({cod: 1274, desc: 'Exclusive Corretor - Apartamento - Plurianual 3 anos'});

        // CASA DE MADEIRA (ZONA URBANA)
        servicos[3][3][1].push({cod: 1232, desc: 'Essencial - Gratuito - Geral - Plurianual 3 anos'});
        servicos[3][3][2].push({cod: 1236, desc: 'Conforto - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][3][2].push({cod: 1243, desc: 'Conforto Livre Escolha - Geral - Plurianual 3 anos'});
        //servicos[3][3][2].push({cod: 1251, desc: 'Conforto Gratuito Corretor - Geral - Plurianual 3 anos'});
        servicos[3][3][3].push({cod: 1256, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][3][3].push({cod: 1266, desc: 'Exclusive Livre Escolha - Geral - Plurianual 3 anos'});
        //servicos[3][3][3].push({cod: 1275, desc: 'Exclusive Corretor - Geral - Plurianual 3 anos'});

        // CHÁCARA, SÍTIO OU FAZENDA
        servicos[3][4][1].push({cod: 1232, desc: 'Essencial - Gratuito - Geral - Plurianual 3 anos'});
        servicos[3][4][2].push({cod: 1236, desc: 'Conforto - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][4][2].push({cod: 1243, desc: 'Conforto Livre Escolha - Geral - Plurianual 3 anos'});
        //servicos[3][4][2].push({cod: 1251, desc: 'Conforto Gratuito Corretor - Geral - Plurianual 3 anos'});
        servicos[3][4][3].push({cod: 1256, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][4][3].push({cod: 1266, desc: 'Exclusive Livre Escolha - Geral - Plurianual 3 anos'});
        //servicos[3][4][3].push({cod: 1275, desc: 'Exclusive Corretor - Geral - Plurianual 3 anos'});

        // CASA DE ALVENARIA DESOCUPADA
        servicos[3][5][1].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[3][5][2].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[3][5][3].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});

        // APARTAMENTO DESOCUPADO
        servicos[3][6][1].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[3][6][2].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[3][6][3].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});

        // CHÁCARA, SÍTIO OU FAZENDA DESOCUPADA
        servicos[3][7][1].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[3][7][2].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});
        servicos[3][7][3].push({cod: 571, desc: 'COMPACTO (GRATUITO LIVRE-ESCOLHA) - SIMPLIFICADO'});

        // CASA DE MADEIRA (ZONA RURAL)
        servicos[3][8][1].push({cod: 1232, desc: 'Essencial - Gratuito - Geral - Plurianual 3 anos'});
        servicos[3][8][2].push({cod: 1236, desc: 'Conforto - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][8][2].push({cod: 1243, desc: 'Conforto Livre Escolha - Geral - Plurianual 3 anos'});
        //servicos[3][8][2].push({cod: 1251, desc: 'Conforto Gratuito Corretor - Geral - Plurianual 3 anos'});
        servicos[3][8][3].push({cod: 1256, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][8][3].push({cod: 1266, desc: 'Exclusive Livre Escolha - Geral - Plurianual 3 anos'});
        //servicos[3][8][3].push({cod: 1275, desc: 'Exclusive Corretor - Geral - Plurianual 3 anos'});

        return servicos[vigencia][residencia][codPlano];
    }
    listaServicosVeraneio(plano, vigencia, residencia){
        let servicos = [];
        for(let i = 1; i <= 3; i++){ // Vigencias (1 ano, 2 anos, 3 anos)
            servicos[i] = [];
            for(let k = 1; k <= 8; k++){ // Tipo de residencia
                servicos[i][k] = [];
                for(let l = 1; l <= 3; l++){ // Plano (Essencial, Conforto, Exclusive)
                    servicos[i][k][l] = [];
                }
            } 
        }

        let codPlano = 0;
        if (plano.toString().toLowerCase() == 'essencial'){ codPlano = 1; }
        if (plano.toString().toLowerCase() == 'conforto'){ codPlano = 2; }
        if (plano.toString().toLowerCase() == 'exclusive'){ codPlano = 3; }
        // 1 ANO
        // CASA DE ALVENARIA
        servicos[1][1][1].push({cod: 576, desc: 'ESSENCIAL - GRATUITO - GERAL (0)'});
        servicos[1][1][2].push({cod: 582, desc: 'CONFORTO - REFERENCIADA - GERAL (0)'});
        //servicos[1][1][2].push({cod: 579, desc: 'CONFORTO - LIVRE ESCOLHA - GERAL (0)'});
        //servicos[1][1][2].push({cod: 584, desc: 'CONFORTO - CORRETOR - GERAL (0)'});
        servicos[1][1][3].push({cod: 501, desc: 'EXCLUSIVE REFERENCIADA - GERAL'});
        //servicos[1][1][3].push({cod: 589, desc: 'EXCLUSIVE - LIVRE ESCOLHA - GERAL (0)'});
        //servicos[1][1][3].push({cod: 591, desc: 'EXCLUSIVE - CORRETOR - GERAL (0)'});

        // APARTAMENTO
        servicos[1][2][1].push({cod: 578, desc: 'ESSENCIAL - GRATUITO - APARTAMENTO'});
        servicos[1][2][2].push({cod: 498, desc: 'CONFORTO REFERENCIADA - APARTAMENTO'});
        //servicos[1][2][2].push({cod: 581, desc: 'CONFORTO LIVRE ESCOLHA - APARTAMENTO'});
        //servicos[1][2][2].push({cod: 585, desc: 'CONFORTO - CORRETOR - APARTAMENTO'});
        servicos[1][2][3].push({cod: 588, desc: 'EXCLUSIVE - REFERENCIADA - APARTAMENTO'});
        //servicos[1][2][3].push({cod: 590, desc: 'EXCLUSIVE - LIVRE ESCOLHA - APARTAMENTO'});
        //servicos[1][2][3].push({cod: 592, desc: 'EXCLUSIVE - CORRETOR - APARTAMENTO'});

        // CASA DE MADEIRA (ZONA URBANA)
        servicos[1][3][1].push({cod: 576, desc: 'ESSENCIAL - GRATUITO - GERAL (0)'});
        servicos[1][3][2].push({cod: 582, desc: 'CONFORTO - REFERENCIADA - GERAL (0)'});
        //servicos[1][3][2].push({cod: 579, desc: 'CONFORTO - LIVRE ESCOLHA - GERAL (0)'});
        //servicos[1][3][2].push({cod: 584, desc: 'CONFORTO - CORRETOR - GERAL (0)'});
        servicos[1][3][3].push({cod: 501, desc: 'EXCLUSIVE REFERENCIADA - GERAL'});
        //servicos[1][3][3].push({cod: 589, desc: 'EXCLUSIVE - LIVRE ESCOLHA - GERAL (0)'});
        //servicos[1][3][3].push({cod: 591, desc: 'EXCLUSIVE - CORRETOR - GERAL (0)'});

        // CHÁCARA, SÍTIO OU FAZENDA
        servicos[1][4][1].push({cod: 576, desc: 'ESSENCIAL - GRATUITO - GERAL (0)'});
        servicos[1][4][2].push({cod: 582, desc: 'CONFORTO - REFERENCIADA - GERAL (0)'});
        //servicos[1][4][2].push({cod: 579, desc: 'CONFORTO - LIVRE ESCOLHA - GERAL (0)'});
        //servicos[1][4][2].push({cod: 584, desc: 'CONFORTO - CORRETOR - GERAL (0)'});
        servicos[1][4][3].push({cod: 501, desc: 'EXCLUSIVE REFERENCIADA - GERAL'});
        //servicos[1][4][3].push({cod: 589, desc: 'EXCLUSIVE - LIVRE ESCOLHA - GERAL (0)'});
        //servicos[1][4][3].push({cod: 591, desc: 'EXCLUSIVE - CORRETOR - GERAL (0)'});

        // DESOCUPAS
        servicos[1][5][1].push(null);
        servicos[1][5][2].push(null);
        servicos[1][5][3].push(null);


        servicos[1][6][1].push(null);
        servicos[1][6][2].push(null);
        servicos[1][6][3].push(null);


        servicos[1][7][1].push(null);
        servicos[1][7][2].push(null);
        servicos[1][7][3].push(null);


        // CASA DE MADEIRA (ZONA RURAL)
        servicos[1][8][1].push({cod: 576, desc: 'ESSENCIAL - GRATUITO - GERAL (0)'});
        servicos[1][8][2].push({cod: 582, desc: 'CONFORTO - REFERENCIADA - GERAL (0)'});
        //servicos[1][8][2].push({cod: 579, desc: 'CONFORTO - LIVRE ESCOLHA - GERAL (0)'});
        //servicos[1][8][2].push({cod: 584, desc: 'CONFORTO - CORRETOR - GERAL (0)'});
        servicos[1][8][3].push({cod: 501, desc: 'EXCLUSIVE REFERENCIADA - GERAL'});
        //servicos[1][8][3].push({cod: 589, desc: 'EXCLUSIVE - LIVRE ESCOLHA - GERAL (0)'});
        //servicos[1][8][3].push({cod: 591, desc: 'EXCLUSIVE - CORRETOR - GERAL (0)'});
        
        // 2 ANOS
        // CASA DE ALVENARIA
        servicos[2][1][1].push({cod: 1237, desc: 'Essencial - Gratuito - Geral (0) - Plurianual 2 anos'});
        servicos[2][1][2].push({cod: 1239, desc: 'Conforto - Rede Referenciada - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][1][2].push({cod: 1242, desc: 'Conforto - Livre Escolha - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][1][2].push({cod: 1245, desc: 'Conforto - Corretor - Geral (0) - Geral (0) - Plurianual 2 anos'});
        servicos[2][1][3].push({cod: 1248, desc: 'Exclusive - Rede Referenciada - Geral - Geral (0) - Plurianual 2 anos'});
        //servicos[2][1][3].push({cod: 1250, desc: 'Exclusive - Livre Escolha - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][1][3].push({cod: 1255, desc: 'Exclusive Corretor - Geral - Geral (0) - Plurianual 2 anos'});

        // APARTAMENTO
        servicos[2][2][1].push({cod: 1238, desc: 'Essencial - Gratuito - Apartamento - Geral (0) - Plurianual 2 anos'});
        servicos[2][2][2].push({cod: 1241, desc: 'Conforto - Rede Referenciada - Apartamento - Geral (0) - Plurianual 2 anos'});
        //servicos[2][2][2].push({cod: 1244, desc: 'Conforto Livre Escolha - Apartamento - Geral (0) - Plurianual 2 anos'});
        //servicos[2][2][2].push({cod: 1246, desc: 'Conforto - Corretor - Apartamento - Geral (0) - Plurianual 2 anos'});
        servicos[2][2][3].push({cod: 1249, desc: 'Exclusive - Rede Referenciada - Apartamento - Geral (0) - Plurianual 2 anos'});
        //servicos[2][2][3].push({cod: 1252, desc: 'Exclusive - Livre Escolha - Apartamento - Geral (0) - Plurianual 2 anos'});
        //servicos[2][2][3].push({cod: 1255, desc: 'Exclusive Corretor - Apartameto - Geral (0) - Plurianual 2 anos'});

        // CASA DE MADEIRA (ZONA URBANA)
        servicos[2][3][1].push({cod: 1237, desc: 'Essencial - Gratuito - Geral (0) - Plurianual 2 anos'});
        servicos[2][3][2].push({cod: 1239, desc: 'Conforto - Rede Referenciada - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][3][2].push({cod: 1242, desc: 'Conforto - Livre Escolha - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][3][2].push({cod: 1245, desc: 'Conforto - Corretor - Geral (0) - Geral (0) - Plurianual 2 anos'});
        servicos[2][3][3].push({cod: 1248, desc: 'Exclusive - Rede Referenciada - Geral - Geral (0) - Plurianual 2 anos'});
        //servicos[2][3][3].push({cod: 1250, desc: 'Exclusive - Livre Escolha - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][3][3].push({cod: 1255, desc: 'Exclusive Corretor - Geral - Geral (0) - Plurianual 2 anos'});

        // CHÁCARA, SÍTIO OU FAZENDA
        servicos[2][4][1].push({cod: 1237, desc: 'Essencial - Gratuito - Geral (0) - Plurianual 2 anos'});
        servicos[2][4][2].push({cod: 1239, desc: 'Conforto - Rede Referenciada - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][4][2].push({cod: 1242, desc: 'Conforto - Livre Escolha - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][4][2].push({cod: 1245, desc: 'Conforto - Corretor - Geral (0) - Geral (0) - Plurianual 2 anos'});
        servicos[2][4][3].push({cod: 1248, desc: 'Exclusive - Rede Referenciada - Geral - Geral (0) - Plurianual 2 anos'});
        //servicos[2][4][3].push({cod: 1250, desc: 'Exclusive - Livre Escolha - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][4][3].push({cod: 1255, desc: 'Exclusive Corretor - Geral - Geral (0) - Plurianual 2 anos'});

        // DESOCUPADAS
        servicos[2][5][1].push(null);
        servicos[2][5][2].push(null);
        servicos[2][5][3].push(null);

        servicos[2][6][1].push(null);
        servicos[2][6][2].push(null);
        servicos[2][6][3].push(null);

        servicos[2][7][1].push(null);
        servicos[2][7][2].push(null);
        servicos[2][7][3].push(null);

        // CASA DE MADEIRA (ZONA RURAL)
        servicos[2][8][1].push({cod: 1237, desc: 'Essencial - Gratuito - Geral (0) - Plurianual 2 anos'});
        servicos[2][8][2].push({cod: 1239, desc: 'Conforto - Rede Referenciada - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][8][2].push({cod: 1242, desc: 'Conforto - Livre Escolha - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][8][2].push({cod: 1245, desc: 'Conforto - Corretor - Geral (0) - Geral (0) - Plurianual 2 anos'});
        servicos[2][8][3].push({cod: 1248, desc: 'Exclusive - Rede Referenciada - Geral - Geral (0) - Plurianual 2 anos'});
        //servicos[2][8][3].push({cod: 1250, desc: 'Exclusive - Livre Escolha - Geral (0) - Geral (0) - Plurianual 2 anos'});
        //servicos[2][8][3].push({cod: 1255, desc: 'Exclusive Corretor - Geral - Geral (0) - Plurianual 2 anos'});

        // 3 ANOS
        // CASA DE ALVENARIA
        servicos[3][1][1].push({cod: 1257, desc: 'ESSENCIAL - GRATUITO - GERAL (0) PLURIANUAL 03 ANOS'});
        servicos[3][1][2].push({cod: 1259, desc: 'Conforto - Rede Referenciada - Geral (0) - Plurianual 3 anos'});
        //servicos[3][1][2].push({cod: 1262, desc: 'Conforto - Livre Escolha - Geral (0) - Plurianual 3 anos'});
        //servicos[3][1][2].push({cod: 1264, desc: 'Conforto - Corretor - Geral (0) - Plurianual 3 anos'});
        servicos[3][1][3].push({cod: 1267, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][1][3].push({cod: 1269, desc: 'Exclusive - Livre Escolha - Geral (0) - Plurianual 3 anos'});
        //servicos[3][1][3].push({cod: 1271, desc: 'Exclusive Corretor - Geral - Plurianual 3 anos'});

        // APARTAMENTO
        servicos[3][2][1].push({cod: 1258, desc: 'Essencial - Gratuito - Apartamento - Plurianual 3 anos'});
        servicos[3][2][2].push({cod: 1260, desc: 'Conforto - Rede Referenciada - Apartamento - Plurianual 3 anos'});
        //servicos[3][2][2].push({cod: 1263, desc: 'Conforto Livre Escolha - Apartamento - Plurianual 3 anos'});
        //servicos[3][2][2].push({cod: 1265, desc: 'Conforto - Corretor - Apartamento - Plurianual 3 anos'});
        servicos[3][2][3].push({cod: 1268, desc: 'Exclusive - Rede Referenciada - Apartamento - Plurianual 3 anos'});
        //servicos[3][2][3].push({cod: 1270, desc: 'Exclusive - Livre Escolha - Apartamento - Plurianual 3 anos'});

        // CASA DE MADEIRA (ZONA URBANA)
        servicos[3][3][1].push({cod: 1257, desc: 'ESSENCIAL - GRATUITO - GERAL (0) PLURIANUAL 03 ANOS'});
        servicos[3][3][2].push({cod: 1259, desc: 'Conforto - Rede Referenciada - Geral (0) - Plurianual 3 anos'});
        //servicos[3][3][2].push({cod: 1262, desc: 'Conforto - Livre Escolha - Geral (0) - Plurianual 3 anos'});
        //servicos[3][3][2].push({cod: 1264, desc: 'Conforto - Corretor - Geral (0) - Plurianual 3 anos'});
        servicos[3][3][3].push({cod: 1267, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][3][3].push({cod: 1269, desc: 'Exclusive - Livre Escolha - Geral (0) - Plurianual 3 anos'});
        //servicos[3][3][3].push({cod: 1271, desc: 'Exclusive Corretor - Geral - Plurianual 3 anos'});

        //CHÁCARA, SÍTIO OU FAZENDA
        servicos[3][4][1].push({cod: 1257, desc: 'ESSENCIAL - GRATUITO - GERAL (0) PLURIANUAL 03 ANOS'});
        servicos[3][4][2].push({cod: 1259, desc: 'Conforto - Rede Referenciada - Geral (0) - Plurianual 3 anos'});
        //servicos[3][4][2].push({cod: 1262, desc: 'Conforto - Livre Escolha - Geral (0) - Plurianual 3 anos'});
        //servicos[3][4][2].push({cod: 1264, desc: 'Conforto - Corretor - Geral (0) - Plurianual 3 anos'});
        servicos[3][4][3].push({cod: 1267, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][4][3].push({cod: 1269, desc: 'Exclusive - Livre Escolha - Geral (0) - Plurianual 3 anos'});
        //servicos[3][4][3].push({cod: 1271, desc: 'Exclusive Corretor - Geral - Plurianual 3 anos'});

        //DESOCUPADAS
        servicos[3][5][1].push(null);
        servicos[3][5][2].push(null);
        servicos[3][5][3].push(null);

        servicos[3][6][1].push(null);
        servicos[3][6][2].push(null);
        servicos[3][6][3].push(null);

        servicos[3][7][1].push(null);
        servicos[3][7][2].push(null);
        servicos[3][7][3].push(null);

        //CASA DE MADEIRA (ZONA RURAL)
        servicos[3][8][1].push({cod: 1257, desc: 'ESSENCIAL - GRATUITO - GERAL (0) PLURIANUAL 03 ANOS'});
        servicos[3][8][2].push({cod: 1259, desc: 'Conforto - Rede Referenciada - Geral (0) - Plurianual 3 anos'});
        //servicos[3][8][2].push({cod: 1262, desc: 'Conforto - Livre Escolha - Geral (0) - Plurianual 3 anos'});
        //servicos[3][8][2].push({cod: 1264, desc: 'Conforto - Corretor - Geral (0) - Plurianual 3 anos'});
        servicos[3][8][3].push({cod: 1267, desc: 'Exclusive - Rede Referenciada - Geral - Plurianual 3 anos'});
        //servicos[3][8][3].push({cod: 1269, desc: 'Exclusive - Livre Escolha - Geral (0) - Plurianual 3 anos'});
        //servicos[3][8][3].push({cod: 1271, desc: 'Exclusive Corretor - Geral - Plurianual 3 anos'});
        
        return servicos[vigencia][residencia][codPlano];
    }
}

module.exports = CodigoServicos;
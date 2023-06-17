class PortoCoberturas {
    constructor(){
        this.coberturas  = ['habitual', 'premium', 'veraneio'];
        this.coberturas['habitual'] = [ //Itens Habitual
            'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 'codigoClausulasPortoSeguroServicos',
            'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes',
            'valorCoberturaQuebraVidros', 'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto',
            'valorCoberturaAlagamento', 'flagContratarValorDeNovo', 'flagLMIDiscriminado', 'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos',
            'valorSubtracaoBicicleta', 'valorNegocioCasa', 'valorPequenasReformas', 'valorFuneralFamiliar', 'valorDanosMorais', 'valorRCEmpregador'
        ];
        this.coberturas['premium'] = [ //Itens Habital Premium
            'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 'codigoClausulasPortoSeguroServicos',
            'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes',
            'valorCoberturaQuebraVidros', 'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto',
            'valorCoberturaAlagamento', 'flagContratarValorDeNovo', 'flagLMIDiscriminado', 'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos',
            'valorCoberturaHoleinOne', 'valorCoberturaDanosJardim', 'valorCoberturaObrasObjetosArte', 'valorCoberturaJoiasRelogios'
        ];
        this.coberturas['veraneio'] = [ //Itens Veraneio
            'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 'codigoClausulasPortoSeguroServicos',
            'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes', 
            'valorCoberturaQuebraVidros', 'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto', 
            'valorCoberturaAlagamento', 'flagContratarValorDeNovo', 'flagLMIDiscriminado', 'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos'
        ];
    }

    listaCoberturas(plano, lowerCase){
        let coberturas = this.coberturas;

        coberturas['all'] = [];
        coberturas['required'] = [ 'valorCoberturaIncendio', 'codigoClausulasPortoSeguroServicos', 'flagLMIDiscriminado' ]; //Itens required

        coberturas.map((key, index)=>{ //Todos os itens
            let cobertura = coberturas[key];
            cobertura.map((item, index)=>{ if (!coberturas['all'].includes(item)){ coberturas['all'].push(item); } });
        });

        let cobertura = [];
        switch(plano){
            case 'habitual':
                if (!lowerCase){ return coberturas['habitual']; }
                coberturas['habitual'].map((item, index)=>{ cobertura.push(item.toLowerCase()); });
                return cobertura;
                break;

            case 'premium':
                if (!lowerCase){ return coberturas['premium']; }
                coberturas['premium'].map((item, index)=>{ cobertura.push(item.toLowerCase()); });
                return cobertura;
                break;
            case 'habitual-premium':
                if (!lowerCase){ return coberturas['premium']; }
                coberturas['premium'].map((item, index)=>{ cobertura.push(item.toLowerCase()); });
                return cobertura;
                break;

            case 'veraneio':
                if (!lowerCase){ return coberturas['veraneio']; }
                coberturas['veraneio'].map((item, index)=>{ cobertura.push(item.toLowerCase()); });
                return cobertura;
                break;
            
            case 'all':
                if (!lowerCase){ return coberturas['all']; }
                coberturas['all'].map((item, index)=>{ cobertura.push(item.toLowerCase()); });
                return cobertura;
                break;

            case 'required':
                if (!lowerCase){ return coberturas['required']; }
                coberturas['required'].map((item, index)=>{ cobertura.push(item.toLowerCase()); });
                return cobertura;
                break;
        }
    }
}  
module.exports = PortoCoberturas;
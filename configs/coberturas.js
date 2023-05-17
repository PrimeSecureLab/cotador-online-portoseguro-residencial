
class PortoCoberturas {
    constructor(){

    }

    listaCoberturas(plano, lowerCase){
        let coberturas = ['habitual', 'premium', 'veraneio', 'all', 'required'];
        
        coberturas['all'] = [];

        coberturas['required'] = [ 'valorCoberturaIncendio', 'codigoClausulasPortoSeguroServicos', 'flagLMIDiscriminado' ]; //Itens required

        coberturas['habitual'] = [ //Itens Habitual
            'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 'codigoClausulasPortoSeguroServicos',
            'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes',
            'valorCoberturaQuebraVidros', 'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto',
            'valorCoberturaAlagamento', 'flagContratarValorDeNovo', 'flagLMIDiscriminado', 'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos',
            'valorSubtracaoBicicleta', 'valorNegocioCasa', 'valorPequenasReformas', 'valorFuneralFamiliar', 'valorDanosMorais', 'valorRCEmpregador'
        ];

        coberturas['premium'] = [ //Itens Habital Premium
            'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 'codigoClausulasPortoSeguroServicos',
            'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes',
            'valorCoberturaQuebraVidros', 'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto',
            'valorCoberturaAlagamento', 'flagContratarValorDeNovo', 'flagLMIDiscriminado', 'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos',
            'valorCoberturaHoleinOne', 'valorCoberturaDanosJardim', 'valorCoberturaObrasObjetosArte', 'valorCoberturaJoiasRelogios'
        ];

        coberturas['veraneio'] = [ //Itens Veraneio
            'valorCoberturaIncendio', 'valorCoberturaSubstracaoBens', 'valorCoberturaPagamentoAluguel', 'valorCoberturaRCFamiliar', 'codigoClausulasPortoSeguroServicos',
            'valorCoberturaDanosEletricos', 'valorCoberturaVendaval', 'valorCoberturaDesmoronamento', 'valorCoberturaVazamentosTanquesTubulacoes', 
            'valorCoberturaQuebraVidros', 'valorCoberturaPagamentoCondominio', 'valorCoberturaMorteAcidental', 'valorCoberturaTremorTerraTerremoto', 
            'valorCoberturaAlagamento', 'flagContratarValorDeNovo', 'flagLMIDiscriminado', 'valorCoberturaEdificio', 'valorCoberturaConteudo', 'valorImpactoVeiculos'
        ];

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

// ESSENCIAL -> CONFORTO -> EXCLUSIVE
var valoresCobertura = {};
var dadosCobertura = {};

$(document).ready(function() {
    

    var armazenarVigencia = [];

    var indexJanela = -1;
    var tempoVigencia = 0;
    var tipoProduto = false;
    var listaPlano = ['essencial', 'conforto', 'exclusive'];
    var tipoResidencia = 0;

    var tentativaTimeOut = { 
        essencial: [0, 0, 0], 
        conforto: [0, 0, 0], 
        exclusive: [0, 0, 0] 
    };

    var loadingPlanos = { 
        essencial: [false, false, false], 
        conforto: [false, false, false], 
        exclusive: [false, false, false] 
    };

    var loadingScreen = $("#loading-screen").hide();

    $(".modal-dialog").on("click", function(e) { e.stopPropagation(); });

    function validacaoInicial(){
        //loadingScreen.show();
        let storageForm = localStorage.getItem('prime-form');
        let storageDadosCoberturas = localStorage.getItem('prime-dadosCobertura');
        let storageValoresCoberturas = localStorage.getItem('prime-valoresCobertura');

        if (!storageForm || !storageDadosCoberturas || !storageValoresCoberturas){  
            console.log('A');
            //$(window).on('beforeunload', ()=>{ loadingScreen.hide(); });
            //window.location.href = '/';
            return;
        }

        storageForm = JSON.parse(storageForm);
        dadosCobertura = JSON.parse(storageDadosCoberturas);
        valoresCobertura = JSON.parse(storageValoresCoberturas);

        if (!validarTipoResidencia(storageForm.tipoResidencia)){  
            console.log('B');
            //$(window).on('beforeunload', ()=>{ loadingScreen.hide(); });
            //window.location.href = '/';
            return;
        }      

        tipoResidencia = parseInt(storageForm.tipoResidencia);
        if ([1, 2, 3].includes(tipoResidencia)){ tipoProduto = 'habitual'; }
        if ([4, 8].includes(tipoResidencia)){ tipoProduto = 'veraneio'; }
        if (!tipoProduto){
            console.log('C');
            //$(window).on('beforeunload', ()=>{ loadingScreen.hide(); });
            //window.location.href = '/';
            return;
        }

        $('.my-pills-link').removeClass('active');
        $('#btn-vigencia-1').addClass('active');
        tempoVigencia = 1;

        gerarToggleSwitch();
        
        inciarCoberturaMain(tipoProduto, 'essencial', tempoVigencia, tipoResidencia, false);
        inciarCoberturaMain(tipoProduto, 'conforto', tempoVigencia, tipoResidencia, false);
        inciarCoberturaMain(tipoProduto, 'exclusive', tempoVigencia, tipoResidencia, false);


    
        



        
    }

    
    validacaoInicial();        

});

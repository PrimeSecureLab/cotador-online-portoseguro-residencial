const dotenv = require('dotenv');
dotenv.config();

class ValidadorGeral extends Object {
    constructor(){
        super();
        this.pattern = {
        };
        this.listaUF = [ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO' ];
    }
    

};
module.exports = Validador;
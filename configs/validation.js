const validation = {
    cpfPattern: /^\d{11}$/,
    nomePattern: /^[A-Za-z\s]+$/,
    _nomePattern: /^([^0-9]*).{1,}$/,
    numeroTelefonePattern: /^\d{10,11}$/,
    tipotelefonePattern: /^(fixo|celular)$/,
    _tipoTelefonePattern: /^[0-1]{1}$/,
    datanascimentoPattern: /^\d{4}\-\d{2}\-\d{2}$/,
    _dataNascimentoPattern: /^\d{2}\-\d{2}\-\d{4}$/,
    cepPattern: /^\d{5}\-\d{3}$/,
    _cepPattern: /^\d{8}$/,
    enderecoPattern: /^[A-Za-z0-9\s\,\.\-]+$/,
    _enderecoPattern: /^.{2,200}$/,
    tiporuaPattern: /^(rua|avenida|travessa|alameda)$/,
    _tipoRuaPattern: /^[0-7]{1}$/,
    numeroPattern: /^\d+$/,
    bairroPattern: /^[A-Za-z\s\.\-]+$/,
    _bairroPattern: /^.{2,200}$/,
    cidadePattern: /^[A-Za-z\s\.\-]+$/,
    _cidadePattern: /^([^0-9]*).{2,}$/,
    ufPattern: /^[A-Z]{2}$/,
    tipoResidenciaPattern: /^[1-7]{1}$/,
    eloCardPattern: /^(40117[8-9]|4011[8-9][0-9]|4[23][0-9]{2}|5[1-5][0-9]{2}|5[6][0-9][0-9]|6[0-9]{3})[0-9]{10}$/,
    dinersCardPattern: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    visaCardPattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
    masterCardPattern: /^5[1-5][0-9]{14}$/,
    _geral: /^[A-zÀ-ú0-9\s]+$/,
    listaTipoRua: [ "R", "AV", "AL", "CH", "COND", "CJ", "EST", "LD", "LRG", "PRQ", "PC", "PR", "Q", "ROD", "TV", "V" ],
    listaUF: [ 
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 
        'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ]
};

module.exports = validation;
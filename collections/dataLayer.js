const mongoose = require('mongoose');

const dataLayerSchema = new mongoose.Schema({
    session_id: { type: String },
    primeiraInteracao: { type: Date },
    ultimaInteracao: { type: Date },
    listaInteracoes: { type: mongoose.Schema.Types.Mixed, required: false },
    user: { type: mongoose.Schema.Types.Mixed, required: false },
    dados: { type: mongoose.Schema.Types.Mixed, required: false }
});

const DataLayer = mongoose.model('DataLayer', dataLayerSchema);

module.exports = DataLayer;
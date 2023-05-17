const mongoose = require('mongoose');

const dataLayerSchema = new mongoose.Schema({
    session_id: { type: String },
    primeiraInteracao: { type: Date },
    ultimaInteracao: { type: Date },
    dados: { type: mongoose.Schema.Types.Mixed, required: false }
});

const DataLayer = mongoose.model('DataLayer', dataLayerSchema);

module.exports = DataLayer;
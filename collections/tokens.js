const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    access_token: { type: String },
    token_type: { type: String },
    expires_in: { type: String },
    created_at: { type: Date }
});

const Tokens = mongoose.model('Tokens', tokenSchema);

module.exports = Tokens;
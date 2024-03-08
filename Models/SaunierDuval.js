const mongoose = require('mongoose');

const ErrorSchema = new mongoose.Schema(
    {
        model: { type: String, required: true },
        errorCode: { type: String, required: true },
        errorDescription: { type: String, required: true },
        reason: { type: String }
    }
)

module.exports = mongoose.model('SaunierDuval', ErrorSchema);
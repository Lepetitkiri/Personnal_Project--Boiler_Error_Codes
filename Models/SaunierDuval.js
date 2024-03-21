const mongoose = require('mongoose');

// Liste de valeurs autorisées : 
const validEnergyValues = require('../Ressources/ValidEnergyValues');
const validSaunierDuvalModelValues = require('../Ressources/ValidSaunierDuvalModelsValues');

// Definition d'un schéma pour un code erreur spécifique :
const ErrorCodeSchema = new mongoose.Schema({
    errorName: { type: String, required: true },
    errorDescription: { type: String, required: true },
    errorReason: { type: String },
    repairInstructions: { type: String, required: true }
});

// Definition d'un schéma pour chaque équipement :
const ErrorModelSchema = new mongoose.Schema({
    energy: { type: String, required: true, enum: validEnergyValues },
    model: { type: String, required: true, enum: validSaunierDuvalModelValues },
    errorCodes: [ErrorCodeSchema]
});

ErrorModelSchema.index({ energy: 1, model: 1 }, { unique: true });

module.exports = mongoose.model('SaunierDuval', ErrorModelSchema);
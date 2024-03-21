const { validationResult } = require('express-validator');

const validSaunierDuvalModelValues = require('../Ressources/ValidSaunierDuvalModelsValues');

exports.SaunierDuvalMiddleware = (req, res, next) => {

    // Vérification de la présence des données nécéssaires à la requête
    if (!req.body.model || !req.body.errorName) {
        return res.status(400).json({
            message: 'Merci d\'inclure les données \'model\' et \'errorName\' dans votre requête sinon on ne peut pas trouver votre code erreur et vous ne pourrez pas dépanner votre client !'
        })
    }

    //Vérification du format des données nécessaires à la requête
    const errorCodeRegex = /^[a-zA-Z0-9+]+$/;
    if (!validSaunierDuvalModelValues.includes(req.body.model)) {
        return res.status(400).json({
            message: `Les modèles disponibles chez Saunier Duval sont : ${validSaunierDuvalModelValues}`
        });
    }
    if (!errorCodeRegex.test(req.body.errorName)) {
        return res.status(400).json({
            message: 'Le code erreur ne correspond pas au format attendu. Merci de n\'inclure que des chiffres et des lettres'
        })
    }

    return next();
};
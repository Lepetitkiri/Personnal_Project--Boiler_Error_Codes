const { isRouteErrorResponse } = require('react-router');
const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const SaunierDuval = require('../Models/SaunierDuval');

require("dotenv").config();

// Récupértion d'un code erreur spécifique - all users 
exports.getOneError = (req, res, next) => {

    SaunierDuval.findOne({ model: req.body.model, 'errorCodes': { $elemMatch: { errorName: req.body.errorName } } },
        { 'errorCodes.$': 1 }) // Projection pour renvoyer uniquement le premier élément correspondant de l'array errorCodes
        .then((errorData) => {
            if (!errorData) {
                return res.status(404).json({
                    message: 'Votre code erreur ne fait pas partie de la base de données. Nous faisons de notre mieux pour l\'ajouter rapidement mais on ne peut pas etre au four et au moulin !'
                });
            }
            res.status(200).json(errorData);
        })
        .catch((error) => {
            console.error('Erreur de traitement de la requête de recherche dans la base de données:', error);
            res.status(500).json({ error: 'Erreur de traitement de la requête de recherche dans la base de données' });
        });

};
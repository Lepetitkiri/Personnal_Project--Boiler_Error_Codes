const mongoose = require('mongoose');
const express = require('express');
const app = express();
const helmet = require('helmet');

const ErrorRoutes = require('./routes/Error');

require('dotenv').config();

// Fonction de connection à la base de données MongoDB
function connectToMongoDBDatabase() {
    mongoose.connect(process.env.REACT_APP_MONGODB_CONNECTION_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch((error) => console.log('Connexion à MongoDB échouée ! Voici pourquoi : ', error));
}

connectToMongoDBDatabase();

/* Prolèmes de CORS*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
});
// Gestion spécifique pour les requêtes OPTIONS pour CORS
app.options('*', (req, res) => {
    res.sendStatus(200);
});

// Middleware express.json() à express pour pouvoir récupérer les données des requêtes via req.body
app.use(express.json());
// Routes 
app.use('/api/Error', ErrorRoutes);

//Middleware de sécurité contre les attaques courantes
app.use(helmet());

module.exports = app;
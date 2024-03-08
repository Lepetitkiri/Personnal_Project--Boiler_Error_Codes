const rateLimit = require('express-rate-limit');

// Limitation du nombre de requête possible par un même utilisateur
exports.limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 50,
    message: 'Vous avez dépassé le nombre maximal de requêtes par heure. Revenez dans une heure pour pouvoir effectuer une nouvelle requête !'
});
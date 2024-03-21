const express = require('express');
const router = express.Router();

const { SaunierDuvalMiddleware } = require('../Middleware/SaunierDuvalMiddleware');
const { limiter } = require('../Middleware/RateLimit');

const { getOneError } = require('../Controllers/Error');

router.get('/SaunierDuval', limiter, SaunierDuvalMiddleware, getOneError);

module.exports = router;

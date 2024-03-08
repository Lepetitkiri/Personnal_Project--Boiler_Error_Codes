const express = require('express');
const router = express.Router();

const { SaunierDuvalMiddleware } = require('../Middleware/SaunierDuvalMiddleware');

const { getOneError } = require('../Controllers/Error');

router.get('/SaunierDuval', SaunierDuvalMiddleware, getOneError);

module.exports = router;
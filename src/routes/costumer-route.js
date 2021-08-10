'use strict'

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controllers/costumer-controller');

router.post('/',controller.post);
router.post('/authenticate',controller.authenticate);
router.post('/refresh-token',authService.authorize,controller.refreshToken)
module.exports = router;
'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/products-controller');
const authService = require('../services/auth-services');

 router.post('/',authService.isAdmin,controller.post);
 router.put('/:id',authService.isAdmin,controller.put);
 router.delete('/',authService.isAdmin,controller.delete);
 router.get('/',controller.get);
 router.get('/:slug',controller.getBySlug);
 router.get('/id/:id',controller.getById);
 router.get('/tags/:tags',controller.getByTags);
 
 module.exports = router;
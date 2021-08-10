const express = require('express');
const bodyParser = require('body-parser'); // para converter o corpo pra JSON
const app = express();
const router = express.Router(); //arquivo de rotas, para que por uma URL o usuario chegue a aplicaçao
const mongoose = require('mongoose');
const config = require('./config');

//conectando ao banco
mongoose.connect(config.connectionString);

//carregando os models
const  Products = require('../src/models/products');
const Costumer = require('../src/models/costumer');
const Order = require('../src/models/order');

//carrega as rotas
const indexRoute = require('./routes/index-route'); 
const productRoute = require('./routes/products-route');
const costumerRoute = require('./routes/costumer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/',indexRoute);
app.use('/products',productRoute);
app.use('/costumer',costumerRoute);
app.use('/order',orderRoute);

module.exports = app;
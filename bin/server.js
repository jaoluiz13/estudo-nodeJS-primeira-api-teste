'use strict' //força o codigo a ser criterioso.

//criando um servidor para ouvir uma determinada porta e enviar uma resposta
//importando os pacotes instalados : http/debug/express
const app = require('../src/app');
const http = require('http');
const express = require('express');
const { Router } = require('express');
const debug = require('debug')('nodestr:server');


const port = nomalizePort(process.env.PORT || '3000');
app.set('port',port); //setando a porta
const server = http.createServer(app); //criando o servidor

server.listen(port);
server.on('error',onError);
server.on('listening',onListen);
console.log("API NA PORTA "+ port);


//criando  uma funcao para normlizar uma porta disponivel 

function nomalizePort (val){
    const port = parseInt(val,10);
    
    if(isNaN(port)){
        return val;
    }
    if(port >= 0){
        return port;
    }
    return false;
}

//funcao para tratar possiveis erros

function onError(error){
    if(error.sycall != 'listen'){
        throw error;
    }

    const bind = typeof port == 'string' ?
    'Pipe' + port :
    'Port' + port;

    switch(error.code){
        case'EACCES' : 
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error(bind + 'already in use');
            process.exit(1);
            break;
        default:
            throw error;

    }
}

// funcao para o DEBUG

function onListen(){
    const addr = server.address();
    const bind= typeof addr == 'string'
    ? 'pipe ' + addr
    : 'port' + addr.port;

    debug('Listening on'+bind);

}
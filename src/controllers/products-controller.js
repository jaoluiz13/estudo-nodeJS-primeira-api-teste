'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/products-repository');

exports.get = async(req,res,next) =>{
    try{
       var data = await repository.get();
       res.status(200).send(data);
    } catch(e){
            res.status(500).send({
            message:"Falha no processamento da requisição"
        });
    }
}

exports.getBySlug = async(req,res,next) =>{
    try{
       var data = await repository.getBySlug(req.params.slug);
       res.status(200).send(data);
    } catch(e){
            res.status(500).send({
            message:"Falha no processamento da requisição"
        });
    }
}
exports.getById = async(req,res,next) =>{
    try{
      var data = await repository.getById(req.params.id);
      res.status(200).send(data);
    } catch(e){
            res.status(500).send({
            message:"Falha no processamento da requisição"
        });
    }
}

exports.getByTags = async(req,res,next) =>{
    try{
     var data = await repository.getByTags(req.params.tags);
     res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message:"Falha no processamento da requisição"
        });
    }
}


exports.post = async(req,res,next) =>{

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title,3,"O titulo deve ter pelo menos 3 caracteres");
    contract.hasMinLen(req.body.slug,3,"A slug deve ter pelo menos 3 caracteres");
    contract.hasMinLen(req.body.description,3,"A descrição deve ter pelo menos 3 caracteres");
    //Se os dados forem invalidos 
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
    }
    try{
        await repository.create(req.body);
        res.status(201).send({
            message:"Produto cadastrado com sucesso"
        });
    }catch(e){
        res.status(500).send({
            message:"Falha no processamento da requisição"
        });
    }
    
}

exports.put = async(req,res,next) =>{
    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message:"Produto atualizado com sucesso"
        });

    }catch(e){
        res.status(500).send({
            message:"Falha no processamento da requisição"
        });
    }
}

exports.delete = async(req,res,next) =>{

    try{
        await repository.delete(req.body.id);
        res.status(200).send({
            message:"Produto deletado com sucesso"
        })
    }catch(e){
        res.status(500).send({
            message:"Falha no processamento da requisição"
        });
    }
}


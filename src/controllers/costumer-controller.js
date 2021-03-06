'user strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/costumer-repository');
const md5 = require('md5');
const emailService = require('../services/email-services');
const authService = require('../services/auth-services');

exports.post = async(req,res,next) =>{

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name,3,"O nome deve ter pelo menos 3 caracteres");
    contract.isEmail(req.body.email,"O email é invalido");
    contract.hasMinLen(req.body.password,6,"A senha deve ter pelo menos 6 caracteres");
    //Se os dados forem invalidos 
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
    }
    try{
        await repository.create({
            name: req.body.name,
            email:req.body.email,
            password:md5(req.body.password + global.SALT_KEY),
            roles:["user"]
        });
        
        emailService.send(req.body.email,"Bem vindo a Aplicação este é apenas um teste by:Joao Luiz",global.EMAIL_TMPL.replace('{0}',req.body.name));
        res.status(201).send({
            message:"Cliente cadastrado com sucesso"
        });
    }catch(e){
        res.status(500).send({
            message:"Falha no processamento da requisição"
        });
    }
    
};

exports.authenticate = async(req,res,next) =>{

    let contract = new ValidationContract();
    contract.isEmail(req.body.email,"O email é invalido");
    contract.hasMinLen(req.body.password,6,"A senha deve ter pelo menos 6 caracteres");
    //Se os dados forem invalidos 
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
    }
    try{
       const costumer = await repository.authenticate({
            email:req.body.email,
            password:md5(req.body.password + global.SALT_KEY)

        });

        if(!costumer){
            res.status(404).send({
                message:"Usuario ou senha estão incorretos"
            })
        }
        
        const token = await authService.generateToken({
                id: costumer.id,
                email:costumer.email,
                name:costumer.name
            })

        res.status(201).send({
            token:token,
            data:{
                email:costumer.email,
                name:costumer.name
            }
        });
    }catch(e){
        res.status(500).send({
            message:"Falha no processamento da requisição"
        });
    }
    
}

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};



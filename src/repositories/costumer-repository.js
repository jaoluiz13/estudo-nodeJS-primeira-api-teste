'use strict'

const mongoonse = require('mongoose');
const Costumer = mongoonse.model('Costumer');

exports.create = async(data) =>{

    var costumer = new Costumer(data);

    await costumer.save();
};

exports.authenticate = async(data) =>{
    const res = Costumer.findOne({ email:data.email, password:data.password})
    return res;
};
exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}
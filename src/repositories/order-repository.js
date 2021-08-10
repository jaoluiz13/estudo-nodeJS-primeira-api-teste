'use strict'

const mongoonse = require('mongoose');
const Order = mongoonse.model('Order');

exports.create = async(data) =>{

    var order = new Order(data);
    await order.save();
},

exports.get= async(data) =>{
    var res = await Order.find({},'number status ').populate('costumer','name email').populate('items.product','title price');
    return res;

};

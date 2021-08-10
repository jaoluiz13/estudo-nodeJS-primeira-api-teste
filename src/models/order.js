'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    number:{
        type:String,
        required: true
    },
    costumer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Costumer'
    },
    createDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    status:{
        type:String,
        required:true,
        enum:['created','done'],
        default:'created'
    },
    items:[{
            quantity:{
                type:Number,
                required:true,
                default:1
            },
            price:{
                type:Number,
                required:true
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Costumer'
            }
    }],

});

module.exports = mongoose.model('Order',schema);
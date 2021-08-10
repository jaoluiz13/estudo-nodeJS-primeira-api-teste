'use strict'

const mongoonse = require('mongoose');
const Products = mongoonse.model('Products');

exports.get= async() =>{
    const res = await Products.find({active: true}, 'title price slug');
    return res;

};
exports.getBySlug = async(slug) =>{
   const res = Products.findOne({ slug:slug, active :true },'title description slug price tags' );
   return res;
};

exports.getById = async(id) =>{
    const res= Products.findById(id);
    return res;
};

exports.getByTags = async(tags) =>{
    const res= Products.find({tags:tags, active:true}, 'title description price tags' );
    return res;
};

exports.create = async(data) =>{

    var products = new Products(data);

    await products.save();
};

exports.update = async(id,data) =>{
   await Products.findByIdAndUpdate(id,{
        $set:{
            title:data.title,
            description:data.description,
            price: data.price,
            slug: data.slug
        }
    });
}

exports.delete=async(id) =>{
   await Products.findOneAndRemove(req.body.id);
}

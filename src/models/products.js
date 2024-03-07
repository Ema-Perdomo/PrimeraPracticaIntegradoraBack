/*{
    "title": "Monitor",
    "description": "Monitor HD 1080p 24 pulgadas",
    "price": 1500,
    "stock": 25,
    "code": "L123",
    "thumbnail": [],
    "id": "1747ea8e4b47e46934ba",
    "img": ""
},

*/ 

import { Schema, model } from 'mongoose';


//Esquema de productos
const productSchema = new Schema({
    title : {
        type:  String,
        required: true},
    description : {
        type:  String,
        required: true
    },
    stock: {
        type:  Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price : {
        type:  Number,
        required: true
    },
    thumbnail:{
        //Si no me ingresan valor, se guarda un array vacio por defecto
        defaul: []
    }
})

const productModel = model("products", productSchema)

export default productModel;
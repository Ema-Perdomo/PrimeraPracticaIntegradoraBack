import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    //Array de productos...
    products: [
        //... con cada objeto dentro del array va a tener un id referenciando a la colleccion products 
        // y una cantidad
        {
            id_prod: {
                type: Schema.Types.ObjectId,
                required: true,
                //Voy a referenciar a la coleccion de productos(como foreing key en SQL)
                //el id_prod va a tener que existir en un documento de la coleccion de productos
                ref: 'products' 
            },
            quantity:{
                type: Number,
                required: true
            }
        }
    ] 
})

const  cartModel = model("carts", cartSchema)
export default cartModel 
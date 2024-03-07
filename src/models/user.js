import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    first_name: {
        type:  String,
        required: true
    },
    last_name: {
        type:  String,
        required: true
    },
    password: {
        type:  Number,
        required: true
    },
    age: {
        type:  Number,
        required: true
    },
    email: {
        type: String,
        unique: true}, //No se puede tener 2 users con el mismo email
    role: {
        type: String,
        default: "user"
    }
})

export const userModel = model("users", userSchema);
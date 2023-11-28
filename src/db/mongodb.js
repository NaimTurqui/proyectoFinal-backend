import mongoose from 'mongoose';

const URI = 'mongodb+srv://developer:dgubRBmh8Uc0cyd3@cluster0.5gv3yck.mongodb.net/ecommerce'

export const initDatabase = async ()=>{
    try{
        await mongoose.connect(URI)
        console.log('conectado a la base de datos')
    } catch(error){
        console.log('Ha ocurrido un error al conectarse a la base de datos')
    }
}
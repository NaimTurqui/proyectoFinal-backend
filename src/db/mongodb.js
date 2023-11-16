import mongoose from 'mongoose';

const URI = 'mongodb+srv://developer:Fy8S0hYNvBp9rxpB@cluster0.ws8bzi0.mongodb.net/?retryWrites=true&w=majority'

export const initDatabase = async ()=>{
    try{
        await mongoose.connect(URI)
        console.log('conectado a la base de datos')
    } catch(error){

    }
}
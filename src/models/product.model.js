import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    titulo:{ type: String, requiered: true },
    description:{ type: String, requiered: true },
    precio: { type: Number, requiered: true },
    thumbnail:{ type: String, requiered: true },
    code:{ type: String, requiered: true },
    stock:{ type: Number, requiered: true },
},{timestamps: true})

export default mongoose.model('Product',ProductSchema)
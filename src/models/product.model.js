import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
    titulo:{ type: String, requiered: true },
    description:{ type: String, requiered: true },
    precio: { type: Number, requiered: true },
    thumbnail:{ type: String, requiered: true },
    category:{ type: String, requiered: true },
    stock:{ type: Number, requiered: true },
},{timestamps: true})

ProductSchema.plugin(mongoosePaginate);

export default mongoose.model('Product',ProductSchema)
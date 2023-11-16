import ProductModel from '../models/product.model.js';

export default class ProductsManager{

static get(){
    return ProductModel.find();
}

static async getById(pid){
const product=await ProductModel.findById(pid);
if(!product){
    throw new error("producto no encontrado")
}
return product
}

static async create(data){
    const porduct = await ProductModel.create(data);
    return product
}

static async updateById (sid,data){
    // const product = await ProductsManager.getById(sid)
    await ProductModel.updateOne({_id: sid},{$set: data});
}
static async deleteById (sid,data){
    await ProductModel.deleteOne({_id: sid});
}
}
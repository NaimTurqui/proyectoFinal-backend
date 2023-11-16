import express from 'express';
import ProductsManager from '../../dao/Products.manager.js';
const router = express.Router();

router.get ('/products', async(req,res)=>{
    const products = await ProductsManager.get();
    res.render('realTimeProducts', { products:products.map(product=>product.toJSON()) });

})
export default router


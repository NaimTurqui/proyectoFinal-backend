import express from 'express';
import ProductsManager from '../../dao/Products.manager.js';
const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        const products = await ProductsManager.get();
        res.render('index', { products: products.map(product => product.toJSON()) });
    } catch (error) {
        console.error('Error rendering template:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/chat', async (req, res) => {
res.render('chat');
});
export default router;


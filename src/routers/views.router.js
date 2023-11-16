import express from 'express';
import { promises as fs } from 'fs';
import {__dirname} from '../utils.js';
import ProductsManager from '../dao/products.Manager.js';
const router = express.Router();

router.get('/', async (req, res) => {
    // try {
    //     const productsData = await fs.readFile(__dirname + '/routers/products.json', 'utf8');
    //     const products = JSON.parse(productsData);
    //     res.render('index', { products });
    // } catch (error) {
    //     res.status(500).json({ error: 'Error al cargar los productos' });
    // }
    await ProductsManager.get()
});

// router.get('/realTimeProducts', async (req, res) => {
//     res.render('realTimeProducts', { title: 'p' });
// });


export default router;
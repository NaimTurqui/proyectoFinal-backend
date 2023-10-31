import express from 'express';
import { promises as fs } from 'fs';
import {__dirname} from '../utils.js';

const cartsFilePath = __dirname + '/carts.json';
const productsFilePath = __dirname + '/products.json';

const router = express.Router();

async function saveCarts(carts) {
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, '\t'), 'utf8');
}
async function loadProducts() {
    try {
        const data = await fs.readFile(productsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}
async function loadCarts() {
    try {
        const data = await fs.readFile(cartsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}
function generateId(existingItems) {
    const ids = new Set(existingItems.map(item => item.id));
    let newId = Math.floor(Math.random() * 1000);
    while (ids.has(newId.toString())) {
        newId = Math.floor(Math.random() * 1000);
    }
    return newId.toString();
}



router.post('/carts', async (req, res) => {
    const newCart = {
        id: generateId([]),
        products: [],
    };
    const carts = await loadCarts();
    carts.push(newCart);
    await saveCarts(carts);
    res.json(newCart);
});

router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const carts = await loadCarts();
    const cart = carts.find(c => c.id == cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({
            error: 'Carrito no encontrado'
        });
    }
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1; 
    const carts = await loadCarts();
    const cartIndex = carts.findIndex(c => c.id == cartId);
    const products = await loadProducts();
    const product = products.find(p => p.id == productId);

    if (cartIndex !== -1 && product) {
        const cart = carts[cartIndex];
        const existingProductIndex = cart.products.findIndex(p => p.product == productId);
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({
                product: productId,
                quantity: quantity
            });
        }
        await saveCarts(carts);
        res.json(cart);
    } else {
        res.status(404).json({
            error: 'Carrito o Producto no encontrado'
        });
    }
});
export default router;
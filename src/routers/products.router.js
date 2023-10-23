const express = require('express');
const router = express.Router();
const fs = require('fs').promises;


const productsFilePath = __dirname + '/products.json';


async function loadProducts() {
    try {
        const data = await fs.readFile(productsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}
async function saveProducts(products) {
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, '\t'), 'utf8');
}

function generateId(existingItems) {
    const ids = new Set(existingItems.map(item => item.id));
    let newId = Math.floor(Math.random() * 1000);
    while (ids.has(newId.toString())) {
        newId = Math.floor(Math.random() * 1000);
    }
    return newId.toString();
}




router.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit || null;
        const products = await loadProducts();
        if (limit) {
            res.json(products.slice(0, parseInt(limit)));
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener productos'
        });
    }
});

router.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    const products = await loadProducts();
    const product = products.find(p => p.id == productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({
            error: 'Producto no encontrado'
        });
    }
});

router.post('/products', async (req, res) => {
    const newProduct = req.body;
    const products = await loadProducts();
    const id = generateId(products);
    newProduct.id = id;
    products.push(newProduct);
    await saveProducts(products);
    res.json(newProduct);
});

router.put('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    const products = await loadProducts();
    const index = products.findIndex(p => p.id == productId);
    if (index !== -1) {
        products[index] = {
            ...products[index],
            ...updatedProduct
        };
        await saveProducts(products);
        res.json(products[index]);
    } else {
        res.status(404).json({
            error: 'Producto no encontrado'
        });
    }
});

router.delete('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    const products = await loadProducts();
    const index = products.findIndex(p => p.id == productId);
    if (index !== -1) {
        products.splice(index, 1);
        await saveProducts(products);
        res.json({
            message: 'Producto eliminado'
        });
    } else {
        res.status(404).json({
            error: 'Producto no encontrado'
        });
    }
});

module.exports = router;
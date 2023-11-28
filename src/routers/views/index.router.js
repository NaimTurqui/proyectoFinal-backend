import express from 'express';
import ProductsManager from '../../dao/Products.manager.js';
import productModel from "../../models/product.model.js";
import {
    baseUrl,
    buildResponsePaginated
} from '../../utils.js'
const router = express.Router();

// router.get('/listProducts', async (req, res) => {
//     try {
//         const products = await ProductsManager.get();
//         res.render('products', {
//             products: products.map(product => product.toJSON())
//         });
//     } catch (error) {
//         console.error('Error rendering template:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

router.get('/', (req, res) => {
    res.send('Hello Coder House 🖐️');
});
router.get('/chat', async (req, res) => {
    res.render('chat');


    router.get('/products', async (req, res) => {
        const {
            limit = 10, page = 1, sort, search
        } = req.query;

        const criteria = {};
        const options = {
            limit,
            page
        };
        if (sort) {
            options.sort = {
                precio: sort
            };
        }
        if (search) {
            criteria.category = search;
        }


        const result = await productModel.paginate(criteria, options);
        const data = buildResponsePaginated({
            ...result,
            sort,
            search
        },baseUrl);
        res.render('products', {
            ...data
        })
    })


});
export default router;
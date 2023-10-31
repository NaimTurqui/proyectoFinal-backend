import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import { promises as fs } from 'fs';


import productRouter from './routers/products.router.js';
import cartRouter from './routers/carts.router.js';
import {__dirname} from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'handlebars');

app.use('/api', productRouter,cartRouter);





export default app;
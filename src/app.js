import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import { promises as fs } from 'fs';


import productRouter from './routers/products.router.js';
import cartRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js'
import indexRouter from './routers/views/index.router.js'
import {__dirname} from './utils.js';
import productsApiRouter from './routers/api/products.router.js'

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
app.use(viewsRouter)
app.use('/', indexRouter);
app.use('/api', productsApiRouter);





export default app;
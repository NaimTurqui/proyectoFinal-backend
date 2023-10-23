const express = require('express');
const app = express();
const port = 8080;

const productRouter = require('./routers/products.router');
const cartRouter = require('./routers/carts.router');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome'
    });
});

app.use('/api', productRouter,cartRouter);

app.listen(port, () => {
    console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
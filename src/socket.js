import {
    Server
} from 'socket.io'
import {
    promises as fs
} from 'fs';
import {
    __dirname
} from './utils.js';
import messageModel from './models/message.model.js';
export let io;

const productsFilePath = __dirname + '/routers/products.json';
// let products = [];

// async function loadProducts() {
//     try {
//         const data = await fs.readFile(productsFilePath, 'utf8');
//         products = JSON.parse(data); 
//     } catch (error) {
//         products = [];
//     }
// }

// async function saveProducts() {
//     await fs.writeFile(productsFilePath, JSON.stringify(products, null, '\t'), 'utf8');
// }

// export const init = (httpServer) => {
//     io = new Server(httpServer);

//     io.on('connection', (socketClient) => {
//         socketClient.emit('product-list', products);

//         socketClient.on('addProduct', (newProduct) => {
//             products.push(newProduct);
//             saveProducts();
//             io.emit('product-list', products);
//         })

//         socketClient.on('deleteProduct', (productId) => {
//             const index = products.findIndex(product => product.id === productId);

//             if (index !== -1) {
//                 products.splice(index, 1);
//                 saveProducts();
//                 io.emit('product-list', products); 
//             }
//         });
//     });
// }
// loadProducts();

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', async (clientSocket) => {
        console.log(`Nuevo cliente socket conectado (${clientSocket.id})`);
        const messages = await messageModel.find({});
        clientSocket.emit('update-messages', messages);

        clientSocket.on('new-message', async (msg) => {
            await messageModel.create(msg);
            const messages = await messageModel.find({});
            io.emit('update-messages', messages);
        });

    });
};
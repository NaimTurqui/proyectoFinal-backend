const socket = io();

const productList = document.getElementById('productList');
const addProductForm = document.getElementById('addProductForm');
const deleteProductForm = document.getElementById('deleteProductForm');

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    socket.emit('addProduct', { name: productName, price: productPrice });
});

deleteProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productId = document.getElementById('productId').value;
    socket.emit('deleteProduct', productId);
});

socket.on('updateProducts', (products) => {
    productList.innerHTML = ''; 
    products.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price}`;
        productList.appendChild(li);
    });
});
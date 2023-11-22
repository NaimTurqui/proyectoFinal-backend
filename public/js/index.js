// const socket = io();

// const productList = document.getElementById('productList');
// const addProductForm = document.getElementById('addProductForm');
// const deleteProductForm = document.getElementById('deleteProductForm');


// socket.on('product-list', (products) => {

//     productList.innerText = '';
//     products.forEach((product) => {
//         const p = document.createElement('p');
//         p.innerText = `${product.title} : ${product.price}`
//         productList.appendChild(p)
//     });

// })

// addProductForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const productName = document.getElementById('productName').value;
//     const productPrice = document.getElementById('productPrice').value;
//     const productIdAdd = document.getElementById('productIdAdd').value;

//     socket.emit('addProduct', {
//         title: productName,
//         price: productPrice,
//         id: productIdAdd
//     });
//     productName.value = '';
//     productPrice.value = '';
//     productIdAdd.value = '';

// });

// deleteProductForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const productIdDelete = document.getElementById('productIdDelete').value;
//     socket.emit('deleteProduct', productIdDelete);
// });


(function () {
    let email = '';
    const socket = io();

    document.getElementById('form-message')
        .addEventListener('submit', (event) => {
            event.preventDefault();
            const input = document.getElementById('input-message');
            const newMsg = {
                user: email,
                body: input.value,
            };
            input.value = '';
            input.focus();
            socket.emit('new-message', newMsg);
        });

    socket.on('update-messages', (messages) => {
        console.log('messages', messages);
        const logMessages = document.getElementById('log-messages');
        logMessages.innerText = '';
        messages.forEach((message) => {
            const p = document.createElement('p');
            p.innerText = `${message.user}: ${message.body}`;
            logMessages.appendChild(p);
        });
    });

    Swal.fire({
            title: 'Identificate',
            input: 'text',
            inputLabel: 'Ingresa tu correo',
            allowOutsideClick: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'Necesitamos que ingreses un correo para continuar!';
                }
            },
        })
        .then((result) => {
            email = result.value.trim();
            console.log(`Hola ${email}, bienvenido 🖐️`);
        });

})();
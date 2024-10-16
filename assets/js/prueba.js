document.addEventListener('DOMContentLoaded', function () {

    const productos = document.querySelectorAll('.producto');
    const listaCarro = document.querySelector('.cart_list');
    const totalElemento = document.querySelector('.total span');
    const vaciarCarrito = document.querySelector('.clear-cart');
    const finalizarCompra = document.querySelector('.Finalizar');

    let cart = [];

   

    vaciarCarrito.addEventListener('click', clearcart);
    finalizarCompra.addEventListener('click', finalizarCompraPrompt);

    const articulos = [
        {
            nombre: "Leche 1LT",
            precio: 1350,
            img: "assets/img/l.webp",
            descripcion:`Descripcion:Leche natural entera Colun es obtenida a partir los mejores campos`,             
            id: "1"
        }, 
        {
            nombre: "Banana 1KG",
            precio: 1150,
            img: "assets/img/b.png", 
            descripcion:`Descripción: Bananas frescas de la mejor calidad, frescura,y Sabor 1KG.`, 
            id: "2"
        },
        {
            nombre: "Pan Molde 770GR",
            precio: 2460,
            img: "assets/img/m.JPG", 
            descripcion:`Descripción:Pan de molde blanco Castaño XL sin lactosa bolsa 770GR`, 
            id: "3"
        },
        {
            nombre: "Mermelada Vivo frambuesa 200GR",
            precio: 1360,
            img: "assets/img/mm.webp", 
            descripcion:`Mermelada elaborada en base a damascos,con trozos de frutas`, 
            id: "4"
        },
        {
            nombre: "Azúcar cubitos 420GR",
            precio: 1880,
            img: "assets/img/a.webp", 
            descripcion:`Cubitos para aquellos más tradicionales, una opción simple y elegante para endulzar `, 
            id: "5"
        },
        {
            nombre: "Queso brie Quillayes 120g",
            precio: 4650,
            img: "assets/img/b.jpg", 
            descripcion:`Producto certificado Kosher. Características: Queso Ingredientes:Leche, crema leche`, 
            id: "6"
        }
    ];
 // Llamada para inyectar productos al cargar la página
 cardInjection(articulos);
    // Función para inyectar tarjetas de productos
    function cardInjection(articulos) {
        let cards = '';
        articulos.forEach(product => {
            cards += `
                <div class="card" style="width: 15rem;">
                    <div class="producto" data-id="${product.id}" data-name="${product.nombre}" data-price="${product.precio}">
                        <img src="${product.img}" class="card-img-top" alt="${product.nombre}">
                        <h5 class="card-title">${product.nombre}</h5>
                        <p class="card-text">${product.descripcion}</p>
                        <p class="precio">$${product.precio}</p>
                        <a href="#" id="agregar" class="btn btn-primary">Agregar</a>
                    </div>
                </div>`;
        });
        document.getElementById('product_container').innerHTML = cards;

        // Agregar los eventos de click a los botones de agregar
        const addToCarButtons = document.querySelectorAll('#agregar');
        addToCarButtons.forEach((button, index) => {
            button.addEventListener('click', () => addToCar(articulos[index]));
        });
    }

    function addToCar(producto) {
        const productoId = producto.id;
        const productoNombre = producto.nombre;
        const productoPrecio = producto.precio;

        const existenciaDeProductos = cart.find(item => item.id === productoId);
        if (existenciaDeProductos) {
            existenciaDeProductos.cantidad += 1;
        } else {
            cart.push({ id: productoId, name: productoNombre, precio: productoPrecio, cantidad: 1 });
        }
        updateCartUI();
    }

    // Función para actualizar la interfaz del carrito
    function updateCartUI() {
        listaCarro.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const lisItem = document.createElement('li');
            lisItem.innerHTML = `
                ${item.name} x ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}
                <button class="remove-one" data-id="${item.id}">Retirar</button>
                <button class="remove-item" data-id="${item.id}">Eliminar Artículo</button>
            `;
            listaCarro.appendChild(lisItem);
            total += item.precio * item.cantidad;
        });

        totalElemento.textContent = `${total.toFixed(2)}`;

        // Añadir el evento para quitar un solo producto
        const removeOneButtons = document.querySelectorAll('.remove-one');
        removeOneButtons.forEach(button => {
            button.addEventListener('click', () => removeOneItem(button.dataset.id));
        });

        // Añadir el evento para eliminar completamente el producto
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => removeItem(button.dataset.id));
        });
    }

    // Función para remover un producto del carrito uno por uno
    function removeOneItem(id) {
        const productoEnCarrito = cart.find(item => item.id === id);
        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad > 1) {
                productoEnCarrito.cantidad -= 1;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
        }
        updateCartUI();
    }

    // Función para remover completamente un producto del carrito
    function removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    }

    // Función para vaciar el carrito
    function clearcart() {
        cart = [];
        updateCartUI();
    }

    // Función para mostrar el total al finalizar la compra
    function finalizarCompraPrompt() {
        if (cart.length > 0) { 
            let resumenCompra = 'Resumen de su compra:\n';
            cart.forEach(item => {
                resumenCompra += `${item.name} x ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}\n`;
            });

            const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
            resumenCompra += `\nTotal: $${total.toFixed(2)}`;

            alert(resumenCompra);
        } else {
            alert('Su carrito está vacío.');
        }
    }
});

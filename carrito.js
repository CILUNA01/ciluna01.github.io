// carrito.js - JAVASCRIPT PARA LA PÁGINA DEL CARRITO

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const headerCartCount = document.getElementById('header-cart-count');

    // Cargar carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Mostrar productos en el carrito
    function mostrarCarrito() {
        // Actualizar contador del header
        headerCartCount.textContent = carrito.length;
        
        // Si el carrito está vacío
        if (carrito.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutBtn.disabled = true;
            return;
        }

        // Ocultar mensaje de carrito vacío
        emptyCartMessage.style.display = 'none';
        checkoutBtn.disabled = false;

        // Generar HTML para cada producto
        let carritoHTML = '';
        let subtotal = 0;

        carrito.forEach((producto, index) => {
            const precioNumerico = parseFloat(producto.precio.replace('$', '')) || 0;
            subtotal += precioNumerico;

            carritoHTML += `
                <div class="cart-item" data-index="${index}">
                    <div class="cart-item-image ${!producto.imagen ? 'placeholder' : ''}">
                        ${producto.imagen 
                            ? `<img src="${producto.imagen}" alt="${producto.servicio}">`
                            : 'Sin imagen'
                        }
                    </div>
                    <div class="item-details">
                        <h3>${producto.servicio}</h3>
                        <p><strong>Prenda:</strong> ${producto.prenda}</p>
                        <p><strong>Medidas:</strong> ${producto.medidas}</p>
                        <p><strong>Cantidad:</strong> ${producto.cantidad}</p>
                    </div>
                    <div class="item-price">
                        <span>${producto.precio}</span>
                        <button class="remove-item" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                    </div>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = carritoHTML;

        // Calcular totales
        const shipping = 50.00; // Costo fijo de envío
        const total = subtotal + shipping;

        // Actualizar precios
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Eliminar producto del carrito
    window.eliminarDelCarrito = function(index) {
        if (confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
            
            // Actualizar contador en todas las páginas
            actualizarContadorGlobal();
        }
    }

    // Actualizar contador en todas las páginas
    function actualizarContadorGlobal() {
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach(count => {
            count.textContent = carrito.length;
        });
    }

    // Procesar pago
    checkoutBtn.addEventListener('click', function() {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        // Aquí iría la integración con el sistema de pago
        // Por ahora solo mostramos un mensaje
        alert('Redirigiendo al proceso de pago...\n\nEsta funcionalidad se integraría con Mercado Pago, PayPal, etc.');
        
        // En un sistema real, aquí procesarías el pago
        // y posiblemente vaciarías el carrito después del pago exitoso
    });

    // Inicializar carrito al cargar la página
    mostrarCarrito();
});
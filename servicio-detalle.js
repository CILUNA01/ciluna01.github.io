// servicio-detalle.js - JAVASCRIPT PARA PÁGINAS DE SERVICIO

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const designUpload = document.getElementById('design-upload');
    const imagePreview = document.getElementById('image-preview');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const quantityInput = document.getElementById('quantity');
    const estimatedPrice = document.getElementById('estimated-price');
    const addToCartBtn = document.getElementById('add-to-cart');
    const modal = document.getElementById('confirmation-modal');
    const productSummary = document.getElementById('product-summary');
    const confirmAddBtn = document.getElementById('confirm-add');
    const cancelAddBtn = document.getElementById('cancel-add');

    // Inicializar galería
    initGallery();
    
    // Inicializar funcionalidades del formulario
    initForm();

    // FUNCIONALIDAD PARA VIDEOS
    function initGallery() {
        const videoItems = document.querySelectorAll('.video-item');
        const imageItems = document.querySelectorAll('.image-item');

        // Videos se reproducen en hover (opcional)
        videoItems.forEach(item => {
            const video = item.querySelector('video');
            const mediaContainer = item.querySelector('.media-container');

            // Reproducir video al hacer hover
            mediaContainer.addEventListener('mouseenter', function() {
                if (video) {
                    video.play().catch(e => {
                        // Silenciar error
                    });
                }
            });

            // Pausar video al salir
            mediaContainer.addEventListener('mouseleave', function() {
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        });

        // Efectos para imágenes
        imageItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                item.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // FUNCIONALIDAD PARA FORMULARIO
    function initForm() {
        // Previsualizar imagen
        designUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Diseño preview">`;
                };
                reader.readAsDataURL(file);
            }
        });

        // Calcular precio cuando cambian las opciones
        function calcularPrecio() {
            const width = parseInt(widthInput.value) || 0;
            const height = parseInt(heightInput.value) || 0;
            const quantity = parseInt(quantityInput.value) || 1;
            
            // Fórmula simple de ejemplo
            const area = width * height;
            const precioBase = area * 0.1; // $0.10 por cm²
            const total = (precioBase * quantity).toFixed(2);
            
            estimatedPrice.textContent = `$${total}`;
        }

        // Escuchar cambios en inputs
        widthInput.addEventListener('input', calcularPrecio);
        heightInput.addEventListener('input', calcularPrecio);
        quantityInput.addEventListener('input', calcularPrecio);

        // Agregar al carrito
        addToCartBtn.addEventListener('click', function() {
            // Mostrar resumen en el modal
            const summary = `
                <p><strong>Servicio:</strong> Bordado</p>
                <p><strong>Prenda:</strong> ${document.getElementById('garment-type').value}</p>
                <p><strong>Medidas:</strong> ${widthInput.value}x${heightInput.value} cm</p>
                <p><strong>Cantidad:</strong> ${quantityInput.value}</p>
                <p><strong>Precio:</strong> ${estimatedPrice.textContent}</p>
            `;
            productSummary.innerHTML = summary;
            
            // Mostrar modal
            modal.style.display = 'block';
        });

        // Confirmar agregar al carrito
        confirmAddBtn.addEventListener('click', function() {
            const productData = {
                servicio: 'Bordado',
                prenda: document.getElementById('garment-type').value,
                medidas: `${widthInput.value}x${heightInput.value} cm`,
                cantidad: quantityInput.value,
                precio: estimatedPrice.textContent,
                imagen: designUpload.files[0] ? URL.createObjectURL(designUpload.files[0]) : null
            };

            // Guardar en localStorage
            guardarEnCarrito(productData);
            
            // Cerrar modal
            modal.style.display = 'none';
            
            // Mostrar mensaje
            alert('Producto agregado al carrito correctamente');
        });

        // Cancelar
        cancelAddBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Inicializar precio
        calcularPrecio();
    }

    // Función para guardar en carrito
    function guardarEnCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // Actualizar contador
        actualizarContadorCarrito();
    }

    // Actualizar contador del carrito
    function actualizarContadorCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const cartCounts = document.querySelectorAll('.cart-count');
        
        cartCounts.forEach(count => {
            count.textContent = carrito.length;
        });
    }

    // Inicializar contador al cargar la página
    actualizarContadorCarrito();
});

// FUNCIONES GLOBALES PARA VIDEOS
function abrirVideo(element) {
    const video = element.querySelector('video');
    const videoSource = video.querySelector('source').src;
    const modalVideo = document.getElementById('modalVideo');
    const videoModal = document.getElementById('videoModal');
    
    modalVideo.innerHTML = `<source src="${videoSource}" type="video/mp4">`;
    modalVideo.load();
    videoModal.style.display = 'flex';
    modalVideo.play();
}

function cerrarVideo() {
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
}

// Cerrar modal al hacer clic fuera del video
document.addEventListener('click', function(e) {
    const videoModal = document.getElementById('videoModal');
    if (e.target === videoModal) {
        cerrarVideo();
    }
});
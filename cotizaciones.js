// COTIZACIONES.JS - FORMULARIO UNIVERSAL MEJORADO
document.addEventListener('DOMContentLoaded', function() {
    inicializarFormularioUniversal();
    actualizarContadorCarrito();
    detectarCategoriaDesdeURL();
});

// DETECTAR CATEGORÍA DESDE LA URL
function detectarCategoriaDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('servicio');
    
    const categorias = {
        'bordado': { nombre: 'Bordado Computarizado', desc: 'Acabados profesionales en prendas y textiles' },
        'serigrafia': { nombre: 'Serigrafía', desc: 'Ideal para grandes volúmenes con durabilidad excepcional' },
        'vinil-textil': { nombre: 'Vinil Textil', desc: 'Personalización con vinil de alta calidad' },
        'dtf': { nombre: 'DTF', desc: 'Transfer digital directo a prenda' },
        'impresion-uv': { nombre: 'Impresión UV', desc: 'Impresión de alta calidad en diversos materiales' },
        'luz-neon-led': { nombre: 'Luz de Neon LED', desc: 'Iluminación LED personalizada para negocios' },
        'lonas-impresas': { nombre: 'Lonas Impresas', desc: 'Lonas de gran formato para publicidad' },
        'sublimacion-tela': { nombre: 'Sublimación en Tela', desc: 'Técnica para diseños full color' },
        'anuncios-luminosos': { nombre: 'Anuncios Luminosos', desc: 'Letreros luminosos para negocio' },
        'marcos-luz': { nombre: 'Marcos de Luz', desc: 'Marcos iluminados para fotos y arte' },
        'stickers': { nombre: 'Stickers', desc: 'Calcomanías y adhesivos personalizados' }
    };

    if (categoria && categorias[categoria]) {
        const info = categorias[categoria];
        document.getElementById('categoria-titulo').textContent = `Cotización de ${info.nombre}`;
        document.getElementById('categoria-descripcion').textContent = info.desc;
        
        // Auto-seleccionar el tipo de trabajo
        document.getElementById('tipo-trabajo').value = categoria;
    }
}

// INICIALIZAR FORMULARIO UNIVERSAL
function inicializarFormularioUniversal() {
    // Configurar subida de archivos
    const fileInput = document.getElementById('design-upload');
    const imagePreview = document.getElementById('image-preview');

    fileInput.addEventListener('change', function(e) {
        imagePreview.innerHTML = '';
        
        Array.from(e.target.files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '200px';
                    img.style.maxHeight = '150px';
                    img.style.margin = '5px';
                    img.style.borderRadius = '5px';
                    imagePreview.appendChild(img);
                };
                reader.readAsDataURL(file);
            } else {
                const div = document.createElement('div');
                div.textContent = `📄 ${file.name}`;
                div.style.margin = '5px';
                div.style.padding = '5px';
                div.style.background = '#f0f0f0';
                div.style.borderRadius = '3px';
                imagePreview.appendChild(div);
            }
        });
    });

    // Botón de solicitar cotización
    document.getElementById('solicitar-cotizacion').addEventListener('click', function() {
        solicitarCotizacion();
    });

    // Botón de limpiar formulario
    document.getElementById('limpiar-formulario').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres limpiar el formulario?')) {
            document.querySelectorAll('input, textarea, select').forEach(element => {
                element.value = '';
            });
            document.getElementById('image-preview').innerHTML = '<p>Puedes subir imágenes, PDFs, archivos vectoriales (AI, EPS)</p>';
        }
    });

    // Cerrar modal
    document.getElementById('cerrar-modal').addEventListener('click', function() {
        document.getElementById('confirmation-modal').style.display = 'none';
    });
}

// SOLICITAR COTIZACIÓN - VERSIÓN DESARROLLO
function solicitarCotizacion() {
    const descripcion = document.getElementById('descripcion-proyecto').value;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    // Validaciones básicas
    if (!descripcion) {
        alert('Por favor, describe lo que necesitas realizar.');
        return;
    }

    if (!nombre || !email || !telefono) {
        alert('Por favor, completa tu información de contacto.');
        return;
    }

    // Recopilar datos del formulario
    const cotizacionData = {
        id: Date.now(), // ID temporal para desarrollo
        fecha: new Date().toLocaleString('es-MX'),
        categoria: document.getElementById('tipo-trabajo').value,
        descripcion: descripcion,
        cantidad: document.getElementById('cantidad-medidas').value,
        material: document.getElementById('material').value,
        colores: document.getElementById('colores').value,
        fechaEntrega: document.getElementById('fecha-entrega').value,
        ubicacionUso: document.getElementById('ubicacion-uso').value,
        instrucciones: document.getElementById('instrucciones-especiales').value,
        contacto: {
            nombre: nombre,
            email: email,
            telefono: telefono,
            empresa: document.getElementById('empresa').value
        },
        archivos: document.getElementById('design-upload').files.length,
        estado: 'pendiente' // Para simular el estado como en BD
    };

    // ✅ TEMPORAL: Guardar en localStorage (SOLO DESARROLLO)
    guardarCotizacionTemporal(cotizacionData);
    
    // Mostrar modal de confirmación
    document.getElementById('confirmation-modal').style.display = 'flex';
    
    // Limpiar formulario después de enviar
    setTimeout(() => {
        document.querySelectorAll('input, textarea, select').forEach(element => {
            element.value = '';
        });
        document.getElementById('image-preview').innerHTML = '<p>Puedes subir imágenes, PDFs, archivos vectoriales (AI, EPS)</p>';
    }, 2000);

    console.log('📝 Datos de cotización capturados:', cotizacionData);
    console.log('💡 NOTA: En producción, estos datos se enviarán a la base de datos MySQL');
}

// GUARDAR COTIZACIÓN TEMPORAL (SOLO DESARROLLO)
function guardarCotizacionTemporal(cotizacion) {
    try {
        let historial = JSON.parse(localStorage.getItem('cotizaciones_temporales')) || [];
        historial.push(cotizacion);
        localStorage.setItem('cotizaciones_temporales', JSON.stringify(historial));
        
        console.log('✅ Cotización guardada temporalmente en localStorage');
        console.log('📊 Total de cotizaciones en localStorage:', historial.length);
        
        // Mostrar en consola para debugging
        mostrarCotizacionesEnConsola();
        
    } catch (error) {
        console.error('❌ Error al guardar en localStorage:', error);
    }
}

// MOSTRAR COTIZACIONES EN CONSOLA (PARA DEBUGGING)
function mostrarCotizacionesEnConsola() {
    const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones_temporales')) || [];
    console.log('📋 Cotizaciones almacenadas temporalmente:');
    cotizaciones.forEach((cot, index) => {
        console.log(`--- Cotización ${index + 1} ---`);
        console.log(`ID: ${cot.id}`);
        console.log(`Fecha: ${cot.fecha}`);
        console.log(`Categoría: ${cot.categoria}`);
        console.log(`Cliente: ${cot.contacto.nombre}`);
        console.log(`Email: ${cot.contacto.email}`);
        console.log(`Descripción: ${cot.descripcion}`);
    });
}

// FUNCIÓN PARA MIGRAR A BASE DE DATOS (PARA EL FUTURO)
function migrarABaseDeDatos() {
    console.log('🚀 Función para migrar a base de datos:');
    console.log('1. Obtener cotizaciones de localStorage');
    console.log('2. Conectar a MySQL');
    console.log('3. Insertar en tabla cotizaciones');
    console.log('4. Limpiar localStorage');
    console.log('💡 Esta función se implementará cuando tengas el backend listo');
}

// CONTADOR DEL CARRITO
function actualizarContadorCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartCounts = document.querySelectorAll('.cart-count');
    
    cartCounts.forEach(count => {
        count.textContent = carrito.length;
    });
}

// FUNCIONES ADICIONALES PARA DESARROLLO
function mostrarTodasLasCotizaciones() {
    const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones_temporales')) || [];
    if (cotizaciones.length === 0) {
        console.log('📭 No hay cotizaciones almacenadas');
        return;
    }
    
    console.log('📋 TODAS LAS COTIZACIONES TEMPORALES:');
    cotizaciones.forEach((cot, index) => {
        console.log(`\n=== COTIZACIÓN ${index + 1} ===`);
        console.log('ID:', cot.id);
        console.log('Fecha:', cot.fecha);
        console.log('Categoría:', cot.categoria);
        console.log('Cliente:', cot.contacto.nombre);
        console.log('Email:', cot.contacto.email);
        console.log('Teléfono:', cot.contacto.telefono);
        console.log('Descripción:', cot.descripcion);
        console.log('Cantidad:', cot.cantidad);
        console.log('Material:', cot.material);
        console.log('Estado:', cot.estado);
    });
}

function limpiarCotizacionesTemporales() {
    if (confirm('¿Estás seguro de que quieres eliminar todas las cotizaciones temporales?')) {
        localStorage.removeItem('cotizaciones_temporales');
        console.log('🗑️ Todas las cotizaciones temporales han sido eliminadas');
    }
}

// Para probar en consola: mostrarTodasLasCotizaciones()
// Para limpiar: limpiarCotizacionesTemporales()
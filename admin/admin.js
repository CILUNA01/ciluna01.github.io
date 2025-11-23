// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    inicializarPanelAdmin();
    cargarDatosEjemplo();
});

// ===== VARIABLES GLOBALES =====
let datosEjemplo = {
    pedidos: [],
    clientes: [],
    categorias: [],
    actividades: []
};

// ===== INICIALIZACIÓN DEL PANEL =====
function inicializarPanelAdmin() {
    inicializarNavegacion();
    inicializarMenuToggle();
    inicializarEventosGlobales();
    actualizarContadores();
}

// ===== NAVEGACIÓN ENTRE SECCIONES =====
function inicializarNavegacion() {
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const sectionTitle = document.getElementById('section-title');
    
    // Mapeo de títulos para cada sección
    const titulosSecciones = {
        'dashboard-section': 'Dashboard',
        'pedidos-section': 'Gestión de Pedidos',
        'categorias-section': 'Gestión de Categorías',
        'clientes-section': 'Gestión de Clientes',
        'contenido-section': 'Gestión de Contenido',
        'reportes-section': 'Reportes y Estadísticas',
        'actividades-section': 'Registro de Actividades',
        'usuarios-section': 'Gestión de Usuarios Admin',
        'configuracion-section': 'Configuración del Sistema'
    };

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover active de todos los items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Agregar active al item clickeado
            this.classList.add('active');
            
            // Obtener la sección objetivo
            const targetSection = this.getAttribute('data-target');
            
            // Cambiar a la sección
            mostrarSeccion(targetSection);
            
            // Actualizar título
            if (titulosSecciones[targetSection]) {
                sectionTitle.textContent = titulosSecciones[targetSection];
            }
            
            // Cerrar menú móvil si está abierto
            cerrarMenuMovil();
            
            // Registrar actividad
            registrarActividad('NAVEGACION', `Accedió a: ${titulosSecciones[targetSection]}`);
        });
    });
}

function mostrarSeccion(seccionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(seccionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Cargar datos específicos de la sección si es necesario
        cargarDatosSeccion(seccionId);
    }
}

function cargarDatosSeccion(seccionId) {
    switch(seccionId) {
        case 'pedidos-section':
            cargarTablaPedidos();
            break;
        case 'clientes-section':
            cargarTablaClientes();
            break;
        case 'categorias-section':
            cargarTablaCategorias();
            break;
        case 'actividades-section':
            cargarRegistroActividades();
            break;
    }
}

// ===== MENÚ MÓVIL =====
function inicializarMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

function cerrarMenuMovil() {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.getElementById('menuToggle');
    
    if (window.innerWidth <= 1024) {
        sidebar.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
}

// ===== DATOS DE EJEMPLO =====
function cargarDatosEjemplo() {
    // Pedidos de ejemplo
    datosEjemplo.pedidos = [
        {
            id: '#00125',
            cliente: 'María González',
            servicio: 'Bordado en Playera',
            fecha: '15/01/2024',
            total: '$450.00',
            estado: 'pending',
            detalles: 'Bordado de logo corporativo en playera negra'
        },
        {
            id: '#00124',
            cliente: 'Carlos Rodríguez',
            servicio: 'Serigrafía en Gorras',
            fecha: '14/01/2024',
            total: '$320.00',
            estado: 'process',
            detalles: '50 gorras con diseño personalizado'
        }
    ];

    // Clientes de ejemplo
    datosEjemplo.clientes = [
        {
            nombre: 'María González',
            email: 'maria@email.com',
            telefono: '+52 55 1234 5678',
            pedidos: 3,
            registro: '10/01/2024',
            empresa: 'González & Asociados'
        },
        {
            nombre: 'Carlos Rodríguez',
            email: 'carlos@empresa.com',
            telefono: '+52 55 8765 4321',
            pedidos: 5,
            registro: '05/01/2024',
            empresa: 'Rodríguez Corp'
        }
    ];

    // Categorías de ejemplo
    datosEjemplo.categorias = [
        {
            nombre: 'Bordado Computarizado',
            descripcion: 'Acabados profesionales en prendas y textiles',
            productos: 15,
            estado: 'active'
        },
        {
            nombre: 'Serigrafía',
            descripcion: 'Ideal para grandes volúmenes',
            productos: 8,
            estado: 'active'
        }
    ];

    // Actividades iniciales
    datosEjemplo.actividades = [
        {
            fecha: new Date().toLocaleString('es-MX'),
            usuario: 'Super Administrador',
            accion: 'INICIO_SESION',
            modulo: 'SISTEMA',
            detalles: 'Inició sesión en el panel admin'
        }
    ];
}

// ===== ACTUALIZACIÓN DE CONTADORES =====
function actualizarContadores() {
    // Actualizar badge de pedidos
    const badgePedidos = document.querySelector('.nav-item[data-target="pedidos-section"] .badge');
    if (badgePedidos) {
        badgePedidos.textContent = datosEjemplo.pedidos.length;
    }
    
    // Actualizar badge de clientes
    const badgeClientes = document.querySelector('.nav-item[data-target="clientes-section"] .badge');
    if (badgeClientes) {
        badgeClientes.textContent = datosEjemplo.clientes.length;
    }
    
    // Actualizar badge de categorías
    const badgeCategorias = document.querySelector('.nav-item[data-target="categorias-section"] .badge');
    if (badgeCategorias) {
        badgeCategorias.textContent = datosEjemplo.categorias.length;
    }
}

// ===== GESTIÓN DE PEDIDOS =====
function cargarTablaPedidos() {
    const tbody = document.querySelector('#pedidos-section .data-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    datosEjemplo.pedidos.forEach(pedido => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${pedido.id}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.servicio}</td>
            <td>${pedido.fecha}</td>
            <td>${pedido.total}</td>
            <td><span class="status-badge ${pedido.estado}">${obtenerTextoEstado(pedido.estado)}</span></td>
            <td>
                <button class="btn-icon" title="Editar" onclick="editarPedido('${pedido.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" title="Cambiar Estado" onclick="mostrarModalEstado('${pedido.id}')">
                    <i class="fas fa-sync-alt"></i>
                </button>
                <button class="btn-icon" title="Ver Detalles" onclick="verDetallesPedido('${pedido.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function obtenerTextoEstado(estado) {
    const estados = {
        'pending': 'Pendiente',
        'process': 'En Proceso',
        'completed': 'Completado'
    };
    return estados[estado] || estado;
}

function editarPedido(pedidoId) {
    // Simulación de edición
    console.log('Editando pedido:', pedidoId);
    mostrarNotificacion(`Editando pedido ${pedidoId}`, 'info');
    registrarActividad('EDITAR', `Editó el pedido: ${pedidoId}`);
}

function mostrarModalEstado(pedidoId) {
    // Simulación de cambio de estado
    const nuevoEstado = confirm(`¿Cambiar estado del pedido ${pedidoId}?`) ? 'completed' : 'pending';
    
    // Actualizar en datos
    const pedido = datosEjemplo.pedidos.find(p => p.id === pedidoId);
    if (pedido) {
        pedido.estado = nuevoEstado;
        cargarTablaPedidos();
        mostrarNotificacion(`Estado de ${pedidoId} actualizado`, 'success');
        registrarActividad('CAMBIAR_ESTADO', `Cambió estado de ${pedidoId} a ${obtenerTextoEstado(nuevoEstado)}`);
    }
}

function verDetallesPedido(pedidoId) {
    const pedido = datosEjemplo.pedidos.find(p => p.id === pedidoId);
    if (pedido) {
        alert(`Detalles del pedido ${pedidoId}:\n\nCliente: ${pedido.cliente}\nServicio: ${pedido.servicio}\nDetalles: ${pedido.detalles}\nTotal: ${pedido.total}`);
        registrarActividad('VER_DETALLES', `Vió detalles del pedido: ${pedidoId}`);
    }
}

// ===== GESTIÓN DE CLIENTES =====
function cargarTablaClientes() {
    const tbody = document.querySelector('#clientes-section .data-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    datosEjemplo.clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.pedidos}</td>
            <td>${cliente.registro}</td>
            <td>
                <button class="btn-icon" title="Ver Perfil" onclick="verPerfilCliente('${cliente.email}')">
                    <i class="fas fa-user"></i>
                </button>
                <button class="btn-icon" title="Contactar" onclick="contactarCliente('${cliente.email}')">
                    <i class="fas fa-envelope"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function verPerfilCliente(email) {
    const cliente = datosEjemplo.clientes.find(c => c.email === email);
    if (cliente) {
        alert(`Perfil de ${cliente.nombre}:\n\nEmail: ${cliente.email}\nTeléfono: ${cliente.telefono}\nEmpresa: ${cliente.empresa || 'No especificada'}\nPedidos realizados: ${cliente.pedidos}\nFecha registro: ${cliente.registro}`);
        registrarActividad('VER_PERFIL', `Vió perfil del cliente: ${cliente.nombre}`);
    }
}

function contactarCliente(email) {
    const cliente = datosEjemplo.clientes.find(c => c.email === email);
    if (cliente) {
        const mensaje = prompt(`Escribe el mensaje para ${cliente.nombre}:`);
        if (mensaje) {
            mostrarNotificacion(`Mensaje enviado a ${cliente.nombre}`, 'success');
            registrarActividad('CONTACTAR', `Envió mensaje a: ${cliente.nombre}`);
        }
    }
}

// ===== GESTIÓN DE CATEGORÍAS =====
function cargarTablaCategorias() {
    const tbody = document.querySelector('#categorias-section .data-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    datosEjemplo.categorias.forEach(categoria => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${categoria.nombre}</td>
            <td>${categoria.descripcion}</td>
            <td>${categoria.productos}</td>
            <td><span class="status-badge ${categoria.estado}">${categoria.estado === 'active' ? 'Activa' : 'Inactiva'}</span></td>
            <td>
                <button class="btn-icon" title="Editar" onclick="editarCategoria('${categoria.nombre}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" title="Eliminar" onclick="eliminarCategoria('${categoria.nombre}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function editarCategoria(nombre) {
    mostrarNotificacion(`Editando categoría: ${nombre}`, 'info');
    registrarActividad('EDITAR', `Editó la categoría: ${nombre}`);
}

function eliminarCategoria(nombre) {
    if (confirm(`¿Estás seguro de eliminar la categoría "${nombre}"?`)) {
        mostrarNotificacion(`Categoría "${nombre}" eliminada`, 'success');
        registrarActividad('ELIMINAR', `Eliminó la categoría: ${nombre}`);
    }
}

// ===== REGISTRO DE ACTIVIDADES =====
function cargarRegistroActividades() {
    const container = document.querySelector('#actividades-section .actividades-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    datosEjemplo.actividades.forEach(actividad => {
        const actividadElement = document.createElement('div');
        actividadElement.className = 'actividad-item';
        
        actividadElement.innerHTML = `
            <div class="actividad-header">
                <span class="actividad-fecha">${actividad.fecha}</span>
                <span class="actividad-usuario">${actividad.usuario}</span>
            </div>
            <div class="actividad-detalles">
                <strong>${actividad.modulo}</strong> - ${actividad.detalles}
            </div>
        `;
        
        container.appendChild(actividadElement);
    });
}

function registrarActividad(accion, detalles, modulo = 'SISTEMA') {
    const actividad = {
        fecha: new Date().toLocaleString('es-MX'),
        usuario: 'Super Administrador',
        accion: accion,
        modulo: modulo,
        detalles: detalles
    };
    
    datosEjemplo.actividades.unshift(actividad);
    
    // Limitar a 50 actividades
    if (datosEjemplo.actividades.length > 50) {
        datosEjemplo.actividades.pop();
    }
    
    // Actualizar si estamos en la sección de actividades
    if (document.getElementById('actividades-section').classList.contains('active')) {
        cargarRegistroActividades();
    }
}

// ===== NOTIFICACIONES =====
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.innerHTML = `
        <div class="notificacion-contenido">
            <span class="notificacion-mensaje">${mensaje}</span>
            <button class="notificacion-cerrar" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Estilos básicos para la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#d4edda' : tipo === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${tipo === 'success' ? '#155724' : tipo === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 300px;
        border-left: 4px solid ${tipo === 'success' ? '#28a745' : tipo === 'error' ? '#dc3545' : '#17a2b8'};
    `;
    
    document.body.appendChild(notificacion);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notificacion.parentElement) {
            notificacion.remove();
        }
    }, 5000);
}

// ===== EVENTOS GLOBALES =====
function inicializarEventosGlobales() {
    // Cerrar sesión
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                mostrarNotificacion('Sesión cerrada correctamente', 'success');
                registrarActividad('CERRAR_SESION', 'Cerro sesión en el panel admin');
                // Redirigir al login (simulado)
                setTimeout(() => {
                    window.location.href = '../login.html';
                }, 1000);
            }
        });
    }
    
    // Nuevo pedido
    const nuevoPedidoBtn = document.querySelector('#pedidos-section .btn-primary');
    if (nuevoPedidoBtn) {
        nuevoPedidoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarNotificacion('Funcionalidad de nuevo pedido en desarrollo', 'info');
            registrarActividad('CREAR', 'Intentó crear nuevo pedido');
        });
    }

    // Subir imágenes
    const subirImagenesBtn = document.querySelector('#contenido-section .btn-primary');
    if (subirImagenesBtn) {
        subirImagenesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarNotificacion('Funcionalidad de subir imágenes en desarrollo', 'info');
            registrarActividad('SUBIR_IMAGEN', 'Intentó subir imágenes');
        });
    }

    // Exportar reporte
    const exportarReporteBtn = document.querySelector('#reportes-section .btn-primary');
    if (exportarReporteBtn) {
        exportarReporteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarNotificacion('Generando reporte...', 'info');
            registrarActividad('EXPORTAR_REPORTE', 'Exportó reporte de estadísticas');
        });
    }
}

// ===== INICIALIZACIÓN AL CARGAR =====
window.addEventListener('load', function() {
    // Forzar carga inicial del dashboard
    if (document.getElementById('dashboard-section').classList.contains('active')) {
        cargarDatosSeccion('dashboard-section');
    }
});
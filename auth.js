// auth.js - Sistema de autenticación AUTOMÁTICO para Filipo's Design
class AuthClient {
    static init() {
        console.log('🔐 Auth system loaded');
        this.autoUpdateNavigation();
        this.checkProtectedPages();
        this.setupEventListeners();
    }

    static autoUpdateNavigation() {
        const user = this.getCurrentUser();
        
        if (user) {
            // Usuario LOGUEADO - Mostrar menú de usuario
            this.showUserMenu(user);
        } else {
            // Usuario NO logueado - Mostrar botón de login
            this.showLoginButton();
        }
    }

    static showUserMenu(user) {
        // Encontrar y actualizar todos los headers automáticamente
        const navIconsContainers = document.querySelectorAll('.nav-icons');
        
        navIconsContainers.forEach(container => {
            // Ocultar botones de login
            const loginLinks = container.querySelectorAll('a[href="login.html"]');
            loginLinks.forEach(link => link.style.display = 'none');
            
            // Mostrar información del usuario si existe el elemento
            const userNameElements = container.querySelectorAll('#user-name, .user-name');
            userNameElements.forEach(element => {
                element.textContent = user.nombre || 'Mi Cuenta';
                element.style.display = 'inline';
            });
        });
    }

    static showLoginButton() {
        const navIconsContainers = document.querySelectorAll('.nav-icons');
        
        navIconsContainers.forEach(container => {
            // Mostrar botones de login
            const loginLinks = container.querySelectorAll('a[href="login.html"]');
            loginLinks.forEach(link => link.style.display = 'block');
            
            // Ocultar nombres de usuario
            const userNameElements = container.querySelectorAll('#user-name, .user-name');
            userNameElements.forEach(element => {
                element.style.display = 'none';
            });
        });
    }

    static checkProtectedPages() {
        const protectedPages = ['carrito.html', 'mi-cuenta.html', 'mis-pedidos.html', 'mis-cotizaciones.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage) && !this.isLoggedIn()) {
            localStorage.setItem('redirect_after_login', currentPage);
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    static setupEventListeners() {
        // Logout cuando se hace clic en cualquier botón de cerrar sesión
        document.addEventListener('click', function(e) {
            if (e.target.closest('#logout-btn') || 
                e.target.closest('[onclick*="logout"]') || 
                e.target.textContent.includes('Cerrar Sesión')) {
                e.preventDefault();
                AuthClient.logout();
            }
        });
    }

    // ========== FUNCIONES PRINCIPALES ==========
    
    static isLoggedIn() {
        return localStorage.getItem('cliente_logueado') === 'true';
    }

    static getCurrentUser() {
        if (this.isLoggedIn()) {
            return {
                id: localStorage.getItem('cliente_id'),
                nombre: localStorage.getItem('cliente_nombre'),
                email: localStorage.getItem('cliente_email'),
                telefono: localStorage.getItem('cliente_telefono')
            };
        }
        return null;
    }

    static login(cliente) {
        localStorage.setItem('cliente_logueado', 'true');
        localStorage.setItem('cliente_id', cliente.id);
        localStorage.setItem('cliente_nombre', cliente.nombre);
        localStorage.setItem('cliente_email', cliente.email);
        localStorage.setItem('cliente_telefono', cliente.telefono || '');
        
        // Redirigir a la página que intentaba acceder o al inicio
        const redirectTo = localStorage.getItem('redirect_after_login') || 'index.html';
        localStorage.removeItem('redirect_after_login');
        window.location.href = redirectTo;
    }

    static logout() {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            localStorage.removeItem('cliente_logueado');
            localStorage.removeItem('cliente_id');
            localStorage.removeItem('cliente_nombre');
            localStorage.removeItem('cliente_email');
            localStorage.removeItem('cliente_telefono');
            
            window.location.href = 'index.html';
        }
    }

    // Verificar acceso en tiempo real
    static requireAuth() {
        if (!this.isLoggedIn()) {
            const currentPage = window.location.pathname.split('/').pop();
            localStorage.setItem('redirect_after_login', currentPage);
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    // Para usar en formularios que requieren login
    static requireAuthForAction(actionName = 'esta acción') {
        if (!this.isLoggedIn()) {
            if (confirm(`Para ${actionName} necesitas iniciar sesión. ¿Quieres ir al login?`)) {
                const currentPage = window.location.pathname.split('/').pop();
                localStorage.setItem('redirect_after_login', currentPage);
                window.location.href = 'login.html';
            }
            return false;
        }
        return true;
    }
}

// ========== INICIALIZACIÓN AUTOMÁTICA ==========
document.addEventListener('DOMContentLoaded', function() {
    AuthClient.init();
    
    // Mostrar estado de login en consola (solo desarrollo)
    if (AuthClient.isLoggedIn()) {
        console.log('👤 Usuario logueado:', AuthClient.getCurrentUser().nombre);
    } else {
        console.log('🔒 Usuario no logueado');
    }
});

// Hacer funciones disponibles globalmente
window.AuthClient = AuthClient;
// login.js - Funcionalidad para el login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const rememberMe = document.getElementById('rememberMe');
    const errorMessage = document.getElementById('errorMessage');

    // Verificar si ya está logueado
    if (localStorage.getItem('usuarioLogueado') === 'true') {
        window.location.href = '../index.html';
    }

    // Cargar credenciales guardadas
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    
    if (savedEmail && savedPassword) {
        emailInput.value = savedEmail;
        passwordInput.value = savedPassword;
        rememberMe.checked = true;
    }

    // Toggle visibilidad de contraseña
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    // Validación en tiempo real
    emailInput.addEventListener('input', clearError);
    passwordInput.addEventListener('input', clearError);

    // Envío del formulario
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const btnLogin = this.querySelector('.btn-login');

        // Validaciones
        if (!validateEmail(email)) {
            showError('Por favor ingresa un email válido');
            return;
        }

        if (!password) {
            showError('Por favor ingresa tu contraseña');
            return;
        }

        // Mostrar loading
        btnLogin.classList.add('loading');
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            // Simular autenticación
            const success = await authenticateUser(email, password);
            
            if (success) {
                // Guardar credenciales si "Recordarme" está marcado
                if (rememberMe.checked) {
                    localStorage.setItem('savedEmail', email);
                    localStorage.setItem('savedPassword', password);
                } else {
                    localStorage.removeItem('savedEmail');
                    localStorage.removeItem('savedPassword');
                }

                // Redirigir al dashboard
                window.location.href = '../index.html';
            } else {
                showError('Email o contraseña incorrectos');
            }
        } catch (error) {
            showError('Error de conexión. Intenta nuevamente.');
        } finally {
            btnLogin.classList.remove('loading');
        }
    });

    // Función de autenticación simulada
    async function authenticateUser(email, password) {
        // Usuarios de prueba
        const testUsers = [
            { email: 'admin@filipos.com', password: 'admin123' },
            { email: 'cliente@ejemplo.com', password: 'cliente123' }
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                const user = testUsers.find(u => u.email === email && u.password === password);
                if (user) {
                    localStorage.setItem('usuarioLogueado', 'true');
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('loginTime', new Date().toISOString());
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    }

    // Validar formato de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Mostrar error
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Auto-ocultar después de 5 segundos
        setTimeout(clearError, 5000);
    }

    // Limpiar error
    function clearError() {
        errorMessage.style.display = 'none';
    }

    // Efectos de entrada con teclado
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});
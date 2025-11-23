// registro.js - Funcionalidad para el registro
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const empresaInput = document.getElementById('empresa');
    const telefonoInput = document.getElementById('telefono');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const acceptTerms = document.getElementById('acceptTerms');
    const newsletter = document.getElementById('newsletter');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const emailAvailability = document.getElementById('emailAvailability');
    const passwordMatch = document.getElementById('passwordMatch');

    // Toggle visibilidad de contraseña
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });

    // Validación de email en tiempo real
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        if (email && validateEmail(email)) {
            checkEmailAvailability(email);
        } else {
            emailAvailability.textContent = '';
            emailAvailability.className = 'email-availability';
        }
    });

    // Validación de contraseña en tiempo real
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        checkPasswordStrength(password);
        checkPasswordRequirements(password);
        checkPasswordMatch();
    });

    // Validación de confirmación de contraseña
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);

    // Formatear teléfono
    telefonoInput.addEventListener('input', function(e) {
        formatPhoneNumber(this);
    });

    // Envío del formulario
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const btnRegister = this.querySelector('.btn-register');
        btnRegister.classList.add('loading');

        try {
            // Simular registro
            await registerUser();
            showSuccess('¡Cuenta creada exitosamente! Redirigiendo al login...');
            
            // Limpiar formulario
            this.reset();
            resetValidation();
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } catch (error) {
            showError('Error al crear la cuenta. Intenta nuevamente.');
        } finally {
            btnRegister.classList.remove('loading');
        }
    });

    // Validación completa del formulario
    function validateForm() {
        const nombre = nombreInput.value.trim();
        const apellido = apellidoInput.value.trim();
        const email = emailInput.value.trim();
        const telefono = telefonoInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validaciones básicas
        if (!nombre || !apellido || !email || !telefono || !password || !confirmPassword) {
            showError('Por favor completa todos los campos obligatorios');
            return false;
        }

        if (!validateEmail(email)) {
            showError('Por favor ingresa un email válido');
            return false;
        }

        if (!validatePhone(telefono)) {
            showError('Por favor ingresa un número de teléfono válido');
            return false;
        }

        if (!validatePasswordRequirements(password)) {
            showError('La contraseña no cumple con los requisitos de seguridad');
            return false;
        }

        if (password !== confirmPassword) {
            showError('Las contraseñas no coinciden');
            return false;
        }

        if (!acceptTerms.checked) {
            showError('Debes aceptar los términos y condiciones');
            return false;
        }

        return true;
    }

    // Validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validar teléfono
    function validatePhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10;
    }

    // Formatear número de teléfono
    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            value = value.replace(/^(\d{2})(\d{0,3})(\d{0,3})(\d{0,4})/, function(match, p1, p2, p3, p4) {
                let result = `+${p1}`;
                if (p2) result += ` ${p2}`;
                if (p3) result += ` ${p3}`;
                if (p4) result += ` ${p4}`;
                return result;
            });
        }
        
        input.value = value;
    }

    // Verificar disponibilidad de email
    async function checkEmailAvailability(email) {
        // Emails ya registrados (simulación)
        const registeredEmails = ['admin@filipos.com', 'cliente@ejemplo.com'];
        
        if (registeredEmails.includes(email)) {
            emailAvailability.textContent = '✗ Este email ya está registrado';
            emailAvailability.className = 'email-availability email-taken';
        } else {
            emailAvailability.textContent = '✓ Email disponible';
            emailAvailability.className = 'email-availability email-available';
        }
    }

    // Verificar fortaleza de contraseña
    function checkPasswordStrength(password) {
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        let strength = 0;

        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;

        strengthBar.className = 'strength-bar';
        if (password.length > 0) {
            if (strength <= 1) {
                strengthBar.classList.add('strength-weak');
                strengthText.textContent = 'Contraseña débil';
                strengthText.style.color = 'var(--danger)';
            } else if (strength <= 2) {
                strengthBar.classList.add('strength-medium');
                strengthText.textContent = 'Contraseña media';
                strengthText.style.color = 'var(--warning)';
            } else {
                strengthBar.classList.add('strength-strong');
                strengthText.textContent = 'Contraseña fuerte';
                strengthText.style.color = 'var(--success)';
            }
        } else {
            strengthText.textContent = 'Seguridad de la contraseña';
            strengthText.style.color = 'var(--gray-600)';
        }
    }

    // Verificar requisitos de contraseña
    function checkPasswordRequirements(password) {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[^a-zA-Z\d]/.test(password)
        };

        Object.keys(requirements).forEach(req => {
            const element = document.querySelector(`[data-requirement="${req}"]`);
            if (requirements[req]) {
                element.classList.add('valid');
            } else {
                element.classList.remove('valid');
            }
        });
    }

    // Verificar si las contraseñas coinciden
    function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!password || !confirmPassword) {
            passwordMatch.textContent = '';
            passwordMatch.className = 'password-match';
            return;
        }

        if (password === confirmPassword) {
            passwordMatch.textContent = '✓ Las contraseñas coinciden';
            passwordMatch.className = 'password-match matching';
        } else {
            passwordMatch.textContent = '✗ Las contraseñas no coinciden';
            passwordMatch.className = 'password-match not-matching';
        }
    }

    // Validar requisitos de contraseña
    function validatePasswordRequirements(password) {
        return (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /[^a-zA-Z\d]/.test(password)
        );
    }

    // Simular registro de usuario
    async function registerUser() {
        const userData = {
            nombre: nombreInput.value.trim(),
            apellido: apellidoInput.value.trim(),
            email: emailInput.value.trim(),
            empresa: empresaInput.value.trim(),
            telefono: telefonoInput.value.trim(),
            newsletter: newsletter.checked,
            fechaRegistro: new Date().toISOString()
        };

        return new Promise((resolve) => {
            setTimeout(() => {
                // Guardar en localStorage (simulación)
                const users = JSON.parse(localStorage.getItem('filiposUsers') || '[]');
                users.push(userData);
                localStorage.setItem('filiposUsers', JSON.stringify(users));
                
                console.log('Usuario registrado:', userData);
                resolve();
            }, 2000);
        });
    }

    // Resetear validación
    function resetValidation() {
        emailAvailability.textContent = '';
        emailAvailability.className = 'email-availability';
        passwordMatch.textContent = '';
        passwordMatch.className = 'password-match';
        
        document.querySelectorAll('.requirement').forEach(req => {
            req.classList.remove('valid');
        });
        
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        strengthBar.className = 'strength-bar';
        strengthText.textContent = 'Seguridad de la contraseña';
        strengthText.style.color = 'var(--gray-600)';
    }

    // Mensajes
    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    // Verificar si ya está logueado
    if (localStorage.getItem('usuarioLogueado') === 'true') {
        window.location.href = '../index.html';
    }
});
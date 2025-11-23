// recuperar-password.js - Funcionalidad para recuperación de contraseña
document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 1;
    let userEmail = '';
    let verificationCode = '';

    // Elementos del DOM
    const step1Form = document.getElementById('step1Form');
    const step2Form = document.getElementById('step2Form');
    const step3Form = document.getElementById('step3Form');
    const emailInput = document.getElementById('email');
    const codeInput = document.getElementById('code');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const userEmailSpan = document.getElementById('userEmail');
    const resendCodeBtn = document.getElementById('resendCode');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Paso 1: Enviar código
    step1Form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const btn = this.querySelector('.btn-recovery');

        if (!validateEmail(email)) {
            showError('Por favor ingresa un email válido');
            return;
        }

        btn.classList.add('loading');

        try {
            // Simular envío de código
            await sendVerificationCode(email);
            userEmail = email;
            userEmailSpan.textContent = email;
            goToStep(2);
        } catch (error) {
            showError('Error al enviar el código. Intenta nuevamente.');
        } finally {
            btn.classList.remove('loading');
        }
    });

    // Paso 2: Verificar código
    step2Form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const code = codeInput.value.trim();
        const btn = this.querySelector('.btn-recovery');

        if (!code || code.length !== 6) {
            showError('Por favor ingresa el código de 6 dígitos');
            return;
        }

        btn.classList.add('loading');

        try {
            // Simular verificación de código
            await verifyCode(code);
            goToStep(3);
        } catch (error) {
            showError('Código incorrecto. Intenta nuevamente.');
        } finally {
            btn.classList.remove('loading');
        }
    });

    // Paso 3: Nueva contraseña
    step3Form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const btn = this.querySelector('.btn-recovery');

        if (!validatePassword(newPassword)) {
            showError('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        if (newPassword !== confirmPassword) {
            showError('Las contraseñas no coinciden');
            return;
        }

        btn.classList.add('loading');

        try {
            // Simular cambio de contraseña
            await changePassword(newPassword);
            showSuccess('¡Contraseña restablecida correctamente! Redirigiendo al login...');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } catch (error) {
            showError('Error al cambiar la contraseña. Intenta nuevamente.');
        } finally {
            btn.classList.remove('loading');
        }
    });

    // Reenviar código
    resendCodeBtn.addEventListener('click', async function() {
        this.disabled = true;
        this.textContent = 'Reenviando...';

        try {
            await sendVerificationCode(userEmail);
            showSuccess('Código reenviado correctamente');
            
            // Reactivar botón después de 30 segundos
            setTimeout(() => {
                this.disabled = false;
                this.textContent = 'Reenviar código';
            }, 30000);
        } catch (error) {
            showError('Error al reenviar el código');
            this.disabled = false;
            this.textContent = 'Reenviar código';
        }
    });

    // Toggle visibilidad de contraseña
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });

    // Fortaleza de contraseña
    newPasswordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
    });

    // Funciones de navegación
    window.goToStep = function(step) {
        currentStep = step;
        updateUI();
    };

    function updateUI() {
        // Ocultar todos los formularios
        document.querySelectorAll('.recovery-form').forEach(form => {
            form.classList.remove('active');
        });

        // Mostrar formulario actual
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');

        // Actualizar steps
        document.querySelectorAll('.step').forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNumber === currentStep) {
                step.classList.add('active');
            } else if (stepNumber < currentStep) {
                step.classList.add('completed');
            }
        });

        clearMessages();
    }

    // Funciones de simulación
    async function sendVerificationCode(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Generar código de 6 dígitos
                verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
                console.log(`Código de verificación para ${email}: ${verificationCode}`); // Para testing
                resolve();
            }, 1500);
        });
    }

    async function verifyCode(code) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (code === verificationCode) {
                    resolve();
                } else {
                    reject();
                }
            }, 1000);
        });
    }

    async function changePassword(newPassword) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // En un caso real, aquí se enviaría la nueva contraseña al servidor
                console.log(`Contraseña cambiada para ${userEmail}`);
                resolve();
            }, 1500);
        });
    }

    // Validaciones
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    function checkPasswordStrength(password) {
        const strengthBar = document.getElementById('strengthBar');
        let strength = 0;

        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;

        strengthBar.className = 'strength-bar';
        if (password.length > 0) {
            if (strength <= 1) strengthBar.classList.add('strength-weak');
            else if (strength <= 2) strengthBar.classList.add('strength-medium');
            else strengthBar.classList.add('strength-strong');
        }
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
        
        setTimeout(clearMessages, 5000);
    }

    function clearMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }

    // Verificar si ya está logueado
    if (localStorage.getItem('usuarioLogueado') === 'true') {
        window.location.href = '../index.html';
    }
});
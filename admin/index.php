<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Filipo's Design</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #2c3e50, #3498db);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }

        .admin-login-container {
            display: flex;
            max-width: 1000px;
            width: 100%;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .login-left {
            flex: 1;
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            padding: 3rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .login-right {
            flex: 1;
            padding: 3rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .logo {
            text-align: center;
            margin-bottom: 2rem;
        }

        .logo img {
            height: 80px;
            margin-bottom: 1rem;
        }

        .logo h1 {
            font-size: 1.5rem;
            color: white;
            margin-bottom: 0.5rem;
        }

        .logo p {
            color: #bdc3c7;
            font-size: 0.9rem;
        }

        .welcome-text h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #2c3e50;
        }

        .welcome-text p {
            color: #7f8c8d;
            margin-bottom: 2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #2c3e50;
        }

        .input-with-icon {
            position: relative;
        }

        .input-with-icon i {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #7f8c8d;
        }

        .input-with-icon input {
            width: 100%;
            padding: 1rem 1rem 1rem 3rem;
            border: 2px solid #ecf0f1;
            border-radius: 0.5rem;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .input-with-icon input:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        .btn-login {
            width: 100%;
            background: #3498db;
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
        }

        .btn-login:hover {
            background: #2980b9;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        }

        .back-link {
            text-align: center;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #ecf0f1;
        }

        .back-link a {
            color: #3498db;
            text-decoration: none;
            font-weight: 500;
        }

        .back-link a:hover {
            text-decoration: underline;
        }

        .error-message {
            background: #e74c3c;
            color: white;
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            text-align: center;
            display: none;
        }

        .features-list {
            list-style: none;
            margin-top: 2rem;
        }

        .features-list li {
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            color: #bdc3c7;
        }

        .features-list i {
            margin-right: 0.75rem;
            color: #3498db;
        }

        @media (max-width: 768px) {
            .admin-login-container {
                flex-direction: column;
            }
            
            .login-left {
                padding: 2rem;
            }
            
            .login-right {
                padding: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="admin-login-container">
        <!-- Lado izquierdo - Información -->
        <div class="login-left">
            <div class="logo">
                <img src="../img/LOGOO.png" alt="Filipo's Design">
                <h1>Filipo's Design</h1>
                <p>Sistema Administrativo</p>
            </div>
            
            <ul class="features-list">
                <li><i class="fas fa-shield-alt"></i> Acceso seguro y encriptado</li>
                <li><i class="fas fa-tachometer-alt"></i> Panel de control completo</li>
                <li><i class="fas fa-shopping-cart"></i> Gestión de pedidos</li>
                <li><i class="fas fa-users"></i> Administración de clientes</li>
                <li><i class="fas fa-chart-bar"></i> Reportes y estadísticas</li>
            </ul>
        </div>

        <!-- Lado derecho - Formulario -->
        <div class="login-right">
            <div class="welcome-text">
                <h2>Acceso Administrativo</h2>
                <p>Ingresa tus credenciales para acceder al panel de control</p>
            </div>

            <?php if (isset($_GET['error'])): ?>
                <div class="error-message" id="errorMessage">
                    <i class="fas fa-exclamation-triangle"></i>
                    Credenciales incorrectas. Intenta nuevamente.
                </div>
            <?php endif; ?>

            <form action="php/auth-admin.php" method="POST">
                <div class="form-group">
                    <label for="email">Email Administrativo</label>
                    <div class="input-with-icon">
                        <i class="fas fa-envelope"></i>
                        <input type="email" id="email" name="email" placeholder="admin@filipos.com" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <div class="input-with-icon">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="password" name="password" placeholder="••••••••" required>
                    </div>
                </div>

                <button type="submit" class="btn-login">
                    <i class="fas fa-sign-in-alt"></i>
                    Ingresar al Panel
                </button>
            </form>

            <div class="back-link">
                <a href="../index.html">
                    <i class="fas fa-arrow-left"></i>
                    Volver al sitio público
                </a>
            </div>
        </div>
    </div>

    <script>
        // Mostrar mensaje de error si existe
        document.addEventListener('DOMContentLoaded', function() {
            const errorMessage = document.getElementById('errorMessage');
            if (errorMessage) {
                errorMessage.style.display = 'block';
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000);
            }
        });
    </script>
</body>
</html>
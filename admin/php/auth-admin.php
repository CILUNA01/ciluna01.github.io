<?php
session_start();

// Simulación de autenticación (luego conectaremos a la BD)
if ($_POST) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // Credenciales temporales para prueba
    $admin_email = 'admin@filipos.com';
    $admin_password = 'admin123'; // En producción esto vendrá de la BD
    
    if ($email === $admin_email && $password === $admin_password) {
        // Login exitoso - crear sesión
        $_SESSION['admin_id'] = 1;
        $_SESSION['admin_nombre'] = 'Super Administrador';
        $_SESSION['admin_tipo'] = 'super_admin';
        $_SESSION['admin_logged_in'] = true;
        
        // Redirigir al dashboard
        header('Location: ../dashboard.php');
        exit;
    } else {
        // Login fallido
        header('Location: ../index.php?error=1');
        exit;
    }
}
?>
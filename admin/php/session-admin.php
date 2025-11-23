<?php
session_start();

// Verificar si el admin está logueado
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    // Redirigir al login si no está autenticado
    header('Location: ../index.php');
    exit;
}
?>
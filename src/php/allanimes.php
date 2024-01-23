<?php
// Establece los encabezados CORS para permitir solicitudes desde el dominio permitido
header("Access-Control-Allow-Origin: http://localhost:3000");

$servername = "localhost";
$username = "root";
$database = "webanime"; // Cambia esto al nombre de tu base de datos

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$database", $username);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
    exit;
}

// Selecciona todos los animes
$sql = "SELECT id, nombre FROM animes";
$result = $pdo->query($sql);
$animeDetails = $result->fetchAll(PDO::FETCH_ASSOC);

// Convierte $animeDetails a JSON y devuelve los datos
echo json_encode($animeDetails);
?>

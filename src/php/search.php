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

// Verifica si se proporcionó el parámetro de búsqueda
if (isset($_GET['searchTerm'])) {
    $searchTerm = $_GET['searchTerm'];

    // Utiliza una consulta preparada para prevenir inyecciones SQL
    $sql = "SELECT id, nombre, imagen FROM animes WHERE nombre LIKE :searchTerm";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':searchTerm', "%$searchTerm%", PDO::PARAM_STR);
    $stmt->execute();
    $animeDetails = $stmt->fetchAll(PDO::FETCH_ASSOC);
} else {
    // Si no se proporciona un parámetro de búsqueda, simplemente selecciona todos los IDs de anime
    $sql = "SELECT id, nombre, imagen FROM animes";
    $result = $pdo->query($sql);
    $animeDetails = ($result) ? $result->fetchAll(PDO::FETCH_ASSOC) : [];
}

// Convierte $animeDetails a JSON y devuelve los datos
echo json_encode($animeDetails);
?>

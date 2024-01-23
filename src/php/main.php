<?php
// Establece los encabezados CORS para permitir solicitudes desde el dominio permitido
header("Access-Control-Allow-Origin: http://localhost:3000");
$servername = "localhost";
$username = "root";
$database = "webanime"; // Cambia esto al nombre de tu base de datos
$dominioPermitido = "http://localhost:3000"; // Establece el dominio permitido desde donde se pueden hacer solicitudes


try {
    $pdo = new PDO("mysql:host=$servername;dbname=$database", $username);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}

$sql = "SELECT * FROM animes";
$result = $pdo->query($sql);
$animesdata = array();
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $animesdata[] = $row;
}
// Ahora $animesData contiene los datos de la tabla "animes"

// Convierte $animesData a JSON y devuelve los datos
echo json_encode($animesdata);

?>

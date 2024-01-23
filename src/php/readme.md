<?php
// Establece los encabezados CORS para permitir solicitudes desde el dominio permitido
header("Access-Control-Allow-Origin: http://localhost:3000");

// Configuración de la conexión a la base de datos
$servername = "localhost"; // Nombre del servidor de la base de datos
$username = "root"; // Nombre de usuario de la base de datos
$database = "webanime"; // Nombre de la base de datos utilizada (ajusta al nombre de tu base de datos)
$dominioPermitido = "http://localhost:3000"; // Establece el dominio permitido desde donde se pueden hacer solicitudes

try {
    // Establece una conexión a la base de datos utilizando PDO (PHP Data Objects)
    $pdo = new PDO("mysql:host=$servername;dbname=$database", $username);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}

// Verifica si se proporcionó un ID en la solicitud GET
if (isset($_GET['id'])) { //isset() devolverá false si prueba una variable que ha sido definida como null
    $animeId = $_GET['id']; // Obtiene el ID del anime desde la URL

    // Prepara una consulta SQL para obtener los detalles del anime según el ID
    $sql = "SELECT * FROM animes WHERE an";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':animeId', $animeId, PDO::PARAM_INT); //$stmt->bindParam(':animeId', $animeId, PDO::PARAM_INT); se utiliza para vincular un parámetro a una consulta preparada en PHP. En este caso, está vinculando el valor de $animeId a un marcador de posición :animeId en la consulta SQL y especificando que se trata de un valor de tipo entero (PDO::PARAM_INT)
    $stmt->execute();

    // Obtiene los detalles del anime como un arreglo asociativo
    /*$animeData = $stmt->fetch(PDO::FETCH_ASSOC); se utiliza para recuperar el resultado de la consulta preparada y almacenar los datos en la variable $animeData. Más específicamente:
    PDO::FETCH_ASSOC es una constante que se pasa como argumento a fetch y le indica que los resultados deben ser devueltos como un arreglo asociativo en lugar de un objeto.
    $stmt es el objeto que representa la consulta preparada */
    $animeData = $stmt->fetch(PDO::FETCH_ASSOC);

    // Comprueba si se encontraron detalles del anime
    if ($animeData) {
        // Devuelve los detalles del anime como JSON
        echo json_encode($animeData);
    } else {
        // Devuelve un mensaje de error si no se encontró el anime
        echo json_encode(['error' => 'Anime no encontrado']);
    }
} else {
    // Devuelve un mensaje de error si no se proporcionó un ID válido
    echo json_encode(['error' => 'ID de anime no válido']);
}
?>

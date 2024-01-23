<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Establecer la conexión con la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "webanime";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error en la conexión a la base de datos: " . $conn->connect_error);
}

// Obtener el cuerpo de la solicitud y decodificar el JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Verificar si los datos están presentes y asignar a variables
if (isset($data['nombre'], $data['apellido'], $data['email'], $data['password'])) {
    $nombre = $data['nombre'];
    $apellido = $data['apellido'];
    $email = $data['email'];
    $password = $data['password'];

    // Hash de la contraseña (mejor práctica de seguridad)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Consulta SQL para insertar un nuevo usuario
    $sql = "INSERT INTO usuarios (nombre, apellido, email, password) VALUES ('$nombre', '$apellido', '$email', '$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
        $response = array("success" => true, "message" => "Usuario registrado correctamente");
    } else {
        $response = array("success" => false, "error" => "Error al registrar el usuario: " . $conn->error);
    }
} else {
    $response = array("success" => false, "error" => "Datos de formulario incompletos");
}

// Enviar la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión
$conn->close();
?>

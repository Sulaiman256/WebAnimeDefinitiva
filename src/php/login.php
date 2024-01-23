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
if (isset($data['email'], $data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    // Consulta SQL para obtener el usuario por correo electrónico
    $sql = "SELECT * FROM usuarios WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Verificar la contraseña
        if (password_verify($password, $row['password'])) {
            $response = array("success" => true, "message" => "Inicio de sesión exitoso");
        } else {
            $response = array("success" => false, "error" => "Contraseña incorrecta");
        }
    } else {
        $response = array("success" => false, "error" => "Usuario no encontrado");
    }
} else {
    $response = array("success" => false, "error" => "Datos de formulario incompletos");
}

// Enviar la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión
$conn->close();
// Función para generar un token de sesión JWT
function generate_session_token($user_id, $secret_key) {
    // Parte 1: Crear el encabezado del token
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    /*
    En esta parte, estamos creando el encabezado del token JWT. Este encabezado 
    especifica el tipo de token ("typ") y el algoritmo de firma ("alg"). En este 
    caso, usamos "JWT" como tipo y "HS256" como algoritmo HMAC-SHA256.
    */

    // Parte 2: Crear el cuerpo del token (payload)
    $payload = json_encode(['user_id' => $user_id, 'exp' => time() + 3600]);
    /*
    Aquí estamos creando el cuerpo del token, que contendrá la información del 
    usuario (user_id) y la marca de tiempo de expiración (exp). Establecemos la 
    expiración del token en 1 hora (3600 segundos) después del tiempo actual.
    */
    
    // Parte 3: Codificar las partes del token en base64 URL seguro
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    /*
    Aquí, estamos codificando las partes del token (encabezado y cuerpo) en base64. 
    Luego, ajustamos el resultado para que sea seguro para usar en URLs. 
    La sustitución de '+' por '-', '/' por '_', y la eliminación de '=' son ajustes 
    comunes para que el token sea compatible con las URL.
    */

    // Parte 4: Crear la firma del token utilizando HMAC-SHA256
    $signature = hash_hmac('sha256', $base64UrlHeader . '.' . $base64UrlPayload, $secret_key, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    /*
    En esta parte, estamos generando la firma del token utilizando HMAC-SHA256. 
    La firma se calcula usando el encabezado y el cuerpo codificados en base64, 
    junto con la clave secreta proporcionada. Luego, ajustamos el resultado para 
    que sea seguro para usar en URLs de la misma manera que en la Parte 3.
    */
    
    // Parte 5: Combinar las partes en un token JWT completo
    return $base64UrlHeader . '.' . $base64UrlPayload . '.' . $base64UrlSignature;
    /*
    En la última parte, combinamos las partes codificadas en base64 y la firma en un 
    token JWT completo. El token resultante se devuelve desde la función.
    */
}
?>



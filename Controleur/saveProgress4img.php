
<?php
session_start();
include("../model/fonctions_BDD.php");

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

// Échos pour débogage - montre ce que vous recevez
echo "Input JSON Received: ";
print_r($inputJSON);
echo "\nDecoded Input: ";
print_r($input);

if (!empty($_SESSION['iduser']) && isset($input['theme']) && isset($input['totalPoints'])) {
    $userId = $_SESSION['iduser'];
    $theme = $input['theme'];
    $points = $input['totalPoints'];

    saveProgress4img($userId, $theme, $points);  //modifier

    echo json_encode(['status' => 'success', 'message' => 'Progression enregistrée']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Données manquantes ou utilisateur non connecté']);
}

?>


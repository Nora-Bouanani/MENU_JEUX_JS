<?php
session_start();
include("../model/fonctions_BDD.php");

if (!empty($_SESSION['iduser'])) {
    $userId = $_SESSION['iduser'];
    $data = recupererProgress4img($userId);
    echo json_encode(['status' => 'success', 'data' => $data]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Utilisateur non connecté']);
}
?>

<?php
// Récupérer les données envoyées depuis le JavaScript
$data = json_decode(file_get_contents('php://input'), true);

// Vérifier si les données ont été reçues correctement
if (!empty($data) && isset($data['theme'])) {
    $theme = $data['theme'];

    // Connexion à la base de données
    $connexion = new PDO('mysql:host=localhost;dbname=votre_base_de_donnees', 'utilisateur', 'mot_de_passe');

    // Supprimer les données pour le thème spécifié
    $requete = "DELETE FROM votre_table WHERE theme = :theme";
    $stmt = $connexion->prepare($requete);
    $stmt->bindParam(':theme', $theme);
    $stmt->execute();

    // Renvoyer une réponse de succès
    echo json_encode(['status' => 'success', 'message' => 'Données supprimées avec succès']);
} else {
    // Renvoyer une réponse d'erreur
    echo json_encode(['status' => 'error', 'message' => 'Données invalides']);
}
?>
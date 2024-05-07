<?php
if(isset($_POST['points'])) {
    $points = $_POST['points'];

    // Vous pouvez effectuer des opérations avec les points ici, par exemple les stocker dans une base de données

    echo "Points reçus avec succès : " . $points;
} else {
    echo "Erreur : Aucun point reçu.";
}
?>

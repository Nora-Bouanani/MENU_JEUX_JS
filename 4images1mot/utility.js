
function saveProgress4img(theme,totalPoints){
    console.log("test");
    axios({
        method: 'POST',
        url: '../../Controleur/saveProgress4img.php',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "totalPoints": totalPoints,
            "theme": theme
        })
    }).then(response => {
        console.log('Réponse du serveur :', response.data);
    }).catch(error => {
        console.error('Erreur lors de la sauvegarde :', error);
    });
      
}


function recupererProgress4img() {
    console.log("test de récupération des données");
    axios.get('../../Controleur/recupererData4img.php')
    .then(response => {
        console.log('Réponse du serveur :', response.data);
        if (response.data.status === 'success' && response.data.data.length > 0) {
            // Supposons que le serveur renvoie un objet avec les propriétés 'level' et 'points' dans un tableau
            const data = response.data.data[0];
            const theme = data.theme;
            const totalPoints = data.points;
            //sessionStorage.setItem("totalPoints", totalPoints);
            console.log(data);
            console.log(`Score mis à jour: ${totalPoints}, Niveau mis à jour: ${theme}`);
        } else {
            console.error('Erreur lors de la récupération des données: ', response.data.message);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la communication avec le serveur :', error);
    });
}


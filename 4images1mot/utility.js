
function saveProgress4img(theme,totalPoints)
{

    $.ajax({
        url: '../../Controleur/saveProgress4img.php',

        type: 'POST',
        
        data: 
        {
            "totalPoints": totalPoints,
            "theme": theme
        },
        
        success: (data) => {
            let response = JSON.parse(data);
            if (response.code === 200) 
                console.log('Réponse du serveur (save):', response);
        },

        error: (jqXHR, status, erreur) => {
            console.error('Erreur lors de la sauvegarde :', erreur);
            console.error('Statut de la requête :', status);
            console.error('Réponse du serveur :', jqXHR.responseText);
        }
    });
}


function recupererProgress4img()  
{

    $.ajax(
    {
        url: '../../Controleur/recupererData4img.php',

        type: 'GET',

        dataType: 'json',

        success: function(response) 
        {
            console.log('Réponse du serveur (recup):', response);
            if (response.status === 'success' && response.data.length > 0) 
            {
                const data = response.data.data[0];
                const theme = data.theme;
                const totalPoints = data.points;
            } 
            else 
            {
                console.error('Erreur lors de la récupération des données: ', response.message);
            }
        },
        error: function(xhr, status, error) 
        {
            console.error('Erreur lors de la communication avec le serveur:', error);
        }
    });
}

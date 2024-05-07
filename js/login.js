$('#Form').submit((e) => {
    e.preventDefault();

    let loginInput = $('#Form input[name=login]');
    let passwordInput = $('#Form input[name=password]');
    let messageBox = $('#message-box');

    // Réinitialiser les classes d'erreur
    loginInput.removeClass('error');
    passwordInput.removeClass('error');

    let login = loginInput.val();
    let password = passwordInput.val();

    if (login !== '' && password !== '') {
        $.ajax({
            url: '../Controleur/login.php',
            type: 'POST',
            data: {
                'login': login,
                'password': password
            },
            success: (data) => {
                let response = JSON.parse(data);
                if (response.code === 200) {
                    console.log('Connexion réussie');
                    sessionStorage.setItem('login', response.login);
                    sessionStorage.setItem('iduser', response.iduser);
                    window.location.href = '../vue/index.html';
                } else {
                    messageBox.html(`<p class='error'>Erreur de connexion : ${response.ERREUR}</p>`).show();
                }
            },
            error: (jqXHR) => {
                try {
                    let response = JSON.parse(jqXHR.responseText);
                    messageBox.html(`<p class='error'>Erreur de connexion : ${response.ERREUR}</p>`).show();

                    // Appliquer la classe d'erreur sur les champs concernés
                    if (response.ERREUR.includes('mot de passe')) {
                        passwordInput.addClass('error');
                    } else if (response.ERREUR.includes('Login')) {
                        loginInput.addClass('error');
                    }
                } catch (e) {
                    console.log('Erreur réseau:', jqXHR.statusText);
                    messageBox.html(`<p class='error'>Erreur de connexion : ${jqXHR.statusText}</p>`).show();
                }
            }
        });
    } else {
        messageBox.html('<p class="error">Veuillez entrer toutes les valeurs !</p>').show();
        if (login === '') loginInput.addClass('error');
        if (password === '') passwordInput.addClass('error');
    }
});

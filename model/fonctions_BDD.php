<?php

/*------MENU-------------*/


//FCT qui permet de se connecter a la base de donnee
function connexionBDD()
{
    $host="127.0.0.1";
    $user="root";
    $pwd="";
    $bdd="grouped";

    return mysqli_connect($host,$user,$pwd,$bdd);//Permet de connecter la bdd avec le user et pwd
}


//FCT qui permet de se connecter au site (verifie que l'utilisateur et le mot de passe sont correct)
function verifConnexion($login,$pwd)
{
    $login=htmlentities($login); //convertit les entités HTML pour qu'elles ne soient pas interprétées comme du code HTML 
    $pwd=htmlentities($pwd);
    error_log("Tentative de connexion pour l'utilisateur: " . $login);

    $connexion=connexionBDD();

    if($connexion) //Si cest connnecter
    {
        $stmt=mysqli_prepare($connexion,"SELECT login,password FROM users WHERE login=?"); //Requete preparee
        mysqli_stmt_bind_param($stmt,"s",$login); //Lie login a la requete
        mysqli_stmt_execute($stmt); //Execute la requete preparee
        $res=mysqli_stmt_get_result($stmt); //Recupere le jeu resultat
        $resultat=mysqli_fetch_assoc($res); //Extrait une ligne de resultat a partir du jeu de resultat
        mysqli_close($connexion);

        if(!empty($resultat["login"]) && !empty($resultat["password"]))
        {
            if(password_verify($pwd,$resultat["password"]) && $resultat["login"]==$login)
            {
                $ok=1;
            }
            else
            {
                $ok=0;
            }  
        }
        else
        {
            $ok=0;
        }
    }
    else
    {
        $ok=0;
    }
    return $ok;

}


//FCT qui permet de retourner un tableau associatif contenant les informations de l'utilisateur
function get_data($login)   
{
    $login=htmlentities($login); //convertit les entités HTML pour qu'elles ne soient pas interprétées comme du code HTML 
    $connexion=connexionBDD();

    if($connexion) //Si cest connnecter
    {
        $stmt=mysqli_prepare($connexion,"SELECT iduser,login,password FROM users WHERE login=?"); //Requete preparee
        mysqli_stmt_bind_param($stmt,"s",$login); //Lie login a la requete
        mysqli_stmt_execute($stmt); //Execute la requete preparee
        $res=mysqli_stmt_get_result($stmt); //Recupere le jeu resultat
        $resultat=mysqli_fetch_assoc($res); //Extrait une ligne de resultat a partir du jeu de resultat
        mysqli_close($connexion);
        return $resultat;
    }
}


//FCT qui verifie si le login est existant
function checklogin($login) 
{
    $login=htmlentities($login);
    $connexion=connexionBDD();
    if($connexion)
    {
        $stmt=mysqli_prepare($connexion,"SELECT login FROM users WHERE login=?");
        mysqli_stmt_bind_param($stmt,"s",$login);
        mysqli_stmt_execute($stmt);
        $res=mysqli_stmt_get_result($stmt);
        $resultat=mysqli_fetch_assoc($res);
        mysqli_close($connexion);

        if(!empty($resultat))
        {
            $ok=1;
        }
        else
        {
            $ok=0;
        }
    }
    else
    {
        $ok=0;
    }
    return $ok;
}


//FCT qui permet de s'inscrire a la bdd
function inscriptionBDD($login,$password)
{
    $login=htmlentities($login);    
    $password=htmlentities($password); 
    $password=password_hash($password,PASSWORD_DEFAULT);    // password chiffré
    $connexion=connexionBDD();
    
    
    if($connexion)
    {
        $stmt=mysqli_prepare($connexion,"INSERT INTO users(login,password) VALUES(?,?)");
        mysqli_stmt_bind_param($stmt,"ss",$login,$password);
        if (mysqli_stmt_execute($stmt))
        {
            echo "Inscription réussie !";
        }
        else
        {
            echo "Erreur lors de l'inscription : " . mysqli_error($connexion);
        }
        mysqli_close($connexion);
    }

}



/*--------------- WORDLE---------------- */

//FCT qui permet de sauvegarder les donnees 
function save_wordle_progress($userId, $points, $level) 
{
    $connexion = connexionBDD(); 

    if ($connexion) 
    {
        $stmt = mysqli_prepare($connexion, "INSERT INTO wordle_progress (user_id, level, points) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE level = VALUES(level), points = VALUES(points)");
        mysqli_stmt_bind_param($stmt, "iii", $userId, $level, $points);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        mysqli_close($connexion);
    }
}


//FCT qui recupere les donnees depuis la bdd
function recuperer_progressWordle($userId) 
{
    $connexion = connexionBDD();

    if ($connexion) 
    {
        $stmt = mysqli_prepare($connexion, "SELECT user_id, level, points FROM wordle_progress WHERE user_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $userId);
        mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_get_result($stmt);
        $resultat = mysqli_fetch_all($res, MYSQLI_ASSOC);
        mysqli_close($connexion);
        return $resultat;
    }
    return null; 
}



/* ----------------4 IMG 1 MOT------------- */


//FCT qui permet de sauvegarder les donnees 
function saveProgress4img($userId, $theme, $points) {
    $connexion = connexionBDD();

    if ($connexion) 
    {
        $stmt = mysqli_prepare($connexion, "INSERT INTO 4img1mot_progress(user_id, theme, points) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE points = VALUES(points)");
        mysqli_stmt_bind_param($stmt, "isi", $userId, $theme, $points);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        mysqli_close($connexion);
    }

}


//FCT qui recupere les donnees depuis la bdd
function recupererProgress4img($userId) 
{
    $connexion = connexionBDD();

    if ($connexion) 
    {
        $stmt = mysqli_prepare($connexion, "SELECT user_id, theme, points FROM 4img1mot_progress WHERE user_id = ?");
        mysqli_stmt_bind_param($stmt, "i", $userId);
        mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_get_result($stmt);
        $resultat = mysqli_fetch_all($res, MYSQLI_ASSOC);
        mysqli_close($connexion);
        return $resultat;
    }
    return null;
}

?>
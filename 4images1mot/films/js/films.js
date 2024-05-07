var leveltoanswers = {
    1: "TITANIC",
    2: "INTERSTELLAR",
    3: "MULAN",
    4: "INCEPTION",
    5: "LABYRINTHE",
    6: "VINCENZO"
};
var currentTheme = "films"; // Thème initial
var nooflevels = 6;
var currentlevel = 1;
var tempanswer = leveltoanswers[currentlevel];

var noofhints = 2;

var options = {};
for (var i = 0; i < 18; i++) {
    options[i] = true;
}

var blanks = {};
var letters = {};
var freq = {};
var tempfreq = {};


//var timeLeft = 20; // Temps initial en secondes

function main() {
    // Appeler startTimer() au début du jeu pour démarrer le chronomètre
    startTimer();
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var answer = leveltoanswers[currentlevel];
    for (var i = 0; i < 26; ++i) {
        freq[alphabets[i]] = 0;
        tempfreq[alphabets[i]] = 0;
    }
    for (var i = 0; i < answer.length; ++i) {
        freq[answer[i]] += 1;
    }
    addimages(currentlevel);
    addblanks(currentlevel);
    addoptions(currentlevel);
    // Appliquer la couleur transparente aux "_" au début du jeu
    var blankElements = document.getElementsByClassName("blank");
    for (var i = 0; i < blankElements.length; i++) {
        if (blankElements[i].innerHTML === "_") {
            blankElements[i].style.color = "transparent";
        }
    }
    
}


/* POUR LES POINTS */
// Déclaration de la variable pour enregistrer le temps
var startTime;

// Fonction pour commencer à mesurer le temps
function startTimer() {
    startTime = new Date();
}
var points = 0; // Variable pour stocker les points gagnés

sessionStorage.setItem("points", points);

// Fonction pour ajouter des points et mettre à jour l'affichage
function addPoints(amount) {
    points += amount;
    sessionStorage.setItem("points", points);
    document.getElementById("points").innerText = "Points: " + points;
}

// Fonction pour calculer les points en fonction du temps écoulé
function calculatePoints(timeDifference) {
    if (timeDifference >= 1 && timeDifference <= 5) {
        return 200;
    } else if (timeDifference <= 10) {
        return 150;
    } else if (timeDifference <= 20) {
        return 100;
    } else {
        return 20;
    }
}

// Fonction pour arrêter le compteur et calculer les points
function stopTimer() {
    var endTime = new Date();
    var timeDifference = (endTime - startTime) / 1000; // Convertir en secondes

    // Vérifier si le mot saisi est correct
    var isCorrect = checkifcorrect(currentlevel);

    // Si le mot est correct, calculer les points en fonction du temps écoulé
    if (isCorrect) {
        var earnedPoints = calculatePoints(timeDifference);

        // Afficher ou utiliser les points dans votre jeu
        alert("Vous avez gagné " + earnedPoints + " points !");
        
        // Ajouter les points gagnés au total des points
        addPoints(earnedPoints);
    } else {
        // Si le mot est incorrect, ne pas attribuer de points
        alert("Mot incorrect ! Aucun point ne vous est attribué.");
    }

    // Afficher les points dans votre interface utilisateur
    document.getElementById("points").innerText = "Points: " + points;
}




/*COMPTER LES NIVEAUX */

//  fonction pour afficher le mot complet
function revealCompleteWord() {
    var blanks = document.getElementsByClassName("blank");
    var answer = leveltoanswers[currentlevel];
    for (var i = 0; i < answer.length; i++) {
        blanks[i].innerHTML = answer[i];
        blanks[i].classList.add("found"); //pour l'effet d'illumination
    }
}

var levelsPassed = 0;

// Tableau pour stocker le nombre de points gagnés à chaque niveau
var pointsPerLevel = [];

function nextmove() {
    // Arrêter le chronomètre lorsque le joueur termine le niveau
    stopTimer();
    if (checkifcorrect(currentlevel)) {
        var endTime = new Date();
        var timeDifference = (endTime - startTime) / 1000; // Calculer le temps écoulé en secondes

        // Calculer les points en fonction du temps écoulé
        var points = calculatePoints(timeDifference);

        // Ajouter les points gagnés au tableau des points par niveau
        pointsPerLevel[currentlevel] = points;
        console.log("il sera vide" + points);

        // Calculer le total des points jusqu'au niveau actuel
        var totalPoints = 0;
        for (var i = 1; i <= currentlevel; i++) {

            console.log("bjfhfebfjekn" + pointsPerLevel[currentlevel]);
            if (pointsPerLevel[i] !== undefined) {
                totalPoints += pointsPerLevel[i];
            }
        }
        console.log(totalPoints);

        // Afficher les points dans votre interface utilisateur
        document.getElementById("points").innerText = "Points: " + totalPoints;


        // Ajoutez une pause de 2 secondes pour afficher le mot complet avant de passer au niveau suivant
        setTimeout(function() {
            revealCompleteWord();
            setTimeout(function() {
                if (currentlevel < nooflevels) {
                    currentlevel++;
                    tempanswer = leveltoanswers[currentlevel];

                    options = {};
                    for (var i = 0; i < 18; i++) {
                        options[i] = true;
                    }

                    blanks = {};
                    letters = {};

                    noofhints = 2;
                    main();
                } else {
                    // Tous les niveaux ont été terminés
                    // Supposons que points contient le nombre de points gagnés
                    console.log("le total des pts pr instant : " + totalPoints);
                    saveProgress4img("films", totalPoints);
                    
                    window.location.href = "../final/congrats.html?points=" + totalPoints;
                
                }
            }, 2000); // Temps de pause de 2 secondes avant de passer au niveau suivant
        }, 200); // Petit délai avant d'afficher le mot complet
    } else {
        markincorrect();
    }
}


function getsubmission() {
    var x = "";
    var blanks = document.getElementsByClassName("blank");
    for (var i = 0; i < blanks.length; i++) {
        x += blanks[i].innerHTML;
    }
    return x;
}

function checkifcorrect(level) {
    var submission = getsubmission();
    return submission === leveltoanswers[level];
}

function addimages(level) {
    var smallImagesDiv = document.getElementById("smallimages");
    smallImagesDiv.innerHTML = "";
    var dir = "./img/level" + level + "/";
    for (var i = 1; i <= 4; ++i) {
        var imagelocation = dir + i + ".jpg";
        var img = document.createElement("img");
        img.src = imagelocation;
        img.className = "hintimage";
        img.setAttribute("onclick", "viewfullimage(this)");
        smallImagesDiv.appendChild(img);
        if (i === 2) {
            smallImagesDiv.appendChild(document.createElement("br"));
        }
    }
}

function addblanks(level) {
    var blanksDiv = document.getElementById("blanks");
    blanksDiv.innerHTML = "";
    var answer = leveltoanswers[level];
    for (var i = 0; i < answer.length; ++i) {
        var span = document.createElement("span");
        span.className = "blank";
        span.innerHTML = "_";
        span.setAttribute("onclick", "deselect(" + i + ")");
        blanksDiv.appendChild(span);
        blanks[i] = null;
    }
    
	// Vérifie si une image d'indice existe déjà dans le HTML avant d'en créer une nouvelle
    var existingHintImage = document.getElementById("hintImage");
    if (!existingHintImage) {
        var hintImage = document.createElement("img");
        hintImage.id = "hintImage"; // Ajoutez un ID à l'image pour pouvoir la référencer plus tard
        hintImage.src = "./img/indice.png";
        hintImage.setAttribute("onclick", "hint(" + level + ")");
        hintImage.style.cursor = "pointer";
        blanksDiv.appendChild(hintImage);
    }
}

function addoptions(level) {
    var s = createstring(level);
    for (var i = 0; i < 18; ++i) {
        letters[i] = s[i];
    }
    var lettersDiv = document.getElementById("letters");
    lettersDiv.innerHTML = "";
    for (var i = 0; i < 9; ++i) {
        var span = document.createElement("span");
        span.className = "letter";
        span.innerHTML = s[i];
        span.setAttribute("onclick", "addletter('" + s[i] + "', " + i + ")");
        lettersDiv.appendChild(span);
    }
    lettersDiv.appendChild(document.createElement("br"));
    for (var i = 9; i < 18; ++i) {
        var span = document.createElement("span");
        span.className = "letter";
        span.innerHTML = s[i];
        span.setAttribute("onclick", "addletter('" + s[i] + "', " + i + ")");
        lettersDiv.appendChild(span);
    }
}

String.prototype.shuffle = function() {
    var that = this.split("");
    var len = that.length, t, i;
    while (len) {
        i = Math.random() * len-- | 0;
        t = that[len], that[len] = that[i], that[i] = t;
    }
    return that.join("");
}

function createstring(level) {
    var answer = leveltoanswers[level];
    var numberremaining = 18 - answer.length;
    var s = answer;
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var possible = "";
    for (var i = 0; i < alphabets.length; ++i) {
        if (answer.indexOf(alphabets[i]) == -1)
            possible += alphabets[i];
    }
    possible = possible.shuffle();
    for (var i = 0; i < numberremaining; ++i)
        s += possible[i];
    s = s.shuffle();
    return s;
}

function updatetempanswer() {
    var answer = leveltoanswers[currentlevel];
    var s = "";
    var blanks = document.getElementsByClassName("blank");
    for (var i = 0; i < blanks.length; i++) {
        var xxx = blanks[i].innerHTML;
        if (xxx === "_" || xxx != answer[i]) {
            s += answer[i];
        }
    }
    tempanswer = s;
}

function allfilled() {
    var isempty = false;
    var blanks = document.getElementsByClassName("blank");
    for (var i = 0; i < blanks.length; i++) {
        if (blanks[i].innerHTML == "_")
            isempty = true;
    }
    return !isempty;
}

function findfirstvacant() {
    var elementtoreturn;
    var index;
    var blanks = document.getElementsByClassName("blank");
    for (var i = 0; i < blanks.length; i++) {
        if (blanks[i].innerHTML == "_") {
            index = i;
            elementtoreturn = blanks[i];
            break;
        }
    }
    return [elementtoreturn, index];
}

function addletter(lettertoadd, index) {
    if (options[index] == false) {
        return;
    } else {
        var ffv = findfirstvacant();
        var element = ffv[0];
        var elindex = ffv[1];

        // Réinitialiser la couleur du texte de la lettre à blanc
        element.style.color = "white";
        element.innerHTML = lettertoadd;
        options[index] = false;

        var letterElements = document.getElementsByClassName("letter");
        letterElements[index].removeAttribute("onclick");
        letterElements[index].style.cursor = "not-allowed";
        letterElements[index].style.background = "#706f6f";

        blanks[elindex] = index;
        updatetempanswer();
        tempfreq[lettertoadd] += 1;

        if (allfilled())
            nextmove();
    }
}


function deselect(elindex) {
    if (document.getElementsByClassName("blank")[elindex].innerHTML == "_") {
        return;
    }

    var lettertoremove = document.getElementsByClassName("blank")[elindex].innerHTML;
    tempfreq[lettertoremove] -= 1;
    document.getElementsByClassName("blank")[elindex].innerHTML = "_";
    var index = blanks[elindex];
    options[index] = true;

    var letterElements = document.getElementsByClassName("letter");
    letterElements[index].setAttribute("onclick", "addletter('" + letters[index] + "', " + index + ")");
    letterElements[index].style.cursor = "pointer";
    letterElements[index].style.background = "white";
    document.getElementsByClassName("blank")[elindex].style.color = "transparent";
    
    // Réinitialiser la couleur de la lettre dans le clavier à la couleur d'origine
    letterElements[index].style.color = "black"; // Réinitialiser la couleur dans le clavier
    // Vérifier si la lettre était incorrecte
    if (document.getElementsByClassName("blank")[elindex].classList.contains("incorrect")) {
        document.getElementsByClassName("blank")[elindex].style.color = "transparent"; // Réinitialiser la couleur dans les espaces
        document.getElementsByClassName("blank")[elindex].classList.remove("incorrect"); // Retirer la classe d'erreur
    }    
    updatetempanswer();
}


function markincorrect() {
    var blankElements = document.getElementsByClassName("blank");
    for (var i = 0; i < blankElements.length; i++) {
        if (blankElements[i].innerHTML != "_") {
            blankElements[i].classList.add("incorrect");
        }    
    }
}

function findLetter(letter) {
    var letterElements = document.getElementsByClassName("letter");
    for (var i = 0; i < letterElements.length; i++) {
        if (letterElements[i].innerHTML === letter) {
            return i;
        }
    }
}

function getRandomLetter() {
    var position = Math.floor(Math.random() * tempanswer.length);
    var letter = tempanswer.charAt(position);
    tempanswer = tempanswer.substr(0, position) + tempanswer.substr(position + 1, tempanswer.length);
    var pos;
    var answer = leveltoanswers[currentlevel];
    for (var i = 0; i < answer.length; ++i) {
        if (answer[i] == letter && document.getElementsByClassName("blank")[i].innerHTML != letter) {
            pos = i;
            break;
        }
    }
    return [letter, pos];
}

function addhint(lettertoadd, index, position) {
    var answer = leveltoanswers[currentlevel];
    if (tempfreq[lettertoadd] == freq[lettertoadd]) {
        var firstfoundat;
        for (var i = 0; i < answer.length; ++i) {
            if (document.getElementsByClassName("blank")[i].innerHTML == lettertoadd) {
                firstfoundat = i;
                break;
            }
        }

        deselect(firstfoundat);
        tempfreq[lettertoadd] -= 1;
    }

    var element = document.getElementsByClassName("blank")[position];
    var elindex = position;

    if (element.innerHTML != "_")
        deselect(position);

    element.innerHTML = lettertoadd;
    options[index] = false;
    var letterElements = document.getElementsByClassName("letter");
    letterElements[index].removeAttribute("onclick");
    letterElements[index].style.cursor = "not-allowed";
    letterElements[index].style.background = "#89cf08";
    blanks[elindex] = index;
    element.removeAttribute("onclick");
    element.style.cursor = "not-allowed";
    tempfreq[lettertoadd] += 1;
    if (allfilled())
        nextmove();
    // Réinitialiser la couleur du texte de la lettre à blanc
    element.style.color = "white";
    // Ajouter une couleur d'illumination à l'arrière-plan
    element.style.background = "linear-gradient(70deg, blue, pink)";
}

function hint() {
    if (noofhints <= 0) {
        return;
    }
    var grl = getRandomLetter();
    var letter = grl[0];
    var position = grl[1];
    var index = findLetter(letter);
    noofhints--;
    addhint(letter, index, position);
    document.getElementById("noofhints").innerHTML = noofhints + " hint(s) remaining";
}

recupererProgress4img();
main();


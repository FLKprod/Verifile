var confidence = 80;
var answers = {
    question1: null,
    question2: null,
    question3: null
};

function startQuestionnaire() {
    document.getElementById('score').innerHTML = confidence + "%";
}
startQuestionnaire()

function answerQuestion(questionId, answer) {
    var previousAnswer = answers[questionId];

    // Si la réponse précédente est différente de la nouvelle réponse, ajustez le score
    if (previousAnswer !== answer) {
        if (previousAnswer !== null) {
            // Annulez l'effet de la réponse précédente sur le score
            if (previousAnswer) {
                confidence -= getScoreImpact(questionId, true);
            } else {
                confidence += getScoreImpact(questionId, false);
            }
        }

        // Appliquez l'effet de la nouvelle réponse sur le score
        if (answer) {
            confidence += getScoreImpact(questionId, true);
        } else {
            confidence -= getScoreImpact(questionId, false);
        }

        // Stockez la nouvelle réponse
        answers[questionId] = answer;

        // Mettez à jour l'affichage du score
        console.log("SCORE = " + confidence);
        document.getElementById('score').innerHTML = confidence + "%";
    }
    if (answers.question1 !== null && answers.question2 !== null && answers.question3 !== null) {
        endQuestionnaire(confidence);
    }
}

function getScoreImpact(questionId, answer) {
    switch (questionId) {
        case 'question1':
            return 5;
        case 'question2':
            return 5;
        case 'question3':
            return answer ? 9 : 20;
        default:
            return 0;
    }
}

function endQuestionnaire(confidence) {
    if (confidence > 80) {
        document.getElementById('paragraphe1').innerHTML = "Votre fichier a obtenu un indice de confiance de <strong>" + confidence + " %</strong>, ce qui est <span class='texte-vert'>très positif</span>.";
        document.getElementById('paragraphe2').innerHTML = "Cela signifie que votre fichier est jugé sûr et ne présente pas de risques majeurs de sécurité. Cependant, restez vigilant et continuez à suivre les bonnes pratiques de sécurité pour garantir une protection optimale."
        if (confidence == 99) {
            document.getElementById('img1').src = ImageUrl1;
        } else if (confidence >= 95 && confidence < 99) {
            document.getElementById('img1').src = ImageUrl2;
        } else if (confidence >= 90 && confidence < 95) {
            document.getElementById('img1').src = ImageUrl3;
        } else if (confidence >= 85 && confidence < 90) {
            document.getElementById('img1').src = ImageUrl4;
        } else {
            document.getElementById('img1').src = ImageUrl5;
        }  
    } else if (confidence > 60 && confidence <= 80) {
        document.getElementById('paragraphe1').innerHTML = "Votre fichier a obtenu un indice de confiance de <strong>" + confidence + " %</strong>, ce qui est <span class='texte-vert-clair'>positif</span>.";
        document.getElementById('paragraphe2').innerHTML = "Cela signifie que votre fichier est relativement sûr, mais il peut présenter des risques potentiels. Nous vous recommandons de vérifier attentivement le fichier avant de l'ouvrir et de suivre les bonnes pratiques de sécurité pour minimiser les risques."
        if (confidence >= 70) {
            document.getElementById('img1').src = ImageUrl6;
        } else {
            document.getElementById('img1').src = ImageUrl7;
        }  
    } else if (confidence > 40 && confidence <= 60) {
        document.getElementById('paragraphe1').innerHTML = "Votre fichier a obtenu un indice de confiance de <strong>" + confidence + " %</strong>, ce qui est <span class='texte-orange'>correct</span>.";
        document.getElementById('paragraphe2').innerHTML = "Cela indique qu'il y a un certain risque potentiel associé à ce fichier. Nous vous recommandons de faire preuve de prudence et de vérifier plus en détail avant de l'ouvrir ou de l'utiliser."
        document.getElementById('img1').src = ImageUrl8;
    } else if (confidence > 20 && confidence <= 40) {
        document.getElementById('paragraphe1').innerHTML = "Votre fichier a obtenu un indice de confiance de <strong>" + confidence + " %</strong>, ce qui est <span class='texte-orange-foncée'>négatif</span>.";
        document.getElementById('paragraphe2').innerHTML = "Cela signifie que le fichier présente des risques de sécurité significatifs. Nous vous conseillons vivement de ne pas ouvrir ce fichier et de prendre les mesures nécessaires pour le vérifier ou le supprimer. Assurez-vous de suivre les protocoles de sécurité appropriés pour protéger vos données."
        document.getElementById('img1').src = ImageUrl9;
    } else if (confidence <= 20) {
        document.getElementById('paragraphe1').innerHTML = "Votre fichier a obtenu un indice de confiance de <strong>" + confidence + " %</strong>, ce qui est <span class='texte-rouge'>très négatif</span>.";
        document.getElementById('paragraphe2').innerHTML = "Cela signifie que le fichier est considéré comme dangereux et qu'il présente des risques élevés de sécurité. Nous vous recommandons de ne pas ouvrir ce fichier"
        document.getElementById('img1').src = ImageUrl10;
    }      

}
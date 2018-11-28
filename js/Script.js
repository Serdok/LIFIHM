var tableau = document.getElementById("tableau"); // Tableau de données 
var head = document.getElementById( "tableau_head" ); // En-tête du tableau de données

var tableau_recherche = document.getElementById("tableau_recherche").getElementsByTagName("tbody")[0]; // Tableau résultat des recherches

var types = ["Don", "Dépôt vente", "Déchetterie"];
var objets = ["Audio / Vidéo", "Bricolage", "Culture", "Décoration", "Electroménager", "Loisirs", "Meubles", "Multimédia", "Puériculture", "Végétaux"];

function getLigne(ligne) // Retourne le numéro de la ligne cliquée
{
    var parent = ligne.parentNode.parentNode;
    var i = 0;
    while (parent.previousElementSibling != null) {
        parent = parent.previousElementSibling;
        i++;
    }
    return i;
}

function setLines()
{
	// On récupère chaque ligne du tableau
	var lignes = tableau.getElementsByTagName( "tr" );
	for (var i=1 ; i<lignes.length ; ++i)
	{
		lignes[ i ].children[ 0 ].innerHTML = i;
	}
}

function remove(ligne) // Supprime une ligne
{
    var nb = getLigne(ligne);
    tableau.removeChild(ligne.parentNode.parentNode);
    alert("Ligne " + nb + " supprimée!");
}

function modify(ligne) // Modifie une ligne du tableau
{
    var parent = ligne.parentNode.parentNode; // Contient la ligne à modifier
    var fils = parent.children; // Contient le tableau des cellules à l'intérieur
    var nb = getLigne(ligne);
    if (parent.className == "ligne") // Modification activée
    {
        console.log("Modification de la ligne " + nb + " activée");
        var formulaire, cellule, cellule_image;
        formulaire = document.createElement("form"); // On crée une balise <div>
        formulaire.setAttribute("class", "lignemdf"); // Qui a pour classe "lignemdf"
        for (var i = 0; i < fils.length - 1; i++) {
            cellule = document.createElement("div"); // On crée une balise <div>
            cellule.setAttribute("class", "cellule"); // Qui a pour classe "cellule"
            switch (tableau.children[0].children[i].innerHTML) // selon le texte de la première ligne du tableau
            {
                case "Type": // On ajoute l'autocomplétion des types
                    cellule.innerHTML = "<input type = 'text' name = '" + tableau.children[0].children[i].innerHTML + "' placeholder = '" + fils[i].innerHTML + "' list = 'types'/>";
                    break;
                case "Objets acceptés": // On ajoute l'autocomplétion des objets acceptés
                    cellule.innerHTML = "<input type = 'text' name = '" + tableau.children[0].children[i].innerHTML + "' placeholder = '" + fils[i].innerHTML + "' list = 'objets'/>";
                    break;
                default: // Cas par défaut
                    cellule.innerHTML = "<input type = 'text' name = '" + tableau.children[0].children[i].innerHTML + "' placeholder = '" + fils[i].innerHTML + "' >";
            }
            formulaire.appendChild(cellule); // On ajoute la <div> cellule dans la <div> formulaire
        }
        cellule_image = document.createElement("div");
        cellule_image.setAttribute("class", "cellule_image");
        cellule_image.innerHTML = "<img src = './img/check.png' alt='Modifier lieu' class = 'done' onClick = 'modify( this )'/></br>\n\t\t\t\t\t\t\t<img src = './img/minus.png'  alt='Supprime lieu'  class = 'delete' onClick = 'remove( this )'/>";
        formulaire.appendChild(cellule_image); // On ajoute la <div> cellule_image dans la <div> formulaire
        tableau.replaceChild(formulaire, parent); // On remplace la ligne par le formulaire
    } else if (parent.className == "lignemdf") // Modifications terminées
    {
        console.log("Enregistrement des modifications de la ligne " + nb);
        var inputs = parent.getElementsByTagName("input"); // On récupère le tableau des inputs de la ligne modifiée
        var modifications, cellule, cellule_image;
        modifications = document.createElement("div"); // On crée une <div>
        modifications.setAttribute("class", "ligne"); // Qui a pour classe "ligne"
        for (var i = 0; i < fils.length - 1; i++) // Pour i allant de 0 au nombre de cellules fils (cellule_image exclus)
        {
            cellule = document.createElement("div");
            cellule.setAttribute("class", "cellule");
            if (inputs[i].value == "") // Si rien a été entré (aucune modification)
                cellule.innerHTML = inputs[i].placeholder;
            else // Si quelque chose a été entré
                cellule.innerHTML = inputs[i].value;
            modifications.appendChild(cellule);
        }
        cellule_image = document.createElement("div");
        cellule_image.setAttribute("class", "cellule_image");
        cellule_image.innerHTML = "<img src = './img/writing.png' alt='Modifier lieu' class = 'modify' onClick = 'modify( this )'/></br>\n\t\t\t\t\t\t\t<img src = './img/minus.png'  alt='Supprime lieu'  class = 'delete' onClick = 'remove( this )'/>";
        modifications.appendChild(cellule_image);
        tableau.replaceChild(modifications, parent); // On remplace le formulaire par la ligne modifiée
        alert("Ligne " + nb + " modifiée!");
    }
}

function add(ligne) // Ajoute une ligne à la fin du tableau
{
    var inputs = ligne.parentNode.parentNode.getElementsByTagName("input"); // On récupère les inputs de la dernière ligne
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") // Si rien a été entré
        {
            console.log(inputs[i].name + " a son champ vide!");
            alert("Merci de compléter le champ " + inputs[i].name + " avant d'ajouter cette ligne!");
            inputs[i].focus(); // On place le curseur dans la case vide
            return false; // On quitte la fonction s'il y a une case vide
        }
    }
    var ligneajt = document.createElement("div");
    ligneajt.setAttribute("class", "ligne");
    tableau.insertBefore(ligneajt, tableau.lastElementChild); // On insère la ligne ajoutée avant la dernière (formulaire d'ajout)
    var cellule, cellule_image;
    for (var i = 0; i < inputs.length; i++) {
        cellule = document.createElement("div");
        cellule.setAttribute("class", "cellule");
        cellule.innerHTML = inputs[i].value;
        ligneajt.appendChild(cellule);
        inputs[i].value = ""; // On clear la valeur de l'input
    }
    cellule_image = document.createElement("div");
    cellule_image.setAttribute("class", "cellule_image");
    cellule_image.innerHTML = "<img src = './img/writing.png' alt='Modifier lieu' class = 'modify' onClick = 'modify( this )' style='height: 60%; padding: 10px 0px 10px 0px;'/></br>\n\t\t\t\t\t\t\t<img src = './img/minus.png'  alt='Supprime lieu' class = 'delete' onClick = 'remove( this )' style='height: 60%; padding: 10px 0px 10px 0px;' />";
    ligneajt.appendChild(cellule_image);
    alert("Ligne ajoutée!");
}

function recherche(ligne, colonne)
{
    var inputs = ligne.parentNode.parentNode.getElementsByTagName("input");
    var ligne = tableau.getElementsByTagName("tr"); //Toutes les lignes du tableau
    var recherchenull = true; //Boolean pour sa voir si les recherche sont nulle
    for (var i = tableau_recherche.childNodes.length - 1; i > 0; i--)
        tableau_recherche.removeChild(tableau_recherche.childNodes[i]);
    try{
        tableau_recherche.parentNode.getElementsByTagName("thead")[0].removeChild(tableau_recherche.parentNode.getElementsByTagName("thead")[0].childNodes  [0]);
    }
    catch(ex){

    }
    if (inputs[0].value == "") // Si rien a été entré
        alert("Merci de compléter le champ avant de lancer une recherche!");
    else {
        for (var nb = 1; nb < ligne.length; nb++) {
            var recherche = new RegExp(inputs[0].value.toUpperCase());
            if (ligne[nb].getElementsByTagName("td")[colonne].innerText.toUpperCase().match(recherche) != null) {
                var ligneajt = document.createElement("tr");
                tableau_recherche.insertBefore(ligneajt, null);
                var cellule;
                cellule = document.createElement("th");
                cellule.innerHTML = ligne[nb].getElementsByTagName("th")[0].innerText;
           		cellule.setAttribute("scope", "row");
                ligneajt.appendChild(cellule);
                for (var i = 0; i < 5; i++) {
                    cellule = document.createElement("td");
               		cellule.setAttribute("scope", "row");
                    cellule.innerHTML = ligne[nb].getElementsByTagName("td")[i].innerText;
                    ligneajt.appendChild(cellule);
                }
                if (recherchenull == true) {
                    recherchenull = false;
                    var ligneajt = document.createElement("tr");
                    var cellule;
                    for (var i = 0; i <= 5; i++) {
                        cellule = document.createElement("th");
                        cellule.setAttribute("scope", "col");
                        cellule.innerHTML = ligne[0].getElementsByTagName("th")[i].innerText;
                        ligneajt.appendChild(cellule);
                    }
                    tableau_recherche.parentNode.getElementsByTagName("thead")[0].appendChild(ligneajt);
                }
            }
        }
        if (recherchenull == true) {
            alert("Désolé aucun résultat n'a été trouvé pour votre recherche...");
        }
    }
}

function recherche_global(ligne)
{
    var inputs = ligne.parentNode.parentNode.getElementsByTagName("input");
    var ligne = tableau.getElementsByTagName("tr"); //Toutes les lignes du tableau
    var recherchenull = true; //Boolean pour sa voir si les recherche sont nulle
    for (var i = tableau_recherche.childNodes.length - 1; i > 0; i--) tableau_recherche.removeChild(tableau_recherche.childNodes[i]);
    try{
        tableau_recherche.parentNode.getElementsByTagName("thead")[0].removeChild(tableau_recherche.parentNode.getElementsByTagName("thead")[0].childNodes  [0]);
    }
    catch(ex){

    }
    if (inputs[0].value == "") // Si rien a été entré
        alert("Merci de compléter le champ avant de lancer une recherche!");
    else {
        for (var nb = 1; nb < ligne.length; nb++)
            for (var colonne = 0; colonne <=4; colonne++) {
                var recherche = new RegExp(inputs[0].value.toUpperCase());
                if (ligne[nb].getElementsByTagName("td")[colonne].innerText.toUpperCase().match(recherche) != null) {
                    var ligneajt = document.createElement("tr");
                    tableau_recherche.insertBefore(ligneajt, null);
                    var cellule;
                    cellule = document.createElement("th");
                    cellule.innerHTML = ligne[nb].getElementsByTagName("th")[0].innerText;
                    cellule.setAttribute("scope", "row");
                    ligneajt.appendChild(cellule);
                    for (var i = 0; i < 5; i++) {
                        cellule = document.createElement("td");
                        cellule.setAttribute("scope", "row");
                        cellule.innerHTML = ligne[nb].getElementsByTagName("td")[i].innerText;
                        ligneajt.appendChild(cellule);
                    }

                    if (recherchenull == true) {
                        recherchenull = false;
                        var ligneajt = document.createElement("tr");
                        var cellule;
                        for (var i = 0; i <= 5; i++) {
                            cellule = document.createElement("th");
                            cellule.setAttribute("scope", "col");
                            cellule.innerHTML = ligne[0].getElementsByTagName("th")[i].innerText;
                            ligneajt.appendChild(cellule);
                        }
                        tableau_recherche.parentNode.getElementsByTagName("thead")[0].appendChild(ligneajt);
                    }
                    colonne=5;
                }
            }
        if (recherchenull == true) {
            alert("Désolé aucun résultat n'a été trouvé pour votre recherche...");
        }
    }
}
var tableau = document.getElementById("tableau"); // Tableau de données
var thead = document.getElementById( "tableau_head" ); // En-tête du tableau de données
var tbody = tableau.children[ 1 ]; // Ensemble de données
var first = tbody.children[ 0 ]; // Première ligne de données

var tableau_recherche = document.getElementById("tableau_recherche"); // Tableau résultat des recherches
var tableau_recherche_head = tableau_recherche.children[ 0 ]; // En-tête du tableau résultat
var tableau_recherche_body = tableau_recherche.children[ 1 ]; // Ensemble de données du tableau résultat

var types = document.getElementById( "types" ); // Types de collecte d'objets
var objets = document.getElementById( "objets" ); // Objets acceptés


// Assigne un numéro de ligne aux lieux indexés
function setLines()
{
	var lignes = tableau.getElementsByTagName( "tr" );
	for (var i=1 ; i<lignes.length ; ++i)
	{
		lignes[ i ].children[ 0 ].innerHTML = i;
	}
}

// Retourne le numéro de la ligne passée en paramètre
function getLine( line )
{
	if (line.localName == "tr")
		var parent = line;
	else if (line.localName == "th")
		var parent = line.parentNode;
	else
		var parent = line.parentNode.parentNode;

	var cpt = 1;
	while (parent != first)
	{
		parent = parent.previousElementSibling;
		++cpt;
	}

	return cpt;
}

// Supprime la ligne du tableau passé en paramètre
function remove( line )
{
	var parent = line.parentNode.parentNode;
	var nb = getLine( parent );

	// Suppression de la ligne
	tbody.removeChild( parent );
	console.log( "Ligne " + nb + " supprimée" );

	// Mise à jour des lignes
	setLines();

	alert( "Ligne " + nb + " supprimée!" );
}

// Modifie la ligne du tableau passée en paramètre
function modify( line )
{
	var parent = line.parentNode.parentNode;
	console.log( parent );
	var nb = getLine( parent );
	var cases = parent.cells;

	// On active la modification
	if (parent.className == "ligne")
	{
		console.log( "Modification de la ligne " + nb + " activée" );
		var formulaire, cellule, cellule_image;

		// Crée une nouvelle ligne
		formulaire = document.createElement( "tr" );
		formulaire.setAttribute( "class", "lignemdf" );

		// On ajoute le numero de ligne à la ligne
		formulaire.appendChild( cases[ 0 ] );


		for (var i=0 ; i<cases.length-1 ; ++i)
		{
			cellule = document.createElement( "td" );
			cellule.setAttribute( "scope", "row" );
			switch (thead.cells[ i ].innerHTML)
			{
				case "Type":
					cellule.innerHTML = "<input type='text' name='" + thead.cells[ i ].innerHTML + "' placeholder=\"" + cases[ i ].innerHTML + "\" list='types'/>"
					break;

				case "Objets Acceptés":
					cellule.innerHTML = "<input type='text' name='" + thead.cells[ i ].innerHTML + "' placeholder=\"" + cases[ i ].innerHTML + "\" list='objets' multiple='multiple'/>"
					break;

				default:
					cellule.innerHTML = "<input type='text' name='" + thead.cells[ i ].innerHTML + "' placeholder=\"" + cases[ i ].innerHTML + "\"/>"
			}

			// On ajoute la cellule crée dans la ligne
			formulaire.appendChild( cellule );
		}

		// On crée la case avec les images
		cellule_image = document.createElement( "td" );
		cellule_image.setAttribute( "class", "cellule_image" );
		cellule_image.innerHTML = "<img alt='Enregister les modifications' class='done' onClick='modify( this )' src='./img/check.png'/>\n\t\t\t\t\t\t\t\t\t<img alt='Supprimer la ligne' class='delete' onClick='remove( this )' src='./img/minus.png'/>";
		// On ajoute la cellule image crée dans la ligne
		formulaire.appendChild( cellule_image );

		// On remplace la ligne par le formulaire crée
		tbody.replaceChild( formulaire, parent );
	}
	else if (parent.className == "lignemdf") // On enregistre les modifications
	{
		console.log( "Modifcations de la ligne " + nb + " enregistées" );
		var inputs = parent.getElementsByTagName( "input" );
		var modifications, cellule, cellule_image;

		// On vérifie que les données saisies sont correctes
		if (checkValues( inputs[ 1 ], inputs[ 2 ], inputs[ 3 ], inputs[ 4 ] ))
			return;

		// On crée une nouvelle ligne
		modifications = document.createElement( "tr" );
		modifications.setAttribute( "class", "ligne" );

		// On ajoute le numéro de la ligne à la ligne
		modifications.appendChild( cases[ 0 ] );

		for (var i=0 ; i<cases.length-1 ; ++i)
		{
			cellule = document.createElement( "td" );
            cellule.setAttribute( "scope", "row" );
            if (inputs[ i ].value == "") // Si rien a été entré (aucune modification)
                cellule.innerHTML = inputs[ i ].placeholder;
            else // Si quelque chose a été entré
                cellule.innerHTML = inputs[ i ].value;

            modifications.appendChild(cellule);
		}

		cellule_image = document.createElement( "td" );
        cellule_image.setAttribute( "class", "cellule_image" );
        cellule_image.setAttribute( "scope", "row" );
        cellule_image.innerHTML = "<img alt='Modifier la ligne' class='modify' onclick='modify( this )' src='./img/writing.png'/>\n\t\t\t\t\t\t\t\t\t<img alt='Supprimer la ligne' class='delete' onclick='remove( this )' src='./img/minus.png'/>";
        modifications.appendChild(cellule_image);
        
        tbody.replaceChild( modifications, parent ); // On remplace le formulaire par la ligne modifiée

        alert( "Ligne " + nb + " modifiée!" );
    }
}

// Ajoute la ligne passée en paramètre au tableau
function add( line )
{
	var parent = line.parentNode.parentNode;
	console.log( parent );
	var inputs = parent.getElementsByTagName( "input" );
	for (var i=0 ; i<inputs.length ; ++i)
	{
		switch (inputs[ i ].name)
		{
			case "Nom":
			case "Type":
			case "Objets Acceptés":
				if (inputs[ i ].value == "")
				{
					console.log( "Champ obligatoire vide, retour à l'entrée des données ..." );
					alert( "Le champ obligatoire " + inputs[ i ].name + " est vide!" );
					inputs[ i ].focus();
					return;
				}
				break;

			default:
				break;
		}
	}

	// On vérifie que les données saisies sont correctes
	if (checkValues( inputs[ 1 ], inputs[ 2 ], inputs[ 3 ], inputs[ 4 ] ))
		return;

	var ligneajt = document.createElement( "tr" );
	ligneajt.setAttribute( "class", "ligne" );

	var clone = parent.children[ 0 ].cloneNode();
	ligneajt.appendChild( clone );

	var cellule, cellule_image;
	for (var i=0 ; i<inputs.length ; ++i)
	{
		cellule = document.createElement( "td" );
		cellule.setAttribute( "scope", "row" );
		cellule.setAttribute( "class", "ligne" );
		cellule.innerHTML = (inputs[ i ].value == "") ? "Non renseigné" : inputs[ i ].value;

		ligneajt.appendChild( cellule );
		inputs[ i ].value = "";
	}

	cellule_image = document.createElement( "td" );
	cellule_image.setAttribute( "class", "cellule_image" );
	cellule_image.setAttribute( "scope", "row" );
	cellule_image.innerHTML = "<img alt='Modifier la ligne' class='modify' onclick='modify( this )' src='./img/writing.png'/>\n\t\t\t\t\t\t\t\t\t<img alt='Supprimer la ligne' class='delete' onclick='remove( this )' src='./img/minus.png'/>";

	ligneajt.appendChild( cellule_image );
	console.log( ligneajt );

	tbody.insertBefore( ligneajt, tbody.lastElementChild );

	setLines();

	console.log( "Une ligne a été ajoutée" );
	alert( "Ligne ajoutée!" );
}

// Vérifie les données saisies
function checkValues( type, localisation, contact, objet )
{
	var numbers = /\d/g;
	var letters = /[A-Za-z]/g;

	console.log( "Checking values" );

	console.log( type.value.match( numbers ) );
	if (type.value.match( numbers ) != null)
	{
		console.log( "Mauvaise saisie du type" );
		alert( "On ne s'attend pas à des chiffres dans la case type ..." );
		type.focus();
		return true;
	}

	console.log( localisation.value.match( /\d+° N|S, \d+° E|W/ ) + localisation.value != "Non renseigné" + localisation.value != "");
	if (localisation.value.match( /\d+° N|S, \d+° E|W/ ) == null && localisation.value != "Non renseigné" && localisation.value != "")
	{
		console.log( "Mauvaise saisie de la localisation" );
		alert( "Le format de la localisation est mauvais. Exemple : 45° N, 4° E est valide.\nLaissez la case vide si vous ne connaissez pas la localisation." );
		localisation.focus();
		return true;
	}

	console.log( contact.value.match( /@[a-z]+\./ ) + contact.value.match( /\d\d \d\d \d\d \d\d \d\d/ ) + contact.value != "Non renseigné" + contact.value != "" );
	if (contact.value.match( /@[a-z]+\./ ) == null && contact.value.match( /\d\d \d\d \d\d \d\d \d\d/ ) == null && contact.value != "Non renseigné" && contact.value != "")
	{
		console.log( "Mauvaise saisie du contact" );
		alert( "Le format du contact est mauvais. Un numéro de téléphone à 10 chiffres ou une adresse mail est attendue.\nLaissez la casese vide si vous ne connaissez pas le moyen de contact." );
		contact.focus();
		return true;
	}

	console.log( objet.value.match( numbers ) );
	if (objet.value.match( numbers ) != null)
	{
		console.log( "Mauvaise saisie de l'objet" );
		alert( "On ne s'attend pas à des chiffres dans la case objet acceptés ..." );
		objet.focus();
		return true;
	}

	return false;
}

function recherche(ligne, colonne)
{
    var inputs = ligne.parentNode.parentNode.getElementsByTagName("input");
    var ligne = tableau.getElementsByTagName("tr"); //Toutes les lignes du tableau
    var recherchenull = true; //Boolean pour sa voir si les recherche sont nulle
    for (var i = tableau_recherche_body.childNodes.length - 1; i > 0; i--)
        tableau_recherche_body.removeChild(tableau_recherche.childNodes[i]);
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
                tableau_recherche_body.insertBefore(ligneajt, null);
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
                if (recherchenull == true)
                    recherchenull = false;
            }
        }
        tableau_recherche.style.display = "initial";
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
    for (var i = tableau_recherche_body.childNodes.length - 1; i > 0; i--) tableau_recherche.removeChild(tableau_recherche.childNodes[i]);
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

                    if (recherchenull == true)
                        recherchenull = false;
                    colonne=5;
                }
            }
        tableau_recherche.style.display = "initial";
        if (recherchenull == true) {
            alert("Désolé aucun résultat n'a été trouvé pour votre recherche...");
        }
    }
}
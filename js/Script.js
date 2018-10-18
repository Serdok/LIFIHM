var tableau = document.getElementById( "tableau" );

var types = ["Don", "Dépôt vente", "Déchetterie"];
var objets = ["Audio / Vidéo", "Bricolage", "Culture", "Décoration", "Electroménager", "Loisirs", "Meubles", "Multimédia", "Puériculture", "Végétaux"];


function getACTIVEligne (ligne) // Retourne le numéro de la ligne cliquée
{
	var parent = ligne.parentNode.parentNode;
	var i = 0;
	while (parent.previousElementSibling != null)
	{
		parent = parent.previousElementSibling;
		i++;
	}

	return i;
}

function remove (ligne) // Supprime une ligne
{
	var nb = getACTIVEligne( ligne );
	tableau.removeChild( ligne.parentNode.parentNode );

	alert( "Ligne " + nb + " supprimée!" );
}

function modify (ligne) // Modifie une ligne du tableau
{
	var parent = ligne.parentNode.parentNode;
	var fils = parent.children;
	var nb = getACTIVEligne( ligne );

	if (parent.className == "ligne")
	{
console.log( "Modification de la ligne " + nb + " activée" );
		var formulaire, cellule, cellule_image;
		formulaire = document.createElement( "form" );
		formulaire.setAttribute( "class", "lignemdf" );
		formulaire.setAttribute( "autocomplete", "off" );

		for (var i = 0; i < fils.length - 1; i++)
		{
			cellule = document.createElement( "div" );
			cellule.setAttribute( "class", "cellule" );
			switch (tableau.children[0].children[i].innerHTML)
			{
				case "Type":
					cellule.innerHTML = "<input type = 'text' name = '" + tableau.children[0].children[i].innerHTML + "' placeholder = '" + fils[i].innerHTML + "' list = 'types'/>";
					break;

				case "Objets acceptés":
					cellule.innerHTML = "<input type = 'text' name = '" + tableau.children[0].children[i].innerHTML + "' placeholder = '" + fils[i].innerHTML + "' list = 'objets'/>";
					break;

				default:
					cellule.innerHTML = "<input type = 'text' name = '" + tableau.children[0].children[i].innerHTML + "' placeholder = '" + fils[i].innerHTML + "' >";
			}
			formulaire.appendChild( cellule );
		}
		cellule_image = document.createElement( "div" );
		cellule_image.setAttribute( "class", "cellule_image" );
		cellule_image.innerHTML = "<img src = './img/check.png' class = 'done' onClick = 'modify( this )'/></br>\n\t\t\t\t\t\t\t<img src = './img/minus.png' class = 'delete' onClick = 'remove( this )'/>";
		formulaire.appendChild( cellule_image );

		tableau.replaceChild( formulaire, parent );
	}
	else if (parent.className == "lignemdf")
	{
console.log( "Enregistrement des modifications de la ligne " + nb );
		var inputs = parent.getElementsByTagName( "input" );
		var modifications, cellule, cellule_image;
		modifications = document.createElement( "div" );
		modifications.setAttribute( "class", "ligne" );

		for (var i = 0; i < fils.length - 1; i++)
		{
			cellule = document.createElement( "div" );
			cellule.setAttribute( "class", "cellule" );
			if (inputs[i].value == "")
				cellule.innerHTML = inputs[i].placeholder;
			else
				cellule.innerHTML = inputs[i].value;
			modifications.appendChild( cellule );
		}
		cellule_image = document.createElement( "div" );
		cellule_image.setAttribute( "class", "cellule_image" );
		cellule_image.innerHTML = "<img src = './img/writing.png' class = 'modify' onClick = 'modify( this )'/></br>\n\t\t\t\t\t\t\t<img src = './img/minus.png' class = 'delete' onClick = 'remove( this )'/>";
		modifications.appendChild( cellule_image );

		tableau.replaceChild( modifications, parent );

		alert( "Ligne " + nb + " modifiée!" );
	}
}

function add (ligne) // Ajoute une ligne à la fin du tableau
{
	var inputs = ligne.parentNode.parentNode.getElementsByTagName( "input" );
	for (var i = 0; i < inputs.length; i++)
	{
		if (inputs[i].value == "")
		{
			console.log( inputs[i].name + " a son champ vide!" );
			alert( "Merci de compléter le champ " + inputs[i].name + " avant d'ajouter cette ligne!" );
			inputs[i].focus();
			return false;
		}
	}

	var nb_lignes = tableau.children.length - 1;
	var ligneajt = document.createElement( "div" );
	ligneajt.setAttribute( "class", "ligne" );
	tableau.insertBefore( ligneajt, tableau.lastElementChild );

	var cellule, cellule_image;
	for (var i = 0; i < inputs.length; i++)
	{
		cellule = document.createElement( "div" );
		cellule.setAttribute( "class", "cellule" );
		cellule.innerHTML = inputs[i].value;
		ligneajt.appendChild( cellule );
	}
	cellule_image = document.createElement( "div" );
	cellule_image.setAttribute( "class", "cellule_image" );
	cellule_image.innerHTML = "<img src = './img/writing.png' class = 'modify' onClick = 'modify( this )' style='height: 60%; padding: 10px 0px 10px 0px;'/></br>\n\t\t\t\t\t\t\t<img src = './img/minus.png' class = 'delete' onClick = 'remove( this )' style='height: 60%; padding: 10px 0px 10px 0px;' />";
	ligneajt.appendChild( cellule_image );

	alert( "Ligne ajoutée!" );
}

function research () // Recherche un lieu précis
{
	
}

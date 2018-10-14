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
			cellule.innerHTML = "<input type = 'text' name = '" + tableau.children[0].children[i].innerHTML + "' placeholder = '" + fils[i].innerHTML + "' >";
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
	}

	alert( "Ligne " + nb + " modifiée!" );
}

function autocompletion (input, array) // Gère l'autocomplétion du champ input avec les données array
{
	var focus;

	input.addEventListener( "focus", function (e) // Changement de valeur
	{
		var a, b, i, value = this.value;
//		closeOtherAutocompletion();

		focus = -1;

		a = document.createElement( "div" );
		a.setAttribute( "id", this.id + "autocomplete-list" );
		a.setAttribute( "class", "autocomplete-items" );
		this.parentNode.appendChild( a );

		
		for (i = 0; i < array.length; i++)
		{
			if (value == "")
			{
				b = document.createElement( "div" );
				b.innerHTML = "<p>" + array[i] + "</p>";
				b.innerHTML += "<input type = 'hidden' value = '" + array[i] + "'>";
				b.addEventListener( "click", function (e)
				{
					input.value = this.getElementsByTagName( "input" )[0].value;
					closeOtherAutocompletion();
				});
				a.appendChild( b );
			}
		}
	});

	input.addEventListener( "input", function (e) // Changement de valeur
	{
		var a, b, i, value = this.value;
//		closeOtherAutocompletion();

		focus = -1;

		a = document.createElement( "div" );
		a.setAttribute( "id", this.id + "autocomplete-list" );
		a.setAttribute( "class", "autocomplete-items" );
		this.parentNode.appendChild( a );

		
		for (i = 0; i < array.length; i++)
		{
			if (array[i].substr( 0, value.length ).toUpperCase() == value.toUpperCase())
			{
				b = document.createElement( "div" );
				b.innerHTML = "<strong>" + array[i].substr( 0, value.length ) + "</strong>";
				b.innerHTML += array[i].substr( value.length );
				b.innerHTML += "<input type = 'hidden' value = '" + array[i] + "'>";
				b.addEventListener( "click", function (e)
				{
					input.value = this.getElementsByTagName( "input" )[0].value;
					closeOtherAutocompletion();
				});
				a.appendChild( b );
			}
			else if (value == "")
			{
				b = document.createElement( "div" );
				b.innerHTML = "<p>" + array[i] + "</p>";
				b.innerHTML += "<input type = 'hidden' value = '" + array[i] + "'>";
				b.addEventListener( "click", function (e)
				{
					input.value = this.getElementsByTagName( "input" )[0].value;
					closeOtherAutocompletion();
				});
				a.appendChild( b );
			}
		}
	});


	input.addEventListener( "keydown", function (e)
	{
		var x = document.getElementById( this.id + "autocomplete-list" );
		if (x)
			x = x.getElementsByTagName( "div" );

		if (e.keyCode == 40) // Flèche du bas
		{
			focus++;
			addActive( x );
		}
		else if (e.keyCode == 38) // Flèche du haut
		{
			focus--;
			addActive( x );
		}
		else if (e.keyCode == 13) // Touche Entrer, permet d'empêcher l'envoi du formulaire
		{
			e.preventDefault();
			if (focus > -1)
				if (x)
					x[focus].click();
		}
	});

	function addActive (x) // Classifie un objet en tant qu'actif
	{
		if (!x)
			return false;

		removeActive( x );
		if (focus >= x.length)
			focus = 0;
		if (focus < 0)
			focus = x.length - 1;

		x[focus].classList.add( "autocomplete-active" );
	}

	function removeActive (x) // Déclassifie un objet actif
	{
		for (var i = 0; i < x.length; i++)
			x[i].classList.remove( "autocomplete-active" );
	}

	function closeOtherAutocompletion (element) // Ferme les autres autocomplétions, sauf celui passé en paramètre
	{
		var x = document.getElementsByClassName( "autocomplete-items" );
		for (var i = 0; i < x.length ; i++)
			if (element != x[i] && element != input)
				x[i].parentNode.removeChild( x[i] );
	}

	document.addEventListener( "click", function (e) // Ajout d'un évènement si l'utilisateur clique sur la page
	{
		closeOtherAutocompletion( e.target );
	});
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

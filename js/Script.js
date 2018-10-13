var menu = document.querySelector( "nav" );
var tableau = document.querySelector( "div#tableau" );

var nom = document.getElementById( "Nom" );
var type = document.getElementById( "Type" );
var coordonnees = document.getElementById( "Coordonnees" );
var contact = document.getElementById( "Contact" );
var objets = document.getElementById( "Objets" );
var tabID = [nom, type, coordonnees, contact, objets];

var nblines = 1;

document.onkeydown = function (e)
{
	e = e || window.event;
	isCapsLockOn( e );
}

function isCapsLockOn (e)
{
	var warning_text = document.getElementById( "CapsLock" );
	var capsOn = false;
	if (e.CapsLock)
	{
		warning_text.style.display = "block";
		alert( "Touche Caps pressée" );
	}
}

function repli () // Replie le tableau
{
	
}

function add () // Ajoute une ligne à la fin du tableau
{

	alert( "Ligne ajoutée!" );
}

function remove (line) // Supprime une ligne
{

	alert( "Ligne " + line + " supprimée!" );
}

function change (line) // Modifie une ligne du tableau
{
	
	alert( "Ligne " + line + " modifiée!" );
}

function research () // Recherche un lieu précis
{
	
}

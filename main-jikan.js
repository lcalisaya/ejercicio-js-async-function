const lista = document.getElementById('lista');
const miDiv = document.getElementById('miDiv');

//Para presentar los datos de una persona
function addPerson(person){
	this.personImage = document.createElement('img');
	this.personBirthday = document.createElement('p');

	this.personBirthday.innerHTML = 'Fecha de Nacimiento:' + '<br>' + person.birthday;
	this.personImage.setAttribute('crossOrigin','anonymous');
	this.personImage.setAttribute('src', person.image);

	this.personImage.onload = () => {
		miDiv.setAttribute('style', traerFondo(this.personImage));
	}

	miDiv.append(this.personImage);
	miDiv.append(this.personBirthday);
}

//Por cada personaje en formato JSON:
//se construye un objeto, el cual será un item de la lista presentada en pantalla
function makeCharacter(person, i){
	this.character = document.createElement('li');
	this.characterImage = document.createElement('img');
	this.characterName = document.createElement('p');

	this.character.className = 'character';

	this.characterName.textContent = `Personaje: ${person['voice-acting-role'][i].character.name}`;
	this.characterImage.setAttribute('crossOrigin','anonymous');
	this.characterImage.setAttribute('src', person['voice-acting-role'][i].character.image);
	
	// this.character.setAttribute('style', traerFondo(this.characterImage));
	this.character.setAttribute('style', 'background:black;');

	this.character.append(this.characterImage);
	this.character.append(this.characterName);

	lista.append(this.character);
}

//Se obtienen los colores predominantes de la imagen, que va a ser el background-color
function traerFondo(imagen){
	const vibrant = new Vibrant(imagen);
	const colors = vibrant.swatches();
	return( 
		`
		background:
			linear-gradient(
				${colors.Vibrant.getHex()},
				transparent
			),
			linear-gradient(
				90deg,
				${colors.LightVibrant.getHex()},
				transparent
			),
			linear-gradient(
				-90deg,
				${colors.DarkVibrant.getHex()},
				transparent
			);
		`
	);
}


//Para la persona solicitada, se va a buscar los datos a un servidor
async function getPerson(id) {
	const response = await fetch(`https://jikan.me/api/person/${id}`);
	const data = await response.json();
	const qCharacters = data['voice-acting-role'].length;
	// console.log(data['voice-acting-role'][0].character.name);
	// console.log(qCharacters);
	
	addPerson(data); //Para mostrar al actor/actriz

	for(let pos=0; pos < qCharacters; pos++){
		makeCharacter(data, pos); //Para mostrar un personaje interpretado por el actor/actriz
	}
}

//Pedimos que se traiga la persona con ID=81
getPerson(81);
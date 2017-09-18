const lista = document.getElementById('lista');
const miDiv = document.getElementById('miDiv');

function addPerson(person){
this.personImage = document.createElement('img');
this.personBirthday = document.createElement('p');

this.personBirthday.textContent = `#Fecha de Nacimiento: ${person.birthday}`;
this.personImage.setAttribute('crossOrigin','anonymous');
this.personImage.setAttribute('src', person.image);

this.personImage.onload = () => {
	const vibrant = new Vibrant(this.personImage);
	const colors = vibrant.swatches();
	miDiv.setAttribute('style', 
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

	this.character.append(this.characterImage);
	this.character.append(this.characterName);

	lista.append(this.character);
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
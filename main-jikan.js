const lista = document.getElementById('lista');

//Por cada persona en formato JSON:
//se construye un objeto que será un item de una lista que se presentará en pantalla
function makePerson(person){
	this.person = document.createElement('li');
	this.personImage = document.createElement('img');
	this.personBirth = document.createElement('p');

	this.person.className = 'person';

	this.personBirth.textContent = `#${person.birthday}`;
	this.personImage.setAttribute('crossOrigin','anonymous');
	this.personImage.setAttribute('src', person.image);

	this.person.append(personImage);
	this.person.append(personBirth);

	lista.append(this.person);

	//En el momento de cargar la imagen en pantalla, se le va a agregar un fondo con colores
	this.personImage.onload = () => {
		const vibrant = new Vibrant(this.personImage);
		const colors = vibrant.swatches();
		this.person.setAttribute('style',
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
}

//Se especifica a la API qué IDs de personas se quiere pedir
function getPeopleList(min,max) {
	this.min = min;
	this.max = max;
	for(let i = min; i <= max; i++) {
		getPerson(i);
	}
}

//Por cada persona solicitada, se irá a buscar los datos a un servidor
async function getPerson(id) {
	const response = await fetch(`https://jikan.me/api/person/${id}`);
	const data = await response.json();
	makePerson(data);
}

//Pedimos que se traigan 8 personas: Desde el ID=10 hasta el ID=17
getPeopleList(10,17);
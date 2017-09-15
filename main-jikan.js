// const animeList = [
// 	{
// 		name: 'Caballeros del Zodíaco',
// 		vista: true
// 	},
// 	{
// 		name: 'Sailor Moon',
// 		vista: true
// 	},
// 	{
// 		name: 'Dragon Ball',
// 		vista: false
// 	},
// 	{
// 		name: 'Detective Conan',
// 		vista: true
// 	},
// 	{
// 		name: 'Evangelion',
// 		vista: false
// 	}
// ];

const lista = document.getElementById('lista');

// animeList.forEach( (anime) => {
// 	const itemLi = document.createElement('li');
// 	const estado = document.createElement('p');

// 	itemLi.className = 'anime';
// 	itemLi.textContent = anime.name;
// 	estado.textContent = anime.vista;

// 	itemLi.append(estado);
// 	lista.append(itemLi);
// });


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

function getPeopleList(min,max) {
	this.min = min;
	this.max = max;
	for(let i = min; i <= max; i++) {
		getPerson(i);
	}
}

async function getPerson(id) {
	const response = await fetch(`https://jikan.me/api/person/${id}`);
	const data = await response.json();
	makePerson(data);
}

getPeopleList(10,17);
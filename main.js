// const pokemonList = [
//   {
//     name: 'Pikachu',
//     type: 'Electrico',
//   },
//   {
//     name: 'Bulbasaur',
//     type: 'Planta',
//   },
//   {
//     name: 'Charmander',
//     type: 'Fuego'
//   },
//   {
//     name: 'Squirtle',
//     type: 'Agua',
//   }
// ];
const lista = document.getElementById('lista');

// pokemonList.forEach((pokemon) => {
//   const $pokemon = document.createElement('li');
//   const $pokemonType = document.createElement('p');
//   $pokemon.className = 'pokemon';
//   $pokemon.textContent = pokemon.name;
//   $pokemonType.textContent = pokemon.type;
//   $pokemon.append($pokemonType);
//   $lista.append($pokemon);
// });

function makePokemon(pokemon) {
  // Mi pokemon
  this.pokemon = document.createElement('li');
  // La imagen
  this.pokemonSprite = document.createElement('img');
  // El nombre de nuestro poke
  this.pokemonName = document.createElement('p');

  // Agregar una clase para usar en CSS
  this.pokemon.className = 'pokemon';

  // Agregar el texto del nombre
  this.pokemonName.textContent = `#${pokemon.id} ${pokemon.name}`;

  // Manipular la imagen
  this.pokemonSprite.setAttribute('crossOrigin', 'anonymous')
  this.pokemonSprite.setAttribute('src', pokemon.sprites.front_default)

  //Agregar el nombre y la imagen al pokemon
  this.pokemon.append(this.pokemonSprite);
  this.pokemon.append(this.pokemonName);

  //Agregar el pokemon al elemento principal
  lista.append(this.pokemon);

  // Cuando la imagen se muestre en pantallas hagamos esto
  this.pokemonSprite.onload = () => {
    const vibrant = new Vibrant(this.pokemonSprite);
    const colors = vibrant.swatches()
    this.pokemon.setAttribute('style',
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

// Llamar a un rango de pokemon
function getPokemonList(min, max) {
  this.min = min;
  this.max = max;
  for (let i = min; i <= max; i++) {
    getPokemon(i);
  }
}

// function getPokemon(id) {
//   fetch(`http://pokeapi.co/api/v2/pokemon/${id}/`).then((response) => {
//     response.json().then((data) => {
//       makePokemon(data);
//     })
//   })
// }

// Obtener un pokemon desde el API
async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await response.json();
  makePokemon(data);
}

// getPokemonList(10);
getPokemonList(90, 100);


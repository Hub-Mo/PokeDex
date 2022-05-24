
document.getElementById('run').addEventListener('click', (e) => {
    e.preventDefault();
    getPokemon();


async function getPokemon() {
    let PokeName = document.getElementById('pokemon-name');
    let PokeId = document.getElementById('pokemon-id');
    let PokeImage = document.getElementById('pokemon-image');
    let input = document.getElementById('search').value.toLowerCase();
    let movesList = document.getElementById('moves-list');
    let type = document.getElementById('type');
    let evolutionTarget = document.getElementById('evolution');
    let previousEvoImg = document.getElementById('prevEvoImg');



    

    let Api = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    let Pokemon = await Api.json();
    PokeName.innerHTML = Pokemon.name;
    PokeImage.setAttribute('src', Pokemon.sprites.other.home.front_default)
    PokeId.innerHTML = `#${Pokemon.id}`;
    movesList.innerHTML = '';
    if (Pokemon.moves.length > 4) {
            for (let i = 0; i < 4; i++) {
                movesList.innerHTML +=`<li> ${Pokemon.moves[i].move.name} </li>`;
            }
        }
    else {
        for (let i = 0; i < Pokemon.moves.length; i++) {
            movesList.innerHTML += `<li>${Pokemon.moves[i].move.name}</li>`;
    }
    }

    type.innerHTML = Pokemon.types[0].type.name;
    
    let EvoApi = await fetch(Pokemon.species.url);
    let evolution = await EvoApi.json();
    try {
        let prevEvoApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.evolves_from_species.name}`)
        let prevEvolution = await prevEvoApi.json()
        evolutionTarget.innerHTML = '';
        evolutionTarget.innerHTML += `<h3> Evolves from </h3> ${evolution.evolves_from_species.name}`;
        previousEvoImg.setAttribute('src', prevEvolution.sprites.other.home.front_default);
    }
    catch(error) {
        console.log('error10111', error);
        evolutionTarget.innerHTML = '';
        evolutionTarget.innerHTML += `<h3>No previous form</h3>`;
        previousEvoImg.setAttribute('src', 'images/pokeball-icon-27049.png');
    }
    
}

});




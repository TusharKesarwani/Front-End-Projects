
const pokecount = 151;
var pokedex = {};

window.onload = async function(){
    for (let i = 1; i <= pokecount; i++) {
        await getPokemon(i);
        let pokemon = document.createElement("div");
  
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokeName");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("allNames").append(pokemon);
    }
      
}

async function getPokemon(num){
    let url =  "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    console.log(pokemon);
    
    let pokeName = pokemon["name"];
    let pokeType = pokemon["types"];
    let pokeImg = pokemon["sprites"]["other"]["dream_world"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokeDesc = await res.json();

    //console.log(pokeDesc);
    pokeDesc = pokeDesc["flavor_text_entries"][12]["flavor_text"]

    pokedex[num] = {"name": pokeName, "img": pokeImg, "types": pokeType, "desc" : pokeDesc}
}

function updatePokemon(){
    document.getElementById("pokemonImg").src = pokedex[this.id]["img"]

    let typesDiv = document.getElementById("pokemonType");
    while(typesDiv.firstChild){
        typesDiv.firstChild.remove();
    }

    let types = pokedex[this.id]["types"];
    for(let i = 0 ; i < types.length ; i++){
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]);
        typesDiv.append(type);
    }

    document.getElementById("pokedescp").innerText = pokedex[this.id]["desc"];
}













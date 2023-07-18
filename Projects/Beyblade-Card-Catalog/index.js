var startingCharacters = [];
var filterCharacters = [];
fetch("beyblade.json")
  .then((response) => response.json())
  .then((data) => {
    const charactersContainer = document.getElementById("characters");

    data.forEach((character) => {
      const characterCard = document.createElement("div");
      characterCard.classList.add("character-card");

      const characterImage = document.createElement("img");
      characterImage.src = character.imageURL;

      const characterName = document.createElement("h2");
      characterName.textContent = character.name;

      const characterDescription = document.createElement("p");
      characterDescription.textContent = character.description;

      const characterBeyblade = document.createElement("p");
      const Beyblade = document.createElement("strong");
      Beyblade.textContent = "Beyblade";
      const charBeyblade = document.createElement("span");
      charBeyblade.textContent = character.beyblade;
      characterBeyblade.appendChild(Beyblade);
      characterBeyblade.appendChild(charBeyblade);
      characterBeyblade.classList.add("bey");

      characterCard.appendChild(characterImage);
      characterCard.appendChild(characterName);
      characterCard.appendChild(characterDescription);
      characterCard.appendChild(characterBeyblade);

      charactersContainer.appendChild(characterCard);
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));
async function getCharacters() {
  const ch = await fetch("beyblade.json");
  startingCharacters = await ch.json();
  console.log(startingCharacters);
}
getCharacters();
function newTemplate(filterCharacters) {
  const charactersContainer = document.getElementById("characters");

  filterCharacters.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.classList.add("character-card");

    const characterImage = document.createElement("img");
    characterImage.src = character.imageURL;

    const characterName = document.createElement("h2");
    characterName.textContent = character.name;

    const characterDescription = document.createElement("p");
    characterDescription.textContent = character.description;

    const characterBeyblade = document.createElement("p");
    const Beyblade = document.createElement("strong");
    Beyblade.textContent = "Beyblade";
    const charBeyblade = document.createElement("span");
    charBeyblade.textContent = character.beyblade;
    characterBeyblade.appendChild(Beyblade);
    characterBeyblade.appendChild(charBeyblade);
    characterBeyblade.classList.add("bey");

    characterCard.appendChild(characterImage);
    characterCard.appendChild(characterName);
    characterCard.appendChild(characterDescription);
    characterCard.appendChild(characterBeyblade);

    charactersContainer.appendChild(characterCard);
  });
}

document
  .getElementById("input-box")
  .addEventListener("input", function getFilterCharacter() {
    const letters = document.getElementById("input-box").value.toLowerCase();
    filterCharacters = startingCharacters.filter((e) => {
      return e.name.toLowerCase().includes(letters);
    });
    const charactersContainer = document.getElementById("characters");
    charactersContainer.innerHTML = "";
    newTemplate(filterCharacters);
  });

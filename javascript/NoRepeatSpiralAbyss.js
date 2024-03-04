// NoRepeatSpiralAbyss.js
import characters from "./GenshinCharacters.js";

// Function to create a character card element
function createCharacterCard(character) {
  const characterCard = document.createElement("div");
  characterCard.classList.add("character-card");
  characterCard.draggable = true;

  const img = document.createElement("img");
  img.src = "css/Genshin Impact/Character Icons/" + character.Name + ".png";
  img.classList.add("character-image");
  img.classList.add(`rarity-${character.Rarity}`);

  const name = document.createElement("div");
  name.classList.add("character-name");
  name.textContent = character.Name;

  const element = document.createElement("img");
  element.src =
    "css/Genshin Impact/Elements/Element_" + character.Element + ".png";
  element.classList.add("element-image");

  const weapon = document.createElement("img");
  weapon.src = "css/Genshin Impact/Weapons/Icon_" + character.Weapon + ".webp";
  weapon.classList.add("weapon-image");

  characterCard.appendChild(img);
  characterCard.appendChild(name);
  characterCard.appendChild(element);
  characterCard.appendChild(weapon);
  return characterCard;
}

// Function to create the character grid
function createCharacterGrid(characters) {
  const characterGrid = document.createElement("div");
  characterGrid.classList.add("character-grid");

  characters.forEach((character) => {
    const characterCard = createCharacterCard(character);
    characterGrid.appendChild(characterCard);
  });

  return characterGrid;
}

// Function to initialize the grid container
function initializeGridContainer() {
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid-container");

  const characterGrid = createCharacterGrid(characters);
  gridContainer.appendChild(characterGrid);

  return gridContainer;
}

// Add the grid container to the document body
document.body.appendChild(initializeGridContainer());

// Now you can use the 'characters' array in this file
console.log(characters);

//
//
//
// Function to handle swapping of character cards

// Function to handle swapping of character cards
function handleCardSwap(selectedCard, newCard) {
  // Check if selectedCard and newCard are valid elements
  if (!selectedCard || !newCard) {
    console.error("Invalid card elements");
    return;
  }

  // Clone the nodes to swap
  const selectedCardClone = selectedCard.cloneNode(true);
  const newCardClone = newCard.cloneNode(true);

  // Check if parent nodes of selectedCard and newCard exist
  if (!selectedCard.parentNode || !newCard.parentNode) {
    console.error("Parent nodes of cards do not exist");
    return;
  }

  // Swap the nodes
  selectedCard.parentNode.replaceChild(newCardClone, selectedCard);
  newCard.parentNode.replaceChild(selectedCardClone, newCard);

  // Remove the 'selected' class from all cards
  document.querySelectorAll(".character-card.selected").forEach((card) => {
    card.classList.remove("selected");
  });

  // Reattach event listeners to the new card elements
  initializeEventListeners();
}

// Function to initialize the event listeners
function initializeEventListeners() {
  const characterCards = document.querySelectorAll(".character-card");

  characterCards.forEach((card) => {
    card.addEventListener("click", toggleCardSelection);
  });
}

// Function to toggle card selection
function toggleCardSelection() {
  const isSelected = this.classList.contains("selected");

  if (isSelected) {
    this.classList.remove("selected");
  } else {
    const selectedCard = document.querySelector(".character-card.selected");

    if (selectedCard) {
      handleCardSwap(selectedCard, this);
      selectedCard.classList.remove("selected");
    } else {
      this.classList.add("selected");
    }
  }
}

// Initialize event listeners after the document has loaded
document.addEventListener("DOMContentLoaded", () => {
  createDeleteButton();
  initializeEventListeners();
});

// Function to create a delete button
function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Selected Character";
  deleteButton.id = "delete-button";
  deleteButton.addEventListener("click", deleteSelectedCharacters);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(deleteButton);

  document.body.insertBefore(buttonContainer, document.body.lastChild); // Insert before the grid container
}

function deleteSelectedCharacters() {
  const selectedCards = document.querySelectorAll(".character-card.selected");

  selectedCards.forEach((card) => {
    card.remove();
  });
}

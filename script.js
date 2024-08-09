const GAME_WORD_LIBRARY = [
  "apple",
  "bread",
  "chair",
  "dance",
  "eagle",
  "field",
  "globe",
  "heart",
  "image",
  "jewel",
  "knife",
  "lemon",
  "mouse",
  "nurse",
  "ocean",
  "piano",
  "queen",
  "river",
  "snake",
  "table",
  "uncle",
  "vivid",
  "whale",
  "xenon",
  "young",
  "zebra",
  "actor",
  "beach",
  "candy",
  "dream",
  "event",
  "flame",
  "grape",
  "hotel",
  "india",
  "joker",
  "kiosk",
  "linen",
  "magic",
  "novel",
  "olive",
  "peace",
  "query",
  "robot",
  "sugar",
  "train",
  "unity",
  "viper",
  "water",
  "xerox",
  "youth",
  "zesty",
  "angel",
  "brave",
  "clock",
  "doubt",
  "eager",
  "fence",
  "grill",
  "house",
  "input",
  "jolly",
  "kitty",
  "laser",
  "mango",
  "night",
  "onion",
  "pride",
  "quick",
  "raven",
  "stone",
  "tiger",
  "urban",
  "virus",
  "world",
  "xylos",
  "yacht",
  "zonal",
  "apron",
  "blend",
  "crisp",
  "drink",
  "elbow",
  "flock",
  "grand",
  "hobby",
  "intro",
  "juice",
  "karma",
  "lobby",
  "meant",
  "north",
  "oxide",
  "pound",
  "quest",
  "rider",
  "share",
  "trust",
  "ultra",
  "vocal",
  "wheat",
  "yield",
  "zephyr",
  "alert",
  "brand",
  "catch",
  "depot",
  "epoch",
  "frame",
  "glide",
  "honey",
  "ideal",
  "kneel",
  "lofty",
  "march",
  "noble",
  "orbit",
  "panel",
  "quilt",
  "raise",
  "shiny",
  "track",
  "upset",
  "vigor",
  "wharf",
  "yummy",
  "about",
  "brisk",
  "charm",
  "drove",
  "early",
  "flute",
  "grain",
  "hound",
  "index",
  "jumpy",
  "knead",
  "lover",
  "match",
  "notch",
  "onset",
  "petal",
  "quiet",
  "reign",
  "sight",
  "trend",
  "valid",
  "wrist",
  "alien",
  "blush",
  "count",
  "drill",
  "entry",
  "fable",
  "gloss",
  "heron",
  "inbox",
  "koala",
  "light",
  "mirth",
  "noted",
  "opera",
  "plane",
  "quark",
  "round",
  "scale",
  "thumb",
  "vowel",
  "yeast",
  "asset",
  "brick",
  "crane",
  "drone",
  "evoke",
  "flair",
  "glory",
  "harsh",
  "blend",
  "crowd",
  "fruit",
  "grasp",
  "happy",
  "jolly",
  "learn",
  "model",
  "oasis",
  "penny",
  "quill",
  "salad",
  "treat",
  "uncle",
  "valid",
  "woven",
];

const gamePanel = document.getElementById("gamePanel");
const numberOfGameCardWords = 36; // FUTURE USE FOR LEVEL SELECTION ???????
const randomNumbers = getrandomNumbers();
const gameCardWords = getgameCardWords(randomNumbers);

let firstSelectedWordWithId = "";
let firstSelectedWordWithoutId = "";
let gameCardWordsWithIds = [];

function renderGameCards() {
  let gameCardWordsCopy = [...gameCardWords];

  for (i = 0; i < gameCardWords.length; i++) {
    let randomIndex = Math.floor(Math.random() * gameCardWordsCopy.length);

    let childElement = `<div id="${gameCardWordsCopy[randomIndex]}-${i}" class="gameCard" onclick="checkIsMatch('${gameCardWordsCopy[randomIndex]}-${i}')"><span class="hide">${gameCardWordsCopy[randomIndex]}</span></div>`;
    gamePanel.innerHTML += childElement;

    gameCardWordsWithIds.push(`${gameCardWordsCopy[randomIndex]}-${i}`);

    gameCardWordsCopy.splice(randomIndex, 1);
  }
}

function getrandomNumbers() {
  let randomNumbers = [];

  for (let i = 0; i < numberOfGameCardWords; i++) {
    let randomNumber = Math.floor(Math.random() * GAME_WORD_LIBRARY.length);

    if (randomNumbers.includes(randomNumber)) {
      i--;
      continue;
    } else {
      randomNumbers.push(randomNumber);
    }
  }

  return randomNumbers;
}

function getgameCardWords(randomNumbers) {
  let gameCardWords = [];

  for (let randomNumber of randomNumbers) {
    gameCardWords.push(
      GAME_WORD_LIBRARY[randomNumber],
      GAME_WORD_LIBRARY[randomNumber]
    );
  }

  return gameCardWords;
}

async function checkIsMatch(selectedWordWithId) {
  let selectedWordWithoutId = selectedWordWithId.replace(/-.*/, "");

  if (firstSelectedWordWithoutId === "") {
    document.getElementById(selectedWordWithId).style.pointerEvents = "none"; // ensure the same game card can't be selected twice
    showGameCardWord(selectedWordWithId);

    firstSelectedWordWithId = selectedWordWithId;
    firstSelectedWordWithoutId = selectedWordWithoutId;
  } else if (firstSelectedWordWithoutId === selectedWordWithoutId) {
    showGameCardWord(selectedWordWithId);

    firstSelectedWordWithId = "";
    firstSelectedWordWithoutId = "";
  } else {
    showGameCardWord(selectedWordWithId);
    disablePointer();
    await sleep(2000); // momentarily show the two selected unmatching words before hiding them again
    enablePointer();
    hideGameCardWord(selectedWordWithId);
    hideGameCardWord(firstSelectedWordWithId);

    firstSelectedWordWithId = "";
    firstSelectedWordWithoutId = "";
  }
}

function showGameCardWord(gameCardWordToShow) {
  document
    .querySelector(`#${gameCardWordToShow} span`)
    .classList.remove("hide");
}

function hideGameCardWord(gameCardWordToHide) {
  document.querySelector(`#${gameCardWordToHide} span`).classList.add("hide");
}

function disablePointer() {
  for (let gameCardWordWithId of gameCardWordsWithIds) {
    let gameCard = document.getElementById(gameCardWordWithId);
    gameCard.style.pointerEvents = "none";
  }
}

function enablePointer() {
  for (let gameCardWordWithId of gameCardWordsWithIds) {
    let gameCard = document.getElementById(gameCardWordWithId);
    gameCard.style.pointerEvents = "auto";
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

window.addEventListener("load", renderGameCards);

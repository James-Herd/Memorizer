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
let copyGameCardWordsWithIds = [...gameCardWordsWithIds];

function renderGameCards() {
  let gameCardWordsCopy = [...gameCardWords];

  for (i = 0; i < gameCardWords.length; i++) {
    let randomIndex = Math.floor(Math.random() * gameCardWordsCopy.length);

    let childElement = `<div id="${gameCardWordsCopy[randomIndex]}-${i}" class="gameCard" onclick="checkIsMatchAndShowOrHideWordsAccordingly('${gameCardWordsCopy[randomIndex]}-${i}')"><span class="gameWord">${gameCardWordsCopy[randomIndex]}</span></div>`;
    gamePanel.innerHTML += childElement;

    gameCardWordsWithIds.push(`${gameCardWordsCopy[randomIndex]}-${i}`);
    gameCardWordsCopy.splice(randomIndex, 1);
  }

  disablePointer();
  staggerFadingInAndOutGameCardsAndWords();
}

async function staggerFadingInAndOutGameCardsAndWords() {
  await sleep(35); // required to prevent the first element from not fading-in

  // stagger fading in of game cards
  for (let gameCardWordWithId of gameCardWordsWithIds) {
    let element = document.getElementById(gameCardWordWithId);
    element.classList.add("fadeIn");
    await sleep(20);
  }

  // stagger fading in of game card words
  for (let gameCardWordWithId of gameCardWordsWithIds) {
    document
      .querySelector(`#${gameCardWordWithId} span`)
      .classList.add("fadeIn");
    await sleep(20);
  }

  await sleep(10000); // allow player to see all game card words for a moment

  // stagger fading out of game card words
  for (let gameCardWordWithId of gameCardWordsWithIds) {
    document
      .querySelector(`#${gameCardWordWithId} span`)
      .classList.remove("fadeIn");

    await sleep(20);
  }

  await sleep(2000);

  // need to remove 'gameWord' seperately and after removing 'fadeIn' to avoid rendering order bugs
  for (let gameCardWordWithId of gameCardWordsWithIds) {
    document
      .querySelector(`#${gameCardWordWithId} span`)
      .classList.remove("gameWord");
  }

  hideWord(); // hide all word(S) by not passing an argument. Called at end of this func as would be called too soon otherwise with this func being async.
  enablePointer(); // Called here because otherwise you can click on words while they are all displayed and they will be hidden. Another async function workaround.
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

async function checkIsMatchAndShowOrHideWordsAccordingly(selectedWordWithId) {
  let selectedWordWithoutId = selectedWordWithId.replace(/-.*/, "");

  if (firstSelectedWordWithoutId === "") {
    // first of word pair selected
    showWord(selectedWordWithId);
    disablePointer(selectedWordWithId); // ensure the same game card can't be selected twice

    firstSelectedWordWithId = selectedWordWithId;
    firstSelectedWordWithoutId = selectedWordWithoutId;
  } else if (firstSelectedWordWithoutId === selectedWordWithoutId) {
    // matching word pair selected
    showWord(selectedWordWithId);
    disablePointer(selectedWordWithId);
    removedMatchedWordsFromGameCardsWords(selectedWordWithId);

    firstSelectedWordWithId = "";
    firstSelectedWordWithoutId = "";
  } else {
    // unmatching word pair selected

    showWord(selectedWordWithId);
    disablePointer();

    await sleep(1000); // momentarily show the two selected unmatching words before hiding them again

    enablePointer();
    hideWord(selectedWordWithId);
    hideWord(firstSelectedWordWithId);

    firstSelectedWordWithId = "";
    firstSelectedWordWithoutId = "";
  }
}

function removedMatchedWordsFromGameCardsWords(selectedWordWithId) {
  const firstMatchedWordOfPair = gameCardWordsWithIds.indexOf(
    firstSelectedWordWithId
  );
  gameCardWordsWithIds.splice(firstMatchedWordOfPair, 1);
  const secondMatchedWordOfPair =
    gameCardWordsWithIds.indexOf(selectedWordWithId);
  gameCardWordsWithIds.splice(secondMatchedWordOfPair, 1);
}

function showWord(wordToShow) {
  document.querySelector(`#${wordToShow} span`).classList.remove("hide");
}

function hideWord(wordToHide) {
  if (wordToHide) {
    document.querySelector(`#${wordToHide} span`).classList.add("hide");
    return;
  }

  for (const gameCardWordWithId of gameCardWordsWithIds) {
    document.querySelector(`#${gameCardWordWithId} span`).classList.add("hide");
  }
}

function disablePointer(selectedWordWithId) {
  if (selectedWordWithId) {
    let gameCard = document.getElementById(selectedWordWithId);
    gameCard.style.pointerEvents = "none";
    return;
  }

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

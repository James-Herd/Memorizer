const gamePanel = document.getElementById("gamePanel");

const listOfWords = [
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
const numberOfGameCardWords = 36;

function renderGameCards() {
  const listOfRandomNumbers = generateListOfRandomNumbers();
  const listOfGameCardWords = getListOfGameCardWords(listOfRandomNumbers);

  //   for (let gameCardWord of listOfGameCardWords) {
  //     let child = `<div class="gameCard">${gameCardWord}</div>`;

  //     gamePanel.innerHTML += child;
  //   }

  let copy = [...listOfGameCardWords];

  for (i = 0; i < listOfGameCardWords.length; i++) {
    let randomIndex = Math.floor(Math.random() * copy.length);

    let child = `<div class="gameCard">${copy[randomIndex]}</div>`;
    gamePanel.innerHTML += child;

    copy.splice(randomIndex, 1);
  }
}

function generateListOfRandomNumbers() {
  let listOfRandomNumbers = [];

  for (let i = 0; i < numberOfGameCardWords; i++) {
    let randomNumber = Math.floor(Math.random() * listOfWords.length);

    if (listOfRandomNumbers.includes(randomNumber)) {
      i--;
      continue;
    } else {
      listOfRandomNumbers.push(randomNumber);
    }
  }

  return listOfRandomNumbers;
}

function getListOfGameCardWords(listOfRandomNumbers) {
  let listOfGameCardWords = [];

  for (let randomNumber of listOfRandomNumbers) {
    listOfGameCardWords.push(
      listOfWords[randomNumber],
      listOfWords[randomNumber]
    );
  }

  return listOfGameCardWords;
}

window.addEventListener("load", renderGameCards);

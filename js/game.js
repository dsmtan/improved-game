"use strict";

//default user selection of background and horse
let userChoices = {
  location: "location--4",
  horse: "green",
  bet: 250
};

//LOCATION + BETTING LAYERS
const locaLayer = document.querySelector(".layer--locations");
const betLayer = document.querySelector(".layer--betting");

window.onload = function() {
  registerChoice();
};

function registerChoice() {
  document.addEventListener(
    "click",
    function(event) {
      if (event.target.classList.contains("article--location")) {
        userChoices.location = event.target.id;
        locaLayer.classList.add("disappear");
      } else if (event.target.classList.contains("locationname")) {
        userChoices.location = event.target.parentNode.id;
        locaLayer.classList.add("disappear");
      } else if (event.target.classList.contains("article--horse")) {
        userChoices.horse = event.target.id;
        betLayer.classList.add("disappear");
        showSliderValue();
      } else if (event.target.classList.contains("horsename")) {
        userChoices.horse = event.target.parentNode.id;
        betLayer.classList.add("disappear");
        showSliderValue();
      }
    },
    false
  );
}

// BET AMOUNT LAYER

let betAmountLayer = document.querySelector(".layer--betamount");
let rangeSlider = document.querySelector("#rs-range-line");
let rangeBullet = document.querySelector("#rs-bullet");

rangeSlider.addEventListener("input", showSliderValue, false);

//show dynamic input value in bullet label that moves with the slider
function showSliderValue() {
  rangeBullet.innerHTML = rangeSlider.value;
  let leftPosition = (window.screen.width - 500) / 2;
  let bulletPosition = rangeSlider.value / rangeSlider.max;
  rangeBullet.style.left = bulletPosition * 480 + leftPosition + "px";
}

//store chosen bet amount + preparegame
let betBtn = document.querySelector("#playBtn3");

betBtn.addEventListener("click", storeBetAmount);

function storeBetAmount() {
  userChoices.bet = Number(rangeSlider.value);
  betAmountLayer.classList.add("disappear");
  prepareGame();

  //final choices made by the user
  console.log(userChoices);
}

//GAME LAYER
const gameLayer = document.querySelector(".layer--game");
const finish = document.querySelector(".div--finish");

let XvalueFinish;
//get all horses in an array
let horseList = document.querySelectorAll(".div--horse");
let horseNames = [
  "horse--red",
  "horse--orange",
  "horse--black",
  "horse--green"
];
let rankingList = [];

const firstHorse = document.querySelector(".track--1 > .div--horse");
const secondHorse = document.querySelector(".track--2 > .div--horse");
const thirdHorse = document.querySelector(".track--3 > .div--horse");
const userHorse = document.querySelector("#horse--user");

function prepareGame() {
  XvalueFinish = finish.getBoundingClientRect().left;
  //set chosen location as backgroundimg
  setLocationBg();
  //place all horses in tracks with user's horse at bottom
  placeHorses();

  setTimeout(countDown, 1000);
}

function setLocationBg() {
  gameLayer.style.backgroundImage = `url("./images/${
    userChoices.location
  }.svg")`;
}

function placeHorses() {
  //place chosen user horse spritesheet image in bottom track
  userHorse.style.backgroundImage = `url("./images/${userChoices.horse}.png")`;

  //give all other horses a track
  horseNames.splice(horseNames.indexOf(userChoices.horse), 1);

  //get the right spritesheet image for each horse
  firstHorse.style.backgroundImage = `url("./images/${horseNames[0]}.png")`;
  //give id for ranking later
  firstHorse.id = "run" + horseNames[0];

  secondHorse.style.backgroundImage = `url("./images/${horseNames[1]}.png")`;
  secondHorse.id = "run" + horseNames[1];

  thirdHorse.style.backgroundImage = `url("./images/${horseNames[2]}.png")`;
  thirdHorse.id = "run" + horseNames[2];
}

//COUNTDOWN
const countDiv = document.querySelector(".div--countdown");
const countText = document.querySelector(".p--countdown");

function countDown() {
  let counter = 3;

  function countLoop() {
    setTimeout(() => {
      if (counter > 0) {
        countText.textContent = counter;
        countText.style.fontSize = "3.5em";
        counter--;
        countLoop();
      } else if (counter === 0) {
        countDiv.classList.add("hide");
        startRace();
      }
    }, 1200);
  }

  countLoop();
}

//used passFunction so the function can be removed from the eventlistener later
let passFunction;

function startRace() {
  horseList.forEach(singleHorse => {
    //add galloping animation
    singleHorse.classList.add("galloping");

    if (singleHorse.id == "horse--user") {
      passFunction = function() {
        moveUserHorse(singleHorse);
      };

      userHorse.addEventListener("click", passFunction, true);
    } else {
      horseMoveRandom(singleHorse);
    }
  });
}

// loop for 5 other horses to move at random speed
function horseMoveRandom(singleHorse) {
  // current X position of horse
  let horseX = singleHorse.getBoundingClientRect().left;
  // speed/distance travelled this loop
  let speed = Math.random() * (25 - 2) + 2;
  // new X position = current X + loop distance
  singleHorse.style.transform = `translateX(${horseX + speed}px)`;

  registerFinish(singleHorse);
}

// make user horse move on click
function moveUserHorse(userHorse) {
  let userX = userHorse.getBoundingClientRect().left;
  let userSpeed = Math.random() * (80 - 60) + 60;

  userHorse.style.transform = `translateX(${userX + userSpeed}px)`;

  registerFinish(userHorse);
}

function registerFinish(singleHorse) {
  let horseNose = singleHorse.getBoundingClientRect().right - 15;

  if (horseNose > XvalueFinish) {
    if (singleHorse == userHorse) {
      userHorse.removeEventListener("click", passFunction, true);
    }
    // finished horse pushed to array
    rankingList.push(singleHorse.id);
    //remove galloping animation
    singleHorse.classList.remove("galloping");
    gameFinished();
  } else if (singleHorse.id !== "horse--user") {
    // each horse loops until finish is reached
    setTimeout(horseMoveRandom, Math.random() * 200, singleHorse);
  }
}

function gameFinished() {
  //show who won
  let winner = rankingList[0];
  let winnerElement = document.querySelector(`#${winner}`);
  winnerElement.parentNode.style.backgroundColor = "#d69a3ad7";

  if (rankingList.length === 4) {
    //show results when all horses finish
    showResults();
  }
}

const rankingDiv = document.querySelector(".layer--ranking");
const resultHeader = document.querySelector("#resultheader");
const inviteText = document.querySelector(".p--invite");

function showResults() {
  rankingDiv.classList.add("shown");

  rankingList.forEach(rankedHorse => {
    let place = rankingList.indexOf(rankedHorse) + 1;
    let resultText = document.querySelector(`#result${place}`);

    if (rankedHorse === "horse--user") {
      resultText.textContent = "YOU";
      resultText.style.fontWeight = "700";

      if (place === 1) {
        resultHeader.textContent = `CONGRATS YOU WON ${
          userChoices.bet
        } KR CREDIT!`;
        inviteText.textContent =
          "Wow, you have a special talent! Use your prize credit to make some real money.";
      }
    } else if (rankedHorse === "runhorse--green") {
      resultText.textContent = "Jolly";
    } else if (rankedHorse === "runhorse--orange") {
      resultText.textContent = "Skippy";
    } else if (rankedHorse === "runhorse--red") {
      resultText.textContent = "Goldy";
    } else if (rankedHorse === "runhorse--black") {
      resultText.textContent = "Speedy";
    }
  });

  document.querySelector("#tryBtn").addEventListener("click", function() {
    window.location.href = "./sign-up/signup.html";
  });
}

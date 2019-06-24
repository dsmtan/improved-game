"use strict";

const introLayer = document.querySelector(".layer--intro");
const instructLayer = document.querySelector(".layer--instructions");
const gameName = document.querySelector(".h1--gamename");

const firstPage = document.querySelector("#svg_firstpage");

const playBtn = document.querySelector("#playBtn");
const playBtn2 = document.querySelector("#playBtn2");

// Find out if screen is in landscape mode
let userScreenMode = window.matchMedia("(orientation: landscape)");
const portraitLayer = document.querySelector(".layer--portrait");

window.addEventListener("DOMContentLoaded", watchScreen);

function watchScreen() {
  if (userScreenMode.matches) {
    // landscape orientation
    portraitLayer.style.display = "none";
    gameName.classList.add("animateName");
    playBtn.classList.add("animateBtn");
    loadIntroSVG();
    openFullscreen();
  } else {
    // portrait orientation
    portraitLayer.style.display = "block";
    gameName.classList.remove("animateName");
    playBtn.classList.remove("animateBtn");
  }
}

userScreenMode.addListener(watchScreen);

//call openFullscreen after user has turned to landscape mode
//this works but is super annoying while coding

function openFullscreen() {
  // if (document.body.requestFullscreen) {
  //   document.body.requestFullscreen({ navigationUI: "hide" });
  // } else if (document.body.mozRequestFullScreen) {
  //   /* Firefox */
  //   document.body.mozRequestFullScreen({ navigationUI: "hide" });
  // } else if (document.body.webkitRequestFullscreen) {
  //   /* Chrome, Safari and Opera */
  //   document.body.webkitRequestFullscreen({ navigationUI: "hide" });
  // } else if (document.body.msRequestFullscreen) {
  //   /* IE/Edge */
  //   document.body.msRequestFullscreen({ navigationUI: "hide" });
  // }
}

//svg for portrait to landscape animation
window.addEventListener("DOMContentLoaded", portraitSVG);
function portraitSVG() {
  fetch("images/loading.svg")
    .then(response => response.text())
    .then(svgdata => {
      document
        .querySelector("#portrait")
        .insertAdjacentHTML("afterbegin", svgdata);
    });
}

//load introsvg for game start animations
function loadIntroSVG() {
  fetch("images/firstpage.svg")
    .then(response => response.text())
    .then(svgdata => {
      document
        .querySelector("#svg_firstpage")
        .insertAdjacentHTML("afterbegin", svgdata);
    });
}

//when play button in intro is clicked layer disappears
playBtn.addEventListener("click", nextPage);
playBtn2.addEventListener("click", nextPage);

function nextPage() {
  if (event.target.id === "playBtn") {
    introLayer.classList.add("disappear");
    secondSVG();
  } else if (event.target.id === "playBtn2") {
    instructLayer.classList.add("disappear");
  }
}

//load point finger svg
function secondSVG() {
  fetch("images/pointer.svg")
    .then(response => response.text())
    .then(svgdata => {
      document
        .querySelector("#pointerSVG")
        .insertAdjacentHTML("afterbegin", svgdata);
    });
}

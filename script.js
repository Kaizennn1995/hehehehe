"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
	  
	 console.log("Now moving No button!");
      moveNoButton();
	  noButton.addEventListener("mouseover", moveNoButton);
    }
  }
});

function moveNoButton() {
  const maxX = window.innerWidth - noButton.offsetWidth; // Prevent overflow
  const maxY = window.innerHeight - noButton.offsetHeight; // Prevent overflow

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noButton.style.position = "absolute"; // Ensure it can move freely
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}


function handleYesClick() {
  titleElement.innerHTML = "Yayyyyy, I Love You tooooooooo";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "Noooooooooo",
    "Are you sure?",
    "Babhieee please",
    "Don't do this to me :(",
    "You're breaking my heart",
    "Habulin mo",
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}

document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("background-music");

  // Play music when the page loads
  music.play().catch(error => {
    console.log("Autoplay blocked, waiting for user interaction...");
  });

  // Ensure music plays when any button is clicked (fix for autoplay block)
  document.body.addEventListener("click", function () {
    if (music.paused) {
      music.play();
    }
  });
});

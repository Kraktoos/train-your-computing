import { aimTrain } from "./modules/aimTrain.js";
import { captcha } from "./modules/captcha.js";
import { clickXTimes } from "./modules/clickXTimes.js";
import { createWindow } from "./createWindow.js";

const menuContainer = document.createElement("div");
menuContainer.className = "menu-container";
const rankedBtn = document.createElement("button");
rankedBtn.className = "ranked-btn";
rankedBtn.innerHTML = "Ranked";
const infinitePracticeBtn = document.createElement("button");
infinitePracticeBtn.className = "infinite-practice-btn";
infinitePracticeBtn.innerHTML = "Practice Infinitely";
menuContainer.appendChild(rankedBtn);
menuContainer.appendChild(infinitePracticeBtn);

const scoreCounterContainer = document.getElementById("score-counter-container");
const scoreCounter = document.getElementById("score-counter");
const notification = document.getElementById("notification");

let last10 = JSON.parse(localStorage.getItem("last10")) ? JSON.parse(localStorage.getItem("last10")) : [];

let isAlive;
let closedCount;
let windowCount;
let finishedCount;
let score;
let interval = 3500;

const modules = [
  aimTrain,
  captcha,
  clickXTimes,
];

export function updateScore(changed) {
  score += changed;
  scoreCounter.innerHTML = score;
  if (changed > 0) {
    notification.style.color = "#55ff55";
    notification.innerHTML = "+" + changed;
  } else {
    notification.style.color = "#ff5555";
    notification.innerHTML = changed;
  }
  notification.style.fontSize = "1.2vw";
  notification.style.opacity = 1;
  setTimeout(() => {
    notification.style.fontSize = "0";
    notification.style.opacity = 0;
  }, 1500);
}

export function addFinishedCount() {
  finishedCount++;
}

export function addClosedCount() {
  closedCount++;
}

function createNewWindow(title) {
  if (windowCount - closedCount - finishedCount < 10) {
    return createWindow(title);
  } else {
    isAlive = false;
    alert("You lost! Your score is " + score);
    scoreCounter.innerHTML = "";
    return null;
  }
}

function resetGame() {
  isAlive = true;
  closedCount = 0;
  finishedCount = 0;
  windowCount = 0;
  score = 0;
  document.querySelector(".wallpaper").innerHTML = "";
  const newMenuContainer = menuContainer.cloneNode(true);

  newMenuContainer.getElementsByClassName("infinite-practice-btn")[0].addEventListener("click", (event) => {
    if (!isAlive) {
      resetGame();
    }

    newMenuContainer.remove();

    scoreCounter.innerHTML = score;

    function timer() {
      interval *= 0.976 + Math.random() * 0.025;
      interval += Math.random() * 0.04;
      let randomModule = modules[Math.floor(Math.random() * modules.length)];
      if (isAlive) {
        const window = randomModule.createFunction(randomModule);
        if (window) {
          document.querySelector(".wallpaper").appendChild(window);
        }
      }
      if (isAlive) {
        console.log(interval);
        setTimeout(timer, interval);
      } else {
        resetGame();
        localStorage.setItem("last10", JSON.stringify(last10));
      }
    };
    timer();
  });

  document.querySelector(".wallpaper").appendChild(newMenuContainer);
}

resetGame();

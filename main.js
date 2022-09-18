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
  {
    className: "aim-train",
    correctScore: 20,
    createFunction: function (current) {
      let window = createWindow("Train Aim");
      if (window) {
        window.style.top = Math.random() * 75 + "%";
        window.style.left = Math.random() * 79 + "%";
        const windowContent = document.createElement("div");
        windowContent.className = current.className;

        let counter = {
          count: 0,
          add: function () {
            this.count++;
            this.checkChange();
          },
        };
        counter.checkChange = function () {
          if (this.count === MAX) {
            window.remove();
            finishedCount++;
            updateScore(current.correctScore);
          }
        };
        const MAX = 3;

        for (let i = 0; i < MAX; i++) {
          const target = document.createElement("img");
          target.src = "assets/target.png";
          target.alt = "target";
          target.className = "shoot-me";
          target.style.width = Math.random() * 2.2 + 2 + "vw";
          target.style.top = 72 * Math.random() + "%";
          target.style.left = 80 * Math.random() + "%";
          target.addEventListener("click", (event) => {
            target.style.display = "none";
            counter.add();
          });
          windowContent.appendChild(target);
        }

        window.appendChild(windowContent);

        return window;
      }
    },
  },

  {
    className: "captcha",
    correctScore: 50,
    createFunction: function (current) {
      let window = createWindow("Captcha");
      if (window) {
        window.style.top = Math.random() * 75 + "%";
        window.style.left = Math.random() * 79 + "%";
        const windowContent = document.createElement("div");
        windowContent.className = current.className;

        const captchaCode = document.createElement("p");
        captchaCode.className = "captcha-code";
        const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz" + "0123456789";
        for (let i = 0; i < 6; i++) {
          captchaCode.innerHTML += alpha.charAt(Math.floor(Math.random() * alpha.length));
        }

        const input = document.createElement("input");
        input.className = "captcha-input";

        const button = document.createElement("button");
        button.className = "captcha-btn";
        button.innerHTML = "Submit";
        button.addEventListener("click", (event) => {
          if (input.value === captchaCode.innerHTML) {
            window.remove();
            finishedCount++;
            updateScore(current.correctScore);
          } else {
            window.remove();
            closedCount++;
            updateScore(-10);
          }
        });

        windowContent.appendChild(captchaCode);
        windowContent.appendChild(input);
        windowContent.appendChild(button);
        window.appendChild(windowContent);

        return window;
      }
    },
  },

  {
    className: "click-x-times",
    correctScore: 60,
    createFunction: function (current) {
      const MAX = 30;
      let window = createWindow(`Click ${MAX} Times`);
      if (window) {
        window.style.top = Math.random() * 74 + "%";
        window.style.left = Math.random() * 79 + "%";
        const windowContent = document.createElement("div");
        windowContent.className = current.className;

        let counter = {
          count: MAX,
          subtract: function () {
            this.count--;
            this.checkChange();
          },
        };
        counter.checkChange = function () {
          button.innerHTML = this.count;
          if (this.count === 0) {
            window.remove();
            finishedCount++;
            updateScore(current.correctScore);
          }
        };

        const button = document.createElement("button");
        button.className = "click-me";
        button.innerHTML = MAX;

        button.addEventListener("click", (event) => {
          counter.subtract();
        });
        windowContent.appendChild(button);

        window.appendChild(windowContent);

        return window;
      }
    },
  },
];

function updateScore(changed) {
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

function createWindow(title) {
  if (windowCount - closedCount - finishedCount < 10) {
    windowCount++;
    let window = document.createElement("div");
    window.className = "window-borders";
    const flexboxContainer = document.createElement("div");
    flexboxContainer.className = "window-bordersheader";
    const windowTitle = document.createElement("p");
    windowTitle.className = "module-title";
    windowTitle.innerHTML = title;
    const button = document.createElement("button");
    button.className = "close-btn";
    button.innerHTML = "&times;";
    button.addEventListener("click", (event) => {
      window.remove();
      closedCount++;
      updateScore(-10);
    });
    flexboxContainer.appendChild(windowTitle);
    flexboxContainer.appendChild(button);
    window.appendChild(flexboxContainer);
    dragElement(window);
    function dragElement(elmnt) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.getElementsByClassName("window-bordersheader")[0].onmousedown = dragMouseDown;

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    return window;
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

    timer = function () {
      interval *= 0.976 + Math.random() * 0.025;
      interval += Math.random() * 0.04;
      randomModule = modules[Math.floor(Math.random() * modules.length)];
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

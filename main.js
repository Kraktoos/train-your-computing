startGameBtn = document.getElementById("start-game-btn");
let isAlive;
let closedCount;
let windowCount;
let finishedCount;
let score;
let interval = 5500;

const modules = [
  {
    className: "aim-train",
    correctScore: 20,
    createFunction: function (current) {
      let window = createWindow("Train Aim");
      window.style.top = Math.random() * 75 + "%";
      window.style.left = Math.random() * 79 + "%";
      const windowContent = document.createElement("div");
      windowContent.className = "aim-train";

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
          score += current.correctScore;
          console.log(score);
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
    },
  },

  {
    className: "captcha",
    correctScore: 50,
    createFunction: function (current) {
      let window = createWindow("Captcha");
      window.style.top = Math.random() * 75 + "%";
      window.style.left = Math.random() * 79 + "%";
      const windowContent = document.createElement("div");
      windowContent.className = "captcha";

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
          score += current.correctScore;
        } else {
          window.remove();
          closedCount++;
          score -= 10;
        }
      });

      windowContent.appendChild(captchaCode);
      windowContent.appendChild(input);
      windowContent.appendChild(button);
      window.appendChild(windowContent);

      return window;
    },
  },
];

function createWindow(title) {
  if (windowCount - closedCount - finishedCount < 10) {
    windowCount++;
    let window = document.createElement("div");
    window.className = "window-borders";
    const flexboxContainer = document.createElement("div");
    flexboxContainer.className = "flexbox-container";
    const windowTitle = document.createElement("p");
    windowTitle.className = "module-title";
    windowTitle.innerHTML = title;
    const button = document.createElement("button");
    button.className = "close-btn";
    button.innerHTML = "&times;";
    button.addEventListener("click", (event) => {
      window.remove();
      closedCount++;
      score -= 10;
    });
    flexboxContainer.appendChild(windowTitle);
    flexboxContainer.appendChild(button);
    window.appendChild(flexboxContainer);
    return window;
  } else {
    isAlive = false;
    alert("You lost! Your score is " + score);
    return null;
  }
}

startGameBtn.addEventListener("click", (event) => {
  isAlive = true;
  closedCount = 0;
  finishedCount = 0;
  windowCount = 0;
  score = 0;
  startGameBtn.style.display = "none";

  timer = function () {
    interval *= 0.97 + Math.random() * 0.025;
    interval += Math.random() * 0.04;
    randomModule = modules[Math.floor(Math.random() * modules.length)];
    document.querySelector(".wallpaper").appendChild(new randomModule.createFunction(randomModule));
    console.log("Current Windows: " + (windowCount - closedCount - finishedCount));
    console.log(isAlive);
    if (isAlive) {
      setTimeout(timer, interval);
    }
  };
  timer();
});

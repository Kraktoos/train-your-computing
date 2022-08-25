startGameBtn = document.getElementById("start-game-btn");
let isAlive;
let closedCount;
let windowCount;
let finishedCount;
let interval = 2500;

const modules = [
  {
    className: "aim-train",
    correctScore: 40,
    createFunction: function () {
      let window = createWindow();
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
];

function createWindow() {
  if (windowCount - closedCount - finishedCount < 10) {
    windowCount++;
    let window = document.createElement("div");
    window.className = "window-borders";
    const button = document.createElement("button");
    button.className = "close-btn";
    button.innerHTML = "&times;";
    button.addEventListener("click", (event) => {
      window.remove();
      closedCount++;
      console.log(closedCount);
    });
    window.appendChild(button);
    return window;
  } else {
    isAlive = false;
    alert("You lost! Your score is " + finishedCount);
    return null;
  }
}

startGameBtn.addEventListener("click", (event) => {
  isAlive = true;
  closedCount = 0;
  finishedCount = 0;
  windowCount = 0;
  startGameBtn.style.display = "none";

  timer = function () {
    interval *= 0.967 + Math.random() * 0.025;
    interval += Math.random() * 0.04;
    document.querySelector(".wallpaper").appendChild(new modules[0].createFunction());
    console.log("Current Windows: " + (windowCount - closedCount - finishedCount));
    console.log(isAlive);
    if (isAlive) {
      setTimeout(timer, interval);
    }
  };
  timer();
});

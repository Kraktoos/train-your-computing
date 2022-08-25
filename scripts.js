startGameBtn = document.getElementById("start-game-btn");
let isAlive;
let closedCount;
let windowCount;
let interval = 1500;

const modules = [
  {
    className: "aim-train",
    correctScore: 40,
    createFunction: function () {
      let window = createWindow();
      window.style.top = Math.random() * 87 + "%";
      window.style.left = Math.random() * 79 + "%";
      const windowContent = document.createElement("div");
      windowContent.className = "aim-train";
      windowContent.style.height = 5 + "vw";
      windowContent.style.width = 20 + "vw";
      window.appendChild(windowContent);
      return window;
    },
    height: 5,
    width: 20,
  },
];

function createWindow() {
  if (windowCount - closedCount < 10) {
    windowCount++;
    let window = document.createElement("div");
    window.className = "window-borders";
    const button = document.createElement("button");
    button.className = "close-btn";
    button.innerHTML = "&times;";
    button.addEventListener("click", (event) => {
      window.style.display = "none";
      closedCount++;
      console.log(closedCount);
    });
    window.appendChild(button);
    return window;
  } else {
    isAlive = false;
    alert("You lost!");
    return null;
  }
}

startGameBtn.addEventListener("click", (event) => {
  isAlive = true;
  closedCount = 0;
  windowCount = 0;
  startGameBtn.style.display = "none";

  timer = function () {
    interval *= 0.965 + Math.random() * 0.02;
    interval += Math.random() * 0.04;
    document.querySelector(".wallpaper").appendChild(new modules[0].createFunction());
    console.log("Current Windows: " + (windowCount - closedCount));
    console.log(isAlive);
    if (isAlive) {
      setTimeout(timer, interval);
    }
  };
  timer();
});

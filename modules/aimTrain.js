import { createNewWindow, updateScore, addFinishedCount } from "../main.js";

export const aimTrain = {
  className: "aim-train",
  correctScore: 20,
  createFunction: function (current) {
    let window = createNewWindow("Train Aim");
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
          updateScore(current.correctScore);
          addFinishedCount();
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
  }
}
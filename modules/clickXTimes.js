import { createWindow } from "../createWindow.js";
import { updateScore, addFinishedCount, addClosedCount } from "../main.js";

export const clickXTimes = {
  className: "click-x-times",
  correctScore: 60,
  createFunction: function (current) {
    const MAX = 30;
    let window = createWindow(`Click ${MAX} Times`);
    if (window) {
      window.style.top = Math.random() * 75 + "%";
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
          addFinishedCount();
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
};
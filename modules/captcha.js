import { createWindow } from "../createWindow.js";
import { updateScore, addFinishedCount, addClosedCount } from "../main.js";

export const captcha = {
  className: "captcha",
  correctScore: 50,
  createFunction: function (current) {
    let window = createWindow("Captcha");
    if (window) {
      window.style.top = Math.random() * 75 + "%";
      window.style.left = Math.random() * 79 + "%";

      const form = document.createElement("form");
      form.className = current.className;
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (input.value === captchaCode.innerHTML) {
          window.remove();
          addFinishedCount();
          updateScore(current.correctScore);
        } else {
          window.remove();
          addClosedCount();
          updateScore(-10);
        }
      });

      const captchaCode = document.createElement("p");
      captchaCode.className = "captcha-code";
      const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz" + "0123456789";
      for (let i = 0; i < 6; i++) {
        captchaCode.innerHTML += alpha.charAt(Math.floor(Math.random() * alpha.length));
      }

      const input = document.createElement("input");
      input.className = "captcha-input";

      const button = document.createElement("button");
      button.type = "submit";
      button.className = "captcha-btn";
      button.innerHTML = "Submit";

      form.appendChild(captchaCode);
      form.appendChild(input);
      form.appendChild(button);
      window.appendChild(form);

      return window;
    }
  },
};
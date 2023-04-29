import { updateScore, addClosedCount } from "./main.js";

export const createWindow = (title) => {
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
    addClosedCount();
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
}
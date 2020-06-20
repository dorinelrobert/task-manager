export function DropDown(toggle_button) {
  this.toggle_button = toggle_button || ".dropdown__toggle";

  this.init();
}

DropDown.prototype = (function () {
  function closeAll() {
    document.querySelectorAll(this.toggle_button).forEach((item) => {
      item.parentNode.classList.remove("open");
    });
  }

  function clickHandler(event) {
    const DROPDOWN_TOGGLE = event.target;
    const IS_DROPDOWN_TOGGLE = DROPDOWN_TOGGLE.classList.contains(
      this.toggle_button.substring(1)
    );
    const MENU = DROPDOWN_TOGGLE.parentNode.querySelector(".dropdown__menu");

    if (!IS_DROPDOWN_TOGGLE) {
      closeAll.call(this);
    } else {
      event.preventDefault();

      if (DROPDOWN_TOGGLE.parentNode.classList.contains("open")) {
        closeAll.call(this);
      } else {
        closeAll.call(this);
        DROPDOWN_TOGGLE.parentNode.classList.add("open");
      }

      MENU.setAttribute("style", "");

      let menuPos = MENU.getBoundingClientRect();
      if (menuPos.left < 0) {
        MENU.style.left =
          "calc(50% + " + Math.abs(Math.floor(menuPos.left) - 5) + "px)";
      }

      let ww = window.innerWidth || html.clientWidth;

      if (menuPos.right > ww) {
        MENU.style.left =
          "calc(50% - " + Math.abs(Math.floor(menuPos.right - ww + 5)) + "px)";
      }
    }
  }

  function init() {
    document.addEventListener("click", clickHandler.bind(this));
  }

  return {
    init: init,
  };
})();

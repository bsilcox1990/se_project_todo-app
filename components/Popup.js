export default class Popup {
  constructor({ popupSelector }) {
    this._popupEl = document.querySelector(popupSelector);
    //this._popupCloseButton = this._popupEl.querySelector(".popup__close");
  }

  open() {
    this._popupEl.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popupEl.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    /*
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
    */
    this._popupEl.addEventListener("click", (evt) => {
      if (
        !evt.target.closest(".popup__content") ||
        evt.target.closest(".popup__close")
      ) {
        this.close();
      }
    });
  }
}

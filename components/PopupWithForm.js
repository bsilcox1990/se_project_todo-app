import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupEl.querySelector(".popup__form");
    this._handleSubmit = handleSubmit;
    this._inputValues = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._element = {};

    this._inputValues.forEach((value) => {
      this._element[value.name] = value.value;
    });
    return this._element;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleSubmit(this._getInputValues());
    });
  }
}

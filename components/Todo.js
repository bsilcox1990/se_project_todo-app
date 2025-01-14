class Todo {
  constructor(data, selector, todoConfig) {
    this._data = data;
    this._todoConfig = todoConfig;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
    });
  }

  _generateCheckboxEl() {
    this._todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = this._data.completed;

    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDateEl() {
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    this._todoNameEl = this._todoElement.querySelector(
      this._todoConfig.nameSelector
    );

    this._todoCheckboxEl = this._todoElement.querySelector(
      this._todoConfig.checkboxSelector
    );
    this._todoLabel = this._todoElement.querySelector(
      this._todoConfig.labelSelector
    );
    this._todoDate = this._todoElement.querySelector(
      this._todoConfig.dateSelector
    );
    this._todoDeleteBtn = this._todoElement.querySelector(
      this._todoConfig.deleteButtonSelector
    );

    this._generateDateEl();
    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;

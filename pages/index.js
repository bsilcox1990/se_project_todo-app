import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import {
  initialTodos,
  validationConfig,
  todoConfig,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
//const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
//const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template");
//const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleSubmit: (item) => {
    debugger;
    renderTodo(
      {
        ...item,
        id: uuidv4(),
        completed: false,
      },
      "append"
    );
    newTodoValidator.resetValidation();
    todoCounter.updateTotal(true);
    addTodoPopup.close();
  },
});

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

addTodoPopup.setEventListeners();
/*
const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};
*/
// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    todoConfig,
    handleCheck,
    handleDelete
  );
  const todoElement = todo.getView();

  return todoElement;
};

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  //openModal(addTodoPopupEl);
  addTodoPopup.open();
  //document.addEventListener("keydown", escapePopup);
});
/*
addTodoCloseBtn.addEventListener("click", () => {
  //closeModal(addTodoPopupEl);
  addTodoPopup.close();
  document.removeEventListener("keydown", escapePopup);
});
*/
/*
function escapePopup(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_visible");
    closeModal(activePopup);
  }
}
*/
/*
addTodoPopupEl.addEventListener("click", (evt) => {
  if (!evt.target.closest(".popup__content")) {
    closeModal(addTodoPopupEl);
  }
});
*/

const renderTodos = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item, "append");
  },
  containerSelector: ".todos__list",
});

const renderTodo = (item, method) => {
  const todo = generateTodo(item);
  renderTodos.addItem(todo, method);
};
/*
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };

  renderTodo(values, "append");
  newTodoValidator.resetValidation();
  closeModal(addTodoPopupEl);
});
*/

renderTodos.renderItems();

/*
initialTodos.forEach((item) => {
  renderTodo(item, "append");
});
*/

import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import {
  initialTodos,
  validationConfig,
  todoConfig,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", todoConfig);
  const todoElement = todo.getView();

  return todoElement;
};

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
  document.addEventListener("keydown", escapePopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
  document.removeEventListener("keydown", escapePopup);
});

function escapePopup(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_visible");
    closeModal(activePopup);
  }
}

addTodoPopup.addEventListener("click", (evt) => {
  if (!evt.target.closest(".popup__content")) {
    closeModal(addTodoPopup);
  }
});

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
  closeModal(addTodoPopup);
});

renderTodos.renderItems();

/*
initialTodos.forEach((item) => {
  renderTodo(item, "append");
});
*/

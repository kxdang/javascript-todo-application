"use strict";

// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save todos to localStorage
const saveTodos = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove todo function
const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id); // returns a number greater than -1 if there is a match

  //if the number is greater than -1 there's a match and we want to splice the array of objects
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle Todo completion - taking the ID
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
};

// Render application todos based on filters
const renderTodos = (todos, filters) => {
  const todoEl = document.querySelector("#todos");
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  todoEl.innerHTML = "";
  todoEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "No to-dos to show";
    todoEl.appendChild(messageEl);
  }
};
//If todos to show, render them
//Else, p with class "empty-message" and message "No to-dos to show"

// Get the DOM elements for an individual note
const generateTodoDOM = todo => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  //Setup a todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  //Setup a text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  //set up container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  //Setup a button to remove
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);

  // add event listener to button
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");

  // if (incompleteTodos.length > 1 || incompleteTodos.length == 0) {
  //   summary.textContent = `You have ${incompleteTodos.length} todos left`;
  // } else {
  //   summary.textContent = `You have ${incompleteTodos.length} todo left`;
  // }

  summary.textContent =
    incompleteTodos.length > 1 || incompleteTodos.length == 0
      ? `You have ${incompleteTodos.length} todos left`
      : `You have ${incompleteTodos.length} todo left`;

  return summary;
};

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
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  document.querySelector("#todos").innerHTML = "";
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach(todo => {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

// Get the DOM elements for an individual note
const generateTodoDOM = todo => {
  const todoEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const button = document.createElement("button");

  //Setup a todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  //Setup a text
  todoText.textContent = todo.text;
  todoEl.appendChild(todoText);

  //Setup a button to remove
  button.textContent = "x";
  todoEl.appendChild(button);

  // add event listener to button
  button.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};

//Set up a root div
//Set up and append a checkbox (set type attribute)
//Setup and append a span
//Setup and append a button

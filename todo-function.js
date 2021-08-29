//getting data from our local storage
const getSavedTodo = function () {
  const todoJSON = localStorage.getItem("todos");
  if (todoJSON !== null) {
    return JSON.parse(todoJSON);
  } else {
    return [];
  }
};

//saving data to localStorage
const saveTodo = function (todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//remove todo from localstorage
const removeTodo = function (id) {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

//toggle todo function
const toggleTodo = function (id) {
  const todo = todos.find(function (todo) {
    return todo.id === id;
  });
  if (todo !== undefined) todo.completed = !todo.completed;
};

//Generating DOM with Javascript
const generateTodoDOM = function (todo) {
  const todoEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoEl.appendChild(checkbox);
  checkbox.addEventListener("change", function () {
    toggleTodo(todo.id);
    saveTodo(todos);
    renderTodo(todos, filters);
  });

  todoText.textContent = todo.text;
  todoEl.appendChild(todoText);

  removeButton.textContent = "x";
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", function () {
    removeTodo(todo.id);
    saveTodo(todos);
    renderTodo(todos, filters);
  });

  return todoEl;
};

//Render todo items with filters
const renderTodo = function (todos, filters) {
  const filterTodo = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .trim()
      .includes(filters.searchText.toLowerCase().trim());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  //incomplete todo
  const incompleteTodos = filterTodo.filter(function (todo) {
    return !todo.completed;
  });
  todoTargetDiv.innerHTML = "";
  todoTargetDiv.appendChild(generateSummaryDOM(incompleteTodos));

  filterTodo.forEach(function (todo) {
    todoTargetDiv.appendChild(generateTodoDOM(todo));
  });
};

//get the Dom elements for list summary
const generateSummaryDOM = function (incompleTodo) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleTodo.length} todos left!`;
  return summary;
};

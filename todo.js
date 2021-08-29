const todos = getSavedTodo();

const searchText = document.querySelector("#search-text");
const todoTargetDiv = document.querySelector("#todos");
const formName = document.querySelector("#new-todo");
const hideCompleted = document.querySelector("#hide-completed");

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodo(todos, filters);

searchText.addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodo(todos, filters);
});

formName.addEventListener("submit", function (e) {
  if (e.target.elements.text.value !== "") {
    e.preventDefault();
    todos.push({
      id: uuidv4(),
      text: e.target.elements.text.value,
      completed: false,
    });
    saveTodo(todos);
    e.target.elements.text.value = "";
    renderTodo(todos, filters);
  }
});

hideCompleted.addEventListener("change", function (e) {
  filters.hideCompleted = e.target.checked;
  renderTodo(todos, filters);
});

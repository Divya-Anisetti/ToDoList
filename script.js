const todoInput = document.querySelector("#todo-input");
const todoDatetime = document.querySelector("#todo-datetime");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault();
    if (!todoInput.value.trim()) return; // Prevent adding empty tasks

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    const dateTime = document.createElement("span");
    dateTime.classList.add("date-time");
    dateTime.innerText = todoDatetime.value ? `${new Date(todoDatetime.value).toLocaleString()}` : "";

    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(dateTime);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value, todoDatetime.value);

    todoInput.value = "";
    todoDatetime.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList.contains("trash-btn")) {
        const todo = item.parentElement;
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", () => {
            todo.remove();
        });
    }

    if (item.classList.contains("complete-btn")) {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        updateLocalTodos(todo);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
                break;
            case "incomplete":
                todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}

function saveLocalTodos(todo, datetime) {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.push({ text: todo, datetime: datetime, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        if (todo.completed) todoDiv.classList.add("completed");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo.text;
        newTodo.classList.add("todo-item");

        const dateTime = document.createElement("span");
        dateTime.classList.add("date-time");
        dateTime.innerText = todo.datetime ? `${new Date(todo.datetime).toLocaleString()}` : "";

        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(dateTime);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function updateLocalTodos(todo) {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const todoText = todo.children[0].innerText;
    todos.forEach(t => {
        if (t.text === todoText) {
            t.completed = todo.classList.contains("completed");
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const todoText = todo.children[0].innerText;
    todos = todos.filter(t => t.text !== todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

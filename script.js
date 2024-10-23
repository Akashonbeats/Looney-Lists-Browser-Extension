var todoList = document.getElementById("todo-list");
var input = document.getElementById("input-field");
var h3 = document.getElementById("h3");

// Loading the todo list from local storage when loaded
window.onload = function() {
    var savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (savedTodos.length > 0) {
        h3.remove();
    }
    savedTodos.forEach(function(todo) {
        var entry = document.createElement("li");
        entry.innerHTML = todo + " <button onclick='deleteEntry(event)'>X</button>";
        todoList.append(entry);
    });
};
/////////////////////////////////////////////////
function addEntry() {
    var entry = document.createElement("li");
    h3.remove();
    if (input.value !== "") {
        entry.innerHTML = input.value + " <button onclick='deleteEntry(event)'>X</button>";
        todoList.append(entry);
        saveTodos();
        clearField();
    } else {
        input.classList.add("vibrate");
        setTimeout(() => {
            input.classList.remove("vibrate");
        }, 300);
        alert("Enter a task to add to the list.");
    }
}

function deleteEntry(event) {
    var entry = event.target.parentElement;
    entry.classList.add("removing");
    setTimeout(() => {
        entry.remove();
        saveTodos();
    }, 1000); // Match the duration of the animation
}

function clearField() {
    input.value = "";
}
/////////////////////////////////////////////////
function saveTodos() {
    var todos = [];
    todoList.querySelectorAll("li").forEach(function(entry) {
        // Extracting the text content excluding the delete button
        var todoText = entry.childNodes[0].textContent.trim();
        todos.push(todoText);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Event listener for Enter key
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addEntry();
    }
});
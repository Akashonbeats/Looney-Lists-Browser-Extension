document.addEventListener('DOMContentLoaded', function () {
    var todoList = document.getElementById("todo-list");
    var input = document.getElementById("input-field");
    var h3 = document.getElementById("h3");
    const addButton = document.getElementById('add-button');

    // Loading the todo list from local storage when loaded
    var savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (savedTodos.length > 0) {
        h3.remove();
    }
    savedTodos.forEach(function(todo) {
        var entry = document.createElement("li");
        entry.innerHTML = todo + " <button class='delete-button'>X</button>";
        todoList.append(entry);
    });

    addButton.addEventListener('click', function () {
        addEntry();
        clearField();
    });

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addEntry();
            clearField();
        }
    });

    todoList.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('delete-button')) {
            deleteEntry(event);
        }
    });

    function addEntry() {
        var entry = document.createElement("li");
        if (input.value !== "") {
            entry.innerHTML = input.value + " <button class='delete-button'>X</button>";
            todoList.append(entry);
            saveTodos();
            clearField();
            if (h3) {
                h3.remove();
            }
        } else {
            input.classList.add("redvibrate");
            setTimeout(() => {
                input.classList.remove("redvibrate");
            }, 500);
        }
    }

    function clearField() {
        input.value = "";
    }

    function deleteEntry(event) {
        var entry = event.target.parentElement;
        entry.classList.add("removing");
        setTimeout(() => {
            entry.remove();
            saveTodos();
            if (todoList.children.length === 0) {
                var newH3 = document.createElement("h3");
                newH3.id = "h3";
                newH3.textContent = "Note down something...";
                document.querySelector(".apptile").insertBefore(newH3, todoList);
            }
        }, 1000);
    }

    function saveTodos() {
        var todos = [];
        todoList.querySelectorAll("li").forEach(function(li) {
            todos.push(li.textContent.replace(" X", ""));
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});
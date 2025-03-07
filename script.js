document.addEventListener("DOMContentLoaded", function () {
  var todoList = document.getElementById("todo-list");
  var input = document.getElementById("input-field");
  var h3 = document.getElementById("h3");
  const addButton = document.getElementById("add-button");
  const fontSelector = document.getElementById("font-selector");
  const burger = document.getElementById("burger");
  const settings = document.querySelector(".settings");

  // Loading the todo list from local storage when loaded
  var savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const savedFont = localStorage.getItem("selectedFont") || fontSelector.value;
  if (savedTodos.length > 0) {
    h3.remove();
  }
  savedTodos.forEach(function (todo) {
    var entry = document.createElement("li");
    entry.draggable = true;
    entry.innerHTML = todo + " <button class='delete-button'>X</button>";
    entry.style.fontFamily = savedFont; // Apply the saved font style to the new entry
    addDragAndDropHandlers(entry);
    todoList.append(entry);
  });

  addButton.addEventListener("click", function () {
    addEntry();
    clearField();
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addEntry();
      clearField();
    }
  });

  todoList.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("delete-button")) {
      deleteEntry(event);
    }
  });

  fontSelector.addEventListener("change", function () {
    const selectedFont = fontSelector.value;
    document.documentElement.style.setProperty("--list-font", selectedFont);
    localStorage.setItem("selectedFont", selectedFont); // Save the selected font to local storage
    updateFontFamily();
  });

  burger.addEventListener("change", function () {
    if (burger.checked) {
      settings.style.display = "flex";
    } else {
      settings.style.display = "none";
      document.querySelector(".apptile").classList.add("animate-out");
      setTimeout(() => {
        document.querySelector(".apptile").classList.remove("animate-out");
      }, 700); // Duration of the animation
    }
  });

  function addEntry() {
    var entry = document.createElement("li");
    entry.draggable = true;
    if (input.value !== "") {
      entry.innerHTML =
        input.value + " <button class='delete-button'>X</button>";
      entry.style.fontFamily =
        localStorage.getItem("selectedFont") || fontSelector.value; // Apply the selected font style to the new entry
      addDragAndDropHandlers(entry);
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
    todoList.querySelectorAll("li").forEach(function (li) {
      todos.push(li.textContent.replace(" X", ""));
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function updateFontFamily() {
    const selectedFont = fontSelector.value;
    document.querySelectorAll("li").forEach(function (li) {
      li.style.fontFamily = selectedFont;
    });
  }

  // For the draggable functionality for the list elements

  function addDragAndDropHandlers(entry) {
    entry.addEventListener("dragstart", handleDragStart, false);
    entry.addEventListener("dragenter", handleDragEnter, false);
    entry.addEventListener("dragover", handleDragOver, false);
    entry.addEventListener("dragleave", handleDragLeave, false);
    entry.addEventListener("drop", handleDrop, false);
    entry.addEventListener("dragend", handleDragEnd, false);
  }

  function handleDragStart(e) {
    this.style.opacity = "0.4";
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  }

  function handleDragEnter(e) {
    this.classList.add("over");
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  function handleDragLeave(e) {
    this.classList.remove("over");
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
      addDragAndDropHandlers(dragSrcEl);
      addDragAndDropHandlers(this);
      saveTodos();
    }
    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = "1";
    todoList.querySelectorAll("li").forEach(function (item) {
      item.classList.remove("over");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const savedFont = localStorage.getItem("selectedFont");
  if (savedFont) {
    document.getElementById("font-selector").value = savedFont;
    applyFontStyle(savedFont);
  }

  document
    .getElementById("font-selector")
    .addEventListener("change", function () {
      const selectedFont = this.value;
      localStorage.setItem("selectedFont", selectedFont);
      applyFontStyle(selectedFont);
    });
});

function applyFontStyle(font) {
  const listItems = document.querySelectorAll("li");
  listItems.forEach((item) => {
    item.style.fontFamily = font;
  });
}

"use strict";
let form = document.querySelector("#todo-form");
let list = document.querySelector("#todo-list");
let input = document.querySelector("#todo-title");
const filters = document.querySelectorAll('input[type=radio]');
let counter = document.querySelector('#itemsLeft');
class Todo {
    constructor(taskName) {
        this.title = taskName;
        this.completed = false;
    }
    toggleComplete() {
        this.completed = !this.completed;
    }
}
let numberOfToDos = [];
filters[0].checked = true;
form.onsubmit = event => {
    event.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const thingToDO = new Todo(input.value);
    numberOfToDos.push(thingToDO);
    input.value = '';
    toggleList();
};
filters.forEach(x => x.addEventListener('change', () => {
    filters.forEach(x => {
        x.parentElement.classList.remove('selected');
    });
    x.parentElement.classList.toggle('selected');
    toggleList();
}));
function toggleList() {
    let toDos = document.getElementsByClassName('toDo');
    let selectedFilter;
    for (const filter of filters) {
        if (filter.checked) {
            selectedFilter = filter.value;
            break;
        }
    }
    if (selectedFilter == "all") {
        displayTodos(numberOfToDos);
    }
    else if (selectedFilter == "active") {
        displayTodos(numberOfToDos.filter(x => !x.completed));
    }
    else if (selectedFilter == "completed") {
        displayTodos(numberOfToDos.filter(x => x.completed));
    }
    counter.textContent = numberOfToDos.filter(x => !x.completed).length.toString();
}
function displayTodos(numberOfToDos) {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    numberOfToDos.forEach(x => {
        let listItem = document.createElement('li');
        listItem.classList.add("todo-item");
        let title = document.createElement('p');
        title.textContent = x.title;
        let deleteBtn = document.createElement('button');
        let label = document.createElement('label');
        label.classList.add("delete-btn-container");
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = x.completed ? true : false;
        let labelCheckBox = document.createElement('label');
        let spanCheckBox = document.createElement('span');
        label.textContent = '❌';
        deleteBtn.addEventListener('click', () => {
            listItem.remove();
            numberOfToDos.splice(numberOfToDos.indexOf(x), 1);
            counter.textContent = numberOfToDos.filter(x => !x.completed).length.toString();
        });
        checkbox.addEventListener('change', () => {
            x.toggleComplete();
            toggleList();
        });
        labelCheckBox.append(checkbox);
        labelCheckBox.append(spanCheckBox);
        listItem.append(labelCheckBox);
        listItem.append(title);
        label.append(deleteBtn);
        listItem.append(label);
        listItem.style.position = "relative";
        label.style.position = "absolute";
        label.style.right = "0";
        list === null || list === void 0 ? void 0 : list.append(listItem);
    });
}

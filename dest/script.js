"use strict";
let form = document.querySelector("#todo-form");
let list = document.querySelector("#todo-list");
let input = document.querySelector("#todo-title");
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
form.onsubmit = event => {
    event.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const thingToDO = new Todo(input.value);
    numberOfToDos.push(thingToDO);
    let listItem = document.createElement('li');
    let title = document.createElement('p');
    title.textContent = thingToDO.title;
    let deleteBtn = document.createElement('button');
    let label = document.createElement('label');
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    let labelCheckBox = document.createElement('label');
    let spanCheckBox = document.createElement('span');
    label.textContent = '❌';
    deleteBtn.addEventListener('click', () => {
        listItem.remove();
    });
    checkbox.addEventListener('change', () => {
        thingToDO.toggleComplete();
    });
    labelCheckBox.append(checkbox);
    labelCheckBox.append(spanCheckBox);
    listItem.append(labelCheckBox);
    listItem.append(title);
    label.append(deleteBtn);
    listItem.append(label);
    list === null || list === void 0 ? void 0 : list.append(listItem);
    input.value = '';
};
function ToggleList(toDoList) {
    const filters = document.getElementsByName('options');
    let selectedFilter;
    for (const filter of filters) {
        if (filter.checked) {
            selectedFilter = filter.value;
            break;
        }
    }
}

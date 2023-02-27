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
let numberOfToDos;
form.onsubmit = event => {
    event.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const thingToDO = new Todo(input.value);
    numberOfToDos.push(thingToDO);
    let listItem = document.createElement('li');
    listItem.append(thingToDO.title);
    list === null || list === void 0 ? void 0 : list.append(listItem);
};
function DisplayList() {
}

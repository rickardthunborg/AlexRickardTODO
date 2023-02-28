"use strict";
let form = document.querySelector("#todo-form");
let list = document.querySelector("#todo-list");
let input = document.querySelector("#todo-title");
const filters = document.querySelectorAll('input[type=radio]');
let counter = document.querySelector('#itemsLeft');
const toggleBtn = document.querySelector('#toggle-all');
let allToDos = [];
class Todo {
    constructor(taskName) {
        this.title = taskName;
        this.completed = false;
    }
}
if (localStorage.getItem('todos')) {
    allToDos = JSON.parse(localStorage.getItem('todos'));
    toggleList();
}
filters[0].checked = true;
form.onsubmit = event => {
    event.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const thingToDO = new Todo(input.value);
    allToDos.push(thingToDO);
    input.value = '';
    toggleList();
    localStorage.setItem('todos', JSON.stringify(allToDos));
};
toggleBtn.addEventListener('click', checkAll);
//Eventhandlers for the filtering buttons
filters.forEach(x => x.addEventListener('change', () => {
    filters.forEach(x => {
        x.parentElement.classList.remove('selected');
    });
    x.parentElement.classList.toggle('selected');
    toggleList();
}));
function checkAll() {
    if (allToDos.every(x => x.completed)) {
        allToDos.forEach(x => {
            x.completed = false;
        });
        toggleList();
    }
    else {
        allToDos.forEach(x => {
            x.completed = true;
        });
        toggleList();
    }
}
//Function call updates ToDo list 
function toggleList() {
    let selectedFilter;
    for (const filter of filters) {
        if (filter.checked) {
            selectedFilter = filter.value;
            break;
        }
    }
    if (!selectedFilter) {
        selectedFilter = "all";
    }
    //Calls displayTodos with chosen filtering 
    if (selectedFilter == "all") {
        displayTodos(allToDos);
    }
    else if (selectedFilter == "active") {
        displayTodos(allToDos.filter(x => !x.completed));
    }
    else if (selectedFilter == "completed") {
        displayTodos(allToDos.filter(x => x.completed));
    }
    counter.textContent = allToDos.filter(x => !x.completed).length.toString();
    localStorage.setItem('todos', JSON.stringify(allToDos));
}
function editToDo(toDo, toDoPara) {
    if (toDoPara && !toDoPara.getAttribute('contenteditable')) {
        //Make ToDo editable
        toDoPara.setAttribute('contenteditable', 'true');
        setCursor(toDoPara);
        //When 
        //Add event listener for pressing enter
        toDoPara.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                toDo.title = toDoPara.textContent;
                toDoPara.removeAttribute('contenteditable');
            }
        });
        ['blur', 'onkey'];
        toDoPara.addEventListener('blur', () => {
            toDo.title = toDoPara.textContent;
            toDoPara.removeAttribute('contenteditable');
        });
    }
}
function setCursor(toDoPara) {
    //Sets the cursor to the end of the title
    //(Would be easier if title was an InputElement)
    toDoPara.focus();
    const range = document.createRange();
    range.selectNodeContents(toDoPara);
    range.collapse(false);
    const sel = window.getSelection();
    sel === null || sel === void 0 ? void 0 : sel.removeAllRanges();
    sel === null || sel === void 0 ? void 0 : sel.addRange(range);
}
function displayTodos(numberOfToDos) {
    //Clear all current listitems
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    //Print out new items from parameter
    numberOfToDos.forEach(toDo => {
        let listItem = document.createElement('li');
        listItem.classList.add("todo-item");
        let title = document.createElement('p');
        title.textContent = toDo.title;
        let deleteBtn = document.createElement('button');
        let label = document.createElement('label');
        label.classList.add("delete-btn-container");
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = toDo.completed ? true : false;
        let labelCheckBox = document.createElement('label');
        let spanCheckBox = document.createElement('span');
        label.textContent = '❌';
        //Add a destruction button on each ToDo item
        deleteBtn.addEventListener('click', () => {
            listItem.remove();
            numberOfToDos.splice(numberOfToDos.indexOf(toDo), 1);
            counter.textContent = numberOfToDos.filter(x => !x.completed).length.toString();
            localStorage.setItem('todos', JSON.stringify(allToDos));
        });
        //Marks the current todo as completed and then refreshes the list
        checkbox.addEventListener('change', () => {
            toDo.completed = !toDo.completed;
            toggleList();
            localStorage.setItem('todos', JSON.stringify(allToDos));
        });
        listItem.addEventListener('dblclick', (event) => {
            event.preventDefault();
            editToDo(toDo, title);
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
        if (toDo.completed) {
            title.style.textDecoration = "line-through";
            title.style.opacity = "0.5";
        }
        list === null || list === void 0 ? void 0 : list.append(listItem);
    });
}

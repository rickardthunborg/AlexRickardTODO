let form = document.querySelector<HTMLFormElement>("#todo-form")!;
let list = document.querySelector<HTMLUListElement>("#todo-list")!;
let input = document.querySelector<HTMLInputElement>("#todo-title");
const filters = document.querySelectorAll<HTMLInputElement>('input[type=radio]');
let counter = document.querySelector<HTMLElement>('#itemsLeft')!;
const toggleBtn = document.querySelector<HTMLInputElement>('#toggle-all')!;

class Todo {
    public title: string;
    public completed: boolean;

    constructor(taskName: string) {
        this.title = taskName;
        this.completed = false;
    }

    public toggleComplete(): void {
        this.completed = !this.completed;
    }
}

let allToDos: Todo[] = [];

filters[0].checked = true;

form.onsubmit = event => {
    event.preventDefault();
    if (input?.value == "" || input?.value == null) return

    const thingToDO = new Todo(input.value);

    allToDos.push(thingToDO);

    input.value = '';

    toggleList();
}

toggleBtn.addEventListener('click', checkAll);

//Eventhandlers for the filtering buttons
filters.forEach(x => x.addEventListener('change', () => {

    filters.forEach(x => {
        x.parentElement!.classList.remove('selected')
    })

    x.parentElement!.classList.toggle('selected')

    toggleList();
}))


function checkAll(): void {

    if (allToDos.every(x => x.completed)) {
        allToDos.forEach(x => {
            x.completed = false;
        })
        toggleList();
    }
    else {
        allToDos.forEach(x => {
            x.completed = true;
        })
        toggleList();
    }

}


//Function call updates ToDo list 
function toggleList(): void {

    let selectedFilter;

    for (const filter of filters) {
        if ((filter as HTMLInputElement).checked) {
            selectedFilter = (filter as HTMLInputElement).value;
            break;
        }
    }

    //Calls displayTodos with chosen filtering 
    if (selectedFilter == "all") {
        displayTodos(allToDos)
    }
    else if (selectedFilter == "active") {
        displayTodos(allToDos.filter(x => !x.completed))
    }
    else if (selectedFilter == "completed") {
        displayTodos(allToDos.filter(x => x.completed))
    }

    counter.textContent = allToDos.filter(x => !x.completed).length.toString();

}

function editToDo(toDo: Todo,toDoPara: HTMLElement | null): void {
    if (toDoPara && !toDoPara.getAttribute('contenteditable')) {
        toDoPara.setAttribute('contenteditable', 'true');
        toDoPara.addEventListener('blur', () => {
            toDo.title = toDoPara.textContent!;
            toDoPara.removeAttribute('contenteditable');
        })
    }
}


function displayTodos(numberOfToDos: Todo[]): void {

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
        let label = document.createElement('label')
        label.classList.add("delete-btn-container");
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = toDo.completed ? true : false;
        let labelCheckBox = document.createElement('label')
        let spanCheckBox = document.createElement('span');

        label.textContent = '❌';

        //Add a destruction button on each ToDo item
        deleteBtn.addEventListener('click', () => {
            listItem.remove();
            numberOfToDos.splice(numberOfToDos.indexOf(toDo), 1);
            counter.textContent = numberOfToDos.filter(x => !x.completed).length.toString();
        })

        //Marks the current todo as completed and then refreshes the list
        checkbox.addEventListener('change', () => {
            toDo.toggleComplete();
            toggleList();
        });

        listItem.addEventListener('dblclick', () => editToDo(toDo as Todo,title as HTMLElement));

        labelCheckBox.append(checkbox);
        labelCheckBox.append(spanCheckBox)
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

        list?.append(listItem);
    })
}
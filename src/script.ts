let form = document.querySelector<HTMLFormElement>("#todo-form")!;
let list = document.querySelector<HTMLUListElement>("#todo-list")!;
let input = document.querySelector<HTMLInputElement>("#todo-title");
const filters = document.querySelectorAll<HTMLInputElement>('input[type=radio]');
let counter = document.querySelector<HTMLElement>('#itemsLeft')!;
const toggleBtn = document.querySelector<HTMLInputElement>('#toggle-all')!;
const clearBtn = document.querySelector<HTMLInputElement>('#clear-completed')!;

let allToDos: Todo[] = [];

class Todo {
    public title: string;
    public completed: boolean;

    constructor(taskName: string) {
        this.title = taskName;
        this.completed = false;
    }
}

//If there are old ToDos in local storage, update list
if (localStorage.getItem('todos')) {
    allToDos = JSON.parse(localStorage.getItem('todos')!);
    toggleList();
}

form.onsubmit = event => {
    event.preventDefault();
    if (input?.value == "" || input?.value == null) return

    //Create new instance of Todo object and add to list
    const thingToDO = new Todo(input.value);

    allToDos.push(thingToDO);

    input.value = '';

    //Update list
    toggleList();

    //Save all todos to local storage
    localStorage.setItem('todos', JSON.stringify(allToDos));
}

toggleBtn.addEventListener('click', checkAll);

//Remove completed todos
clearBtn.addEventListener('click', () => {
    allToDos = allToDos.filter(x => !x.completed);
    toggleList();
})

//Eventhandlers for the filtering buttons
filters.forEach(x => x.addEventListener('change', () => {

    filters.forEach(x => {
        x.parentElement!.classList.remove('selected')
    })

    x.parentElement!.classList.toggle('selected')

    toggleList();
}))


function checkAll(): void {
    //Checks or unchecks all todos and then refreshes list
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

    if(!selectedFilter){
        selectedFilter = "all";
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
    

    
    setCounter(allToDos, counter);

    checkClearButton(allToDos);

    checkToggleButton();

    localStorage.setItem('todos', JSON.stringify(allToDos));
}

function editToDo(toDo: Todo, toDoPara: HTMLElement | null): void {
    if (toDoPara && !toDoPara.getAttribute('contenteditable')) {

        //Make ToDo editable
        toDoPara.setAttribute('contenteditable', 'true');
        setCursor(toDoPara as HTMLElement);

        //Pressing enter or clicking outside of box exits editing mode
        toDoPara.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                event.preventDefault();

                //Remove todo if title is empty
                if (toDoPara.textContent == ""){
                    allToDos.splice(allToDos.indexOf(toDo), 1);
                    toggleList();
                    return
                }

                toDo.title = toDoPara.textContent!;
                toDoPara.removeAttribute('contenteditable');
                localStorage.setItem('todos', JSON.stringify(allToDos));
            }
        });
        
        toDoPara.addEventListener('blur', () => {

            //Remove todo if title is empty
            if (toDoPara.textContent == ""){
                allToDos.splice(allToDos.indexOf(toDo), 1);
                toggleList();
                return
            }

            toDo.title = toDoPara.textContent!;
            toDoPara.removeAttribute('contenteditable');
            localStorage.setItem('todos', JSON.stringify(allToDos));
        })
    }
}

function setCursor(toDoPara: HTMLElement): void {

    //Sets the cursor to the end of the title
    //(Would be easier if title was an InputElement)
    toDoPara.focus();

    const range = document.createRange();
    range.selectNodeContents(toDoPara);
    range.collapse(false);
    
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
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

        label.textContent = '❌';

        //Add a destruction button on each ToDo item
        deleteBtn.addEventListener('click', () => {
            listItem.remove();
            allToDos.splice(allToDos.indexOf(toDo), 1);
            
            setCounter(allToDos, counter);

            toggleList();

            localStorage.setItem('todos', JSON.stringify(allToDos));
        })

        //Marks the current todo as completed and then refreshes the list
        checkbox.addEventListener('change', () => {
            toDo.completed = !toDo.completed;
            toggleList();

            localStorage.setItem('todos', JSON.stringify(allToDos));
        });

        listItem.addEventListener('dblclick', (event) => {

            event.preventDefault();

            editToDo(toDo as Todo, title as HTMLElement);
        })

        labelCheckBox.classList.add('check-done')
        checkbox.setAttribute('id', 'checkbox')
        labelCheckBox.append(checkbox);
        listItem.append(labelCheckBox);
        listItem.append(title);
        label.append(deleteBtn);
        listItem.append(label);

        if (toDo.completed) {
            title.classList.add('completed');
            labelCheckBox.classList.add('completedbox')
        }
        else {
            title.classList.remove('completed');
            labelCheckBox.classList.remove('completedbox')
        }

        list?.append(listItem);
    })
}

//Displays number of remaining toDos
function setCounter(toDos: Todo[], counter: HTMLElement): void {
    const todoCount: number = allToDos.filter(x => !x.completed).length;
    counter.textContent = `${todoCount} ${todoCount != 1 ? "items" : "item"} left`;
}

//If there are no completed todos; hide button
function checkClearButton(toDos: Todo[]): void {
    if (toDos.some(x => x.completed)){
        clearBtn.classList.remove('hidden')
    }
    else {
        clearBtn.classList.add('hidden')
    }
}

//If there are no todos; hide toggle button
function checkToggleButton(): void{
    if(allToDos.length === 0){
        toggleBtn.parentElement!.classList.add('hidden');
    }
    else {
        toggleBtn.parentElement!.classList.remove('hidden');
    }
}
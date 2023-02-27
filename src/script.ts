let form = document.querySelector<HTMLFormElement>("#todo-form")!;
let list = document.querySelector<HTMLUListElement>("#todo-list")!;
let input = document.querySelector<HTMLInputElement>("#todo-title");
const filters = document.querySelectorAll<HTMLInputElement>('input[type=radio]');

class Todo {
    public title: string;
    public completed: boolean; 

    constructor(taskName: string){
        this.title = taskName;
        this.completed = false;
    }
    
    public toggleComplete(): void{
        this.completed = !this.completed;
    }
}

let numberOfToDos: Todo[] = [];

filters[0].checked = true;

form.onsubmit = event => {
    event.preventDefault();
    if(input?.value == "" || input?.value == null ) return
    
    const thingToDO = new Todo(input.value);
    
    numberOfToDos.push(thingToDO);
    
    input.value = '';

    toggleList();
}

filters.forEach(x => x.addEventListener('change',() => {

    filters.forEach(x =>{
        x.parentElement!.classList.remove('selected')
    })

    x.parentElement!.classList.toggle('selected')

    toggleList();
    
    
}))

function toggleList(): void {
    
    let toDos = document.getElementsByClassName('toDo');
    
    let selectedFilter;
    
    for (const filter of filters) {
      if ((filter as HTMLInputElement).checked) {
        selectedFilter = (filter as HTMLInputElement).value;
        break;
    }
}

if (selectedFilter == "all") {
        displayTodos(numberOfToDos)
    }
    else if (selectedFilter == "active") {
        displayTodos(numberOfToDos.filter(x => !x.completed))
    }
    else if (selectedFilter == "completed") {
        displayTodos(numberOfToDos.filter(x => x.completed))
    }


}


function displayTodos(numberOfToDos: Todo[]): void {

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    numberOfToDos.forEach(x => {

        let listItem = document.createElement('li');
        let title = document.createElement('p');
        title.textContent = x.title;
        let deleteBtn = document.createElement('button');
        let label = document.createElement('label')
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = x.completed ? true : false;
        let labelCheckBox = document.createElement('label')
        let spanCheckBox = document.createElement('span');
        
        
        label.textContent = '❌';
        
        deleteBtn.addEventListener('click', () => {
            listItem.remove();
            numberOfToDos.splice(numberOfToDos.indexOf(x), 1);        
        })
        
        checkbox.addEventListener('change', () => {
            x.toggleComplete();
            toggleList();
        });
        
        labelCheckBox.append(checkbox);
        labelCheckBox.append(spanCheckBox)
        listItem.append(labelCheckBox);
        listItem.append(title);
        label.append(deleteBtn);
        listItem.append(label);
        
        list?.append(listItem);

    })
}
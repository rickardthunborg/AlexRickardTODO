let form = document.querySelector<HTMLFormElement>("#todo-form")!;
let list = document.querySelector<HTMLUListElement>("#todo-list");
let input = document.querySelector<HTMLInputElement>("#todo-title");

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

form.onsubmit = event => {
    event.preventDefault();
    if(input?.value == "" || input?.value == null ) return
    
    const thingToDO = new Todo(input.value);

    numberOfToDos.push(thingToDO);
    
    let listItem = document.createElement('li');
    let title = document.createElement('p');
    title.textContent = thingToDO.title;
    let deleteBtn = document.createElement('button');
    let label = document.createElement('label')
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    let labelCheckBox = document.createElement('label')


    label.textContent = '❌';
    
    deleteBtn.addEventListener('click', () => {
        listItem.remove();        
    })

    checkbox.addEventListener('change', () => {
        thingToDO.toggleComplete();
    });
    
    labelCheckBox.append(checkbox);
    listItem.append(labelCheckBox);
    listItem.append(title);
    label.append(deleteBtn);
    listItem.append(label);
    
    list?.append(listItem);
    input.value = '';
}

function DisplayList(toDoList: Todo[]){
    
    

    
}
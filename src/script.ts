let form = document.querySelector<HTMLFormElement>("#todo-form")!;
let list = document.querySelector<HTMLUListElement>("#todo-list");
let input = document.querySelector<HTMLInputElement>("#todo-title");

class Todo {
    title: string;
    completed: boolean; 

    constructor(taskName: string){
        this.title = taskName;
        this.completed = false;
    }

    toggleComplete(){
        this.completed = !this.completed;
    }
}

let numberOfToDos: Todo[];

form.onsubmit = event => {
    event.preventDefault();
    if(input?.value == "" || input?.value == null ) return
    
    const thingToDO = new Todo(input.value);

    numberOfToDos.push(thingToDO);
    let listItem = document.createElement('li');
    listItem.append(thingToDO.title);
    list?.append(listItem);

}

function DisplayList(){
    
}
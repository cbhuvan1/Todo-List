//selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

//Eventlistener
document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', checkdelete)
filterOption.addEventListener('click',filterTodo)

//functions

function addTodo(e){
    e.preventDefault();
    
    // create todoDiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //create todolist
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-li');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    
    //saving todos to local storage
    saveLocalTodos(todoInput.value);

    //create checkButton
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fa fa-check-square" aria-hidden="true"></i>';
    checkButton.classList.add('check-btn');
    todoDiv.appendChild(checkButton);
    
    //create deleteButton
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    deleteButton.classList.add('del-btn');
    todoDiv.appendChild(deleteButton);
    
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function checkdelete(e){
    const item = e.target;
    
    //deleting the todos
    if(item.classList[0] === "del-btn") {
        const todo = item.parentElement;
        //animation
        todo.classList.add('slide')
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }
    
    //checking the todos
    if(item.classList[0] === "check-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("finished");
    }
}

//sorting the todos based on done & !done
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex"
                break;
            case "finished":
                if(todo.classList.contains('finished')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "unfinished":
                if(!todo.classList.contains('finished')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos (todo) {
    //check if i already have saved something before
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    
    todos.forEach(function(todo){
        // create todoDiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //create todolist
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-li');
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    //create checkButton
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fa fa-check-square" aria-hidden="true"></i>';
    checkButton.classList.add('check-btn');
    todoDiv.appendChild(checkButton);
    
    //create deleteButton
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    deleteButton.classList.add('del-btn');
    todoDiv.appendChild(deleteButton);
    
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innertext;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos",JSON.stringify(todos));
}
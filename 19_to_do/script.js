//seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm =  document.querySelector("#edit-form");
const editInput =  document.querySelector("#edit-input");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");
const cancelEditBtn =  document.querySelector("#cancel-edit-btn");
let oldInputValue;
//funcoes
const saveTodo = (text, done = 0, save = 1)=>{
    //crio a div pai para adicionar os demais elementos
    const todo = document.createElement("div")
    todo.classList.add("todo")
    //crio o h3 com o titulo da tarefa
    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);
    
    //crio o botao de finalizar tarefa
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = "<i class='fa-solid fa-check'></i>";
    todo.appendChild(doneBtn);
    
    //crio o botao de editar tarefa
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = " <i class='fa-solid fa-pen'></i>";
    todo.appendChild(editBtn);

    //crio o botao de remover tarefa
    removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    todo.appendChild(removeBtn);
    // console.log(todo);
    //ultilizando dados da localStorage
    if(done){
        todo.classList.add("done")
    }
    if(save){
        saveTodoLocalStorage({text, done})
    }
    //acrescento o elementos criados a minha lista geral
    todoList.append(todo);
    todoInput.value = "";
    todoInput.focus();

}
//abrir e fechar os forms
const toggleForms = ()=>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}
//função para atualizar as tarefas
const updateTodo = (text)=>{
    // console.log(text)
    // console.log(oldInputValue)
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector("h3");
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
            updateTodoLocalStorage(oldInputValue, text)
        }
    })
}
//função para a busca
const getSearchTodo = (search)=>{
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        const normalizedsearch = search.toLowerCase();

        todo.style.display = "flex";

        if(!todoTitle.includes(normalizedsearch)){
            todo.style.display = "none"
        }
    })
}
//função para o filtro
const filterTodo = (filterValue) =>{
    const todos = document.querySelectorAll(".todo");
    switch(filterValue){
        case "all":
            todos.forEach((todo)=>todo.style.display = "flex");
            break;
        case "done":
            todos.forEach((todo)=> todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none");
            break;
        case "todo":
            todos.forEach((todo)=> !todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none");
            break;
        default:
            break;
    }
}
//eventos
todoForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const inputValue = todoInput.value;
    if(inputValue){
       saveTodo(inputValue)
    }
})

//adiciono o evento de click em todo o elemento para fazer a verificação de qual botao esta sendo clicado, para assim fazer as fucionalidades deles
document.addEventListener("click", (e)=>{
    const targetEl = e.target;
    //pegar o elemento mais proximo do targetEl
    const parentEl = targetEl.closest("div");
    //usar o titulo como se fosse um id
    let todoTitle;
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    // console.log(targetEl)
    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
        updateTodoStatusLocalStorage(todoTitle);
    }
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
        removeTodoLocalStorage(todoTitle)
    }
    if(targetEl.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

})
//cancelar a edição
cancelEditBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    toggleForms();
})
//edição do todo
editForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const editInputValue = editInput.value;
  
    if (editInputValue) {
      updateTodo(editInputValue);
    }
  
    toggleForms();
  });
// evento de keyup na busca
searchInput.addEventListener("keyup",(e)=>{
    const search = e.target.value;
    getSearchTodo(search);
})
//evento para limpar a search
eraseBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("keyup"))
})
//evento para filtrar
filterBtn.addEventListener("change", (e)=>{
    const  filterValue = e.target.value;
    filterTodo(filterValue);
})

//localStorage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
}
const loadTodos = ()=>{
    //todos os todos da ls
    const todos = getTodosLocalStorage();
    todos.forEach((todo)=>{
        saveTodo(todo.text, todo.done, 0);
    })
}
const saveTodoLocalStorage = (todo)=>{
    //todos os todos da ls
    const todos = getTodosLocalStorage();

    //add o novo todo no arr
    todos.push(todo);

    //salvar tudo na ls
    localStorage.setItem("todos", JSON.stringify(todos))
}
//metodo filter retorna dados
const removeTodoLocalStorage = (todoText) =>{
    const todos = getTodosLocalStorage();
    const filteredTodos = todos.filter((todo)=>todo.text != todoText);
    localStorage.setItem("todos", JSON.stringify(filteredTodos))
}
//metodo map modifica os dados originais
const updateTodoStatusLocalStorage = (todoText) =>{
    const todos = getTodosLocalStorage();
    todos.map((todo)=>todo.text === todoText ? (todo.done = !todo.done ): null);
    localStorage.setItem("todos", JSON.stringify(todos))
}
const updateTodoLocalStorage = (todoOldText, todoNewText) =>{
    const todos = getTodosLocalStorage();
    todos.map((todo)=>todo.text === todoOldText ? (todo.done = todoNewText) : null);
    localStorage.setItem("todos", JSON.stringify(todos))
}
loadTodos();
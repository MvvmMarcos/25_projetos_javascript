import { useState } from "react";
import {tasks} from './db';
import "./App.css";
//components
import Todo from "./components/Todo/Todo";
import TodoForm from "./components/TodoForm/TodoForm";
import Search from "./components/Search/Search";
import Filter from "./components/Filter/Filter";
function App() {
  const [todos, setTodos] = useState(tasks);
  //search
  const [search, setSearch] = useState("");
  ///filter
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  //função que adiciona tarefas
  const addTodo = (text, category) =>{
    //recebos todas as tarefas e crio as novas com o id gerado randomicamente
    const newTodos = [...todos,{
      id:Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted:false
    }]
    //atualizo as minhas tarefas
    setTodos(newTodos)
  }
  const removeTodo = (id)=>{
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter(todo => todo.id !== id ? todo : null);
    setTodos(filteredTodos);
  }
  const completeTodo = (id) =>{
    const newTodos = [...todos];
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo);
    setTodos(newTodos);
    console.log(newTodos)
  }
  
  return (
    <div className="app">
      <h1>Lista de tarefas</h1>
      <Search search={search} setSearch={setSearch}/>
      <Filter
       filter={filter} setFilter={setFilter}
       setSort={setSort}
       />
      <div className="todo-list">
        {/* {todos.map((todo)=>(//antes do search */}
        {/* {todos.filter((todo)=> todo.text.toLowerCase().includes(search.toLowerCase())).map((todo)=>(//antes do filtro */}
        {todos
        .filter((todo)=>filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
        .filter((todo)=> todo.text.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b)=> sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
        .map((todo)=>(
          <Todo 
          key={todo.id} 
          todo={todo} 
          removeTodo={removeTodo}
          completeTodo={completeTodo}
          />
        ))}
      </div>
      <TodoForm  addTodo={addTodo}/>
    </div>
  )
}

export default App

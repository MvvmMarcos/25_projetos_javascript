import {useState} from 'react'

const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");


    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!value || !category) return;
        //adicionar todo
        addTodo(value, category);
        //limpar os campos
        setValue("");
        setCategory("");
    }
    // console.log(value)
    //  console.log(category)
  return (
    <div className='todo-form'>
        <h2>Criar tarefa</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder='Digite o título' 
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            />
            <select 
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            >
                <option value="">Selecione uma categoria</option>
                <option value="Compras">Compras</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Estudos">Estudos</option>
                <option value="Saúde">Saúde</option>
                <option value="Cultura">Cultura</option>
                <option value="Culinária">Culinária</option>
                <option value="Saúde">Saúde</option>
                <option value="Entretenimento">Entretenimento</option>
                <option value="Criatividade">Criatividade</option>
            </select>
            <button type="submit">Criar tarefa</button>
            
        </form>
    </div>
  )
}

export default TodoForm
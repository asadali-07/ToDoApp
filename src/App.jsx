import Navbar from './components/Navbar'
import { useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
    let todoString=localStorage.getItem('todos')
    if(todoString){
      let storedTodos=JSON.parse(localStorage.getItem('todos'))
      setTodos(storedTodos)
    }
  }, [])
  
  const handleChange=(event)=>{
    setTodo(event.target.value)
  }
  const handleAdd=()=>{
    if(todo){
      setTodos([...todos,{todo,isCompleted:false,id:uuidv4()}])
      setTodo("")
    }
    saveToLS()
  }
  const handleDelete=(id)=>{
    setTodos(todos.filter((item) => item.id!== id))
    saveToLS()
  }
  const handleEdit=(id)=>{
    let todo=todos.filter(i=>i.id==id)
    setTodo(todo[0].todo)
    setTodos(todos.filter((item) => item.id!== id))
    saveToLS()
  }
  const handleChecked=(event)=>{
    setTodos(todos.map((item) => item.id === event.target.name? {...item, isCompleted:!item.isCompleted} : item))
    saveToLS()
  }
  const saveToLS=()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  }
  const handleShowFinished=()=>{
    setshowFinished(!showFinished)
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto w-3/4 bg-violet-300 my-5 rounded-xl p-5 min-h-[84vh] ">
    <h1 className='text-center font-bold text-3xl'>iTask manager at one place</h1>
       <h1 className='text-xl font-bold '>Add Todo:</h1>
      <input type="text" className='my-4 h-8 rounded-lg w-8/12' value={todo} onChange={handleChange}/>
      <button  onClick={handleAdd} disabled={todo.length<=3} className= 'mx-5 cursor-pointer bg-violet-700 h-8 w-28 rounded-lg text-lg text-white disabled:bg-violet-500 hover:bg-violet-900'>Add</button>
      <br /><input type="checkbox" onClick={handleShowFinished}  checked={showFinished} /> Show finished
      <hr className='my-3'/>
      <h1 className='text-xl font-bold text'>Your Todo:</h1>
     <div className="todos">
      {todos.length===0 && <p className="text-xl mx-10 my-5">No Todos yet.</p>} 
        {todos.map(item=>{
          return (showFinished||!item.isCompleted)&&<div key={item.id} className="todo flex my-3 ">
         <div className='flex gap-3 h-8 rounded-lg w-8/12'>
         <input type="checkbox" onClick={handleChecked} className='mx-3' checked={item.isCompleted} name={item.id} />
         <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
         </div>
          <div className="buttons">
          <button onClick={()=>{handleEdit(item.id)}} className='mx-5 cursor-pointer bg-violet-700 h-8 w-28 rounded-lg text-lg text-white hover:bg-violet-900'>Edit</button>
          <button onClick={()=>{handleDelete(item.id)}} className=' cursor-pointer bg-violet-700 h-8 w-28 rounded-lg text-lg text-white hover:bg-violet-900'>Delete</button>
          </div>
          </div>
        })}
     </div>
    </div>
    </>
  )
}

export default App
 
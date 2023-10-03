import React,{useState} from 'react'
import '../style/home.css'
import TaskComponent from './taskComponent'
import { useSelector } from 'react-redux'
import TaskForm from './taskForm'


function Home() {
    let selector = useSelector(state=>state)
    let [data,setData] = useState({values :Object.values(selector.datas)})

    function buttonHandler(){
        let modal = document.getElementById('modal')
        modal.classList.toggle('inactive')
    }


  return (
    <div className='todo-container'>
        {
            selector.auth.username === '' ? <div className='empty-component'>
               <span className='item'>
               Kindly <a href='/login'> Login</a> or <a href='/signin'> Sign-In</a> to view
               </span>
            </div> :
            <>
            <div className="todo-component">
            <div className="todo-title-component">
                <span className='title-card'>
                    Todo's
                </span>
                <button type="button" className='title-card-btn' onClick={()=>buttonHandler()}>&#10010;</button>
            </div>
            <div className="todo-data-component">
                {
                }
                {
                    data.values.length  !== 0 && data.values.length  !== undefined ? data.values.map(item=>{
                        
                        return(
                            <TaskComponent parentState={setData} details={item}/>
                        )
                    }) : <div className="empty">
                        No Items to Kill 
                    </div>
                }
                <TaskForm parentState={setData}/>
            </div>
        </div>
            </>
        }
    </div>
  )
}

export default Home
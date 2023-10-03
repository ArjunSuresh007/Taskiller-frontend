import '../style/task.css'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'


export default function TaskComponent({details:{title,time,deadline,completed,id},parentState}){
    let [state,setState] = useState({
        data :{title,time,deadline,completed,id},
        edit:false,
    })
    let dispatcher = useDispatch()
    let selector = useSelector(state=>state)


    async function buttonDispatchHandler(){
        dispatcher({type:'DELETE',payload:{id}})
        let req = await axios.delete(`https://taskiller-todo-api.onrender.com/${selector.auth.username}/todo/${state.data.id}`)
        parentState({
            values:Object.values(selector.datas)
        })
    }

    async function submitHandler(e){
        e.preventDefault()
        setState(prev=>{
            return({
                ...prev,
                edit:!prev.edit,
            })
        })
        let req = await axios.patch(`https://taskiller-todo-api.onrender.com/${selector.auth.username}/todo/${state.data.id}`,{data:state.data})
        console.log(req.data)
        dispatcher({type:'UPDATE',payload:state.data})
    }

    function changeHandler(e){
        if (e.target.name === 'completed'){
            setState((prev)=>{
                return({
                    ...prev,
                    data:{
                        ...prev.data,
                        completed: e.target.checked,
                    }
                })
            })

        }else{
            setState((prev)=>{
                    return({
                        ...prev,
                        data:{
                            ...prev.data,
                            [e.target.name]: e.target.value
                        }
                    })
                })
        }
    }

    return (
        <>
        <div className={`task-container ${state.edit ? 'inactive' : ''}`}>
            <div className="title">
                <label for='title' className='task-title'>
                    <em>Task: </em>
                </label>
                <span className="values">
                {state.data.title.length > 15 ? (state.data.title.substr(0,13)+'...') : state.data.title }
                </span>
            </div>
            <div className="deadline">
            <label for='deadline' className='task-deadline'>
                <em>Deadline : </em>
            </label>
            <span className="values">
                {state.data.deadline.split("-").reverse().join("-")} {parseInt(state.data.time.split(":"[0])) > 12 ? `${parseInt(state.data.time.split(":"[0])) - 12}:${state.data.time.split(":")[1]} PM` : `${state.data.time} AM`}
                </span>
                </div> 
            <div className="status">
                <label for="status" className='task-status'>
                    <em>Status : </em>
                    </label>
                    <span className="values">
                 {state.data.completed ? 
            <span>Killed</span> :<span>Alive</span>}
            {/* <span>&#10004;</span> :<span>&#10008;</span>} */}
            </span>
            </div>
            <button type="button" className='task-cancel-btn' onClick={()=>buttonDispatchHandler()}>
            <i class="fa fa-trash"></i>
            {/* <span class="material-symbols-outlined"></span> */}
            </button>
            <button type="button" className='task-edit-btn' onClick={()=>{setState(prev=>{
                return({
                    ...prev,
                    edit:!prev.edit
                })
            })}}>
            <i class="material-icons">&#9998;</i>
            </button>
            
                </div>
            <form className={`task-container ${!state.edit ? 'inactive' : ''}`} onSubmit={(e)=>submitHandler(e)}>
            <div className="title">
                <label for='title' className='task-title'>
                    <em>Task: </em>
                </label>
                <input type="text" name="title" className='form-input' defaultValue={state.data.title}  onChange={(e)=>changeHandler(e)} autoFocus={true}/>
            </div>
            <div className="deadline">
            <label for='deadline' className='task-deadline'>
                <em>Deadline : </em>
            </label>
            <span className="values">
                <input type="date" className='form-input' name="deadline" defaultValue={state.data.deadline} onChange={(e)=>changeHandler(e)} />
                <input type="time" className='form-input' name="time" defaultValue={state.data.time} onChange={(e)=>changeHandler(e)} />
                </span>
                </div> 
            <div className="status">
                <label for="status" className='task-status'>
                    <em>Completed : </em>
                    </label>
                    <span className="values">
                        <input type='checkbox' name='completed' defaultChecked={state.data.completed ? true:false} value={state.data.completed} onChange={(e)=>changeHandler(e)}/>
            </span>
            </div>
            <button type="submit" className='task-save-btn' >
            <i class="material-icons">&#xe877;</i>
            </button>
            </form>
        </>
    )
}
import {  useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import '../style/taskform.css'
import axios from 'axios'


export default function TaskForm({parentState}){
    let initialState = {
        title:'',
        time:'',
        deadline:'',
        completed:false
    }
    let selector = useSelector(state=>state)
    let dispatcher = useDispatch()
    let [data,setData] = useState({...initialState   })

    async function submitHandler(e){
        let modal = document.getElementById('modal')
        e.preventDefault()
        if(data.time === '' || data.deadline === '' || data.title === ''){
            alert('Fill all the details')
        }else{
            setData((prev)=>{
                return({
                    ...prev,
                    ...initialState
                })
            })
            let req = await axios.patch(`https://taskiller-todo-api.onrender.com/${selector.auth.username}/todo`,{...data,id:selector.count})
            console.log(req.data)
            dispatcher({type:'ADD',payload:data})
            parentState({
                values:Object.values(selector.datas)
            })
            modal.classList.toggle('inactive')
        }
    }

    function changeHandler(e){
        if (e.target.name === 'checkbox'){
            setData((prev)=>{
                return({
                    ...prev,
                    ['completed']: e.target.checked
                })
            })
            console.log(data)
            }else{
            setData((prev)=>{
                return({
                    ...prev,
                    [e.target.name]: e.target.value
                })
            })
        }
    }

    function buttonHandler(){
        let modal = document.getElementById('modal')
        modal.classList.toggle('inactive')
        setData((prev)=>{
            return({
                ...prev,
                ...initialState
            })
        })
    }


    return(
        <>
        <div class="modal-container inactive" id='modal'>
        <div class="modal-form ">
            <form  method="post" onSubmit={(e)=>submitHandler(e)}>
                <div class="form-component">
                <label for="title" class="form-item">
                        <h3>Title*</h3>
                    <input name="title" id="title" type="text" class="form-input-item" value={data.title} onChange={(e)=>changeHandler(e)} placeholder="Title"  />
                </label>
                <label for="time" class="form-item-deadline">
                        <h3>Time*</h3>
                    <input name="time" id="time" type='time' class="form-input-time" value={data.time} onChange={(e)=>changeHandler(e)} placeholder="Time"  />
                </label>
                <label for="deadline" class="form-item-deadline"> 
                    <h3>Deadline*</h3>
                    <input name="deadline" id="deadline" type="date" class="form-input-item" value={data.deadline} onChange={(e)=>changeHandler(e)} placeholder="Password" />
                </label>
                <label for="checkbox" class="form-check-item">
                        <h3>Task Status :</h3>
                    <input name="checkbox" id="title" type="checkbox" class="form-input-check-item" value={data.completed} defaultChecked={false} onChange={(e)=>changeHandler(e)} placeholder="Status"  />
                </label>
                <div class="form-btn">
                    <button type="submit" class="form-submit-btn">submit</button>
                </div> 
                    <button type="button" class="form-cross-btn" onClick={()=>buttonHandler()}>&#10006;</button>
            </div>
            </form>
        </div>
    </div>
    </>
    )
}
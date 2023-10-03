import {useState} from 'react';
import axios from 'axios'
import '../style/login.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LoginForm({parentState}) {
    let initialState = {
        username:'',
        password:''
    }
    let [loginCredentials,setCredentials] = useState({...initialState})
    let navigator = useNavigate()
    let dispather = useDispatch()

    function changeHandler(e){
        let {name}  = e.target
        setCredentials(prev =>{
            return(
                {
                    ...prev,
                    [name]:e.target.value,
                }
            )
        })
    }
    
    function errorValidator(){
        if(loginCredentials.username.trim().length < 7 || loginCredentials.password.trim().length < 8){
            alert('Invalid Credentials')
            return true
        }
        return false
    }

    async function submitHandler(e){
        e.preventDefault()
        let error_status = errorValidator()
        if(!error_status){
            let req = await axios.post('https://taskiller-todo-api.onrender.com/login',loginCredentials)
            if(req.data.msg === true){
                dispather({type:'AUTH',payload:{username:loginCredentials.username,todos:req.data.todos,id:req.data.id}})
                setCredentials(() =>{
                return(
                    {
                        ...initialState
                    }
                )
                })
                parentState(prev=>!prev)
                navigator('/')
            }else{
                alert('User doesn\'t exist')
                navigator('/signin')
            }
        }
    }



  return (
    <>
    <div class="login-container" id='login-component'>
        <form onSubmit={e=>submitHandler(e)} method='POST' class='login-form'>
        <div class="login-component">
            <label class="login-item">
                <input name='username' type="text" class="login-input-item" placeholder="Username" value={loginCredentials.username} onChange={e=>changeHandler(e)}/>
            </label>
            <label class="login-item"> 
                <input type="password" name='password' class="login-input-item" placeholder="Password" value={loginCredentials.password} onChange={e=>changeHandler(e)}/>
            </label>
            <button type="submit" class="login-submit-btn">submit</button>
        </div>
    </form>
    </div>
    
    </>
  )
}

export default LoginForm
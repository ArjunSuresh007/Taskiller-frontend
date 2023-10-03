import '../style/signin.css'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function SignUpComponent({parentState}){
    let initialState = {
        username:'',
        password_trail1:'',
        password_trail2:'',
    }
    let [signupCredentials,setSignup] = useState({...initialState})
    let navigator = useNavigate()
    let dispather = useDispatch()
    function changeHandler(e){
        let {name}  = e.target
        setSignup(prev =>{
            return(
                {
                    ...prev,
                    [name]:e.target.value,
                }
            )
        })
    }

    function errorValidator(){
        if(signupCredentials.username.trim().length < 7 || signupCredentials.password_trail1.trim().length < 8 || signupCredentials.password_trail2.trim().length < 8){
            alert('Invalid Credentials')
            return true
        }else if(signupCredentials.password_trail1 !== signupCredentials.password_trail2){
            alert('Invalid Credentials')
            return true
        }
        return false
    }

    async function submitHandler(e){
        e.preventDefault()
        let error_status = errorValidator()
        if(!error_status){
            let req = await axios.post('https://taskiller-todo-api.onrender.com/signup',signupCredentials)
            if(req.data.msg === true){
                dispather({type:'AUTH-SIGNIN',payload:{username:signupCredentials.username,id:req.data.id}})
                setSignup(()=>{
                    return({
                        ...initialState
                    })
                })
                parentState(prev=>!prev)
                navigator('/')
            }else{
                alert('Already an user exists in this Username, kindly Login')
            }
        }
    }

    return(
        <>
        <div class="signin-container " id='signin-component'>
        <form onSubmit={(e)=>submitHandler(e)} method='POST' class='signin-form'>
        <div class="signin-component">
            <label class="signin-item">
                <input type="text" class="signin-input-item" name='username' placeholder="Username (min.length == 7)" onChange={(e)=>changeHandler(e)} value={signupCredentials.username}/>
            </label>
            <label class="signin-item"> 
                <input type="password" class="signin-input-item" name='password_trail1' placeholder="Password (min.length == 8)" onChange={(e)=>changeHandler(e)} value={signupCredentials.password_trail1}/>
            </label>
            <label class="signin-item"> 
                <input type="password" class="signin-input-item" name='password_trail2' placeholder="Enter Password again" onChange={(e)=>changeHandler(e)} value={signupCredentials.password_trail2}/>
            </label>
            <button type="submit" class="signin-submit-btn">submit</button>
        </div>
    </form>
    </div>
        </>
    )
}

export default SignUpComponent
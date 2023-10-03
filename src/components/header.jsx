import React,{useState} from 'react'
import '../style/header.css'
import {NavLink,Link} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'


function Header({parentState}) {
    let selector = useSelector(state=>state.auth)
    let dispatcher = useDispatch()


    function hamberHanlder(){
        let navbar = document.getElementById('nav-link')
        navbar.classList.toggle('visible')
    }

    function logoutHandler(){
        dispatcher({type:'AUTH-RESET'})
        parentState(prev=>!prev)
    }


  return (
    <nav className='header-component'>
        <div className='logo-comp'>
        TASKILLER
        </div>
        <div className="nav-links" id='nav-link'>
            <div className="links">
            <NavLink to='/' style={{color:'white',textDecoration:"none"}}>Home</NavLink>
            </div>
        <div className={`auth-container`}>
        {
            selector.username === '' ?
            <>
            <Link to='/login'>
            <button type="button" className='auth-btn' name='login'>Login</button>
        </Link>
        <Link to='/signin'>
            <button type="button" className='auth-btn' name='sign-in'>Sign-in</button>
        </Link>
            </> :
            <>
             <Link to='/login'>
            <button type="button" className='auth-btn' name='logout' onClick={()=>logoutHandler()}>Log-out</button>
        </Link>
            </>
        }
        </div>
        </div>
        <div className="hamburger-icon" >
       <button type="button" className='hamburger-icon-btn' id='hamburger-btn' onClick={()=>hamberHanlder()}>
       <i class="material-icons" style={{fontSize:"30px",color:"white"}}>&#xe8ee;</i>
       </button>
        </div>
    </nav>
  )
}

export default Header
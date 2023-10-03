import Header from './header.jsx'
import { Outlet } from 'react-router-dom'
import '../style/layout.css'
import { useState } from 'react'
// import { UseSelector, useSelector } from 'react-redux'


export default function Layout({parentState}){
    return(
        <>
        <header className="App-header">
       <Header parentState={parentState}/>
      </header>
      <main className='data-container'>
        <div className='data-component'>
          {<Outlet/>}
        </div>
      </main>
        </>
    )
}
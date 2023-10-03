import './style/App.css';
import LoginForm from './components/loginform';
import SignUpComponent from './components/signup';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from '../src/components/Home.jsx';
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import store from './utils/store';
import {useState} from 'react'
import axios from 'axios'



function App() {
  let [state,setState] = useState(false)
  console.log(state)
  // axios.post('https://taskiller-todo-api.onrender.com/login',{username:'arjunkeerthi0603',password:'arjunkeerthi0603'}).then(res=>(console.log(res)))
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
            <Routes>
                <Route path='/' element={<Layout parentState={setState}/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/login' element={<LoginForm parentState={setState}/>}/>
                    <Route path='/signin' element={<SignUpComponent parentState={setState}/>}/>
                </Route>
            </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

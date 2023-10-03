import { BrowserRouter as Router,Routes,Route,Outlet } from 'react-router-dom';
import Home from './Home';


export default function Main(){
    return (
        <Router>
            <Routes>
                <Route path='/'>
                    <Route index element={<Home/>}/>
                </Route>
            </Routes>
        </Router>
    )
}
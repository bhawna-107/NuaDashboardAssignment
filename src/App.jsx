import './App.css';

import Login from './Component/Login';
import Register from './Component/Register'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Component/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path = '/dashboard' element= {<Dashboard/>}></Route>
      </Routes>
      </BrowserRouter>
   
  )
}

export default App

import './App.css';

import Login from './Routes/Login';
import Register from './Routes/Register'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Routes/Dashboard';

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

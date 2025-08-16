import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Contact from './Components/Auth/Contact'
import Profile from './Components/Auth/Profile'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

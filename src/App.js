import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Company from './pages/Company'
import Lodash from './pages/Lodash'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/company' element={<Company/>}/>
        <Route path='/lodash' element={<Lodash/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
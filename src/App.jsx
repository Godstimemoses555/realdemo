import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Home} from 'lucide-react'
import Mainpage from './Pages/Mainpage'
import Storepage from './Pages/Storepage'
import Cart from './Pages/Cart'
import Detail from './Pages/Detail'

const App = () => {
  return (
    <div>

      <Router>
        <Routes>
          <Route path='/' element={<Mainpage/>}/>
          <Route path='/storepage' element={<Storepage/>}/>
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/Detail' element={<Detail/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
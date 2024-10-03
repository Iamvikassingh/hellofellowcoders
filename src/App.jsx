
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Mainapp from './components/mainapp/Mainapp'
import Loginpage from './components/loginPage/Loginpage'
import Registration from './components/loginPage/Registration'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mainapp />} />
          <Route path='/about' element={<h1>this is about us</h1>} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

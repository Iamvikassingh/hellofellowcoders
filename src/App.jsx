
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Mainapp from './components/mainapp/Mainapp'
import Loginpage from './components/loginPage/Loginpage'
import Registration from './components/Registrationcom/Registration'
import PrivateComponent from './components/privatecomponent/PrivateComponent'
import Chatfunction from './components/Chat/Chatfunction'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mainapp />} />
          <Route path='/about' element={<h1>this is about us</h1>} />
          
            {/* here is the privateComponet */}
          <Route element={<PrivateComponent />}>
            <Route path='/Chat' element={<Chatfunction/>} />
          </Route>

          <Route path='/login' element={<Loginpage />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

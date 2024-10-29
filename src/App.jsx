
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Mainapp from './components/mainapp/Mainapp'
import Loginpage from './components/loginPage/Loginpage'
import Registration from './components/Registrationcom/Registration'
import PrivateComponent from './components/privatecomponent/PrivateComponent'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mainapp />} />
          <Route path='/about' element={<h1>this is about us</h1>} />
          
            {/* here is the privateComponet */}
          <Route element={<PrivateComponent />}>
            <Route path='/Chat' element={<h1>this is main chat application</h1>} />
          </Route>

          <Route path='/login' element={<Loginpage />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

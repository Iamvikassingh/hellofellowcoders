
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Mainapp from './components/mainapp/Mainapp'
import Loginpage from './components/loginPage/Loginpage'
import Registration from './components/Registrationcom/Registration'
import PrivateComponent from './components/privatecomponent/PrivateComponent'
import About from './components/About/About'
import Footer from './components/Footer/Footer'
import FlowchartDisplay from './components/Flowchartdisplay/FlowchartDisplay'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mainapp />} />
          <Route path='/about' element={<About/>} />
          
            {/* here is the privateComponet */}
          <Route element={<PrivateComponent />}>
            <Route path='/Flowchartdisplay' element={<FlowchartDisplay/>} />
          </Route>

          <Route path='/login' element={<Loginpage />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
    </>
  )
}

export default App

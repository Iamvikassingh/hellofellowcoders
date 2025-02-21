
import { BrowserRouter, Route, Routes , HashRouter } from 'react-router-dom'
import './App.css'
import Mainapp from './components/mainapp/Mainapp'
import Loginpage from './components/loginPage/Loginpage'
import Registration from './components/Registrationcom/Registration'
import PrivateComponent from './components/privatecomponent/PrivateComponent'
import About from './components/About/About'
import FlowchartDisplay from './components/Flowchartdisplay/FlowchartDisplay'


function App() {


  return (
    <>
      <HashRouter>
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
      </HashRouter>
    </>
  )
}

export default App



import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import PagenotFound from './pages/PagenotFound'
import Footer from './components/Footer'
import { useContext } from 'react'
import { loginResponseContext } from './context/Contextshare'


function App() {
  
  const {loginResponse} = useContext(loginResponseContext)

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/projects' element={loginResponse?<Projects/>:<PagenotFound/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register={true}/>}/>
      <Route path='/dashboard' element={loginResponse?<Dashboard/>:<PagenotFound/>}/>
      <Route path='*' element={<PagenotFound/>}/>



     </Routes>

     <Footer/>
    </>
  )
}

export default App

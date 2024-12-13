import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Loginpage from './Pages/Loginpage.jsx'
import { SnackbarProvider } from 'notistack'
import Homepage from './Pages/Homepage.jsx'
import Userspage from './Pages/Userspage.jsx'
import Profilepage from './Pages/Profilepage.jsx'
import Alluser from './Pages/Alluser.jsx'
const App = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const authtoke = localStorage.getItem("authtoken")
    if (authtoke) {
      if (location.pathname === '/') {
        navigate('/home')
      }
    }else{
      if (location.pathname != '/') {
        navigate('/')
      }
    }
  }, [location.pathname,navigate])
  
  return (
    <SnackbarProvider maxSnack={3}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/message/:id' element={<Userspage />} />
        <Route path='/profileme/:id' element={<Profilepage />} />
        <Route path='/alluserprofile/:id' element={<Alluser />} />
      </Routes>
    </SnackbarProvider>
  )
}

export default App

import ForgetPassword from './Auth/ForgetPassword'
import { Routes, Route } from 'react-router'
import NotFound from './pages/NotFound'
import Layout from './pages/Layout'
import Signup from './Auth/Signup'
import Login from './Auth/Login'

function App() {

  return (
    <>
      <Routes>
        <Route index path='/' element={<Login/>}/>
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path='/admin/*' element={<Layout/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App

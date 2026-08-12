import { Routes, Route } from 'react-router'
import ForgetPassword from './Auth/ForgetPassword'
import Layout from './pages/Layout'
import Signup from './Auth/Signup'
import Login from './Auth/Login'

function App() {

  return (
    <>
      <Routes>
        <Route index path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path='/admin/*' element={<Layout/>}/>
      </Routes>
    </>
  )
}

export default App

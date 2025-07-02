import React, { useContext } from 'react'
import Home from './Home/Home'
import './App.css'
import Header from './Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router'
import AskQN from './Ask/AskQN'
import Signup from './aloginandsignup/signup/Signup'
import Login from './aloginandsignup/login/Login'
import { AuthContext } from './Firebase/uid'
import Viewqn from './viewQN/viewqn'
import Profile from './Profile/Profile'
import Users from './Users/Users'
import Viewuser from './Users/Viewuser/Viewuser'
import { MyContext } from './Firebase/Globelvariable'
import Loading from './Loading/Loading'
import AskAI from './QueryAi/AskAi'



function App() {
  const { uid, user } = useContext(AuthContext);
  const { Questiondata } = useContext(MyContext);
   if (!Questiondata || Questiondata.length === 0) {
    return <Loading />;
  }
  return (
    <div>
{ Questiondata?.length > 0 &&  <Header/>}
   
      
    <Routes>
      <Route path="/" element={<Home />} />
      {uid && <Route path="/Ask" element={<AskQN />} />}
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Viewqn" element={<Viewqn />} />
      {uid && <Route path="/Profile" element={<Profile />} />}
      <Route path="/Users" element={<Users />} />
      <Route path="/Viewuser" element={<Viewuser />} />
       <Route path="/QueryAi" element={<AskAI />} />
      
    </Routes>
  
    </div>
  )
}

export default App

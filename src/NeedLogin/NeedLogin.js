// NeedLogin.jsx
import React from 'react';
import './NeedLogin.css';
import Signup from '../aloginandsignup/signup/Signup';
import { useNavigate } from 'react-router';
import { RxCross2 } from 'react-icons/rx';

function NeedLogin({ onClose }) {

const navigate = useNavigate()

  return (
    <div className="needlogin-overlay">
      <div className="needlogin-box">
       <div className='closediv'>
        <RxCross2 size={20} className='closeicon' onClick={onClose}/>
       </div>

       <p className='needlogintext'>You need to log in to access this feature. Logging in ensures that your actions, such as voting, submitting answers, or interacting with content, are securely linked to your account. Please sign in to continue and enjoy the full functionality of the platform.</p>
      
        <button className='Loginbutton' onClick={()=>{navigate('/Signup')}}>Sign up</button>
        <button className='Loginbutton' onClick={()=>{navigate('/Login')}}>Log in</button>
      </div>
    </div>
  );
}

export default NeedLogin;

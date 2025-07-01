import React, { useState } from 'react'
import './Login.css';
import { auth } from '../../Firebase/Firebase';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import { useNavigate } from 'react-router';
function Login() {
const  navigate = useNavigate()
const [emailvalue,setemailvalue]=useState('')
const [passwordvalue,setpasswordvalue]=useState('')


const [incorrectpasswordoremail,setincorrectpasswordoremail]=useState(false)



const login = (e)=>
{
e.preventDefault()
  
 firebaselogin()

}

const firebaselogin=async()=>
{
 signInWithEmailAndPassword(auth, emailvalue, passwordvalue)
        .then((userCredential) => {
    
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
setincorrectpasswordoremail(true)
        });
}


  return (
    <div className='signupmaindiv'>
      










<form className='QNForm Signupform' onSubmit={login}>
<h2 className='signupheading'>Login</h2>

<p className='inputheading sighuptitile'>Email</p>
<input value={emailvalue} className='Askinput' placeholder='Enter Your Emailid'  onChange={(e)=>{setemailvalue(e.target.value)}} required></input>


<p className='inputheading'>Password</p>
 <input value={passwordvalue} className='Askinput' placeholder='Enter Your Password' onChange={(e)=>{setpasswordvalue(e.target.value)}} required></input>
 
 
 
 {incorrectpasswordoremail&&<p className='inputsubheading incorrrect' >Email or Password is wrong</p>}



<button type='submit'  className='Welcomeaskbutton signupbutton'>Login</button>

</form>

<div className='Askbuttons Signupbuttons'>
   <p className='inputsubheading'>Don’t have an account?</p>
  <button  className='Welcomeaskbutton  Alreadyacc' onClick={()=>{ navigate('/Signup')}}>Sign up</button>
 </div>
    </div>
  )
}

export default Login


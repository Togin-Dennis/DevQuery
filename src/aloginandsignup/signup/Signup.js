import React, { useContext, useState } from 'react'
import './Signup.css';
import { auth, db } from '../../Firebase/Firebase';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router';
import { AuthContext } from '../../Firebase/uid';
import { addDoc, collection } from 'firebase/firestore';
function Signup() {


const navigate = useNavigate()

const [emailvalue,setemailvalue]=useState('')
const [passwordvalue,setpasswordvalue]=useState('')
const [usernamevalue,setusernamevalue]=useState('')

const [emailnotfound,setemailnotfound]=useState(false)
const [incorrectpassword,setincorrectpassword]=useState(false)

const [emailalreadyused,setemailalreadyused]=useState(false)


const signup = (e)=>
{
e.preventDefault()
  const isEmailValid = emailvalue && emailvalue.includes('@gmail.com');
  const isPasswordValid = passwordvalue.length > 8;
  setemailnotfound(!isEmailValid);
  setincorrectpassword(!isPasswordValid);

  if(isEmailValid&&isPasswordValid)
  {
 setemailvalue('')
 setpasswordvalue('')
 setusernamevalue('')
 firebasesignin()
  }
}

const firebasesignin=async()=>
{
  await createUserWithEmailAndPassword(auth, emailvalue, passwordvalue)
        .then((userCredential) => {
          
            const userdata = userCredential.user;
            
                       
          userdata &&  Publicprofilesubmit(userdata)
           
          
        })
        .catch((error) => {
           setemailalreadyused(true)
           
        });
}




    const  Publicprofilesubmit = async (userdata) => {


        try {
            const docRef = await addDoc(collection(db, "Users"), {
                userEmail: userdata.email,
                Uid: userdata.uid,
                CreatedOn: userdata.metadata.creationTime,
                LastLogin: userdata.metadata.lastSignInTime,
                Username:usernamevalue
            });
             navigate('/')

        } catch (e) {
            alert('Profile not created . Please Try Again');
        }
    }






  return (
    <div className='signupmaindiv'>
      










<form className='QNForm Signupform' onSubmit={signup}>
<h2 className='signupheading'>Create your account</h2>

<p className='inputheading sighuptitile'>Email</p>
<input value={emailvalue} className='Askinput signupinput' placeholder='Enter Your Emailid'  onChange={(e)=>{setemailvalue(e.target.value)}} required></input>
 <p className='inputsubheading notfound'>{emailnotfound &&`Not a valid email address.`}</p>

<p className='inputheading'>Password</p>
 <input value={passwordvalue} className='Askinput signupinput' placeholder='Enter Your Password' onChange={(e)=>{setpasswordvalue(e.target.value)}} required></input>
 <p className={incorrectpassword ?'inputsubheading incorrrect':'inputsubheading' }>Must contain 8+ characters</p>

 <p className='inputheading sighuptitile extrapadding'>User Name</p>
 <input value={usernamevalue} className='Askinput signupinput' placeholder='Enter Your Emailid'  onChange={(e)=>{setusernamevalue(e.target.value)}} required></input>
 
 
<button type='submit' className='Welcomeaskbutton signupbutton'>Sign up</button>
 {emailalreadyused&&<p className='inputsubheading incorrrect alreadyexist' >Email already exists</p>}
</form>

<div className='Askbuttons Signupbuttons'>
   <p className='inputsubheading'>Already have an account?</p>
  <button  className='Welcomeaskbutton  Alreadyacc' onClick={()=>{ navigate('/Login')}}>Log in</button>



 </div>
    </div>
  )
}

export default Signup


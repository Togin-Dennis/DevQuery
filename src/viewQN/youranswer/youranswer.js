import React, { useContext, useState } from 'react'
import './youranswer.css'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'
import { AuthContext } from '../../Firebase/uid'
import NeedLogin from '../../NeedLogin/NeedLogin'
import { MyContext } from '../../Firebase/Globelvariable'
function Youranswer({qnid,onSubmit }) {

const [notlogin, setnotlogin] = useState(false);

  const [Description, setDescription] = useState()
  const [Code, setCode] = useState()
  const { uid,user } = useContext(AuthContext);
  const {GetuserAns,Userfulldata} = useContext(MyContext);
   const Anssubmit = async (e) => {
      e.preventDefault()
  
      try {
  
        const DateOnly = new Date().toLocaleDateString();
        const email =user.email
   
        const docRef = await addDoc(collection(db, "Answers"), {
          userEmail:email ,
          Date: DateOnly,
          UserName:Userfulldata[0].Username ,
          Uid: uid,
          Qnid: qnid,
          Description: Description,
          Code: Code,
          Solvedstatus:false,
          
  
        });
        
        alert('Answer Submited');
        GetuserAns()
        setDescription('');
        setCode('');
        onSubmit()
      } catch (e) {
        alert('Answer not Submited');
      }
    }

  return (
    <div className='youranswermaindiv'>
      
    <p className='youranswerheading'>Your Answer</p>

    <form 
     onSubmit={(e) => {
    e.preventDefault();
    if (uid) {
      Anssubmit(e);       
    } else {
      setnotlogin(true); 
    }
  }}
    >


       <p className='inputheading'>Description <span className='inputrequired'>Required</span></p>
          <p className='inputsubheading'>Describe the solution here</p>
          <textarea value={Description} className='Askinput textareabox' placeholder='Detailed explanation of problem' required onChange={(e) => { setDescription(e.target.value) }}></textarea>


          <p className='inputheading'>CodeBox <span className='inputrequired'>Required</span></p>
          <p className='inputsubheading'>Write your specific code here</p>
          <textarea value={Code} className='Askinput textareabox aswercode' placeholder='your code here...' required onChange={(e) => { setCode(e.target.value) }}></textarea>



          <button type="submit" className='Welcomeaskbutton extrapaddingsubmit' >Post your answer</button>
          <p className='thankyou'>Thank you</p>

    </form>

{notlogin &&  <NeedLogin onClose={()=>{setnotlogin(false)}}/>}
    </div>
  )
}

export default Youranswer

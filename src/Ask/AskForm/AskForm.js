import React, { useContext, useState } from 'react'
import './AskForm.css'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../Firebase/Firebase';
import { AuthContext } from '../../Firebase/uid';
import { MyContext } from '../../Firebase/Globelvariable';


function AskForm() {

 const {GetuserQn,Userfulldata} = useContext(MyContext);

 console.log('userrr',Userfulldata);
 
  const { uid,user } = useContext(AuthContext);


  const [Title, setTitle] = useState()
  const [Description, setDescription] = useState()
  const [Code, setCode] = useState()
  const [Tags, setTags] = useState([])
   

  const [Tagvalue, setTagvalue] = useState()

  const qnsubmit = async (e) => {
    e.preventDefault()

    try {

      const DateOnly = new Date().toLocaleDateString();
      const email =user.email

      const docRef = await addDoc(collection(db, "Questions"), {
        userEmail:email ,
        UserName:Userfulldata[0].Username ,
        Date: DateOnly,
        Uid: uid,
        Title: Title,
        Description: Description,
        Code: Code,
        Tags: Tags,

      });
      alert('Question Submited');
      GetuserQn();
      setTitle('');
      setDescription('');
      setCode('');
      setTags([]);
      setTagvalue('')
    } catch (e) {
      alert('Question not Submited');
    }
  }




  return (
    <div className='AskFormmaindiv'>

      <h2 className='AskHeading'>Ask a public question</h2>

      <form className='QNForm' onSubmit={uid && qnsubmit}>

        <div className='Questionsec'>
          <p className='inputheading'>Title <span className='inputrequired'>Required</span></p>
          <p className='inputsubheading'>Be specific and imagine you’re asking a question to another person</p>
          <input value={Title} className='Askinput' placeholder='e.g. Why Div not align center in React' required onChange={(e) => { setTitle(e.target.value) }}></input>


          <p className='inputheading'>Description <span className='inputrequired'>Required</span></p>
          <p className='inputsubheading'>Include all the information someone would need to answer your question</p>
          <textarea value={Description} className='Askinput textareabox' placeholder='Detailed explanation of your question' required onChange={(e) => { setDescription(e.target.value) }}></textarea>


          <p className='inputheading'>CodeBox <span className='inputrequired'>Required</span></p>
          <p className='inputsubheading'>Paste your specific code here</p>
          <textarea value={Code} className='Askinput textareabox' placeholder='Paste your code here...' required onChange={(e) => { setCode(e.target.value) }}></textarea>


          <p className='inputheading'>Tags <span className='inputrequired'>Required</span></p>
          <p className='inputsubheading'>Add up to 5 tags to describe what your question is about</p>


          <input value={Tagvalue} 
          className='Askinput' 
          placeholder='e.g. (React, Flutter, Python) or (React Flutter Python)' 
          required 


          onChange={(e) => { 
            const input =  e.target.value
            setTagvalue(input) 
          
            const tagArray = input.split(/[,\s]+/).slice(0, 5); 
            setTags(tagArray.map(tag => tag.toUpperCase()));
          
          }}
    
          >
          </input>
<div className='tagshow'>
{
  Tags.slice(0,5).map((data, index) => {
    return <p className='Tagbox' key={index}>{data}</p>; // ✅ return the JSX
  })
}

 </div>      



        </div>
        <div className='Askbuttons'>
          <button type="submit" className='Welcomeaskbutton extrapaddingsubmit' >Submit</button>
          <button className='Welcomeaskbutton discardbutton'>Discard question</button>

        </div>


      </form>




    </div>
  )
}

export default AskForm

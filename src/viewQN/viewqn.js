import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import Sidebar from '../Home/Home components/Sidebar/Sidebar';
import './viewqn.css'
import Rightside from '../Home/Home components/Homepage/Rightside/Rightside';
import Youranswer from './youranswer/youranswer';


import fetchfirebasedb from '../Firebase/Read';
import Answersview from './Answersview/Answersview';
import { AuthContext } from '../Firebase/uid';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import { MyContext } from '../Firebase/Globelvariable';
import Loading from '../Loading/Loading';
import AnswerGuide from './AnswerGuide/AnswerGuide';


function Viewqn() {
const navigate =useNavigate()
const { uid, user } = useContext(AuthContext);
    const {GetuserQn} = useContext(MyContext);

const [userdata,setuserdata]=useState()

  const location = useLocation();
  const { data } = location.state || {};
  
  const [answers,setanswers]=useState()

 const getData = async () => {
     const answers = await fetchfirebasedb("Answers", [["Qnid", "==", data.id]]);
     setanswers(answers)
    };
  


useEffect(
  ()=>{
    getData();

  },[data]
)




const deleteqnandans = async (data) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this question?");
  if (!confirmDelete) return;

  await deleteDoc(doc(db, "Questions", data.id));
  alert("Question deleted.");
 navigate('/')
};


const viewuserdata = async (datauid) => {
  const [userData] = await fetchfirebasedb("Users", [["Uid", "==", datauid]]);
  const [questions, answers] = await Promise.all([
    fetchfirebasedb("Questions", [["Uid", "==", datauid]]),
    fetchfirebasedb("Answers", [["Uid", "==", datauid]])
  ]);

  const combinedData = {
    ...userData,
    questionCount: questions.length,
    answerCount: answers.length,
    questions,
    answers
  };


  return combinedData;
};





  return (
    <div className='ViewQnmaindiv'>
      

  <Sidebar/>



<div className='viewQuestionsection'>
    <h1 className='qnviewheading'>{data.Title}</h1>
     <div className='qnuserwrapper'>
      <p className='qnviewAskedon'>Asked on {data.Date}</p>
      <p className='UploaderName userhover'
      onClick={async () => {
    if (uid === data.Uid) {
      navigate('/Profile');
    } else {
  const fetchedUser = await viewuserdata(data.Uid); 
  navigate('/Viewuser', { state: { user: fetchedUser } });
}
  }}
      >{data?.UserName?.slice(0, 20) || "Unknown User"}</p>
      </div>
    
     <p className='qnviewdescription'>{data.Description}</p>

  
<div className='qnviewcodediv'>

 <pre className='qnviewcode'>
  <code>{data.Code}</code>
</pre>


</div>
<div className='dleteandtagdiv'>

<div className='qnviewtagwrapper'>
{
  data.Tags.map(
    (datatag)=>{
      return <p className='qnviewTag'>{datatag}</p>
    }
  )
}
</div>

{data.Uid == uid && <button className='Deletebutton'  onClick={()=>{
  deleteqnandans(data)
  GetuserQn()

}}>Delete</button>}

</div>

<Answersview  ansdata={answers} qndata={data}/>






<Youranswer qnid={data.id}   onSubmit={getData}/>




</div>








  <AnswerGuide/>




    </div>

  )
}

export default Viewqn

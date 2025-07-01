import React, { useContext, useEffect, useState} from 'react'
import './QNshow.css'

import { MyContext } from '../../../../../Firebase/Globelvariable';
import { useNavigate } from 'react-router';
import fetchfirebasedb from '../../../../../Firebase/Read';

function QNshow() {





const navigate =useNavigate()

  const Solve = true;


const { Questiondata,qnpagefilter } = useContext(MyContext);

const [answerMap, setAnswerMap] = useState({});


  // 🔁 Fetch all answers once and group by Qnid
  useEffect(() => {
    const getAllAnswers = async () => {
      const allAnswers = await fetchfirebasedb("Answers");
      const map = {};
      

      allAnswers.forEach(ans => {
        const qid = ans.Qnid;
        if (!map[qid]) map[qid] = [];
        map[qid].push(ans);
      });

      setAnswerMap(map);
    };

    getAllAnswers();
  }, []);





const qnbody = (data,isSolved,answerCount) =>
{
  return <div className='QNshowMainDiv' onClick={()=>{ navigate('/Viewqn', { state: { data } });}}>
      <div className='Qninfo'>
        <p className='Solved'>{answerCount} answers</p>
        {isSolved && <p className='Solved solve'>Solved</p>}
        {!isSolved && <p className='Solved Unsolve'>Unsolved</p>}
      </div>
      <div className='Question'>

        <p className='QnHeading'>{data.Title}</p>
        <p className='Qnsubheading'>{data.Description}</p>


            <div className='TagsandUploaddetails'>

            <div className='Tagswrapper'>


{
  data.Tags.slice(0,3).map(
    (tag)=>{
      return <p className='Tag'>{tag}</p>

      }
  )
}

          </div>

          <div className='Uploaddetails'>

            <p className='UploaderName' >{data.UserName.slice(0,14)}</p>

            <p className='Uploaddate'>Asked on {data.Date}</p>

          </div>
        </div>

      </div>
    </div>
}









  return (

<>
{ Array.isArray(Questiondata) && Questiondata.sort((a, b) => new Date(b.date) - new Date(a.date)).map((data, index)=>
{
const answerCount = answerMap[data.id]?.length || 0;
const answers = answerMap[data.id] || [];

const isSolved = answers.some(ans => ans.Solvedstatus)


   return <>
   
   {qnpagefilter=='Newest' && qnbody(data,isSolved,answerCount)}

   {(qnpagefilter=='Active' && !isSolved) &&qnbody(data,isSolved,answerCount)}

   {(qnpagefilter=='Unans' && answerCount==0) &&qnbody(data,isSolved,answerCount)}

   </>
}

)  
}
    </>
  )
}

export default QNshow

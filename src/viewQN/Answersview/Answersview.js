import React, { useContext, useEffect, useState } from 'react'
import './Answersview.css'
import { FaCheck } from 'react-icons/fa'
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'
import { AuthContext } from '../../Firebase/uid'
import fetchfirebasedb from '../../Firebase/Read'
import NeedLogin from '../../NeedLogin/NeedLogin'
import { useNavigate } from 'react-router'




function Answersview({ ansdata, qndata }) {

const navigate =useNavigate()
    const { uid, user } = useContext(AuthContext);

const [voteCounts, setVoteCounts] = useState({});

const [notlogin, setnotlogin] = useState(false);

const [userpointup, setuserpointup] = useState();

console.log('ansdata',ansdata)


    const Solvedsubmit = async (data, Solvedstatusvalue) => {

        const ref = doc(db, "Answers", data.id);

        await updateDoc(ref, {
            Solvedstatus: !Solvedstatusvalue,

        });

    };


    const getData = async (data, pointdb) => {
        const answers = await fetchfirebasedb(pointdb, [
            ["Uid", "==", uid],
            ["Ansid", "==", data.id]
        ]);
        
        return answers.length === 0;  // true if not voted yet
    };

  const DeleteData = async (data, pointdb) => {
        const answers = await fetchfirebasedb(pointdb, [
            ["Uid", "==", uid],
            ["Ansid", "==", data.id]
        ]);
        
        for (const ans of answers) {
    await deleteDoc(doc(db, pointdb, ans.id));  
  }
    };



    const Pointsubmit = async (data, operation ) => {

        const ref = doc(db, "Answers", data.id);

        await updateDoc(ref, operation ? { Point: data.Point + 1 } : { Point: data.Point - 1 });
      

    };


    const Pointuid = async (data, pointdb) => {
        try {

            const docRef = await addDoc(collection(db, pointdb), {

                Ansid: data.id,
                Uid: uid

            });

        } catch (e) {
            alert('Vote not Submited');
        }
    }



    
const fetchAllVoteCounts = async () => {
  const counts = {};

  for (const ans of ansdata) {
    const up = await fetchfirebasedb("Pointup", [["Ansid", "==", ans.id]]);
    const down = await fetchfirebasedb("PointDown", [["Ansid", "==", ans.id]]);
    counts[ans.id] = up.length - down.length;
   
  up.map(
    (data)=>
    {
     if(data.Uid==uid)
     {
        setuserpointup(true)
     }
    }
  )
 down.map(
    (data)=>
    {
     if(data.Uid==uid)
     {
        setuserpointup(false)
     }
    }
  )
  }

  setVoteCounts(counts);
};



useEffect(() => {
  if (ansdata?.length > 0) {
    fetchAllVoteCounts();
  }
}, [ansdata]);



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
        <div className='Answersviewmaindiv'>

            {
                ansdata?.map(




                    (data, index) => {

                        const Solvedstatusvalue = data.Solvedstatus
                         

                     

                        return <div key={data.id} className='ansmaindivwrapper'>

                            <div className='ANSPointAndTikdiv'>
                                <div className='anspoint'>

                                    <BsArrowUpCircle size={35} className={userpointup?'selectedpoint':'pointicon'}

                                        onClick={uid ?  async () => {
                                            const canVote = await getData(data, "Pointup");
                                             DeleteData(data ,"PointDown")
                                            if (canVote) {
                                                await Pointsubmit(data, true);
                                                await Pointuid(data, "Pointup");
                                                fetchAllVoteCounts()
                                            }
                                        }:()=>{setnotlogin(true)}}


                                   />
                                    <p className='pointtext'>{voteCounts[data.id] ?? '0'}</p>




                                    <BsArrowDownCircle size={35} className={!userpointup?'selectedpoint':'pointicon'}

                                        onClick={uid ?  async () => {
                                            const canVote = await getData(data, "PointDown");
                                             DeleteData(data ,"Pointup")
                                            if (canVote) {
                                                await Pointsubmit(data, false);
                                                await Pointuid(data, "PointDown");
                                                fetchAllVoteCounts()
                                            }
                                        }:()=>{setnotlogin(true)}
                                    }

                                    />
                                </div>

                                <FaCheck size={29} className={!Solvedstatusvalue ? 'tikicon' : 'tikiconsolved'} onClick={qndata.Uid == uid ? (() => Solvedsubmit(data, Solvedstatusvalue)) : undefined} />
                            </div>

                            <div className='fullansdiv'>
                                <p className='youranswerheading'>Answer {index + 1} </p>

                                <p className='qnviewdescription'>{data.Description}</p>
                                <div className='qnviewcodediv'>

                                    <pre className='qnviewcode'>
                                        <code>{data.Code}</code>
                                    </pre>

                                </div>

                                <div className='ansviewuserdetailwrapper'>
                                    <p className='qnviewAskedon ansviewansdate'>Answered on {data.Date}</p>
                                    <p className='UploaderName userhover'
                                    
                                     onClick={async () => {
    if (uid === data.Uid) {
      navigate('/Profile');
    } else {
  const fetchedUser = await viewuserdata(data.Uid); 
  navigate('/Viewuser', { state: { user: fetchedUser } });
}
  }}
                                    
                                    >{data.UserName.slice(0, 20)}</p>


                                </div>
                            </div>
                        </div>
                    }
                )
            }

{notlogin &&  <NeedLogin onClose={()=>{setnotlogin(false)}}/>}

        </div>
    )
}

export default Answersview

import React, { useContext, useEffect, useState } from 'react'


import { FaBirthdayCake, FaUserClock } from 'react-icons/fa';

import { useLocation, useNavigate } from 'react-router';
import { db } from '../../Firebase/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import Sidebar from '../../Home/Home components/Sidebar/Sidebar';
import { MdEmail } from 'react-icons/md';


import SupportiveBadge from '../../Badges/SupportiveBadge';

import SupportiveBudgeimage from '../../assets/SupportiveBudge.png'
import QusestionBadge from '../../assets/QusestionBadge.png'
function Viewuser() {

    const navigate = useNavigate()


    const location = useLocation();
const { user = {} } = location.state || {};
const uid = user?.Uid || "";
const userqndata = user?.questions || [];
const useransdata = user?.answers || [];

console.log('ss',user)




    const Getansqn = async (datas) => {

        const ref = doc(db, "Questions", datas.Qnid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            const data = { id: snap.id, ...snap.data() };
            navigate('/Viewqn', { state: { data } });
        } else {
            alert("Question not found.");
        }


    };




    return (
        <div className='profilemaindiv'>
            <Sidebar />








            <div className='profileinfodiv'>

                <div className='profilepicandnamediv'>
                    <img className='profilepicture' src="https://www.gravatar.com/avatar/faa62a2080cb2e1b71ae4815b51c6bcf?s=256&d=identicon&r=PG&f=y&so-version=2" alt="" />

                    <div className='profileemailandcreatedtime'>
                          <p className='profileuseremail'>{user.Username}</p>
                        <div className='profiletimes'>
                            <div className='Timeandicon'>
                                <FaBirthdayCake className='profiletimeicons' />
                                <p className='profileuserCreatedtime'>Created on {user.CreatedOn}</p>
                            </div>

                            <div className='Timeandicon'>
                                <FaUserClock className='profiletimeicons' />
                                <p className='profileuserCreatedtime'>Last Login {user.LastLogin}</p>
                            </div>
   <div className='Timeandicon'>
                                   <MdEmail className='profiletimeicons' />
                                    <p className='profileuserCreatedtime'>Email {user.userEmail}</p>
                               </div>

                        </div>
                    </div>
                </div>



                <div className='profilecontentdiv'>

                    <div className='statsdiv'>
                        <p className='Statsheading'>Stats</p>
                        <div className='statbox'>

                            <div>
                                <p className='statpoint'>{user.questionCount}</p>
                                <p className='stattext'>question</p>
                            </div>

                            <div>
                                <p className='statpoint'>{user.answerCount}</p>
                                <p className='stattext'>answer</p>
                            </div>

                        </div>

                        <div className='statbox'>

                            <div>
                                <p className='statpoint'>Level </p>
                            </div>
                            <div>
                                <p className='statpoint levelpoint'>{Math.floor(userqndata.length / 2) + useransdata.length}</p>
                            </div>

                        </div>

                    </div>



                    <div className='contentshowdiv'>


<div>
     <p className='contentheading'>Badges</p>

<div className='BadgesDiv'>
    
             
            {useransdata.length>0 &&   <SupportiveBadge Badgeimage={SupportiveBudgeimage}  Badgename='Helping Hand'   />}
                  {userqndata.length>0 &&   <SupportiveBadge Badgeimage={QusestionBadge}  Badgename='Fresh Voice'   />}

      
                  {useransdata.length>10 &&   <SupportiveBadge Badgeimage={SupportiveBudgeimage}  Badgename='Guiding Voice'   />}
                  {userqndata.length>10 &&   <SupportiveBadge Badgeimage={QusestionBadge}  Badgename='Level-Up Asker'   />}


                  {useransdata.length>20 &&   <SupportiveBadge Badgeimage={SupportiveBudgeimage}  Badgename='Knowledge Beacon'   />}
                  {userqndata.length>20 &&   <SupportiveBadge Badgeimage={QusestionBadge}  Badgename='The Grand Asker'   />}


</div>
</div>


                        <div>
                            <p className='contentheading'>Questions</p>
                            {
                                userqndata.length == 0 && <div className='userqnshow deleteextradiv'>
                                    <p>You didn't Ask a question earlier.</p>
                                </div>}
                            {
                                userqndata.map(

                                    (data,index) => {
                                         return <div className='userqnshowwrapper'>
                                            <p className='searchresultindex userqnindex'>{index + 1}</p>
                                            <p className='userqnshow' onClick={() => { navigate('/Viewqn', { state: { data } }); }}>{data.Title}</p>

                                        </div>




                                    }
                                )
                            }
                        </div>

                        <div>
                            <p className='contentheading'>Answers</p>
                            {
                                useransdata.length == 0 && <div className='userqnshow deleteextradiv'>
                                    <p>You didn't Ask a question earlier.</p>
                                </div>}
                            {
                                useransdata.map(

                                    (data,index) => {
                                       return <div className=' deleteextradiv'>

                                            <div className='userqnshowwrapper useransshowwrapper'>
                                                <p className='searchresultindex userqnindex'>{index + 1}</p>
                                                <p className='userqnshow'
                                                    onClick={() => {
                                                        Getansqn(data)

                                                    }}>{data.Description}</p>
                                                  
                                            </div>



                                         
                                        </div>







                                    }
                                )
                            }

                        </div>


                    </div>
                </div>

            </div>


        </div>
    )
}

export default Viewuser

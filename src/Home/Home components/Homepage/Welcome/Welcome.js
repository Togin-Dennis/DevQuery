import React, { useContext } from 'react'
import { MdWavingHand } from 'react-icons/md'
import './Welcome.css'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../../../Firebase/uid';
import { MyContext } from '../../../../Firebase/Globelvariable';
function Welcome() {
 const { uid, user } = useContext(AuthContext);
 const {Userfulldata } = useContext(MyContext);
    const navigate =useNavigate()
  return (
     <div className='Welcomwrapper'>
                <div className='Welcomemessagediv'>

                    <MdWavingHand size={50} className='welcomeicon' />
                    <div className='welcometextsdiv'>
                        <h2 className='Welcomeheading'>Welcome back, {Userfulldata?Userfulldata[0].Username.slice(0,18):'User'}</h2>
                        <p className='Welcomesubheading'>Find answers to your technical questions and help others answer theirs.</p>
                    </div>

                </div>

                <button className='Welcomeaskbutton' onClick={()=>{uid?navigate('/Ask'):navigate('/Login')}}>Ask Questions</button>

            </div>
  )
}

export default Welcome

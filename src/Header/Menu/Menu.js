import React, { useContext } from 'react'
import { FaBookmark, FaCode, FaHome, FaQuestion, FaRobot, FaTags, FaUser, FaUsers } from 'react-icons/fa'
import { MdEmail, MdOutlineQuestionAnswer, MdTag } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../Firebase/uid'
import { MyContext } from '../../Firebase/Globelvariable'
import './Menu.css'
function Menu() {

const navigate = useNavigate()
 const { uid, user } = useContext(AuthContext);
 const { Sidebarselected, setSidebarselected,setMenushow } = useContext(MyContext);
  return (
    <div className='Sidebarmaindiv Menubarmaindiv'>
      
     
     <div className={Sidebarselected=='Home'?'sidebarpages sidebarselected':'sidebarpages'} onClick={()=>{navigate('/')
        setSidebarselected('Home')
         setMenushow(false)
     }}>
         <FaHome size={17}/>
         <p className='siderbarpagename'>Home</p>
     </div>

     <div className={Sidebarselected=='Users'?'sidebarpages sidebarselected':'sidebarpages'} onClick={()=>{navigate('/Users')
         setSidebarselected('Users')
          setMenushow(false)
     }}>
         <FaUsers  size={17}/>
         <p className='siderbarpagename' >Users</p>
     </div>


   <div className={Sidebarselected=='Profile'?'sidebarpages sidebarselected':'sidebarpages'}  onClick={
    uid?()=>{navigate('/Profile')
         setSidebarselected('Profile')
         setMenushow(false)
   }:()=>{
navigate('/Login')
        
   }}>
         <FaUser  size={15}/>
         <p className='siderbarpagename'>Profile</p>
     </div>


   <div className={Sidebarselected=='AI'?'sidebarpages sidebarselected':'sidebarpages'}  onClick={
    uid?()=>{navigate('/QueryAi')
         setSidebarselected('AI')
setMenushow(false)
   }:()=>{
navigate('/Login')
        
   }}>
         <FaRobot  size={15}/>
         <p className='siderbarpagename'>QueryAI</p>
     </div>

  <div className={Sidebarselected=='Ask'?'sidebarpages sidebarselected':'sidebarpages'}  onClick={uid?()=>{navigate('/Ask')
     setMenushow(false)
     setSidebarselected('Ask')
  }:()=>{navigate('/Login')
     setMenushow(false)
     
  }}>
         <FaUser  size={15}/>
         <p className='siderbarpagename'>Ask Question</p>
     </div>



     <div className='sidebarpages'
     onClick={async()=>{
       await setMenushow(false)
        window.open("https://example.com", "_blank");}}
     >
         <FaCode size={17}/>
         <p className='siderbarpagename'>Code</p>
     </div>



     <div className='sidebarpages'  
      onClick={async()=>{
        await setMenushow(false)
        window.location.href = "mailto:tcodeappscust@gmail.com?subject==";
       
      }}
     >
         <MdEmail size={15}/>
         <p className='siderbarpagename'>E Mail</p>
     </div>



    </div>
  )
}

export default Menu

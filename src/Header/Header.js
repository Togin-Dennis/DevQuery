import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import { MdClose, MdEmojiEvents, MdMenu } from 'react-icons/md';
import { MdHelpCenter } from 'react-icons/md';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { useNavigate } from 'react-router';
import uid, { AuthContext } from '../Firebase/uid';
import { MyContext } from '../Firebase/Globelvariable';
import DevQuotesLogo from '../assets/DevQuotesLogo.png'
import DevQuotesLogoMobile from '../assets/DevQuotesLogoMobile.png'
import Sidebar from '../Home/Home components/Sidebar/Sidebar';
import Menu from './Menu/Menu';
import { FaSearch } from 'react-icons/fa';
function Header() {

const { Sidebarselected, setSidebarselected, Menushow, setMenushow,Searchshow, setSearchshow} = useContext(MyContext);

 const [Login,setlogin]=useState(false)
 const [Searchinputdata,setSearchinputdata]=useState('')

const navigate =useNavigate()

const { userqndata,useransdata } = useContext(MyContext);
const { uid, user } = useContext(AuthContext);

const { Questiondata } = useContext(MyContext);




const filteredDocs = (Questiondata || []).filter((doc) => {
  const input = Searchinputdata.toLowerCase();
  const titleMatch = doc.Title?.toLowerCase().includes(input);
  const tagMatch = doc.Tags?.some(tag =>
    tag.toLowerCase().includes(input)
  );
  return titleMatch || tagMatch;
});







useEffect(()=>{

      uid ? setlogin(true):setlogin(false)
  
    }, [user])


    return (
        <div className='Headermaindiv'>
 <div className='Headerfirstwrapper'>
  
          <div className='headersidebarwrapper'>
             {!Menushow ? <MdMenu className='Headericons Headericonanimaton' size={22}  onClick={()=>{setMenushow(true)}}/>:
              <MdClose className='Headericons Headericonanimaton' size={22}  onClick={()=>{setMenushow(false)}}/>}
               { Menushow &&    <div className='Headersidebar '>
              <Menu />
           </div>}
          </div>




            <img className='HeaderLogo' src={DevQuotesLogo} alt="" onClick={()=>{
              setSidebarselected('Home')
              navigate('/')
              
            }}/>
            <img className='HeaderLogoMobile' src={DevQuotesLogoMobile} alt="" onClick={()=>{
              setSidebarselected('Home')
              navigate('/')
              
            }}/>
            <button className='HeaderButtons' 
            onClick={()=>{
              setSidebarselected('Users')
              navigate('/Users')}}
            >Users</button>
            <button className='HeaderButtons'  
            onClick={()=>{
              setSidebarselected('AI')
              navigate('/QueryAi')
              
            }}
            >QueryAI</button>



 </div>

  <div className='Searchwrapper' >

            <input value={Searchinputdata} className='Searchinput' placeholder='Search Questions or Keywords' 
            onChange={(e)=>{setSearchinputdata(e.target.value)}}></input>

{ Searchinputdata &&  <div className='Searchresults'>

{filteredDocs==0 && <div className='searchresultbox'>

<p className='searchresulttitle'>No Data Available</p>

</div>}


{

filteredDocs.map(
(data,index)=>{

   return <div className='searchresultbox' onClick={()=>{ 
    navigate('/Viewqn', { state: { data } });
    setSearchinputdata('')
    
    }}>

<p className='searchresultindex'>{index+1}</p>
<p className='searchresulttitle'>{data.Title}</p>

   </div>

   
}
)


}



          </div>}


      </div>
      
      
      <div className='Headerfirstwrapper Headersecondwrapper'>

{!Searchshow ?  <FaSearch className='Headericons Headersearchicon Headericonanimaton' size={19} onClick={()=>{setSearchshow(true)}}/>
  :<MdClose className='Headericons Headericonanimaton' size={22}  onClick={()=>{setSearchshow(false)}}/>}

{Searchshow && <div className='Searchwrapper Searchwrappertwo' >

            <input value={Searchinputdata} className='Searchinput Searchinputtwo' placeholder='Search Questions or Keywords' 
            onChange={(e)=>{setSearchinputdata(e.target.value)}}
            
            ></input>

{ Searchinputdata &&  <div className='Searchresults Searchresultstwo'>

{filteredDocs==0 && <div className='searchresultbox searchresultboxtwo'>

<p className='searchresulttitle'>No Data Available</p>

</div>}


{

filteredDocs.map(
(data,index)=>{

   return <div className='searchresultbox' onClick={()=>{ 
    setSearchshow(false)
    navigate('/Viewqn', { state: { data } });
    setSearchinputdata('')
    
    }}>

<p className='searchresultindex'>{index+1}</p>
<p className='searchresulttitle'>{data.Title}</p>

   </div>

   
}
)


}



          </div>}


      </div>}






             { 
    Login&&
    <>
     <div className='HeaderProfileWrapper' onClick={()=>{
      setSidebarselected('Profile')
      navigate('/Profile')}}>
                <img className='Headerprofilepic' src="https://www.gravatar.com/avatar/faa62a2080cb2e1b71ae4815b51c6bcf?s=256&d=identicon&r=PG&f=y&so-version=2" alt="" />
                    
                <div className='pointwrapper'>
                    <div className='pointonediv'></div>
                    <p className='Headerprofilepoint '>{userqndata.length}</p>
                </div>

                <div className='pointwrapper'>
                    <div className='pointonediv pointtwodiv'></div>
                    <p className='Headerprofilepoint pointtwo'>{useransdata.length}</p>
                </div>

                
   
            </div>

            <div className='icontrofydiv'> <MdEmojiEvents className='Headericons Headericontrofy' size={25}/>
          
            <div className='Headerlevel'>

      <div className='statbox headerlevelbox'>

                           <div>
                             <p className='statpoint'>Level </p>
                           </div>
                            <div>
                             <p className='statpoint levelpoint'>{Math.floor(userqndata.length / 2) + useransdata.length}</p>
                           </div>
                            
                        </div>

</div>
            </div>

             <MdHelpCenter className='Headericons' size={25}
             onClick={()=>{window.location.href = "mailto:tcodeappscust@gmail.com?subject==";}}  />



       







    </>
}
      </div>
      


{    
    
    !Login&& <div className='HeaderLoginAndsignup'>

     
     <button className='headerloginbutton' onClick={()=>{navigate('/Login')}}>Log in</button>
      <button className='headerloginbutton signupheader' onClick={()=>{navigate('/Signup')}}>Sign up</button>


    </div>
    }



        </div>
    )
}

export default Header

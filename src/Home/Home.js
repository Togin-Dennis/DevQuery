import React, { useContext } from 'react'
import Sidebar from './Home components/Sidebar/Sidebar'
import './Home.css'
import Homepage from './Home components/Homepage/Homepage'
import Rightside from './Home components/Homepage/Rightside/Rightside'
import { MyContext } from '../Firebase/Globelvariable'

function Home() {
   const {setMenushow,setSearchshow } = useContext(MyContext);
  return (
 
      
<div className='Homemaindiv' onClick={()=>{setMenushow(false)
  setSearchshow(false)
}}>
   <Sidebar />
   <Homepage />
   <Rightside />
</div>



  )
}

export default Home

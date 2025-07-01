import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../Home/Home components/Sidebar/Sidebar';
import './Users.css';
import fetchfirebasedb from '../Firebase/Read';
import { useNavigate } from 'react-router';
import { MyContext } from '../Firebase/Globelvariable';
import { AuthContext } from '../Firebase/uid';
import Loading from '../Loading/Loading';

function Users() {

  const navigate =useNavigate()
 
   const [Searchinputdata,setSearchinputdata]=useState('')


const { Userslist, setUserslist} = useContext(MyContext);

const { uid } = useContext(AuthContext);



  const GetuserDatas = async () => {
    const allUsers = await fetchfirebasedb("Users");

    const usersWithDetails = await Promise.all(
      allUsers.map(async (user) => {
        const [qns, ans] = await Promise.all([
          fetchfirebasedb("Questions", [["Uid", "==", user.Uid]]),
          fetchfirebasedb("Answers", [["Uid", "==", user.Uid]])
        ]);

        return {
          ...user,
          questionCount: qns.length,
          answerCount: ans.length,
          questions: qns,
          answers: ans,
     
        };
      })
    );

    setUserslist(usersWithDetails);
  };

  useEffect(() => {
    GetuserDatas();
  }, []);




const filteredDocs = (Userslist || []).filter((doc) => {
  const input = Searchinputdata.toLowerCase();
  const titleMatch = doc.userEmail?.toLowerCase().includes(input);

  return titleMatch ;
});

console.log(filteredDocs)


   if (!Userslist || Userslist.length === 0) {
    return <Loading/>;
  }



  return (
    <div className='Usersmaindiv'>
      <Sidebar />

      <div className='Userscontentdiv'>
        <p className='Usersheading'>Users</p>
        <input className='Searchinput Searchuser' placeholder='Search User' 
        onChange={(e)=>{setSearchinputdata(e.target.value)}}
        />

        <div className='Userboxgrid'>
          {filteredDocs.map((user) => (
            <div className='Userbox' key={user.Uid} 
 onClick={uid == user.Uid ? ()=>{navigate('/Profile')} :() => navigate('/Viewuser', { state: { user } })}>
              <p className='Useremail'>{user.Username}</p>

            <div className='countdiv'>
                <p className='qnCount'>Q.N   <span className='Counthighlight'>{user.questionCount}</span></p>
              <p  className='qnCount'>ANS   <span className='Counthighlight'>{user.answerCount}</span></p>
            </div>

             

              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;

import React, { useEffect, useState, createContext, useContext } from 'react';

import fetchfirebasedb from './Read';
import { AuthContext } from './uid';

export const MyContext = createContext();



export const MyContextProvider = ({ children }) => {

  const { uid, user } = useContext(AuthContext);
  const [qnpagefilter, setqnpagefilter] = useState('Newest')
  const [Sidebarselected, setSidebarselected] = useState('Home')

  const [userqndata, setuseqndata] = useState([])
  const [useransdata, setuseransdata] = useState([])
  const [Userslist, setUserslist] = useState([]);
  const [Questiondata, setQuestiondata] = useState()
  const [Userfulldata, setUserfulldata] = useState()

    const [Menushow, setMenushow] = useState(false)
    const [Searchshow, setSearchshow] = useState(false)
   


  const GetuserQn = async () => {
    if (!uid) return;
    const allqn = await fetchfirebasedb("Questions", [["Uid", "==", uid]]);
    setuseqndata(allqn);

  };

  const GetuserAns = async () => {
    if (!uid) return;
    const allans = await fetchfirebasedb("Answers", [["Uid", "==", uid]]);
    setuseransdata(allans);

  };


  useEffect(() => {


    const getData = async () => {
      const firebasedata = await fetchfirebasedb("Questions");
      setQuestiondata(firebasedata);
    };


    const Getuserfulldata = async () => {
      if (!uid) return;
      const Userfulldata = await fetchfirebasedb("Users", [["Uid", "==", uid]]);
      setUserfulldata(Userfulldata);

    };



    Getuserfulldata()
    GetuserAns()
    GetuserQn()
    getData();
  }, [uid]);



  return (
    <MyContext.Provider value={{
      Questiondata, setqnpagefilter, qnpagefilter, userqndata, setuseqndata,
      useransdata, setuseransdata, Userslist, setUserslist,
      Userfulldata, GetuserAns, GetuserQn, Sidebarselected, setSidebarselected,
      Menushow, setMenushow,Searchshow, setSearchshow
    }}>
      {children}
    </MyContext.Provider>
  );
};
import React, { useContext, useState } from 'react'
import './Questiontype.css'
import { MyContext } from '../../../../../Firebase/Globelvariable';
function Questiontype() {
      
      const { setqnpagefilter,qnpagefilter } = useContext(MyContext);
  return (
  
      <div className='Questiontype'>

        {qnpagefilter == "Newest" && <h2 className='Questiontypeheading'>Newest Questions</h2>}

        {qnpagefilter == "Active" && <h2 className='Questiontypeheading'>Recently Active Questions</h2>}


        {qnpagefilter == "Unans" && <h2 className='Questiontypeheading'>Unanswered Questions</h2>}

        <div className='Qntypebuttonsdiv'>

          <button className={qnpagefilter == "Newest" ? 'QNTypeButton QnTypeSelected' : 'QNTypeButton'} onClick={() => { setqnpagefilter('Newest') }} >Newest</button>
          <button className={qnpagefilter == "Active" ? 'QNTypeButton QnTypeSelected' : 'QNTypeButton'} onClick={() => { setqnpagefilter('Active') }}>Active</button>
          <button className={qnpagefilter == "Unans" ? 'QNTypeButton QnTypeSelected' : 'QNTypeButton'} onClick={() => { setqnpagefilter('Unans') }}>Unanswered</button>

        </div>
      </div>

  )
}

export default Questiontype

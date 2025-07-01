import React from 'react'
import './AskQN.css'
import AskForm from './AskForm/AskForm'
import AskGuide from './AskGuide/AskGuide'
function AskQN() {
  return (
    <div className='Askmaindiv'>
      <AskForm/>
      <AskGuide/>
    </div>
  )
}

export default AskQN

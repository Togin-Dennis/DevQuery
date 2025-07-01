import React from 'react'
import './SupportiveBadge.css'

function SupportiveBadge({Badgeimage,Badgename}) {
  return (
    <div className='Badgemaindivs'>
      
<div className='Badgebox'>
    <img className='Badgeimage'  src={Badgeimage}></img>
    <p className='BadgeName'>{Badgename}</p>
</div>


    </div>
  )
}

export default SupportiveBadge

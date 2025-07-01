import React from 'react'
import './AskGuide.css'
function AskGuide() {
  return (
    <div className='AskGuidemaindiv'>
      

  <h5 className='Guideheading'>Step 1: Draft your question</h5>
  <p className='Guideparagraph'>The community is here to help you with specific coding, algorithm, or language problems.
<br/><br/>
Avoid asking opinion-based questions.</p>


<h5 > <span className='GuideSubheadingnumber'>1.</span><span className='GuideSubheading'>Summarize the problem</span></h5>

 <p className='Guideparagraph bulletspadd'>•&nbsp;&nbsp;&nbsp;&nbsp;Include details about your goal
<br/><br/>
•&nbsp;&nbsp;&nbsp;&nbsp;Describe expected and actual results
<br/><br/>
•&nbsp;&nbsp;&nbsp;&nbsp;Include any error messages
</p>



<h5 > <span className='GuideSubheadingnumber'>2.</span><span className='GuideSubheading'>Describe what you’ve tried</span></h5>

 <p className='Guideparagraph bulletspadd'>Show what you’ve tried and tell us what you found (on this site or elsewhere)
   and why it didn’t meet your needs. You can get better answers when you provide research.
</p>



<h5 > <span className='GuideSubheadingnumber'>3.</span><span className='GuideSubheading'>Show some code</span></h5>

 <p className='Guideparagraph bulletspadd'>When appropriate, share the minimum amount of code others need to reproduce your 
  problem (also called a minimum, reproducible example)
</p>




    </div>
  )
}

export default AskGuide

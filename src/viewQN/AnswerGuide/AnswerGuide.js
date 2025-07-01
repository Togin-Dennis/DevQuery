import React from 'react'
import './AnswerGuide.css'
function AnswerGuide() {

  return (
    <div className='AnswerGuidemaindiv'>
      

  <h5 className='Guideheading'>Step 1: Draft your Answer</h5>
  <p className='Guideparagraph'>The community values answers that clearly solve the problem and help others facing similar coding issues.
<br/><br/>
Avoid giving opinion-based answers—focus on factual, verifiable solutions.</p>


<h5 > <span className='GuideSubheadingnumber'>1.</span><span className='GuideSubheading'>Understand the problem clearly</span></h5>

 <p className='Guideparagraph bulletspadd'>•&nbsp;&nbsp;&nbsp;&nbsp;Know the user’s goal
<br/><br/>
•&nbsp;&nbsp;&nbsp;&nbsp;Note expected vs. actual results
<br/><br/>
•&nbsp;&nbsp;&nbsp;&nbsp;Check error messages
</p>



<h5 > <span className='GuideSubheadingnumber'>2.</span><span className='GuideSubheading'>Build on what’s tried</span></h5>
 <p className='Guideparagraph bulletspadd'>•&nbsp;&nbsp;&nbsp;&nbsp;Review what the user already attempted
<br/><br/>
•&nbsp;&nbsp;&nbsp;&nbsp;Avoid repeating failed solutions
<br/><br/>
•&nbsp;&nbsp;&nbsp;&nbsp;Add new insights or better approaches
</p>




<h5 > <span className='GuideSubheadingnumber'>3.</span><span className='GuideSubheading'>Share helpful code</span></h5>

 <p className='Guideparagraph bulletspadd'>Explain the problem briefly, then provide clean, minimal code that directly solves it.
</p>




    </div>
    
  )
}

export default AnswerGuide

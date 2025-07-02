import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Home/Home components/Sidebar/Sidebar';
import './AskAi.css'
import { FaArrowAltCircleUp, FaUpload } from 'react-icons/fa';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function AskAI() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const res = await axios.post('https://devquery-backend-z5sa.onrender.com/ask-ai', {
        prompt,
      });
      setResponse(res.data.result);
      setPrompt('')
    } catch (err) {
      console.error(err);
      setResponse('❌ Failed to response');
    }
    setLoading(false);
  };

  return (
    <div className='AskiAiMaindiv'>

     <div className='sidebarai'>
<Sidebar/>
     </div>


<div className='QueryAidiv'>



<div className='Airesultsdiv'>
<div className='Airesultsdiv'>
          {loading ? (
            <p>⏳ Thinking...</p>
          ) : (
            
          <div className='TextCodedetectdiv'>
              <ReactMarkdown
              children={response}
              
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
            </div>
          )}
        </div>




</div>



<div className='AisearchInputwrapper'>
 <textarea
    value={prompt}
    className='Aisearchinput'
    placeholder='Ask Anything'
    rows={1}
    onInput={(e) => {
      e.target.style.height = 'auto'; // Reset height
      e.target.style.height = e.target.scrollHeight + 'px'; // Adjust to content
    }}
    onChange={(e)=>{setPrompt(e.target.value)}}
  ></textarea>
    <FaArrowAltCircleUp size={30} className='SendIcon' onClick={handleAsk}/>
</div>






</div>


    </div>
  );
}

export default AskAI;

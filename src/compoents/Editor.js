import React, { useEffect } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {

  useEffect(() => {

    async function init() {
      Codemirror.fromTextArea(document.getElementById('realTimeEditor'), {
        mode: { name: 'javascript', json: 'true' },
        theme:'dracula', 
        autoCloseTag:true,
        autoCloseBrackets:true,
        lineNumbers:true,
        
      });
    }
    init();

  }, []);

  return <div className='editor-container'> <textarea id="realTimeEditor" ></textarea></div>
  
}

export default Editor;
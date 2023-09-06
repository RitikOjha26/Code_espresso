import React, { useEffect, useRef } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';
//import {io,on,emit} from 'socket.io-client';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef({ current: 'hello world' });

  useEffect(() => {

    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById('realTimeEditor'), {
        mode: { name: 'javascript', json: 'true' },
        theme: 'dracula',
        autoCloseTag: true,
        autoCloseBrackets: true,
        lineNumbers: true,

      });



      editorRef.current.on('change', (instance, changes) => {
        //console.log('changes',changes);
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        //console.log(code);
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,

          });
        }


      });


    }
    init();

  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);






  return <textarea id="realTimeEditor" ></textarea>

}

export default Editor;
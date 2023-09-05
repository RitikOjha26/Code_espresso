import React, { useState,useRef, useEffect } from 'react'
import Client from '../compoents/Client';
import Editor from '../compoents/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation } from 'react-router-dom';

const EditorPage = () => {
  
  const socketRef=useRef(null);
  const location = useLocation();

  useEffect(()=>{
    const init = async ()=>{
       socketRef.current = await initSocket();
      // socketRef.current.emit(ACTIONS.JOIN ,{
      //   roomId,
      //   username : location.state?.username,
      // });
    };
    init();
  }, []);
  
  const [clients, setClients] = useState([
    {socketId: 1 , username:'Ritik ojha'},
    {scoketId: 2 , username:'Ashutosh ojha'},
    {scoketId: 2 , username:'Ashutosh ojha'},
  ]);
  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
          <div className='Logo'>
            <img className='LogoImage' 
            src="/editor-logo.png" 
            alt="logo" 
            />
          </div>
          <h3>Connected</h3>
          <div className='clientsList'>
          {
            clients.map((client) => {
              return <Client key={client.socketId} username={client.username}/>
            })
          }
          </div>
        </div>
        <button className='btn copyBtn'>Copy Room ID</button>
        <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className='editorWrap'>
        <Editor/>
      </div>
    </div>
  )
}

export default EditorPage
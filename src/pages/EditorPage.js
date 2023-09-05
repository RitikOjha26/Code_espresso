import React, { useState,useRef, useEffect } from 'react'

import  toast from 'react-hot-toast';
import Client from '../compoents/Client';
import Editor from '../compoents/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation , useNavigate ,Navigate,useParams} from 'react-router-dom';

const EditorPage = () => {
  
  const socketRef=useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  //console.log(roomId);
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(()=>{
    const init = async ()=>{
       socketRef.current = await initSocket();
       socketRef.current.on('connect_error',(err)=> handleErrors(err));
       socketRef.current.on('connect_failed',(err)=> handleErrors(err));

       function handleErrors(e) {
        console.log('socket error',e);
        toast.error('Socket Connection failed , try again later',e);
        reactNavigator('/');
       }
      socketRef.current.emit(ACTIONS.JOIN ,{
        roomId,
        username : location.state?.username,
      });

      //Listening for joined event 
      socketRef.current.on(ACTIONS.JOINED,
        ({clients,username,socketId})=>{
            
        if(username!== location.state?.username){
              toast.success(`${username} joined the room`);
              console.log(`${username} joined`);
            }
            setClients(clients);

      });

      //listening for disconnected 
      socketRef.current.on(ACTIONS.DISCONNECTED,
        ({socketId,username})=>{
        toast.success(`${username} left the room `);
        setClients((prev)=>{
          return prev.filter(client => client.socketId !== socketId)
        })
      })

    };
    init();
    return ()=>{
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    }
  }, []);

  

if(!location.state)
{
 return <Navigate to='/'/>
}

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
        <Editor socketRef={socketRef.current} roomId={roomId}/>
      </div>
    </div>
  )
}

export default EditorPage
import React,{useState} from 'react'
import {v4 as uuidV4} from 'uuid';
import  toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate =useNavigate()
  const [roomId, setRoomId]=useState('');
  const [username, setusername]=useState('');
  const createNewRoom = (e)=>{
    e.preventDefault();
    const id=uuidV4()
    setRoomId(id);
    toast.success('Created new Room');


  };
  const joinRoom = () => {
    if(roomId==='' || username==='' ){
    toast.error('Room Id & Username is required')
    return;
    }
    navigate(`/editor/${roomId}`,{
      state:{
        username,

      }
    })
  };
  const handleInputEnter = (e)=>{
    if(e.code==='Enter')
    {
      joinRoom();
    }

  };

  return <div className='homePageWrapper'>
    <div className='formWrapper'>
      <img className ="homePageLogo" src="/code-sync.png" alt="code-sync-logo" />
      <h4 className='mainLabel'> Paste Invitation Room Id</h4>
      <div className='inputGroup'>
        <input type="text" 
        className='inputBox' 
        placeholder='ROOM ID'
        onChange={(e)=>{setRoomId(e.target.value)}}
        value={roomId}
        onKeyUp={handleInputEnter}
        />
        <input type="text" 
        className='inputBox' 
        placeholder='USERNAME'
        onChange={(e)=>{setusername(e.target.value)}}
        value={username}
        onKeyUp={handleInputEnter}
        />
        <button className='btn joinBtn' onClick={joinRoom} >Join</button>
        <span className='createInfo'>
          If you don't have an invite them create &nbsp;
          <a onClick={createNewRoom} href="" className='createNewBtn'> new room</a> 
        </span>
      </div>
    </div>
    <footer>
      <h4> Enjoy coding &nbsp;👨‍💻 </h4>
    </footer>
  </div>
  
}

export default Home;
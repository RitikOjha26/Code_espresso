import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../firebase/auth';

import { useAuth } from '../context/authContext';
import '../styles/home.css'

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setusername] = useState('');
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4()
    setRoomId(id);
    toast.success('Created new Room');
  };

  const joinRoom = () => {
    if (roomId === '' || username === '') {
      toast.error('Room Id & Username is required')
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,

      }
    })
  };
  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
      joinRoom();
    }

  };

  const handleLogout = () => {
    doSignOut();
    toast.success('Logged Out Successfully');
  }


  return (
    <div className='home'>
      <button className="logout" onClick={handleLogout}>
        <div className="sign" ><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
        <div className="text">Logout</div>
      </button>
      <div className='home-body'>
        <div className="home-container_heading">
          <img className="homePageLogo" src="/code-sync.png" alt="code-sync-logo" />
        </div>
        <div className="home-container">
          <label >ROOM ID</label>
          <input type="text"
            onChange={(e) => { setRoomId(e.target.value) }}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <label>USERNAME</label>
          <input type="text"
            onChange={(e) => { setusername(e.target.value) }}
            value={username}
            onKeyUp={handleInputEnter}
          />

          <div className='submit-btn'>
            <button  onClick={joinRoom} >Join</button>
          </div>
          <div className="divider-container">
            <div className="line line-left"></div>
            <div className="or-text">OR</div>
            <div className="line line-right"></div>
          </div>
          <span className='createInfo'>
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href='Creating New Room ID' >new room</a>
          </span>
        </div>

      </div>
    </div>
  )


}

export default Home;




{/* <div className='homePageWrapper'>
  <div className='formWrapper'>
    <img className="homePageLogo" src="/code-sync.png" alt="code-sync-logo" />
    <h4 className='mainLabel'> Paste Invitation Room Id</h4>
    <div className='inputGroup'>
      <input type="text"
        className='inputBox'
        placeholder='ROOM ID'
        onChange={(e) => { setRoomId(e.target.value) }}
        value={roomId}
        onKeyUp={handleInputEnter}
      />
      <input type="text"
        className='inputBox'
        placeholder='USERNAME'
        onChange={(e) => { setusername(e.target.value) }}
        value={username}
        onKeyUp={handleInputEnter}
      />
      <button className='btn joinBtn' onClick={joinRoom} >Join</button>
      <span className='createInfo'>
        If you don't have an invite then create &nbsp;
        <a onClick={createNewRoom} href="" className='createNewBtn'> new room</a>
      </span>
    </div>
  </div>
  <footer>
    <h4> Enjoy coding &nbsp;👨‍💻 </h4>
  </footer>
</div> */}
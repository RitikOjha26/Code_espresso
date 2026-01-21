import React, { useState } from 'react';
import Logo from '../assets/code-sync.png'
import Hamburger from '../assets/hamburger.svg'
import { useAuth } from '../context/authContext';
import { doSignOut } from '../firebase/auth';
import '../styles/header.css';

export default function MenuAppBar() {
  const { loggedIn } = useAuth();
  const [show, setShow] = useState(false);
  const [showNavbar, setShowNavbar] = React.useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };


  const handleLogout = () => {
    doSignOut();
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="Code-Espresso" />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={Hamburger} alt="" />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <p onClick={handleLogout}>Contact</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

//  <>
//     {/* Hover Zone */}
//     <Box
//         sx={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '10px',
//           zIndex: 1299, // Just under the AppBar
//         }}
//         onMouseEnter={() => setShow(true)}
//       />

//       {/* Slide AppBar */}
//       <Box
//         onMouseLeave={() => setShow(false)}
//         sx={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 1300,
//           transform: show ? 'translateY(0)' : 'translateY(-100%)',
//           transition: 'transform 0.3s ease-in-out',
//         }}
//       >
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Code Espresso
//           </Typography>
//           {loggedIn && (
//             <div>
//               <IconButton
//                 size="large"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               </Menu>
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>
//     </Box>
//     </> 

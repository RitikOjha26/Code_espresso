import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ProtectedRoutes from './compoents/auth/ProtectedRoutes';
import Header from './pages/Header'
import Home from './pages/home';
import EditorPage from './pages/EditorPage';
import Login from './compoents/auth/Login';
import Register from './compoents/auth/RegisterUser';
import { Toaster } from 'react-hot-toast';
import './App.css';

function Layout() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/editor/:roomId' element={<EditorPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{ success: { theme: { primary: '#4aed88' } } }}
      />

      <BrowserRouter>
        <Routes>
          <Route 
          path='/' 
          element={<Login />} 
          />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<ProtectedRoutes element={<Layout />} />} 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}



export default App;

import logo from './logo.svg';
import './App.css';
import Register from './Components/Authentication/register';

import MyNavbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Authentication/login';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import SideBar from './Components/SideBar/SideBar';
import Phones from './Components/Showcase/Phones';
import Manage from './Components/Manage/Manage';
import AddPhone from './Components/Manage/AddPhone';
import Profile from './Components/Settings/Profile';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserDashBoard from './Components/Dashboard/userDashBoard';


function App() {

  const isLogged = localStorage.getItem("UserDetail");
  const role = localStorage.getItem("Role");

  return (
    <div className='container-breakpoint overflow-hidden' id='main-app'>
      <div className="App ">
        <BrowserRouter>
          <MyNavbar />

          <div className='row '>
            {isLogged ? (
              <>
              <div className='col-12 col-sm-3 col-lg-2 '>
                <SideBar />
              </div>
               <div className='col-12 col-lg-10 col-md-8 col-sm-7 overflow-hidden mt-5 pt-5 '>
               <Routes>
                 <Route path='/' element={<Home />} />
                 <Route path='/register' element={<Register />} />
                 <Route path='/login' element={<Login />} />
                 <Route path='/phones' element={<Phones />} />
                 <Route path='/dashboard' element={<UserDashBoard />} />


                 {role==="Admin" &&(
                  <>
                 <Route path='/manage' element={<Manage />} />
                 <Route path='/addphones' element={<AddPhone />} />
                 <Route path='/dashboard' element={<Dashboard />} />
                 </>
                 )}
                 <Route path='/profile' element={<Profile />} />
                 <Route path='/ForgotPassword' element={<ForgotPassword />} />
                 <Route path='/password-reset/:id/:token' element={<ResetPassword />} />
               </Routes>
             </div>
             </>
            )
              : (<>
               <div className='col-12 col-sm-12 mt-5 pt-5 overflow-hidden '>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/ForgotPassword' element={<ForgotPassword />} />
                <Route path='/password-reset/:id/:token' element={<ResetPassword />} />
              </Routes>
            </div></>)}

           
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

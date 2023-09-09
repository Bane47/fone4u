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


function App() {

  const isLogged = localStorage.getItem("UserDetail");
  return (
    <div className='container-breakpoint overflow-hidden'>
    <div className="App ">
      <BrowserRouter>
        <MyNavbar />
        
<div className='row '>
  {isLogged ? (
  <div className='col-lg-2 col-md-2 col-sm-3 col-xs-1'>
        <SideBar />
        </div>
        )
        :(<><div className='col-lg-1 col-md-1 col-sm-1'></div></>)}
<div className='col-lg-10 col-sm-10 col-md-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/phones' element={<Phones />} />
          <Route path='/manage' element={<Manage />} />
          <Route path='/addphones' element={<AddPhone />} />
        </Routes>
        </div>
        </div>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;

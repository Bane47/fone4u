// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import '../Styles/SideBar.css';

// const SideBar = () => {
//   const user = JSON.parse(localStorage.getItem('UserDetail'));

//   // State to manage text color
//   const [textColor, setTextColor] = useState('white');

//   const handleClick = () => {
//     // Change text color globally
//     setTextColor('black');
//   }

//   return (
//     <div className='bg-primary text-start text-white' id='main-side'>
//       <NavLink to="/phones" className='text-decoration-none'>
//         <h4 className='px-2' id='active' onClick={handleClick} style={{ color: textColor }}>
//           Phones
//         </h4>
//       </NavLink>
//       <NavLink to="/manage" className='text-decoration-none text-white'>
//         <h4 className='px-2' id='active' onClick={handleClick} style={{ color: textColor }}>
//           Manage Phones
//         </h4>
//       </NavLink>
//       <NavLink to="/profile" className='text-decoration-none text-white'>
//         <h4 className='px-2' id='active' onClick={handleClick} style={{ color: textColor }}>
//           Profile
//         </h4>
//       </NavLink>
//     </div>
//   );
// }

// export default SideBar;




import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/SideBar.css";

const SideBar = () => {
  const user = JSON.parse(localStorage.getItem("UserDetail"));
  const role = localStorage.Role;


  return (
    <div className="sidebar myback" id="main-side">

      <ul className="position-fixed text-start ms-1 pt-3">
        <li className="my-2">
          <NavLink  to="/phones" activeClassName='activee' className="inactivee"   >
           Phones <i class="fa-solid fa-mobile-screen-button"></i>
          </NavLink>
        </li>
        {/* <li>
          <NavLink exact to="/dashboard" ClassName="active-link">
            Dashboard
          </NavLink>
        </li> */}
        {role === "Admin" && (
          <li className="my-2">
            <NavLink to="/manage" activeClassName='activee' className="inactivee">
              Manage <i class="fa-solid fa-list-check"></i>
            </NavLink>
          </li>
        )}
        <li className="my-2">
          <NavLink to="/profile" activeClassName='activee' className="inactivee">
            Profile <i class="fa-solid fa-user"></i>
          </NavLink>
        </li>
        {role === "User" && (
          <li className="my-2">
            <NavLink to="/feedback" activeClassName='activee' className="inactivee">
              Feedback    <i class="fa-regular fa-comments"></i>
            </NavLink>
          </li>
        )}
         {role === "Admin" && (
          <li className="my-2"  >
            <NavLink to="/AdminFeedBack" activeClassName='activee' className="inactivee">
            Feedback    <i class="fa-regular fa-comments"></i>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBar;

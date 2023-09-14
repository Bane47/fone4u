import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import EditModel from '../Modal/editModel'
import '../Styles/profile.css'

const Profile = () => {
  const user = localStorage.getItem('UserDetail');
  const navigate = useNavigate();
  const userObj = JSON.parse(user);
  const [userDetails, setUserDetails] = useState(null);
  const [selectedUser,setSelectedUser] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleProfileEdit = (id) => {
    setSelectedUser(id)
    setShow(true)
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      axios
        .get(`http://localhost:3001/getUser/?email=${userObj.email}`)
        .then((response) => {
          setUserDetails(response.data);
        });
    }
  }, []);

  return (
    <div>
      <h1 className='text-white'>Profile Settings</h1>
      <img className='circle-image mt-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv3pi17LQ7Uf2j8B9P8YYsN36S6dfFC6CcjqVAy3cHyK8vrC9H3QYiSSfAVmy-1LeI5_0&usqp=CAU" alt="Image" />
      {userDetails && (
        <div className='row container mt-5 pt-5'>
          <div className='col-6 text-md-end '>
            <h1 className='text-white'>Name : </h1>
            <h1 className='text-white'>Email : </h1>
            <h1 className='text-white'>Phone : </h1>
          </div>
          <div className='col-6 text-start'>
            <h1 className='text-white'>{userDetails.name}</h1>
            <h1 className='text-white'>{userDetails.email}</h1>
            <h1 className='text-white'>{userDetails.phone}</h1>
          </div>
        </div>
      )}
      <div>
        <Button className='col-lg-3 mt-5 ' onClick={()=>{handleProfileEdit(userDetails._id);console.log(userDetails._id)}}>
          Edit Profile <i className="fa-solid fa-pencil"> </i>
        </Button>
      </div>
      {selectedUser && (
      <EditModel show={show} onHide={handleClose} user={userDetails}  />
      )}
    </div>
  );
};

export default Profile;

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
  console.log(userObj)
  const [userDetails, setUserDetails] = useState(null);
  const [selectedUser, setSelectedUser] = useState();
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
        .get(`http://localhost:3001/getUser/?email=${userObj.userEmail}`)
        .then((response) => {
          setUserDetails(response.data);
        });
    }
  }, []);

  return (
    <div className='pro-main text-start'>
      <h1 className='text-black  mt-5 pt-5'>Profile Settings</h1>

      {userDetails && (
        <>
        <div className='row'>
          {console.log(userDetails)}
     <div className='col-sm-9'>
        <div className='row  mt-5 pt-5 text-start'>
          <div className='col-md-7 text-start'>
          <h1 className='text-black profile-editables mt-2'><label htmlFor=""><h3>Name : </h3></label> {userDetails.name}</h1>
          <h1 className='text-black profile-editables mt-2'><label htmlFor=""><h3>Email : </h3></label> {userDetails.email}</h1>
          <h1 className='text-black profile-editables mt-2'><label htmlFor=""><h3>Phone : </h3></label> {userDetails.phone}</h1>
          </div>
        </div>
        </div>
        <div className='col-sm-2'>
        <img className='circle-image mt-5' src={userDetails.image} alt="Image" />

        </div>
        </div>
        </>
      )}
      <div>
        <button className='col-lg-2 mt-5 profile-edit-button p-3' onClick={() => { handleProfileEdit(userDetails._id); console.log(userDetails._id) }}>
          Edit Profile <i className="fa-solid fa-pencil"> </i>
        </button>
      </div>
      {selectedUser && (
        <EditModel show={show} onHide={handleClose} user={userDetails} />
      )}
    </div>
  );
};

export default Profile;

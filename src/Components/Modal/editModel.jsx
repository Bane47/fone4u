import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EditModel({ user, show, onHide }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: user.password,
    id: user._id
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword,setNewPassword] = useState('')
  const [changePassword, setChangePassword] = useState(false);
  const [confirmPassword,setConfirmPassword] = useState('');
  const navigate = useNavigate()

  const updatedFormData = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;

    axios
      .put(`http://localhost:3001/edit-account/${formData.id}`, {
        name,
        email,
        phone
      })
      .then((result) => {
        console.log(result);
      })
      .then(() => {
        toast.success("Successfully edited")
        setNewPassword('');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePassword = () => {
    const { name, email, phone, id, password } = formData;

    console.log("This is the confirm : ",confirmPassword)

    axios
      .put(`http://localhost:3001/change-Password/${id}`, {
        oldPassword,
        password,
        id,
        email
      })
      .then((result) => {
        console.log(result);
        toast.success("Successfully changed the password");
        localStorage.removeItem('UserDetail')
        navigate('/login');        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {formData && (
        <>
          <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{ maxHeight: '400px', overflowY: 'auto' , overflowX:'hidden' }}>

              <Form onSubmit={handleSubmit}>
                {!changePassword && (
                  <>
                    <Form.Group >
                      <div className="row">
                        <label className="col-lg-6 col-md-6 col-sm-6 mt-2 text-black">Name</label>
                        <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter the name"
                            value={formData.name}
                            onChange={(e) => updatedFormData('name', e.target.value)}
                          />
                        </div>
                      </div>
                    </Form.Group>
                   
                    <Form.Group >
                      <div className="row">
                        <label className="col-lg-6 col-md-6 col-sm-6 mt-2 text-black">Phone </label>
                        <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                          <Form.Control
                            type="text"
                            placeholder="Enter the phone "
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => updatedFormData('phone', e.target.value)}
                          />
                        </div>
                      </div>
                    </Form.Group>
                  </>
                )}
                {changePassword && (
                  <>
                    <Form.Group >
                      <div className="row">
                        <label className="col-lg-6 col-md-6 col-sm-6 mt-2 text-black">Old Password </label>
                        <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                          <Form.Control
                            type="password"
                            placeholder="Enter the old password "
                            name="oldPassword"
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group >
                      <div className="row">
                        <label className="col-lg-6 col-md-6 col-sm-6 mt-2 text-black">New Password </label>
                        <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                          <Form.Control
                            type="password"
                            placeholder="Enter the new password"
                            name="newPassword"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group >
                      <div className="row">
                        <label className="col-lg-6 col-md-6 col-sm-6 mt-2 text-black">Confirm Password </label>
                        <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                          <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </Form.Group>
                  </>
                )}
                {!changePassword && (
                  <div className='row container'>
                    <div className='d-flex col-lg-6'>
                      <button className="btn btn-warning mt-4 mb-5 mx-auto" type="button" onClick={() => setChangePassword(true)}>
                        Change Password
                      </button>
                    </div>
                    <div className='d-flex col-lg-6'>
                      <button className="btn btn-primary mt-4 mb-5 mx-auto" type="submit">
                        Submit!
                      </button>
                    </div>
                  </div>
                )}
                {changePassword && (
                  <div className='row container'>
                    <div className='d-flex col-lg-6'>
                      <button className="btn btn-warning mt-4 mb-5 mx-auto" type="button" onClick={() => setChangePassword(false)}>
                        Change Profile
                      </button>
                    </div>
                    <div className='d-flex col-lg-6'>
                      <button className="btn btn-primary mt-4 mb-5 mx-auto" type="button" onClick={() => handleChangePassword()}>
                        Submit!
                      </button>
                    </div>
                  </div>
                )}
              </Form>
              </div>
            </Modal.Body>

          </Modal>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default EditModel;

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function EditModel({ user, show, onHide }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: user.password,
    id: user._id
  });
  const [oldPassword, setOldPassword] = useState('');
  const [password, setNewPassword] = useState('');
  const [changePassword, setChangePassword] = useState(false);

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
        alert("Successfully edited");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePassword = () => {
    const { name, email, phone, id, password } = formData;

    axios
      .put(`http://localhost:3001/change-Password/${id}`, {
        oldPassword,
        password,
        id,
        email
      })
      .then((result) => {
        setNewPassword('');
        console.log(result);
        alert("Successfully changed the password")
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
              <Form onSubmit={handleSubmit}>
                {!changePassword && (
                  <>
                    <Form.Group >
                      <div className="row">
                        <label className="col-lg-6 col-md-6 col-sm-6 mt-2">Name</label>
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
                        <label className="col-lg-6 col-md-6 col-sm-6 mt-2">Email</label>
                        <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                          <Form.Control
                            type="text"
                            placeholder="Enter the email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => updatedFormData('email', e.target.value)}
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group >
                      <div className="row">
                        <label className="col-lg-6 col-md-6 col-sm-6 mt-2">Phone </label>
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
                        <label className="col-lg-6 col-md-6 col-sm-6 mt-2">Old Password </label>
                        <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                          <Form.Control
                            type="text"
                            placeholder="Enter the old password "
                            name="oldPassword"
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group >
                      <div className="row">
                        <label className="col-lg-6 col-md-6 col-sm-6 mt-2">New Password </label>
                        <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                          <Form.Control
                            type="text"
                            placeholder="Enter the new password"
                            name="newPassword"
                            onChange={(e) => setNewPassword(e.target.value)}
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
            </Modal.Body>

          </Modal>

        </>
      )}
    </>
  );
}

export default EditModel;

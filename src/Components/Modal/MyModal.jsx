import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyModal(props) {
    const [formData, setFormData] = useState({
        name: props.phone.name,
        processor: props.phone.processor,
        ram: props.phone.ram,
        battery: props.phone.battery,
        camera: props.phone.camera,
        storage: props.phone.storage,
        display: props.phone.display,
        price: props.phone.price,
      });

  const updateFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, processor, ram, battery, camera, storage, display, price } = formData;
    axios
      .put(`http://localhost:3001/edit/${props.phone._id}`, {
        name,
        processor,
        ram,
        battery,
        camera,
        storage,
        display,
        price,
      })
      .then((result) => {
        console.log(formData);
        console.log(result);
        // Close the modal or perform any additional actions
      }).then(()=>{
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePhone = () => {
    axios.delete(`http://localhost:3001/delete/${props.id}`).then(() => {
      // Close the modal or perform any additional actions
    });
  };

  useEffect(() => {
    console.log(props.phone); // Add this line
    axios
      .get('http://localhost:3001/getPhones')
      .then((res) => {
        const foundItem = res.data.find((item) => item._id === props.phone._id);
        if (foundItem) {
          setFormData(foundItem);
          console.log('Found item:', foundItem);
        } else {
          console.log("There is no value");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [props.id]);
  
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Phone Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <div className="row">
              <label className="col-lg-6 col-md-6 col-sm-6 mt-2">Phone name</label>
              <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter the phone name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <div className="row">
              <label className="col-lg-6 col-md-6 col-sm-6 mt-2">Image</label>
              <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                <Form.Control
                  type="file"
                  accept=".jpeg,.png,.jpg,.webp"
                  name="processor"
                  placeholder="Enter the processor name"
                />
              </div>
            </div>
           {console.log(props.phone._id)}
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <div className="row">
              <label className="col-lg-6 col-md-6 col-sm-6 mt-2">RAM</label>
              <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                <Form.Control
                  type="text"
                  placeholder="Enter the RAM"
                  name="ram"
                  value={formData.ram}
                  onChange={(e) => updateFormData('ram', e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <div className="row">
              <label className="col-lg-6 col-md-6 col-sm-6 mt-2">Battery Capacity</label>
              <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                <Form.Control
                  type="text"
                  placeholder="Enter the Battery Capacity"
                  name="battery"
                  value={formData.battery}
                  onChange={(e) => updateFormData('battery', e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <div className="row">
              <label className="col-lg-6 col-md-6 col-sm-6 mt-2">Camera</label>
              <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                <Form.Control
                  type="text"
                  placeholder="Camera"
                  value={formData.camera}
                  name="camera"
                  onChange={(e) => updateFormData('camera', e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <div className="row">
              <label className="col-lg-6 col-md-6 col-sm-6 mt-2">Storage</label>
              <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                <Form.Control
                  type="text"
                  placeholder="Storage"
                  value={formData.storage}
                  name="storage"
                  onChange={(e) => updateFormData('storage', e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <div className="row">
              <label className="col-lg-6 col-md-6 col-sm-6 mt-2">Display</label>
              <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                <Form.Control
                  type="text"
                  placeholder="Display"
                  value={formData.display}
                  name="display"
                  onChange={(e) => updateFormData('display', e.target.value)}
                />
              </div>
             
            </div>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <div className="row">
              <label className="col-lg-6 col-md-6 col-sm-6 mt-2">Price</label>
              <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                <Form.Control
                  type="text"
                  placeholder="Price"
                  value={formData.price}
                  name="price"
                  onChange={(e) => updateFormData('price', e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <button className="btn btn-primary mt-4 mb-5 mx-auto" type="submit">
            Submit!
          </button>
        </Form>
      </Modal.Body>
     
    </Modal>
  );
}

export default MyModal;

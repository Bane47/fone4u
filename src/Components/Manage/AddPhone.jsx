import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const AddPhone = () => {
    const [formData,setFormData]=useState({
        name:'',
        processor:'',
        ram:'',
        battery:'',
        camera:'',
        storage:'',
        display:'',
        price:0
    });

    const updateFormData=(field,value)=>{
            setFormData({
                ...formData,
                [field]:value,
            });
    };



    const handleSubmit = (e) => {

        e.preventDefault();

        const {name,processor,ram,battery,camera,storage,display,price} = formData;
        axios.post('http://localhost:3001/post', { name,processor,ram,battery,camera,storage,display,price })
            .then(result => {
                console.log("Hekko ");
                console.log(result)
                
            })
            .catch((err) => { console.log(err) })

    }


  return (
    <div className='container text-white'>
        <h1 className='m-3 nav-item'>Add Phone</h1>
        <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Phone name</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Enter the phone name" value={formData.name} onChange={(e)=>{updateFormData('name',e.target.value)}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Image</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text"  placeholder="Enter the processor name" value={formData.processor} onChange={(e)=>{updateFormData('processor',e.target.value)}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>RAM</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Enter the RAM" value={formData.ram} onChange={(e)=>{updateFormData('ram',e.target.value)}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Battery Capacity</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Enter the Battery Capacity" value={formData.battery} onChange={(e)=>{updateFormData('battery',e.target.value)}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Camera</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Camera" value={formData.camera} onChange={(e)=>{updateFormData('camera',e.target.value)}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Storage</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Storage" value={formData.storage} onChange={(e)=>{updateFormData('storage',e.target.value)}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Display</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Display" value={formData.display} onChange={(e)=>{updateFormData('display',e.target.value)}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Price</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Price" value={formData.price} onChange={(e)=>{updateFormData('price',e.target.value)}} />
                            </div>
                        </div>
                    </Form.Group>
                


                    <button className='btn btn-primary mt-4 mb-5' type='submit'>Submit!</button>
                </Form>
    </div>
  )
}

export default AddPhone
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../Styles/register.css';


const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cPassword, setCpassword] = useState();
    const [phone, setPhone] = useState();
    const [role, setRole] = useState('User');
    const navigate = useNavigate();
    const isLogged = localStorage.getItem("UserDetail");
    const handleRoleValue = (e) => {
        setRole(e.target.value);
    }
    const [image, setImage] = useState("");


    const emailRegEx = /^[A-Za-z0-9.]+@gmail.com$/;
    const passRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    const phoneRegEx = /^[6-9]{1}[0-9]{9}$/;

    const registerValidate = (e) => {
        e.preventDefault();

        if (name === "") {
            toast.error("Please enter the name");
        }
        else if (email === "") {
            toast.error("Please enter the email id");
        }
        else if (password === "") {
            toast.error("Please enter the password");
        }
        else if (cPassword === "") {
            toast.error("Please enter the confirm password");
        }
        else if (phone === "") {
            toast.error("Please enter the phone number");
        }
        else if (!emailRegEx.test(email)) {
            toast.error("Please enter a valid email id")
        }
        else if (!passRegEx.test(password)) {
            toast.error("The password should contain atleast one uppercase one lowercase one number and one special character and the minimum length of the password is 8 and maximum is 16");
        }

        else if (!phoneRegEx.test(phone)) {
            toast.error("Please enter a valid phone number");
        }

        else if (password !== cPassword) {
            toast.error("Password and the confirm password do not match");
        } else {
            axios.post('http://localhost:3001/register', { name, email, password, phone, role ,image})
                .then((result) => {
                    console.log(result);
                    toast.success("Account created successfully")
                    navigate("/login")
                })
                .catch(error => {console.log(error.response.data.error);
                if(error.response.data.error==="Duplicate Email"){
                    toast.error("This email already exists");
                }
                });
        }

    }

    const convertToBase64 = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("error ", error);
        }
    }



    useEffect(() => {
        if (isLogged) {
            navigate('/dashboard')
        }
    }, [navigate])

    return (
        <div className='container mt-5 overflow-bar' >
            <Card className='shadow col-lg-5  mx-auto login-body ' style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'hidden' }}>
                <h1 className='m-4'>Register</h1>
                <Form onSubmit={registerValidate}>
                    <Form.Group id="exampleForm.ControlInput1">
                        <div className='row'>
                            <label htmlFor="name" className='col-lg-6 col-md-6 col-sm-6 mt-2 ps-5 '>Name</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control size="md" className='main-input' type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group id="exampleForm.ControlInput1">
                        <div className='row'>
                            <label htmlFor="email" className='col-lg-6 col-md-6 col-sm-6 mt-2 ps-5'>E-mail</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="email" className='main-input' placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label className='col-lg-6 col-md-6 col-sm-6 mt-2'>Image</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control accept="image/*" type="file" placeholder="Enter the processor name" onChange={convertToBase64} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group id="exampleForm.ControlInput1">
                        <div className='row'>
                            <label htmlFor="Password" className='col-lg-6 col-md-6 col-sm-6 mt-2 ps-5'>Password</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control className='main-input'
                                    type="password"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Password"
                                    value={password} onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group id="exampleForm.ControlInput1">
                        <div className='row'>
                            <label htmlFor="Password" className='col-lg-6 col-md-6 col-sm-6 mt-2 ps-5'>Confirm Password</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control
                                    className='main-input'
                                    type="password"
                                    id="confirmpassword"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Confirm Password"
                                    value={cPassword} onChange={(e) => { setCpassword(e.target.value) }}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group id="exampleForm.ControlInput1" className='pb-5'>
                        <div className='row'>
                            <label htmlFor="Phone" className='col-lg-6 col-md-6 col-sm-6 mt-2 ps-5'>Phone</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control
                                    className='main-input'
                                    type="text"
                                    id="phone"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Phone"
                                    value={phone} onChange={(e) => { setPhone(e.target.value) }}
                                />
                            </div>
                        </div>
                    </Form.Group>

                    <div className=' d-flex justify-content-center'>
                        <button className='submit-btn mb-5 text-white rounded-3 px-3 py-1 ' type='submit'>Submit</button>
                    </div>
                    <p className='mb-5'>Already have an account? <Link to="/login" className='text-decoration-none'>Login!</Link></p>
                </Form>
            </Card>
            <ToastContainer />
        </div>


    )
}

export default Register
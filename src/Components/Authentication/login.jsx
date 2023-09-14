import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/login.css'

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const isLogged = localStorage.getItem("UserDetail");
    const notify = () => toast("Wow so easy!");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Inside handle submit");

       


        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
            
                console.log(result)
                if (result.data === "success") {

                    const jsonData = JSON.parse(result.config.data);
                    const jsonFormatter = JSON.stringify(jsonData, null, 2);

                    localStorage.setItem('UserDetail', jsonFormatter);
                    toast.success("Logged in successfully");
                    navigate('/');
                    window.location.reload();

                } else {
                    toast.error("Please check the email and password")
                }
            })
            .catch((err) => { console.log(err); toast.error("Login failed, Please give corect credentials") })

    }



    useEffect(() => {
        if (isLogged) {
            navigate('/dashboard')
        }
    }, [navigate])
    return (
        <div className='container mt-5'>       
            <Card className='shadow col-md-5 mx-auto '>
                <h1 className='m-4'>Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label htmlFor="email" className='col-md-6 mt-2'>E-mail</label>
                            <div className="col-md-5 m-2">
                                <Form.Control className='main-input' type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label htmlFor="Password" className='col-md-6 mt-2'>Password</label>
                            <div className="col-md-5 m-2">
                                <Form.Control
                                    className='main-input'
                                    type="password"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                        </div>
                    </Form.Group>

                    <ToastContainer />

                    <button className='btn btn-primary mt-4 mb-5' type='submit' >Submit!</button>

                    <p>Do not have an account? <Link to='/register' className='text-decoration-none'>Register!</Link></p>
                </Form>
            </Card>
        </div>


    )
}

export default Login
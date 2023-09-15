import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // New state for "Remember me" checkbox
    const navigate = useNavigate();
    const isLogged = localStorage.getItem('UserDetail');
    const notify = () => toast('Wow so easy!');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Inside handle submit');

        axios
            .post('http://localhost:3001/login', { email, password, rememberMe }) // Include rememberMe in the request
            .then((result) => {
                console.log("This is the result ",result);
                if (result.data.status === 'success') {
                    const jsonData = JSON.parse(result.config.data,result.data.accessToken);
                    const jsonFormatter = JSON.stringify(jsonData, null, 2);

                    localStorage.setItem('UserDetail', jsonFormatter);
                    localStorage.setItem('accessToken', result.data.accessToken);
                    toast.success('Logged in successfully');
                    navigate('/');
                    // window.location.reload();
                } else {
                    toast.error('Please check the email and password');
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Login failed, Please give correct credentials');
            });
    };

    useEffect(() => {
        if (isLogged) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div className="container mt-5">
            <Card className="shadow col-md-5 mx-auto ">
                <h1 className="m-4">Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <div className="row">
                            <label htmlFor="email" className="col-md-6 mt-2">
                                E-mail
                            </label>
                            <div className="col-md-5 m-2">
                                <Form.Control
                                    className="main-input"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div className="row">
                            <label htmlFor="Password" className="col-md-6 mt-2">
                                Password
                            </label>
                            <div className="col-md-5 m-2">
                                <Form.Control
                                    className="main-input"
                                    type="password"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <div className="row">
                        <div className="col-sm-8">
                            <span>Remember me</span>
                        </div>
                        <div className="col-sm-1">
                            <Form.Check
                                aria-label="option 1"
                                checked={rememberMe} // Bind "checked" attribute to the state
                                onChange={(e) => {
                                    setRememberMe(e.target.checked); // Update the state when the checkbox changes
                                }}
                            />
                        </div>
                    </div>
                    <ToastContainer />

                    <button className="btn btn-primary mt-4 mb-5" type="submit">
                        Submit!
                    </button>
                    <p>
                        <Link to="/forgotPassword" className="text-decoration-none">
                            Forgot Password?
                        </Link>
                    </p>
                    <p className="mb-5">
                        Do not have an account?{' '}
                        <Link to="/register" className="text-decoration-none">
                            Register!
                        </Link>
                    </p>
                </Form>
            </Card>
        </div>
    );
};

export default Login;

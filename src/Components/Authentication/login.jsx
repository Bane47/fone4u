import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/login.css';
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true); // New state for "Remember me" checkbox
    const [role, setRole] = useState();
    const navigate = useNavigate();
    const isLogged = localStorage.getItem('UserDetail');
    const notify = () => toast('Wow so easy!');


    const authenticateUser = async (userEmail, userPassword, rememberMe) => {

        try {
            const response = await axios.post('http://localhost:3001/login', {
                userEmail,
                userPassword,
                rememberMe,
            });

            if (response.data.status === 'success') {
                const userData = {
                    userEmail,
                    password
                };




                const jsonData = JSON.parse(response.config.data);
                const jsonFormatter = JSON.stringify(jsonData, null, 2);
                console.log(response.config.data)


                localStorage.setItem('UserDetail', jsonFormatter);
                localStorage.setItem('Role', response.data.user.role);

                if (rememberMe) {
                    localStorage.setItem("rememberMe", true)
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem("password", jsonData.userPassword);
                    Cookies.set('password', jsonData.userPassword);

                } else {
                    localStorage.removeItem("rememberMe");
                    localStorage.removeItem("password");
                    Cookies.remove("password");

                }

                // const expirationTime = new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));
                const cook = Cookies.set('auth', JSON.stringify(userData), { expires: 30 });
                const accessCookie = Cookies.set('accessToken', JSON.stringify(response.data.accessToken))

                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            toast.error('Login failed, Please give correct credentials');
            return false;
        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const isAuthenticated = await authenticateUser(email, password, rememberMe);

        console.log(isAuthenticated);

        if (isAuthenticated) {
            toast.success('Logged in successfully');
            navigate('/');
            location.reload();
        }
    };


    useEffect(() => {
        const remMe = localStorage.getItem('rememberMe') === true;
        setRememberMe(remMe);

        const token = Cookies.get("accessToken");
        console.log(token, remMe)
        if (remMe && token) {
            try {
                setPassword(localStorage.getItem('password'))
                console.log(localStorage.getItem('password'))
            } catch (error) {
                console.log(error)

            }
            console.log("Im inside the try block")

        }

        if (isLogged) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div className="container mt-5 pt-5 ">
            <Card className="shadow col-md-5 mx-auto login-body">
                <h1 className="m-4">Login</h1>
                {console.log(password)}
                <Form onSubmit={handleLogin}>
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
                            <Form.Check id='check-btn'
                                aria-label="option 1"
                                checked={rememberMe} // Bind "checked" attribute to the state
                                onChange={(e) => {
                                    setRememberMe(e.target.checked); // Update the state when the checkbox changes
                                }}
                            />
                        </div>
                    </div>
                    <ToastContainer />

                    <button className="submit-btn mb-5 text-white rounded-3 px-3 py-1 mt-3" type="submit">
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

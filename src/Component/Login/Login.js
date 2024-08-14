import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting login request with:', { email, password });
        try {
            const response = await axios.post('/auth/login', { email, password });
            console.log('Login successful:', response.data);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                toast.success(response.data.message);
                setError('');
                navigate('/dashboard');
            } else {
                setError('Unexpected response from server.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            let errorMessage = 'Login failed. Please check your credentials.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            } else if (error.response && error.response.data && error.response.data.errors) {
                errorMessage = error.response.data.errors.join(', ');
            } else if (error.message) {
                errorMessage = error.message;
            }
            setError(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Login
                </Button>
                <p className="mt-3 text-center">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </Form>
        </div>
    );
}

export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import './Signup.css';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('auth/register', {
                email,
                password,
            });
            setMessage('Registration successful. Please check your email to verify your account.');
            setError('');
        } catch (error) {
            // Extract error message from the response
            let errorMessage = 'Registration failed. Please try again.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            }
            setError(errorMessage);
            setMessage('');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="userName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
                <p className="mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </Form>
        </div>
    );
}

export default Signup;
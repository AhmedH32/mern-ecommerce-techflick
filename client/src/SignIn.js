import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ username, password });
    if (result.success) {
      setToastMsg('Signed in successfully!');
      setShowToast(true);
      setTimeout(() => navigate(from, { replace: true }), 800);
    } else {
      setToastMsg(result.message || 'Invalid credentials');
      setShowToast(true);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Sign In</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-2">
          Sign In
        </Button>
      </Form>

      <p className="text-center mt-2">
        Don’t have an account?{' '}
        <Link to="/signup" state={{ from }}>
          Sign up instead
        </Link>
      </p>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          bg={toastMsg.includes('successfully') ? 'success' : 'danger'}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default SignIn;

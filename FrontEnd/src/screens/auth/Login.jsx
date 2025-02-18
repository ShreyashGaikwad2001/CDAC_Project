import React, { useState } from 'react';
import axios from '../../axios';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, setToken } from '../auth/auth';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import parkImage from '../../res/mainIcon.png';
import { isLoggedIn } from './auth';
import {backend} from '../../config'

const Login = ({logout}) => {
  
  const navigate = useNavigate();

  if(logout){
    removeToken();
  }

  if(isLoggedIn()) {
    navigate('/');
  }

  const [userData, setUserData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const isValidateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z]{2,}\.com$/;
    return emailRegex.test(email);
  };

  const isValidatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    setMessage('');

    if (!isValidateEmail(userData.email)) {
      setMessage('Invalid email. It should end with a domain and contain alphanumeric characters only!');
      return;
    }

    if (!isValidatePassword(userData.password)) {
      setMessage('Password must be at least 8 characters long and contain at least one uppercase letter.');
      return;
    }

    axios.post(backend.url+`user/login`, userData)
        .then((res) => {setToken(res.data.jwt); navigate("/home") })
        .catch((error) => { console.error(error); setMessage('Login failed. Check your credentials.'); });
   
  };

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center h-100">
      <MDBRow className="d-flex justify-content-center w-100">
        <MDBCol  className='text-center text-lg-start col-8'>
        <div className='d-flex justify-content-center'>
          <img src={parkImage} alt="logo" />
        </div>
        <h1 className='display-4 fw-bold text-body-emphasis'>Welcome to ParkNGo</h1>
        <p className='fs-4'>Log in to reserve your parking spot, manage your bookings, and enjoy a hassle-free parking experience.</p>
        </MDBCol>
        <MDBCol className="p-4 justify-content-center col shadow-sm rounded align-content-center">
          <h2 className="mb-4 row text-success justify-content-center">Login</h2>
          <div className='row'>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="form-control-lg mb-4"
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              className="form-control-lg mb-4"
            />
            <section className='d-flex justify-content-center'>
              <button className='btn btn-primary btn-lg' onClick={handleSubmit}>Login</button>
            </section>
            <div className='text-center text-muted'>No account? Register <Link to="/register">here</Link></div>
          </div>
          {message && (
            <p className="text-danger text-center" style={{ marginTop: '10px' }}>
              {message}
            </p>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;

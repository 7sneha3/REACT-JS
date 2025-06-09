import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate('/');
    return null;
  }

  const {
    firstname, lastname, username, email, phone, password,
    country, city, pan, aadhar,
  } = state;

  return (
    <div className="success-container">
      <div className="success-card">
        <h2>🎉 Form Submitted Successfully!</h2>
        <p><strong>First Name:</strong> {firstname}</p>
        <p><strong>Last Name:</strong> {lastname}</p>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Country:</strong> {country}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>PAN No:</strong> {pan}</p>
        <p><strong>Aadhar No:</strong> {aadhar}</p>
        <button className="back-btn" onClick={() => navigate('/')}>Fill Another Form</button>
      </div>
    </div>
  );
};

export default SuccessPage;

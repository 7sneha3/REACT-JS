import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

export const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
export const validPAN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const validAadhar = /^\d{12}$/;

const countries = {
  India: ['Mumbai', 'Delhi', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
};

const Form = () => {
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [pan, setPan] = useState('');
  const [aadhar, setAadhar] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!firstname.trim()) err.firstname = 'First name is required';
    if (!lastname.trim()) err.lastname = 'Last name is required';
    if (!username.trim()) err.username = 'Username is required';
    if (!validEmail.test(email)) err.email = 'Invalid email format';
    if (!validPassword.test(password)) err.password = 'Password must be alphanumeric & 6+ chars & special char';
    if (!/^\+\d{1,4}\d{10}$/.test(phone)) err.phone = 'Phone must include country code & 10-digit number';
    if (!country) err.country = 'Country is required';
    // if (!city) err.city = 'City is required';
    // if (!validPAN.test(pan)) err.pan = 'PAN format: ABCDE1234F';
    if (!validAadhar.test(aadhar)) err.aadhar = 'Aadhar must be 12 digits';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
  
    if (!isValid) {
      // alert("❗ Please fill all required fields correctly.");
      return;
    }
  
    // Navigate to success page
    navigate('/success', {
      state: {
        firstname, lastname, username, email,
        phone, country, aadhar,
      },
    });
  };
  

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* First & Last Name in One Line */}
        <div className="name-row">
          <div className="name-field">
            <label>First Name<span className="required">*</span></label>
            <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
            <p className="error">{errors.firstname}</p>
          </div>

          <div className="name-field">
            <label>Last Name<span className="required">*</span></label>
            <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} />
            <p className="error">{errors.lastname}</p>
          </div>
        </div>

        {/* Username */}
        <label>Username<span className="required">*</span></label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <p className="error">{errors.username}</p>

        {/* Email */}
        <label>Email<span className="required">*</span></label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p className="error">{errors.email}</p>

        {/* Password */}
        <label>Password<span className="required">*</span></label>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <p className="error">{errors.password}</p>

        {/* Phone */}
        <label>Phone No. (with country code)<span className="required">*</span></label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
          placeholder="+911234567890"
        />
        <p className="error">{errors.phone}</p>

        <div className="name-row">
          {/* Country Dropdown */}
          <div className='name-field'>
            <label>Country<span className="required">*</span></label>
            <select value={country} onChange={(e) => {
              setCountry(e.target.value);
              setCity('');
            }}>
              <option value="">Select Country</option>
              {Object.keys(countries).map((c) => (
                <option key={c} value={c}>{c}</option>
                ))}
            </select>
            <p className="error">{errors.country}</p>
          </div>

          <div className='name-field'>
            {/* City Dropdown */}
            <label>City</label>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Select City</option>
              {country && countries[country].map((city) => (
                <option key={city} value={city}>{city}</option>
                ))}
            </select>
            <p className="error">{errors.city}</p>
          </div>
        </div>

        <div className="name-row">
          <div className='name-field'>
            {/* PAN */}
            <label>PAN No.</label>
            <input
              type="text" placeholder='ABCDE1234F'
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
            />
            <p className="error">{errors.pan}</p>
          </div>
          
          <div className='name-field'>
            {/* Aadhar */}
            <label>Aadhar No.<span className="required">*</span></label>
            <input
              type="text"
              value={aadhar}
              maxLength="12"
              onChange={(e) => setAadhar(e.target.value.replace(/\D/, ''))}
            />
            <p className="error">{errors.aadhar}</p>
            </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;

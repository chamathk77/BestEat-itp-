import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UpdateUserName } from "../../Redux/reducers/LoginReducer";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();
    // Add logic for user signup
  };

  const handleSignupRedirect = () => {
    dispatch(UpdateUserName(username));
    navigate("/homepage");
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input
                type="text"
                id="username"
                style={styles.input}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <label htmlFor="firstName" style={styles.label}>First Name</label>
              <input
                type="text"
                id="firstName"
                style={styles.input}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div style={styles.inputWrapper}>
              <label htmlFor="lastName" style={styles.label}>Last Name</label>
              <input
                type="text"
                id="lastName"
                style={styles.input}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div style={styles.inputWrapper}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              style={styles.input}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.inputWrapper}>
            <label htmlFor="phone" style={styles.label}>Phone Number</label>
            <input
              type="tel"
              id="phone"
              style={styles.input}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div style={styles.inputWrapper}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              style={styles.input}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={styles.inputWrapper}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              style={styles.input}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onClick={handleSignupRedirect}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fffaf0', // Light background for modern theme
    fontFamily: "'Poppins', sans-serif", // Modern, clean font
    padding: '20px', // Ensure proper spacing on all sides
    boxSizing: 'border-box',
  },
  formContainer: {
    maxWidth: '450px',
    width: '100%',
    padding: '40px',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Ensures the form is centered
    marginTop: '-50px', // To center vertically, reduce the margin from the top
  },
  title: {
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#FF6F00', // Orange theme
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%', // Full width of the container
  },
  inputGroup: {
    display: 'flex',
    gap: '20px',
    width: '100%', // Ensure full width of form
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '8px',
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    width: '100%',
    backgroundColor: '#f9f9f9',
    outline: 'none',
    transition: 'border 0.3s ease',
    ':focus': {
      borderColor: '#FF6F00', // Orange border on focus
    },
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#FF6F00', // Orange button
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#e65c00',
    },
  },
};

export default SignupPage;

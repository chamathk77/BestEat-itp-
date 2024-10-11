import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UpdateUserName } from "../../Redux/reducers/LoginReducer";
import CustomAlert from "../../Components/CommonAlert/CommonAlert";
import axios from 'axios'; // Add axios import

function SignupPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("colombo"); // Default city

  const [showAlert, setShowAlert] = useState(false);
  const [alertDescription, setAlertDescription] = useState("");
  const [alertTopic, setAlertTopic] = useState("");
  const [buttonCount, setButtonCount] = useState(1);
  const [positiveButton, setPositiveButton] = useState(false);
  const [negartiveButton, setNegartiveButton] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword || !address) {
      setAlertTopic("Error");
      setAlertDescription("All fields are required.");
      setButtonCount(1);
      setShowAlert(true);
      setNegartiveButton(true);
      setPositiveButton(false);
      return;
    }

    if (password !== confirmPassword) {
      setAlertTopic("Error");
      setAlertDescription("Passwords do not match.");
      setButtonCount(1);
      setShowAlert(true);
      setNegartiveButton(true);
      setPositiveButton(false);
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setAlertTopic("Error");
      setAlertDescription("Phone number must be exactly 10 digits.");
      setButtonCount(1);
      setShowAlert(true);
      setNegartiveButton(true);
      setPositiveButton(false);
      return;
    }

    const userData = {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      password,
      address,
      city
    };

    try {
      // Call backend API to add the customer
      const response = await axios.post("http://localhost:8800/api/customers/addCustomer", userData);

      if (response.status === 200) {
        // If successful, dispatch Redux action to update username or handle success
        // dispatch(UpdateUserName(username));

        // Optionally, show a success alert
        setAlertTopic("Success");
        setAlertDescription("Signup successful.");
        setButtonCount(1);
        setShowAlert(true);
        setNegartiveButton(false);
        setPositiveButton(true);

        setTimeout(() => {
          handleSignupRedirect();
        }, 3000);
  
      } else {
        setAlertTopic("Error");
        setAlertDescription("Signup Failed. Try again later.");
        setButtonCount(1);
        setShowAlert(true);
        setNegartiveButton(true);
        setPositiveButton(false);
      }
    } catch (error) {
   
      setAlertTopic("Error");
      setAlertDescription("An error occurred while signing up. Please try again.");
      setButtonCount(1);
      setShowAlert(true);
      setNegartiveButton(true);
      setPositiveButton(false);
   
    }
  };

  const handleSignupRedirect = () => {
    navigate("/"); // Redirect to a welcome or another page
  };

  const handlePositiveAction = () => {
    setShowAlert(false);
  };

  const handleNegativeAction = () => {
    setShowAlert(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Sign Up</h2>

        {/* Alert */}
        {showAlert && (
          <CustomAlert
            alertvisible={showAlert}
            onPositiveAction={handlePositiveAction}
            onNegativeAction={handleNegativeAction}
            alertDescription={alertDescription}
            alertTitle={alertTopic}
            buttonCount={buttonCount}
            positiveButton={positiveButton}
            negartiveButton={negartiveButton}
          />
        )}

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
          <div style={styles.inputWrapper}>
            <label htmlFor="address" style={styles.label}>Address</label>
            <input
              type="text"
              id="address"
              style={styles.input}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div style={styles.inputWrapper}>
            <label htmlFor="city" style={styles.label}>City</label>
            <select
              id="city"
              style={styles.input}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="Colombo">Colombo</option>
              <option value="Kalutara">Kalutara</option>
              <option value="Gampaha">Gampaha</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>
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
    backgroundColor: '#fffaf0',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px',
    boxSizing: 'border-box',
    overflow: 'hidden', // Ensure it hides overflow for neat design
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
    alignItems: 'center',
    marginTop: '-50px',
    height: '100%',
    overflow: 'auto', // Makes form scrollable if content overflows
  },
  title: {
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#FF6F00',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  inputGroup: {
    display: 'flex',
    gap: '20px',
    width: '100%',
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
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#FF6F00',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

export default SignupPage;


// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#fffaf0',
//     fontFamily: "'Poppins', sans-serif",
//     padding: '20px',
//     boxSizing: 'border-box',
//     overflow: 'hidden', // Ensure it hides overflow for neat design
//   },
//   formContainer: {
//     maxWidth: '450px',
//     width: '100%',
//     padding: '40px',
//     border: 'none',
//     borderRadius: '12px',
//     boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//     backgroundColor: '#fff',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: '-50px',
//     height: '100%',
//     overflow: 'auto', // Makes form scrollable if content overflows
//   },
//   title: {
//     fontSize: '32px',
//     fontWeight: '600',
//     marginBottom: '20px',
//     textAlign: 'center',
//     color: '#FF6F00',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px',
//     width: '100%',
//   },
//   inputGroup: {
//     display: 'flex',
//     gap: '20px',
//     width: '100%',
//   },
//   inputWrapper: {
//     flex: 1,
//   },
//   label: {
//     fontSize: '14px',
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: '8px',
//   },
//   input: {
//     padding: '12px',
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     fontSize: '14px',
//     width: '100%',
//     backgroundColor: '#f9f9f9',
//     outline: 'none',
//     transition: 'border 0.3s ease',
//   },
//   button: {
//     width: '100%',
//     padding: '14px',
//     backgroundColor: '#FF6F00',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '16px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
//   error: {
//     color: 'red',
//     fontSize: '14px',
//     marginBottom: '10px',
//     textAlign: 'center',
//   },
// };
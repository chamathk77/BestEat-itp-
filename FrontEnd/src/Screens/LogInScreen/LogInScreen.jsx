import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UpdateUserName } from "../../Redux/reducers/LoginReducer";
import CustomAlert from "../../Components/CommonAlert/CommonAlert";
import axios from "axios";

function LoginPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertDescription, setAlertDescription] = useState("");
  const [alertTopic, setAlertTopic] = useState("");
  const [buttonCount, setButtonCount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/Users/Login");
        console.log("users ---->>>>>: ", response.data);
        setUsers(response.data);
      } catch (error) {
        console.log("Error: ", error);
        setAlertTopic("Error");
        setAlertDescription("Something went wrong, please try again");
        setShowAlert(true);
        setButtonCount(2);
      }
    };
    fetchData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add logic for user login
  };

  const handleLoginRedirect = () => {
    console.log("login button clicked");

    let user_name_trimed = username.trim();
    let password_trimed = password.trim();

    let check_user = users
      ? users.filter(
          (user) =>
            user.username === user_name_trimed &&
            user.password === password_trimed
        )
      : [];

    if (check_user.length > 0) {
      console.log("user login");
      dispatch(UpdateUserName(username));
      localStorage.setItem("username", username);
      localStorage.setItem("userDetails", JSON.stringify(check_user));
      navigate("/homepage");
    } else {
      console.log("user invalid");
      setAlertTopic("Error");
      setAlertDescription("Invalid username or password");
      setShowAlert(true);
      setButtonCount(1);
      setUsername("");
      setPassword("");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  const onChangeUserName = (event) => {
    console.log("user name : ", event.target.value);
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    console.log("password: ", event.target.value);
    setPassword(event.target.value);
  };

  const handlePositiveAction = () => {
    setShowAlert(false);
  };

  const handleNegativeAction = () => {
    setShowAlert(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.brandTitle}>Best Eats</h1>
      <h2 style={styles.description}>
        Welcome to Best Eats, where world-class food brings you back for more.
      </h2>
      {/* Alert */}
      {showAlert && (
        <CustomAlert
          alertvisible={showAlert}
          onPositiveAction={handlePositiveAction}
          onNegativeAction={handleNegativeAction}
          alertDescription={alertDescription}
          alertTitle={alertTopic}
          buttonCount={buttonCount}
        />
      )}
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              style={styles.input}
              placeholder="Enter your username"
              onChange={onChangeUserName}
              value={username}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              style={styles.input}
              placeholder="Enter your password"
              onChange={onChangePassword}
              value={password}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onClick={handleLoginRedirect}
          >
            Login
          </button>
          <p style={styles.redirectText}>
            Don't have an account?{" "}
            <button
              onClick={handleSignupRedirect}
              style={styles.redirectButton}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
  },
  brandTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#ff6600", // Modern orange color
    marginBottom: "8px",
    textAlign: "center",
  },
  description: {
    fontSize: "18px",
    color: "#555",
    textAlign: "center",
    marginBottom: "32px",
  },
  formContainer: {
    maxWidth: "400px",
    width: "100%",
    padding: "24px",
    border: "none",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "8px",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff6600", // Orange theme for button
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#e65c00",
  },
  redirectText: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "16px",
  },
  redirectButton: {
    color: "#ff6600",
    border: "none",
    background: "none",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default LoginPage;

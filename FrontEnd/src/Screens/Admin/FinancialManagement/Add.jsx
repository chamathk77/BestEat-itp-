import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Add = () => {
  const [transaction, setDisplay] = useState({
    orderid: "",
    description: "",
    amount: "",
    date: "",
    paymentmethod: "Cash",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setDisplay((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validate fields
  const validateInputs = () => {
    const { orderid, amount } = transaction;

    // Check if orderid or amount are negative or empty
    if (!orderid || parseInt(orderid) <= 0) {
      toast.error("Order ID must be a positive number!");
      return false;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Amount must be a positive number!");
      return false;
    }
    return true;
  };

  // Handle form submission and API request
  const handleClick = async (e) => {
    e.preventDefault();

    // Perform validation checks before making the API call
    if (!validateInputs()) {
      return;
    }

    try {
      // Sending POST request to the API
      const response = await axios.post("http://localhost:8800/admin/transactions/add", transaction);
      console.log(response); // Log response to ensure it's successful

      // Show success notification
      toast.success('Transaction added successfully!');

      // Adding a small delay to ensure the toast notification is shown before redirecting
      setTimeout(() => {
        navigate("/admin/finance/display"); // Navigate to the display page after 1.5 seconds
      }, 1500);
    } catch (err) {
      // Log error to console and show failure notification
      console.log(err);
      toast.error('Failed to add the transaction!');
    }
  };

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      width: "300px",
      margin: "0 auto",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      width: "100%",
      borderRadius: "4px",
      border: "1px solid #ccc",
      marginBottom: "10px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.form}>
      <h1 style={styles.heading}>Add New Transaction</h1>
      <input
        type="number"
        placeholder="Order ID"
        onChange={handleChange}
        name="orderid"
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Transaction Description"
        onChange={handleChange}
        name="description"
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Amount"
        onChange={handleChange}
        name="amount"
        style={styles.input}
      />
      <input
        type="date"
        placeholder="Date"
        onChange={handleChange}
        name="date"
        style={styles.input}
      />
      <select
        name="paymentmethod"
        onChange={handleChange}
        style={styles.input}
        defaultValue="Cash"
      >
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="Paypal">Paypal</option>
        <option value="Bitcoins">Bitcoins</option>
      </select>
      <div>
        <button style={styles.button} onClick={handleClick}>
          Add
        </button>
      </div>
      <ToastContainer /> {/* Notification container */}
    </div>
  );
};

export default Add;

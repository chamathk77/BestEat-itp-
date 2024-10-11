import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Update = () => {
  const [transaction, setTransaction] = useState({
    orderid: "",
    description: "",
    amount: "",
    date: "",
    paymentmethod: "Cash",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const transactionId = location.pathname.split("/")[2];

  // Fetch transaction data by ID
  // useEffect(() => {
  //   console.log("Transaction ID:", transactionId);  // Debugging line
  //   const fetchTransaction = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:8800/transaction/${transactionId}`);
  //       console.log("Fetched Transaction:", res.data);  // Check fetched data
  //       setTransaction(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchTransaction();
  // }, [transactionId]);

  // Handle input changes
  const handleChange = (e) => {
    setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validate inputs before submission
  const validateInputs = () => {
    const { orderid, amount } = transaction;

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

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();

    // Validate inputs before making API request
    if (!validateInputs()) {
      return;
    }

    try {
      await axios.put(`http://localhost:8800/admin/transaction/${transactionId}`, transaction);
      toast.success("Transaction updated successfully!");
      
      // Adding a small delay to ensure the toast notification is shown before redirecting
      setTimeout(() => {
        navigate("/admin/finance/display");
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update the transaction!");
    }
  };


  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
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
      backgroundColor: "#007bff",
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
      <h1 style={styles.heading}>Update the Transaction</h1>
      <input
        type="number"
        placeholder="Order ID"
        value={transaction.orderid} // Display the fetched value
        onChange={handleChange}
        name="orderid"
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Transaction Description"
        value={transaction.description} // Display the fetched value
        onChange={handleChange}
        name="description"
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Amount"
        value={transaction.amount} // Display the fetched value
        onChange={handleChange}
        name="amount"
        style={styles.input}
      />
      <input
        type="date"
        placeholder="Date"
        value={transaction.date} // Display the fetched value
        onChange={handleChange}
        name="date"
        style={styles.input}
      />
      <select
        name="paymentmethod"
        value={transaction.paymentmethod} // Display the fetched value
        onChange={handleChange}
        style={styles.input}
      >
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="Paypal">Paypal</option>
        <option value="Bitcoins">Bitcoins</option>
      </select>
      <div>
        <button style={styles.button} onClick={handleClick}>
          Update
        </button>
      </div>
      <ToastContainer /> {/* Notification container */}
    </div>
  );
};

export default Update;

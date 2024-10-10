import React, { useEffect } from "react";

const Notification = ({ message, onClose }) => {
    
  useEffect(() => {
    // Automatically close the notification after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [onClose]);

  return (
    <div style={styles.notification}>
      <span>{message}</span>
    </div>
  );
};

const styles = {
  notification: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#ffcc00",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
};

export default Notification;

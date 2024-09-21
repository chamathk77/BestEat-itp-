import React, { useState } from "react";

const CustomAlert = ({
  alertvisible,
  onPositiveAction,
  onNegativeAction,
  alertDescription,
  alertTitle,
  buttonCount,
}) => {
  const [showAlert, setShowAlert] = useState(alertvisible);

  // const handlePositiveAction = () => {
  //   // Handle the positive action here
  //   setShowAlert(false);
  //   console.log('Positive button clicked');
  // };

  // const handleNegativeAction = () => {
  //   // Handle the negative action here
  //   setShowAlert(false);
  //   console.log('Negative button clicked');
  // };

  return (
    <div style={styles.container}>
      {showAlert && (
        <div style={styles.modalOverlay}>
          <div style={styles.alertContainer}>
            <h2 style={styles.alertTopic}>{alertTitle}</h2>
            <p style={styles.alertDescription}>{alertDescription}</p>

            {buttonCount === 2 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={() => onPositiveAction()}
                  style={styles.positiveBtn}
                >
                  Positive
                </button>
                <button
                  onClick={() => onNegativeAction()}
                  style={styles.negativeBtn}
                >
                  Negative
                </button>
              </div>
            )}

            {buttonCount === 1 && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => onNegativeAction()}
                  style={styles.negativeBtn}
                >
                  Okey
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    width: "300px",

    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  },
  alertTopic: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  alertDescription: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  positiveBtn: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "45%",
  },
  negativeBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "45%",
  },
  showAlertBtn: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CustomAlert;

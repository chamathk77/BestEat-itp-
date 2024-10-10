import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Scheduletime() {
  const [employee, setEmployee] = useState([]);
  const [editEmployee, setEditEmployee] = useState({
    id: '',
    week_start_date: '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    axios
      .get("http://localhost:8800/employee/display")
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle input changes for updating the schedule
  const handleChange = (e) => {
    setEditEmployee({ ...editEmployee, [e.target.name]: e.target.value });
  };

  // Function to submit updates for schedule
  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:8800/employee/updateshedule/${id}`, editEmployee)
      .then((res) => {
        alert("Schedule updated successfully");
        // Reload employee data after update 
        axios.get("http://localhost:8800/employee/display")
          .then((res) => setEmployee(res.data))
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: 'orange', textAlign: 'center' }}>Employee Schedule</h2>
      {employee.map((emp) => (
        <div key={emp.id} style={styles.employeeCard}>
          <p><strong>ID:</strong> {emp.id}</p>
          <p><strong>Name:</strong> {emp.Name}</p>
          <p><strong>Week Starting:</strong> {emp.week_start_date || 'N/A'}</p>
          <p><strong>Start Time:</strong> {emp.start_time || 'N/A'}</p>
          <p><strong>End Time:</strong> {emp.end_time || 'N/A'}</p>

          {/* Editable fields for updating schedule */}
          <div style={styles.formGroup}>
            <label>Update Week Start:</label>
            <input
              type="date"
              name="week_start_date"
              value={editEmployee.week_start_date}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Update Start Time:</label>
            <input
              type="time"
              name="start_time"
              value={editEmployee.start_time}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Update End Time:</label>
            <input
              type="time"
              name="end_time"
              value={editEmployee.end_time}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button 
            onClick={() => handleUpdate(emp.id)} 
            style={styles.button}
          >
            Update Schedule
          </button>
        </div>
      ))}
    </div>
  );
}

// Inline styles
const styles = {
  employeeCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px 0',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: 'orange',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  }
};

export default Scheduletime;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';  // Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link, useNavigate } from "react-router-dom";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = () => {
  const [expiringItems, setExpiringItems] = useState([]);
  const [alertCount, setAlertCount] = useState(0); // State for alert count
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpiringItems = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/expiring-items');
        setExpiringItems(response.data);

        // Check for items that will expire in 3 days or less
        const alertItems = response.data.filter(item => {
          const expireDate = new Date(item.expire_date);
          const today = new Date();
          const daysLeft = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));
          return daysLeft <= 3; // Customize the threshold here
        });

        setAlertCount(alertItems.length); // Set alert count

      } catch (error) {
        console.error('Error fetching expiring items:', error);
      }
    };

    fetchExpiringItems();
  }, []);

  const downloadReport = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/generate-report', {
        responseType: 'blob', // Important for CSV download
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expiring-items-report.csv'); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the report:', error);
    }
  };

  const data = {
    labels: expiringItems.map(item => item.name),
    datasets: [
      {
        label: 'Days Left Until Expiry',
        data: expiringItems.map(item => {
          const expireDate = new Date(item.expire_date);
          const today = new Date();
          return Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="dashboard-section">
      <nav className="navbar">
        <div className="nav-container">
          <button className="nav-button" onClick={() => navigate("/admin/displayinventory")}>
            Display Items
          </button>
          <button className="nav-button" onClick={() => navigate("/admin/addinventory")}>
            Add Items
          </button>
          <button className="nav-button" onClick={downloadReport}>
            Generate Report
          </button>
        </div>
      </nav>
      <h2>Items Expiring Soon</h2>
      
      {/* Alert Box */}
      {alertCount > 0 && (
        <div className="alert-box">
          Warning: You have {alertCount} item(s) expiring in 3 days or less!
        </div>
      )}
      
      <div className="chart-table-container">
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Expiry Date</th>
              <th>Days Left</th>
            </tr>
          </thead>
          <tbody>
            {expiringItems.map(item => {
              const expireDate = new Date(item.expire_date);
              const today = new Date();
              const daysLeft = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));

              return (
                <tr key={item.item_id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{expireDate.toLocaleDateString()}</td>
                  <td style={{ color: daysLeft < 3 ? 'red' : 'black' }}>{daysLeft}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardChart;

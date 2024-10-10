import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from "react-router-dom";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = () => {
  const [expiringItems, setExpiringItems] = useState([]);
  const [alertCount, setAlertCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpiringItems = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/expiring-items');
        setExpiringItems(response.data);

        const alertItems = response.data.filter(item => {
          const expireDate = new Date(item.expire_date);
          const today = new Date();
          const daysLeft = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));
          return daysLeft <= 3;
        });

        setAlertCount(alertItems.length);

      } catch (error) {
        console.error('Error fetching expiring items:', error);
      }
    };

    fetchExpiringItems();
  }, []);

  const downloadReport = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/generate-report', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expiring-items-report.csv');
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
        backgroundColor: 'rgba(255, 140, 0, 0.6)', // Lighter orange
        borderColor: 'rgba(255, 140, 0, 1)', // Darker orange
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow width and height control
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
            weight: 'bold',
            color: '#333', // Dark gray for better readability
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold',
            color: '#333',
          },
        },
      },
    },
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f2f2f2', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <nav style={{ backgroundColor: '#ff9800', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button 
            style={{
              backgroundColor: 'white', 
              color: '#ff9800', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.3s',
              boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
            }} 
            onClick={() => navigate("/admin/displayinventory")}
          >
            Display Items
          </button>
          <button 
            style={{
              backgroundColor: 'white', 
              color: '#ff9800', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.3s',
              boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
            }} 
            onClick={() => navigate("/admin/addinventory")}
          >
            Add Items
          </button>
          <button 
            style={{
              backgroundColor: 'white', 
              color: '#ff9800', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.3s',
              boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
            }} 
            onClick={downloadReport}
          >
            Generate Report
          </button>
        </div>
      </nav>
      <h2 style={{ marginTop: '0', color: '#ff9800' }}>Items Expiring Soon</h2>
      
      {/* Alert Box */}
      {alertCount > 0 && (
        <div style={{ backgroundColor: '#ffcc80', color: '#333', padding: '15px', borderRadius: '5px', margin: '15px 0', fontWeight: 'bold' }}>
          Warning: You have {alertCount} item(s) expiring in 3 days or less!
        </div>
      )}
      
      <div style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '20px', width: '100%', height: '250px' }}> {/* Set width and height for the chart */}
          <Bar data={data} options={options} />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', boxShadow: '0 1px 5px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', backgroundColor: '#ff9800', color: 'white', borderBottom: '2px solid #ccc' }}>Item Name</th>
              <th style={{ padding: '12px', backgroundColor: '#ff9800', color: 'white', borderBottom: '2px solid #ccc' }}>Category</th>
              <th style={{ padding: '12px', backgroundColor: '#ff9800', color: 'white', borderBottom: '2px solid #ccc' }}>Expiry Date</th>
              <th style={{ padding: '12px', backgroundColor: '#ff9800', color: 'white', borderBottom: '2px solid #ccc' }}>Days Left</th>
            </tr>
          </thead>
          <tbody>
            {expiringItems.map(item => {
              const expireDate = new Date(item.expire_date);
              const today = new Date();
              const daysLeft = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));

              return (
                <tr key={item.item_id} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>{item.name}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>{item.category}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>{expireDate.toLocaleDateString()}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ccc', color: daysLeft < 3 ? 'red' : 'black' }}>{daysLeft}</td>
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import { Line } from 'react-chartjs-2';

// Register all necessary components
Chart.register(...registerables);

const Forecast = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8800/admin/transactions'); // Adjust the URL if necessary
        setHistoricalData(res.data);
        calculateForecast(res.data); // Calculate forecast after fetching data
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const calculateForecast = (data) => {
    const salesData = data.map(transaction => transaction.amount);
    const forecast = []; // Initialize an array to hold forecasted values

    // Simple moving average calculation for forecasting (you can use any forecasting method you prefer)
    const period = 3; // Number of periods to calculate average
    for (let i = 0; i < salesData.length; i++) {
      if (i >= period - 1) {
        const avg = salesData.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
        forecast.push(avg);
      } else {
        forecast.push(null); // Push null for unavailable forecast data
      }
    }

    setForecastData(forecast);
  };

  const chartData = {
    labels: historicalData.map(transaction => transaction.date), // Adjust based on date format
    datasets: [
      {
        label: 'Historical Data',
        data: historicalData.map(transaction => transaction.amount),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        fill: true,
      },
      {
        label: 'Forecast Data',
        data: forecastData,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        fill: true,
      },
    ],
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>Budget Forecast</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Forecast;

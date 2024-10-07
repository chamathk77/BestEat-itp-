import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderAssign() {
  const [driverdata, setDriverdata] = useState([]);
  const [orderdata, setOrderdata] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState({});
  const [status, setStatus] = useState({});

  // Fetch orders that are not delivered
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/ordersTransport");
        const filteredData = response.data.filter(
          (data) => data.is_delivered === "N" || data.is_delivered === "P"
        );

        // Initialize selected driver and status if they are already assigned
        const initialSelectedDriver = {};
        const initialStatus = {};
        filteredData.forEach((order) => {
          initialSelectedDriver[order.OrderID] = order.driverId || ""; // Existing driver or empty if not assigned
          initialStatus[order.OrderID] = order.is_delivered || "N"; // Existing status or "N" if not set
        });

        setSelectedDriver(initialSelectedDriver);
        setStatus(initialStatus);
        setOrderdata(filteredData);
      } catch (error) {
        console.log("Error fetching orders: ", error);
      }
    };
    fetchOrderData();
  }, []);

  // Fetch available drivers
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/driver/Assigndriver");
        setDriverdata(response.data.payload);
      } catch (error) {
        console.log("Error fetching drivers: ", error);
      }
    };
    fetchDriverData();
  }, []);

  // Handle driver selection
  const handleDriverChange = (orderId, driverId) => {
    setSelectedDriver((prevState) => ({
      ...prevState,
      [orderId]: driverId,
    }));
  };

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    setStatus((prevState) => ({
      ...prevState,
      [orderId]: newStatus,
    }));
  };

  // Submit updated order information (driver and status)
  const handleUpdate = async (orderId) => {
    const driverId = selectedDriver[orderId];
    const orderStatus = status[orderId];

    console.log("Driver ID:", driverId);
    console.log("Order Status:", orderStatus);
    console.log("Order ID:", orderId);

    try {
      await axios.put(`http://localhost:8800/order/assign/${orderId}`, {
        driverId: driverId,
        is_delivered: orderStatus,
      });
      window.location.reload();
    } catch (error) {
      console.log("Error updating order: ", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Assign Drivers and Update Order Status
      </h2>
      {orderdata.map((order) => (
        <div key={order.OrderID} style={styles.orderCard}>
          <div style={styles.orderDetails}>
            <p><strong>Order ID:</strong> {order.OrderID}</p>
            <p><strong>Customer:</strong> {order.username}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Total Amount:</strong> {order.TotalAmount}</p>
            <p><strong>Current Status:</strong> {order.is_delivered === "N" ? "Not Delivered" : order.is_delivered === "P" ? "Pending" : "Delivered"}</p>
          </div>
          
          <div style={styles.dropdownSection}>
            <label htmlFor="driver">Assign Driver:</label>
            <select
              id="driver"
              value={selectedDriver[order.OrderID] || ""}
              onChange={(e) => handleDriverChange(order.OrderID, e.target.value)}
              style={styles.select}
            >
              <option value="">Select Driver</option>
              {driverdata.map((driver) => (
                <option key={driver.Driver_ID} value={driver.Driver_ID}>
                  {`${driver.Name} (${driver.BikeID})`}
                </option>
              ))}
            </select>
          </div>
          
          <div style={styles.dropdownSection}>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status[order.OrderID] || "N"}
              onChange={(e) => handleStatusChange(order.OrderID, e.target.value)}
              style={styles.select}
            >
              <option value="N">Not Delivered</option>
              <option value="Y">Delivered</option>
              <option value="P">Pending</option>
            </select>
          </div>

          <button onClick={() => handleUpdate(order.OrderID)} style={styles.updateButton}>
            Update Order
          </button>
        </div>
      ))}
    </div>
  );
}

export default OrderAssign;

const styles = {
  orderCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDetails: {
    flex: "1",
  },
  dropdownSection: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "20px",
  },
  select: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  updateButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "20px",
  },
};

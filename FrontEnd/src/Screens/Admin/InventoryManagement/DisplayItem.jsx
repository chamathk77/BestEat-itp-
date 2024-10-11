import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function DisplayItem() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [updatedRQuantity, setUpdatedRQuantity] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemNotFound, setItemNotFound] = useState(false);

  useEffect(() => {
    fetchAllItems();
  }, []);

  const navigate = useNavigate();

  const fetchAllItems = async () => {
    try {
      const res = await axios.get("http://localhost:8800/items");
      setItems(res.data);
      setFilteredItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getStockAlert = (orderQuantity, maxQuantity) => {
    const threshold = maxQuantity * 0.9; // Alert if order quantity is 90% or more of max quantity
    if (orderQuantity >= threshold) {
      return (
        <span style={{ color: "orange", fontWeight: "bold", marginLeft: "10px" }}>
          Near Max Capacity
        </span>
      );
    }
    return null;
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.id.toString().includes(query)
    );
    setFilteredItems(filtered);
    setItemNotFound(filtered.length === 0);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8800/items/${itemToDelete}`);
      setItems(items.filter((item) => item.id !== itemToDelete));
      setFilteredItems(filteredItems.filter((item) => item.id !== itemToDelete));
      setShowConfirm(false);
      setItemToDelete(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const handleRQuantityChange = (e, id) => {
    setUpdatedRQuantity((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const handleUpdateRQuantity = async (id) => {
    const updatedQuantity = parseInt(updatedRQuantity[id]);
  
    // Validation to check if order quantity is negative
    if (updatedQuantity < 0) {
      setErrorMessage("Order quantity cannot be negative.");
      setShowSuccessMessage(false);
      return;
    }
  
    if (updatedQuantity > parseInt(items.find((item) => item.id === id).quantity)) {
      setErrorMessage("Order quantity cannot exceed the Max quantity.");
      setShowSuccessMessage(false);
      return;
    }
  
    try {
      await axios.put(`http://localhost:8800/itemss/${id}`, {
        rquantity: updatedRQuantity[id],
      });
  
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, rquantity: updatedRQuantity[id] } : item
        )
      );
  
      setErrorMessage("");
      setShowSuccessMessage(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const handleGenerateCSVReport = async () => {
    try {
      const res = await axios.get("http://localhost:8800/admin/generatereport", {
        responseType: 'blob', 
      });
  
      const url = window.URL.createObjectURL(new Blob([res.data])); // Create a URL for the blob
      const a = document.createElement("a"); // Create a link element
      a.href = url;
      a.download = "item_report.csv"; // File name for the downloaded report
      a.click(); // Trigger download
      window.URL.revokeObjectURL(url); // Clean up URL object after download
    } catch (err) {
      console.log("Error generating CSV report:", err);
    }
  };

  

  return (
    <div
  className="item-list-container"
  style={{
    position: "relative",
    padding: "20px",
    backgroundColor: "#f8f9fa",
  }}
>
  <nav
    className="navbar"
    style={{
      backgroundColor: "#b1acac",
      padding: "10px",
    }}
  >
    <div
      className="nav-container"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "10px",
      }}
    >
      <button
        className="nav-button"
        style={{
          backgroundColor: "#ff9800",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          marginRight: "10px",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => navigate("/admin/dashboardchart")}
      >
        DashBoard
      </button>

      <button
        className="nav-button"
        style={{
          backgroundColor: "#ff9800",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          marginRight: "10px",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => navigate("/admin/addinventory")}
      >
        Add Items
      </button>

      <button
        className="nav-button"
        style={{
          backgroundColor: "#ff9800",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          marginRight: "10px",
          transition: "background-color 0.3s ease",
        }}
        onClick={handleGenerateCSVReport}
      >
        Generate Report [Item List]
      </button>

      <div
        className="search-bar"
        style={{
          flexGrow: 1,
          padding: "0px",
          borderRadius: "4px",
          border: "1px solid #ced4da",
          marginLeft: "10px",
          fontSize: "14px",
        }}
      >
        <input
          type="text"
          placeholder="Search by name or code"
          value={searchQuery}
          onChange={handleSearch}
          className="form-control"
          style={{
            width: "200px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ced4da",
          }}
        />
      </div>
    </div>
    <div
      className="item-count"
      style={{
        position: 'flex',
        top: '35px',
        right: '18px',
        backgroundColor: '#f8f9fa',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px'
      }}
    >
      <h3>Total Items: {filteredItems.length}</h3>
    </div>
  </nav>


  {itemNotFound && (
    <div
      style={{
        color: "red",
        marginBottom: "20px",
      }}
    >
      Item not found.
    </div>
  )}

  <table
    className="table table-bordered"
    style={{
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#f9f9f9",
    }}
  >
    <thead>
      <tr>
        <th scope="col" style={{ backgroundColor: "#ff9800", color: "white", textAlign: "center", padding: "10px" }}>Item Code</th>
        <th scope="col" style={{ backgroundColor: "#ff9800", color: "white", textAlign: "center", padding: "10px" }}>Item Name</th>
        <th scope="col" style={{ backgroundColor: "#ff9800", color: "white", textAlign: "center", padding: "10px" }}>Category</th>
        <th scope="col" style={{ backgroundColor: "#ff9800", color: "white", textAlign: "center", padding: "10px" }}>Unit Price (LKR)</th>
        <th scope="col" style={{ backgroundColor: "#ff9800", color: "white", textAlign: "center", padding: "10px" }}>Maximum Quantity (kg)</th>
        <th scope="col" style={{ backgroundColor: "#ff9800", color: "white", textAlign: "center", padding: "10px" }}>Order Quantity (kg)</th>
        <th scope="col" style={{ backgroundColor: "#ff9800", color: "white", textAlign: "center", padding: "10px" }}>Expire Date</th>
        <th scope="col" style={{ backgroundColor: "#ff9800", color: "white", textAlign: "center", padding: "10px" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredItems.map((item) => (
        <tr key={item.id}>
          <th scope="row" style={{ textAlign: "center", padding: "15px", border: "1px solid #ddd" }}>{item.id}</th>
          <td style={{ textAlign: "center", padding: "15px", border: "1px solid #ddd" }}>
            <input type="text" value={item.name} className="form-control" style={{ width: "100px", textAlign: "center", margin: "0 auto", display: "inline-block" }} readOnly />
          </td>
          <td style={{ textAlign: "center", padding: "15px", border: "1px solid #ddd" }}>
            <input type="text" value={item.category} className="form-control" style={{ width: "100px", textAlign: "center", margin: "0 auto", display: "inline-block" }} readOnly />
          </td>
          <td style={{ textAlign: "center", padding: "15px", border: "1px solid #ddd" }}>
            <input type="number" value={item.unit_price} className="form-control" style={{ width: "100px", textAlign: "center", margin: "0 auto", display: "inline-block" }} readOnly />
          </td>
          <td style={{ textAlign: "center", padding: "15px", border: "1px solid #ddd" }}>
            <input type="number" value={item.quantity} className="form-control" style={{ width: "100px", textAlign: "center", margin: "0 auto", display: "inline-block" }} readOnly />
          </td>
          <td style={{ textAlign: "center", padding: "15px", border: "1px solid #ddd" }}>
         
            <input type="number" value={updatedRQuantity[item.id] ?? item.rquantity} className="form-control" style={{ width: "100px", textAlign: "center", margin: "0 auto", display: "inline-block" }} onChange={(e) => handleRQuantityChange(e, item.id)} />
            <button
              className="update"
              style={{
                backgroundColor: "#28a745",
                color: "white",
                margin: "5px",
                padding: "5px 10px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => handleUpdateRQuantity(item.id)}
            >
              Update
            </button>
          </td>
          <td style={{ textAlign: "center", padding: "15px", border: "1px solid #ddd" }}>
              <input
                  type="date"
                  value={item.expire_date ? item.expire_date.split('T')[0] : ""}
                      className="date-form-control"
                      style={{ width: "120px", textAlign: "center", margin: "0 auto", display: "inline-block" }}
                      readOnly
                />
          </td>
          <td style={{ textAlign: "center", padding: "15px", border: "1px solid #ddd" }}>
            <button className="delete" style={{ backgroundColor: "#dc3545", color: "white", marginTop: "20px", padding: "5px 10px", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "14px" }} onClick={() => handleDeleteClick(item.id)}>Delete</button>
            <button className="update" style={{ backgroundColor: "#28a745", color: "white", margin: "5px", padding: "5px 10px", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "14px" }}>
              <Link to={`/admin/update/${item.id}`} style={{ color: "white", textDecoration: "none" }}>Update</Link>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {showConfirm && (
        <div style={{ marginTop: "20px", color: "red" }}>
          Are you sure you want to delete this item?
          <button style={{ marginLeft: "10px", padding: "5px", backgroundColor: "#F44336", color: "white", border: "none", borderRadius: "5px" }} onClick={handleDeleteConfirm}>Confirm</button>
          <button style={{ marginLeft: "10px", padding: "5px", backgroundColor: "#9E9E9E", color: "white", border: "none", borderRadius: "5px" }} onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}

      {showSuccessMessage && (
        <div style={{ marginTop: "20px", color: "green" }}>
          Order quantity updated successfully!
          <button style={{ marginLeft: "10px", padding: "5px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }} onClick={handleCloseSuccessMessage}>
            Close
          </button>
        </div>
      )}

      {errorMessage && (
        <div style={{ marginTop: "20px", color: "red" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );

}

export default DisplayItem;

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
    if (
      parseInt(updatedRQuantity[id]) >
      parseInt(items.find((item) => item.id === id).quantity)
    ) {
      setErrorMessage("Order quantity cannot exceed the Max quantity.");
      setShowSuccessMessage(false);
      return;
    }

    try {
      await axios.put(`http://localhost:8800/items/${id}`, {
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
        responseType: 'blob', // Specify response type as blob for CSV file
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
    <div className="item-list-container">
      <nav className="navbar">
        <div className="nav-container">
        <button
            className="nav-button"
            onClick={() => navigate("/admin/dashboardchart")}
          >
            DashBoard
          </button>

          <button
            className="nav-button"
            onClick={() => navigate("/admin/addinventory")}
          >
            Add Items
          </button>

          <button className="nav-button" onClick={handleGenerateCSVReport}>
              Generate CSV Report
          </button>

          {/* Search bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name or code"
              value={searchQuery}
              onChange={handleSearch}
              className="form-control"
              style={{ width: "200px" }}
            />
          </div>
        </div>
        <div className="item-count">
          <h3>Total Items: {filteredItems.length}</h3>
        </div>
      </nav>

      {itemNotFound && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          Item not found.
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Item Code</th>
            <th scope="col">Item Name</th>
            <th scope="col">Category</th>
            <th scope="col">Unit Price (LKR)</th>
            <th scope="col">Maximum Quantity (kg)</th>
            <th scope="col">Order Quantity (kg)</th>
            <th scope="col">Expire Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>
                <input
                  type="text"
                  value={item.name}
                  className="form-control"
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.category}
                  className="form-control"
                  readOnly
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.unit_price}
                  className="form-control"
                  readOnly
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  className="form-control"
                  readOnly
                />
              </td>
              <td>
                <input
                  type="number"
                  value={updatedRQuantity[item.id] ?? item.rquantity}
                  className="form-control"
                  onChange={(e) => handleRQuantityChange(e, item.id)}
                />
                <button
                  className="update"
                  onClick={() => handleUpdateRQuantity(item.id)}
                >
                  Update
                </button>
              </td>
              <td>
                <input
                  type="date"
                  value={item.expire_date ? new Date(item.expire_date).toISOString().split('T')[0] : ""} // Convert to YYYY-MM-DD format
                  className="date-form-control"
                  readOnly
                />
              </td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDeleteClick(item.id)}
                >
                  Delete
                </button>
                <button className="update">
                  <Link to={`/admin/update/${item.id}`}>Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {errorMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p style={{ color: "red" }}>{errorMessage}</p>
            <button className="confirm" onClick={() => setErrorMessage("")}>
              OK
            </button>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <button className="confirm" onClick={handleDeleteConfirm}>
              Yes
            </button>
            <button className="cancel" onClick={handleCancelDelete}>
              No
            </button>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Remaining Quantity Updated Successfully!</p>
            <button className="confirm" onClick={handleCloseSuccessMessage}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayItem;

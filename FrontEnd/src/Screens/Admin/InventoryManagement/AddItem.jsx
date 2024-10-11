import React, { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const [item, setItem] = useState({
    name: "",
    category: "",
    unit_price: "",
    quantity: "",
    expire_date: "",
  });

  const [errors, setErrors] = useState({
    unit_price: "",
    quantity: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    let valid = true;
    let tempErrors = { unit_price: "", quantity: "" };

    if (item.unit_price < 0) {
      tempErrors.unit_price = "Unit Price cannot be a negative value.";
      valid = false;
    }

    if (item.quantity < 0) {
      tempErrors.quantity = "Quantity cannot be a negative value.";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        await axios.post("http://localhost:8800/items", item);
        navigate("/admin/displayinventory");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <nav style={{ backgroundColor: "#b1acac", padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "10px",
          }}
        >
          <button
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
            onClick={() => navigate("/admin/displayinventory")}
          >
            Display Items
          </button>
          <button
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
            onClick={() => navigate("/admin/update/:id")}
          >
            Update Items
          </button>
        </div>
      </nav>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f8f9fa",
          marginBottom: "100px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            width: "350px",
            border: "1px solid #ccc",
          }}
        >
          <h1 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "15px" }}>
            Add New Item
          </h1>
          <form>
            <label style={{ fontWeight: "bold" }}>
              Item Name
              <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                <input
                  style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ced4da", fontSize: "14px" }}
                  type="text"
                  placeholder="name"
                  onChange={handleChange}
                  value={item.name}
                  name="name"
                />
              </div>
            </label>

            {/* Move Category input here */}
            <label style={{ fontWeight: "bold" }}>
              Category
              <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                <select
                  style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ced4da", fontSize: "14px" }}
                  name="category"
                  value={item.category}
                  onChange={handleChange}
                >
                  <option value="Blank">Select</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Meat">Meat</option>
                  <option value="Spices">Spices</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
            </label>

            <label style={{ fontWeight: "bold" }}>
              Unit Price
              <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                <input
                  style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ced4da", fontSize: "14px" }}
                  type="number"
                  placeholder="Unit Price"
                  onChange={handleChange}
                  value={item.unit_price}
                  name="unit_price"
                />
                {errors.unit_price && <p style={{ color: "red" }}>{errors.unit_price}</p>}
              </div>
            </label>

            <label style={{ fontWeight: "bold" }}>
              Maximum Quantity
              <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                <input
                  style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ced4da", fontSize: "14px" }}
                  type="number"
                  placeholder="Max Quantity"
                  onChange={handleChange}
                  value={item.quantity}
                  name="quantity"
                />
                {errors.quantity && <p style={{ color: "red" }}>{errors.quantity}</p>}
              </div>
            </label>

            <label style={{ fontWeight: "bold" }}>
              Expire Date
              <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                <input
                  style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ced4da", fontSize: "14px" }}
                  type="date"
                  placeholder="Expire date"
                  onChange={handleChange}
                  value={item.expire_date}
                  name="expire_date"
                />
              </div>
            </label>

            <button
              style={{
                backgroundColor: "#ff9800",
                borderColor: "#000",
                padding: "10px 20px",
                fontSize: "14px",
                borderRadius: "4px",
                color: "#ffffff",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              onClick={handleClick}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItem;

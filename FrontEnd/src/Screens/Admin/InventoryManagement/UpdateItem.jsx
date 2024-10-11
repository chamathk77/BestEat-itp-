import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateItem() {
  const [item, setItem] = useState({
    name: "",
    category: "",
    unit_price: null,
    quantity: null,
    rquantity: null,
    expire_date: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const itemId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/items/${itemId}`);
        setItem(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validations
    if (parseInt(item.rquantity) > parseInt(item.quantity)) {
      setErrorMessage("Order quantity cannot exceed the total quantity.");
      return;
    }

    if (parseInt(item.rquantity) < 0) {
      setErrorMessage("Order quantity cannot be a negative value.");
      return;
    }

    if (parseInt(item.quantity) < 0) {
      setErrorMessage("Max quantity cannot be a negative value.");
      return;
    }

    if (parseFloat(item.unit_price) < 0) {
      setErrorMessage("Unit price cannot be a negative value.");
      return;
    }

    try {
      await axios.put(`http://localhost:8800/items/${itemId}`, item);
      navigate("/admin/displayinventory");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <nav
        style={{
          backgroundColor: "#b1acac",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            maxWidth: "1200px",
          }}
        >
          <button
            style={{
              backgroundColor: "#1d1e1e",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              marginRight: "10px",
            }}
            onClick={() => navigate("/admin/displayinventory")}
          >
            Display Items
          </button>
          <button
            style={{
              backgroundColor: "#1d1e1e",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              marginLeft: "0px",
            }}
            onClick={() => navigate("/admin/addinventory")}
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
            Update Item
          </h1>
          <form>
            <label style={{ fontWeight: "bold" }}>
              Item Name
              <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                <input
                  style={{
                    fontWeight: "lighter",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ced4da",
                    fontSize: "14px",
                  }}
                  type="text"
                  placeholder="name"
                  onChange={handleChange}
                  value={item.name}
                  name="name"
                />
              </div>
            </label>

            <label style={{ fontWeight: "bold" }}>
              Category
              <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                <select
                  style={{
                    fontWeight: "lighter",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ced4da",
                    fontSize: "14px",
                  }}
                  name="category"
                  placeholder="Category"
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
                  style={{
                    fontWeight: "lighter",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ced4da",
                    fontSize: "14px",
                  }}
                  type="number"
                  placeholder="Unit Price"
                  onChange={handleChange}
                  value={item.unit_price}
                  name="unit_price"
                />
              </div>
            </label>

            <label style={{ fontWeight: "bold" }}>
              Maximum Quantity
              <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                <input
                  style={{
                    fontWeight: "lighter",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ced4da",
                    fontSize: "14px",
                  }}
                  type="number"
                  placeholder="Max Quantity"
                  onChange={handleChange}
                  value={item.quantity}
                  name="quantity"
                />
              </div>
            </label>


            <label style={{ fontWeight: "bold" }}>
              Expire Date
              <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                <input
                  style={{
                    fontWeight: "lighter",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ced4da",
                    fontSize: "14px",
                  }}
                  type="date"
                  placeholder="Expire date"
                  onChange={handleChange}
                  value={item.expire_date}
                  name="expire_date"
                />
              </div>
            </label>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <button
              style={{
                backgroundColor: "#281bdc",
                borderColor: "#000",
                padding: "10px 20px",
                fontSize: "14px",
                borderRadius: "4px",
                color: "#ffffff",
                display: "block",
                margin: "0 auto",
              }}
              onClick={handleClick}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateItem;

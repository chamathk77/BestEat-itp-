import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../../Components/CommonAlert/CommonAlert";

function AddFood() {
  const navigator = useNavigate();
  const [foodName, setFoodName] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertDescription, setAlertDescription] = useState("");
  const [alertTopic, setAlertTopic] = useState("");
  const [buttonCount, setButtonCount] = useState(1);
  const [positiveButton, setPositiveButton] = useState(false);
  const [negartiveButton, setNegartiveButton] = useState(false);

  const validateForm = () => {
    if (!foodName || !foodCategory || !imageUrl || !price) {
      setAlertTopic("Invalid Input");
      setAlertDescription("Please fill out all fields.");
      setButtonCount(1);
      setShowAlert(true);
      setNegartiveButton(true);
      setPositiveButton(false);
      return false;
    }

    if (isNaN(price) || price < 0) {
      setAlertTopic("Invalid Input");
      setAlertDescription("Please enter a valid price.");
      setButtonCount(1);
      setShowAlert(true);
      setNegartiveButton(true);
      setPositiveButton(false);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newFood = {
      name: foodName,
      category: foodCategory,
      image: imageUrl,
      price: price,
    };

    try {
      const response = await axios.post(
        "http://localhost:8800/admin/addfood",
        newFood
      );
      console.log("Food added successfully:", response.data);

      // Clear form fields after submission
      setFoodName("");
      setFoodCategory("");
      setImageUrl("");
      setPrice("");

      setAlertTopic("Success");
      setAlertDescription("New food added successfully.");
      setButtonCount(1);
      setShowAlert(true);
      setPositiveButton(true);
      setNegartiveButton(false);

      
    } catch (error) {
      console.error("Error adding food:", error);

      setAlertTopic("Error");
      setAlertDescription("Server error. Please try again later.");
      setButtonCount(1);
      setShowAlert(true);
      setNegartiveButton(true);
      setPositiveButton(false);
    }
  };

  const handlePositiveAction = () => {
    setShowAlert(false);
    console.log("Positive button clicked");

   navigator("/admin/displayfoodlist");
  };

  
  const handleNegativeAction = () => {
    setShowAlert(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {/* Alert */}
      {showAlert && (
        <CustomAlert
          alertvisible={showAlert}
          onPositiveAction={handlePositiveAction}
          onNegativeAction={handleNegativeAction}
          alertDescription={alertDescription}
          alertTitle={alertTopic}
          buttonCount={buttonCount}
          positiveButton={positiveButton}
          negartiveButton={negartiveButton}
        />
      )}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Add New Food
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Food Name Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Food Name
          </label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter food name"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        {/* Food Category Dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Food Category
          </label>
          <select
            value={foodCategory}
            onChange={(e) => setFoodCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="salad">Salad</option>
            <option value="burger">Burger</option>
            <option value="chicken">Chicken</option>
            <option value="pizza">Pizza</option>
          </select>
        </div>

        {/* Image URL Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Image URL
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        {/* Price Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFood;

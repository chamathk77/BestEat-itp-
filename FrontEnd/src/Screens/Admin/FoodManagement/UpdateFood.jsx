import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../../Components/CommonAlert/CommonAlert";
import { useSelector } from "react-redux";

function UpdateFood() {
  const foodName_state = useSelector((state) => state.Login.selectedFood.foodName);
  const foodCategory_state = useSelector((state) => state.Login.selectedFood.foodCategory);
  const imageUrl_state = useSelector((state) => state.Login.selectedFood.imageUrl);
  const price_state = useSelector((state) => state.Login.selectedFood.price);
  const id = window.location.pathname.split("/")[3];

  const navigator = useNavigate();

  // Local state to manage form input
  const [foodName, setFoodName] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertDescription, setAlertDescription] = useState("");
  const [alertTopic, setAlertTopic] = useState("");
  const [buttonCount, setButtonCount] = useState(1);

  // Initialize form values with Redux state on component mount
  useEffect(() => {
    setFoodName(foodName_state || "");
    setFoodCategory(foodCategory_state || "");
    setImageUrl(imageUrl_state || "");
    setPrice(price_state || "");
  }, [foodName_state, foodCategory_state, imageUrl_state, price_state]);

  // Function to handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const updatedFood = {
        name: foodName,
        category: foodCategory,
        image: imageUrl,
        price: price,
      };

      console.log("updatedFood--------------", updatedFood);
      await axios.put("http://localhost:8800/admin/updatefood/" + id, updatedFood);
      navigator("/admin/displayfoodlist");
    } catch (error) {
      console.log(error);
      setAlertTopic("Error");
      setAlertDescription("Something went wrong, please try again");
      setShowAlert(true);
      setButtonCount(1);
    }
  };

  const handlePositiveAction = () => {
    setShowAlert(false);
    console.log("Positive button clicked");
  };

  const handleNegativeAction = () => {
    setShowAlert(false);
    console.log("Negative button clicked");
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
        Update Food
      </h1>

      <form onSubmit={handleClick}>
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
            Update Food
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateFood;

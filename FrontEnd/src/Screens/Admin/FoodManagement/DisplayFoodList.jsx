import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CustomAlert from "../../../Components/CommonAlert/CommonAlert";
import { UpdateSelectedFood } from "../../../Redux/reducers/LoginReducer";
import { useDispatch } from "react-redux";
function DisplayFoodList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [food, setFood] = useState([]);
  const [filterdData, setFilterdData] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertDescription, setAlertDescription] = useState("");
  const [alertTopic, setAlertTopic] = useState("");
  const [buttonCount, setButtonCount] = useState(1);

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8800/dashboard/foods"
          );
          console.log("Food Data: ", response.data);
          setFood(response.data);
          setFilterdData(response.data);
        } catch (error) {
          console.log("Error: ", error);

          setAlertTopic("Error");
          setAlertDescription("Something went wrong please try again");
          setShowAlert(true);
          setButtonCount(2);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function filterType(category) {
    setFilterdData(
      food.filter((item) => {
        return item.category === category;
      })
    );
  }

  const handleUpdate = (id, name, image, price, category) => {
    console.log("Updating item with id: ", id);
    console.log("Updating item with name: ", name);
    console.log("Updating item with image: ", image);
    console.log("Updating item with price: ", price);
    console.log("Updating item with category: ", category);

    dispatch(
      UpdateSelectedFood({
        foodName: name,
        foodCategory: category,
        imageUrl: image,
        price: price,
      })
    );
    console.log("Updating item with id: ", id);
    navigate(`/admin/updatefood/${id}`);
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/admin/fooddelete/${id}`);
      window.location.reload();
    } catch (error) {
      setAlertTopic("Error");
      setAlertDescription("Something went wrong please try again");
      setShowAlert(true);
      setButtonCount(1);

      console.log(error);
    }
  };

  const handlePositiveAction = () => {
    // Handle the positive action here
    setShowAlert(false);
    console.log("Positive button clicked");
  };

  const handleNegativeAction = () => {
    // Handle the negative action here
    setShowAlert(false);
    console.log("Negative button clicked");
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* alert */}
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
          margin: "20px 0",
          fontSize: "36px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Food Menu List
      </h1>

      <div className="flex justify-between flex-wrap max-w-[490px]">
        <button
          onClick={() => setFilterdData(food)}
          className="m-1 border-orange-800 text-orange-600 hover:bg-orange-600 hover:text-white"
        >
          All
        </button>
        <button
          onClick={() => filterType("burger")}
          className="m-1 border-orange-800 text-orange-600 hover:bg-orange-600 hover:text-white"
        >
          Burgers
        </button>
        <button
          onClick={() => filterType("pizza")}
          className="m-1 border-orange-800 text-orange-600 hover:bg-orange-600 hover:text-white"
        >
          Pizza
        </button>
        <button
          onClick={() => filterType("salad")}
          className="m-1 border-orange-800 text-orange-600 hover:bg-orange-600 hover:text-white"
        >
          Salad
        </button>
        <button
          onClick={() => filterType("chicken")}
          className="m-1 border-orange-800 text-orange-600 hover:bg-orange-600 hover:text-white"
        >
          Chicken
        </button>
      </div>

      {/* Add New Food Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "20px 0",
        }}
      >
        <button
          onClick={() => navigate("/admin/addfood")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
            fontWeight: "500",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#0056b3";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#007BFF";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Add New Food
        </button>
      </div>

      {/* Food List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {filterdData.map((foodItem) => (
          <div
            key={foodItem.id}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              gap: "20px",
              transition: "transform 0.2s",
            }}
          >
            <img
              src={foodItem.image}
              alt={foodItem.name}
              style={{
                borderRadius: "15px",
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                {foodItem.name}
              </h2>
              <h3
                style={{ fontSize: "20px", color: "#555", fontWeight: "400" }}
              >
                {foodItem.price}
              </h3>
            </div>

            {/* Update and Delete Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() =>
                  handleUpdate(
                    foodItem.id,
                    foodItem.name,
                    foodItem.image,
                    foodItem.price,
                    foodItem.category
                  )
                }
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Update
              </button>
              <button
                onClick={() => deleteBook(foodItem.id)}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayFoodList;

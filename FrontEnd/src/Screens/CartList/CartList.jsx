import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFoodList } from "../../Redux/reducers/FoodOrderReducer";
import CustomAlert from "../../Components/CommonAlert/CommonAlert";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CartList() {

  const navigate = useNavigate();
  const cart = useSelector((state) => state.Order.order.foodList);
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const Ispremium = userDetails[0].is_premium_customer === 1 ? true : false;
  const city = userDetails[0].city;
  const address = userDetails[0].Address;
  const [discount, setDiscount] = useState(0); // State for discount

  const [deliveryCharges, setDeliveryCharges] = useState(100); // Set default delivery charges

  const [showAlert, setShowAlert] = useState(false);
  const [alertDescription, setAlertDescription] = useState("");
  const [alertTopic, setAlertTopic] = useState("");
  const [buttonCount, setButtonCount] = useState(1);

  useEffect(() => {
    Ispremium && setDiscount(8);

    if (city === "colombo") {
      setDeliveryCharges(200);
    } else {
      setDeliveryCharges(400);
    }

    // Apply 8% discount for premium users
  }, [cart]);

  const handleDelete = (id) => {
    const filtered = cart.filter((item) => item.id !== id);
    dispatch(setFoodList(filtered));
  };

  const handleConfirmOrder = () => {
    console.log("Order confirmed:", cart);
    const data = {
      username: username,
      TotalAmount: totalAfterDiscount.toFixed(2),
      OrderDetails: cart,
      address: address,
    };

    console.log("3333333333333333333333333333", data);

    const insertOrder = async (orderData) => {
      try {
        // Make a POST request to insert the order into the database
        const res = await axios.post(
          "http://localhost:8800/order/insert",
          orderData
        );

        console.log("Order inserted: 2222222222222222222222222222", res.data);

        if (res.data) {
          setAlertTopic("Success");
          setAlertDescription("Order Added Successfully,Check Your Orders");
          setShowAlert(true);
          setButtonCount(1);
        }
      
    
        navigate("/homepage");
        window.location.reload();
      } catch (error) {
        // Set alert details in case of an error
        // setAlertTopic("Error");
        // setAlertDescription("Something went wrong, please try again");
        // setShowAlert(true);
        // setButtonCount(1);
        // console.log(error);
      }
    };

    insertOrder(data);
  };

  // Calculate total amount
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Total amount with delivery charges
  const totalWithDelivery = totalAmount + deliveryCharges;

  // Calculate the discounted amount after applying delivery charges
  const discountAmount = (totalWithDelivery * discount) / 100;
  const totalAfterDiscount = totalWithDelivery - discountAmount;

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
    <div className="max-w-3xl mx-auto py-4">
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
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty. Add some food items to continue!
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">{item.category}</p>
                  <p className="font-bold text-orange-600">Rs {item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="font-bold text-gray-600">Qty: {item.qty}</p>
                <button
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-6 p-4 border-t border-gray-200">
          <h3 className="text-xl font-bold text-orange-600">
            Total Amount: Rs {totalAmount}
          </h3>

          <div className="mt-4 flex items-center">
            <label htmlFor="deliveryCharges" className="mr-2">
              Delivery Charges:
            </label>
            <input
              type="number"
              id="deliveryCharges"
              value={deliveryCharges}
              onChange={(e) => setDeliveryCharges(parseFloat(e.target.value))}
              className="border border-gray-300 rounded-lg p-2"
              disabled={true} // Disable input for premium users
            />
          </div>

          <h3 className="text-xl font-bold text-orange-600 mt-2">
            Total with Delivery: Rs {totalWithDelivery.toFixed(2)}
          </h3>

          <div className="mt-4 flex items-center">
            <label htmlFor="discount" className="mr-2">
              Discount Percentage {Ispremium ? "(Premium Customer)" : ""} (%):
            </label>
            <input
              type="number"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
              min="0"
              max="100"
              disabled={true} // Disable input for premium users
            />
          </div>

          <h3 className="text-xl font-bold text-orange-600 mt-2">
            Total After Discount: Rs {totalAfterDiscount.toFixed(2)}
          </h3>

          <button
            className="w-full mt-4 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}

export default CartList;

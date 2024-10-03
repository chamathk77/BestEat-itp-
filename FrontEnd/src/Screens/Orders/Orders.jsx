import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post("http://localhost:8800/order/display", { 
          username: username,
        });

        // Sort orders by date in descending order
        const sortedOrders = response.data.sort((a, b) => new Date(b.OrderDate) - new Date(a.OrderDate));

        setOrders(sortedOrders);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      }
    };

    fetchOrders();
  }, [username]);

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h2 className="text-4xl font-bold text-center mb-6 text-orange-600">Your Orders</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {orders.length === 0 ? (
        <div className="text-center text-gray-600">No orders found</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.OrderID} className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">Order ID: {order.OrderID}</h3>
              <p className="text-gray-600">
                Total Amount: <span className="font-bold text-orange-600">Rs {order.TotalAmount}</span>
              </p>
              <p className="text-gray-600">
                Order Date: <span className="font-bold">{moment(order.OrderDate).format("MMM DD, YYYY, h:mm A")}</span>
              </p>
              <p className="text-gray-600">
                Delivery Status:{" "}
                <span className="font-bold">
                  {order.is_delivered === 1 ? "Delivered successfully" : "Delivery pending"}
                </span>
              </p>
              <p className="text-gray-600">Delivery Address: {order.address}</p>

              <div className="mt-4">
                <h4 className="text-md font-semibold text-gray-800 mb-2">Order Details:</h4>
                <div className="space-y-2">
                  {JSON.parse(order.OrderDetails).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg mr-4" />
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm text-gray-600">Category: {item.category}</p>
                          <p className="text-sm text-gray-600">Price: Rs {item.price}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-800">Qty: {item.qty}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

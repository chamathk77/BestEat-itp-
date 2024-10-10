import React, { useEffect, useState } from "react";
// import { data, categories } from "../Data/data.js";
import axios from "axios";
import CustomAlert from "../Components/CommonAlert/CommonAlert.jsx";
import {setFoodList} from "../Redux/reducers/FoodOrderReducer.js";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";


const Food = () => {
  // console.log(data)
  // console.log(categories)
  const dispatch = useDispatch();
  const [fulldata, setfulldata] = useState([]);
  const [foods, setfoods] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertDescription, setAlertDescription] = useState("");
  const [alertTopic, setAlertTopic] = useState("");
  const [buttonCount, setButtonCount] = useState(1);

  const cart = useSelector((state) => state.Order.order.foodList);

  // const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8800/dashboard/foods"
          );
          console.log("Food Data: ", response.data);
          setfoods(response.data);
          setfulldata(response.data);

          //   setFilterdData(response.data);
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

  useEffect(() => {



   
  console.log("-----------------------",cart)

    

  }, [cart]);


  useEffect(() => {
    
    
  }, [fulldata]);

  // filter type

  function filterType(category) {
    setfoods(
      fulldata.filter((item) => {
        return item.category === category;
      })
    );
  }

  function filterPrice(price) {
    if (price == "1000") {
      const NewArry = fulldata.filter((item) => {
        return item.price < price && item.price > 0;
      });

      setfoods(NewArry);

      return;
    }

    if (price == "2000") {
      const NewArry = fulldata.filter((item) => {
        return item.price < price && item.price > 1000;
      });

      setfoods(NewArry);

      return;
    }

    if (price == "3000") {
      const NewArry = fulldata.filter((item) => {
        return item.price < price && item.price > 2000;
      });

      setfoods(NewArry);

      return;
    }
  }

  const handlebuttonClick = (item) => {
    console.log("handle button click", item);



    const exist = cart.find((x) => x.id === item.id);

    if (exist) {

      dispatch(setFoodList(

        cart.map((x) =>
          x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      ));

    } else {

      dispatch(setFoodList([...cart, { ...item, qty: 1 }]));
      // setCart([...cart, { ...item, qty: 1 }]);
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
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center">
        Top Rated Menu Item
      </h1>

      

  

      {/* filter row */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* filter type */}

        <div>
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justify-between flex-wrap max-w-[490px]">
            <button
              onClick={() => {
                setfoods(fulldata);
              }}
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
        </div>

        {/* filter price */}

        <div>
          <p className="font-bold text-gray-700">Filter price</p>
          <div className="flex justify-between max-w-[390px]">
            <button
              onClick={() => filterPrice("1000")}
              className="m-1 border-orange-800 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              0 - 1000
            </button>
            <button
              onClick={() => filterPrice("2000")}
              className="m-1 border-orange-800 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              1000 - 2000
            </button>
            <button
              onClick={() => filterPrice("3000")}
              className="m-1 border-orange-800 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              2000 - 3000
            </button>
          </div>
        </div>
      </div>

      {/* display foods */}

      <div className="grid grid-cols-2  lg:grid-cols-4 gap-6 pt-4">
        {foods.map((item, index) => (
          <div
            key={index}
            className=" border shadow-lg hover:scale-105 duration-300 rounded-lg hover:shadow-2xl hover:cursor-pointer clickable"
            onClick={() => handlebuttonClick(item)}
          >
            <img
              className="w-full h-[200px] object-cover rounded-t-lg"
              src={item.image}
              alt={item.name}
            />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{item.name}</p>
              <p>
                <span className="bg-orange-500 text-white p-1">
                  LKR {item.price}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;

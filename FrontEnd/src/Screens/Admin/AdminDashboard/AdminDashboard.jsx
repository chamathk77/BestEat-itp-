import React, { useEffect, useState } from "react";
import { Admincategories } from "../../../Data/data.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../../Components/CommonAlert/CommonAlert";

function AdminLogin() {
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertDescription, setAlertDescription] = useState("");
  const [alertTopic, setAlertTopic] = useState("");
  const [buttonCount, setButtonCount] = useState(1);

  const username =  localStorage.getItem("username");

  const handleButtonPress = (item) => {


    console.log("------------------------------------", item.id);
    console.log("------------------------------------", item.code);

    const firstTwoChars = username.slice(0, 2);

    if (item.id === 1 && firstTwoChars === item.code) {
      navigate("/admin/displayfoodlist");

      
    }else if(item.id === 2 && firstTwoChars === item.code){

    }
    else if(item.id === 3 && firstTwoChars === item.code){
      console.log("33333333333333333333333333333333333");

    }
    else if(item.id === 4 && firstTwoChars === item.code){

    }
    else if(item.id === 5 && firstTwoChars === item.code){

    }
    else if(item.id === 6 && firstTwoChars === item.code){

    }
    else if(item.id === 7 && firstTwoChars === item.code){

    }
    else if(item.id === 8 && firstTwoChars === item.code){

    }
    else if(item.id === 9 && firstTwoChars === item.code){

    }else{
      setAlertTopic("Error");
      setAlertDescription("This is Restricted\nAsk Admin for Permission");
      setShowAlert(true);
      setButtonCount(1);
    }
  };

  const handlePositiveAction = () => {
    setShowAlert(false);
  };

  const handleNegativeAction = () => {
    setShowAlert(false);
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center mb-8">
        Welcome {username} to Admin Site
      </h1>
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
      {/* Category */}
      <div className="flex flex-col gap-6 py-6">
        {Admincategories.map((item, index) => (
          <button
            style={{ backgroundColor: "white", borderColor: "white" }}
            onClick={() => handleButtonPress(item)}
          >
            <div
              key={index}
              className="bg-white p-6 flex items-center shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-full border border-gray-300 mr-6"
              />
              <h2 className="font-bold text-xl text-gray-800 flex-grow">
                {item.name}
              </h2>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminLogin;

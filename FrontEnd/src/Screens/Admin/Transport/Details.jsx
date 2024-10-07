import React, { useEffect, useState } from "react";
import { Admincategories } from "../../../Data/data.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TransportDetails() {
  const Admincategories = [
    {
      id: 1,
      name: "Vehicle",
      image:
        "https://www.unileverfoodsolutions.com.my/en/chef-inspiration/ramadhan/how-to-manage-hygiene-during-ramadhan-bazaars/jcr:content/parsys/content-aside-footer/tipsandadvice_copy/image.img.jpg/image_3.jpg",
    },
    {
      id: 2,
      name: "Drivers",
      image:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/Pizza_BrowseHome@3x.png",
    },
    {
      id: 3,
      name: "Order Assigned",
      image:
        "https://duyt4h9nfnj50.cloudfront.net/new_search_home_eats_icon/Pizza_BrowseHome@3x.png",
    }
  ];

  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleButtonPress = (item) => {
    console.log("------------------------------------", item.id);
    console.log("------------------------------------", item.code);

    if (item.id === 1) {
        navigate("/vehicles")
    }
    if (item.id === 2) {
        navigate("/drivers")
    }
    if (item.id === 3) {
      navigate("/ordersTransport")
  }
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center mb-8">
        Welcome {username} to Admin Site
      </h1>

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

export default TransportDetails;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiFillTag,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsFillCartFill, BsFillSafeFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserFriends, FaWallet } from "react-icons/fa";
import { MdLogout, MdVerifiedUser } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [delivery, setDelivery] = useState(true);
  const [pickup, setPickup] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  const [cartCount, setCartCount] = useState(0); // New state for cart count

  const username = useSelector((state) => state.Login.LoginUser.UserName);
  const cart = useSelector((state) => state.Order.order.foodList);

  useEffect(() => {
    console.log(
      "9999999999999999999999999999999999999999999999999999999999999"
    );

    let itemCount = 0;
    cart.forEach((item) => {
      itemCount += item.qty;
    });
    setCartCount(itemCount);
  }, [cart]);

  useEffect(() => {
    function validateUsername(username) {
      // Check if the first character is 'A' or 'a'
      const startsWithA = username[0] === "A" || username[0] === "a";

      // Check if only the first two characters are letters
      const hasTwoLetters =
        /^[A-Za-z]{2}/.test(username) && !/[A-Za-z]/.test(username.slice(2));

      return startsWithA && hasTwoLetters;
    }

    if (true) {
      setAdminLogin(true);
    } else {
      setAdminLogin(false);
    }
  }, [username]);

  // Function to increase cart count
  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  function handleDelivery() {
    setDelivery(true);
    setPickup(false);
  }
  function handlePickup() {
    setDelivery(false);
    setPickup(true);
  }

  function handleMenu() {
    setNav(!nav);
  }

  function handleCloseMenu() {
    setNav(!nav);
  }

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="ml-4 mr-4 mt-2 max-w-[1640px] border-gray-950 mx-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="cursor-pointer">
          <AiOutlineMenu onClick={handleMenu} size={30} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Best <span className="font-bold"> Eats</span>
        </h1>
        <div className="hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]">
          <button
            className={`${
              delivery ? "bg-black text-white" : "bg-white text-black"
            } flex items-center py-2 px-4 rounded-full`}
            onClick={handleDelivery}
          >
            Delivery
          </button>
          <button
            className={`${
              pickup ? "bg-black text-white" : "bg-white text-black"
            } flex items-center py-2 px-4 rounded-full ml-2`}
            onClick={handlePickup}
          >
            Pickup
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch size={20} />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="Search foods"
        />
      </div>

      {/* Cart */}
      <div className="relative">
        <button
          className="bg-black text-white flex items-center py-2 px-4 rounded-full relative"
          onClick={() => navigate("/cartlist")}
        >
          <BsFillCartFill size={22} className="mr-2" />
          <span>Cart</span>
          {/* Item count badge */}
          <span
            className="absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full text-xs px-[7px] py-[2px] font-bold"
            style={{
              fontSize: "12px", // Modern small font size
              display: "flex", // Flex to center the count
              alignItems: "center",
              justifyContent: "center",
              height: "20px",
              width: "20px",
            }}
          >
            {cartCount} {/* Replace with your dynamic cart count */}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {nav ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 0,
          }}
        ></div>
      ) : null}

      {/* Sidebar Drawer */}
      <div
        style={
          nav
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "white",
                zIndex: 10,
                transitionDuration: "300ms",
              }
            : {
                position: "fixed",
                top: 0,
                left: "-100%",
                width: "300px",
                height: "100vh",
                backgroundColor: "white",
                zIndex: 10,
                transitionDuration: "300ms",
              }
        }
      >
        <AiOutlineClose
          size={30}
          onClick={handleCloseMenu}
          style={{
            position: "absolute",
            right: "16px",
            top: "16px",
            cursor: "pointer",
          }}
        />
        <h2 className="text-2xl p-4">
          Best <span className="font-bold">Eats</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <li className="text-xl py-4 flex">
              <button
                onClick={() => handleNavigate("/Orders")}
                className="flex items-center"
              >
                <TbTruckDelivery size={25} className="mr-4" />
                Orders
              </button>
            </li>

            <li className="text-xl py-4 flex">
              <button
                onClick={() => handleNavigate("/promotions")}
                className="flex items-center"
              >
                <AiFillTag size={25} className="mr-4" />
                Promotions
              </button>
            </li>
            <li className="text-xl py-4 flex">
              <button
                onClick={() => handleNavigate("/profile")}
                className="flex items-center"
              >
                <MdVerifiedUser size={25} className="mr-4" />
                UserProfie
              </button>
            </li>

            {adminLogin && (
              <li className="text-xl py-4 flex">
                <button
                  onClick={() => handleNavigate("/admin/dashboard")}
                  className="flex items-center"
                >
                  <FaUserFriends size={25} className="mr-4" />
                  Login As Admin
                </button>
              </li>
            )}

            <li className="text-xl py-4 flex">
              <button
                onClick={() => handleNavigate("/")}
                className="flex items-center"
              >
                <MdLogout size={25} className="mr-4" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Screens/HomePage/HomePage";
import AdminLogin from "./Screens/Admin/AdminDashboard/AdminDashboard";
import { Provider } from "react-redux";
import store from "../src/Redux/store/store";
// import About from './About';
// import Contact from './Contact';

import LoginPage from "./Screens/LogInScreen/LogInScreen";
import SignupPage from "./Screens/SignUpScreen/SignUpScreen";
import DisplayFoodList from "./Screens/Admin/FoodManagement/DisplayFoodList";
import AddFood from "./Screens/Admin/FoodManagement/AddFood";
import Update from "./Screens/Admin/FoodManagement/UpdateFood";
import CartList from "./Screens/CartList/CartList";
import Orders from "./Screens/Orders/Orders";
import UserProfile from "./Screens/UserProfile/UserProfile";
import TransportDetails from "../src/Screens/Admin/Transport/Details"

import Drivers from "../src/Screens/Admin/Transport/drivers";
import Vehicles from "../src/Screens/Admin/Transport/vehicles";

import "../src/Screens/Admin/Transport/styles.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* ***********************************chamath ***************************************************************/}

          {/* log in and sign up */}

          <Route path="/" element={<LoginPage />} />

          <Route path="/signup" element={<SignupPage />} />

          {/* dashboard */}
          <Route path="/homepage" element={<HomePage />} />

          {/* cart list */}
          <Route path="/cartlist" element={<CartList />} />

          {/* oders */}
          <Route path="/Orders" element={<Orders />} />
          {/* UserProfile */}
          <Route path="/profile" element={<UserProfile />} />
          {/* ------------------------------------------admin ----------------------------------------*/}
          {/* admin dashboard */}
          <Route path="/admin/dashboard" element={<AdminLogin />} />

          {/*------- food Management----------- */}
          {/*display food list*/}
          <Route path="/admin/displayfoodlist" element={<DisplayFoodList />} />

          {/*add food*/}
          <Route path="/admin/addfood" element={<AddFood />} />

          {/* update food */}
          <Route path="/admin/updatefood/:id" element={<Update />} />

          {/* **************************************************************************************************/}
           {/* **************************************************************************************************/}

          {/* kasun's  */}
          <Route path="/transport" element={<TransportDetails />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/vehicles" element={<Vehicles />} />


          {/* end of the kasun's */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

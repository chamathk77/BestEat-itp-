

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

            {/* ------------------------------------------admin ----------------------------------------*/}
            {/* admin dashboard */}
            <Route path="/admin/dashboard" element={<AdminLogin />} />

            {/*------- food Management----------- */}
            {/*display food list*/}
            <Route path="/admin/displayfoodlist" element={<DisplayFoodList />} />

            {/*add food*/}
            <Route path="/admin/addfood" element={<AddFood />} />

            {/* update food */}
            <Route path='/admin/updatefood/:id' element={<Update/>}/>

            {/* **************************************************************************************************/}

          </Routes>
        </Router>
   
    </Provider>
  );
};

export default App;

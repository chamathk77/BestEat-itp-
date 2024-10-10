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
import TransportDetails from "../src/Screens/Admin/Transport/Details";

import Drivers from "../src/Screens/Admin/Transport/drivers";
import Vehicles from "../src/Screens/Admin/Transport/vehicles";
import AssignOrder from "../src/Screens/Admin/Transport/OrderAssign";

import "../src/Screens/Admin/Transport/styles.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Inquiries from "../src/Screens/Admin/Customer Care/inquiries";
import InquiryChat from "../src/Screens/Admin/Customer Care/inquiryChat";

import Employee from "./Screens/Admin/EmployeeManagement/Employee";
import CreateEmployee from "./Screens/Admin/EmployeeManagement/createEmployee";
import UpdateEmployee from "./Screens/Admin/EmployeeManagement/updateEmployee";
import Schedule from "./Screens/Admin/EmployeeManagement/scheduletime";


import DashboardChart from "./Screens/Admin/InventoryManagement/DashboardChart";
import DisplayItem from "./Screens/Admin/InventoryManagement/DisplayItem";
import AddItem from "./Screens/Admin/InventoryManagement/AddItem";
import UpdateItem from "./Screens/Admin/InventoryManagement/UpdateItem";

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
          <Route path="/ordersTransport" element={<AssignOrder />} />

          {/* end of the kasun's */}

          {/* dasith's  */}
          <Route path="/inquiries" element={<Inquiries />} />
          <Route path="/inquiryChat/:inq_ID" element={<InquiryChat />} />

          {/* end of the Dashitha's */}

          {/* praneepa */}
          <Route path="/employee/display" element={<Employee />} />
          <Route path="/employee/create" element={<CreateEmployee />} />
          <Route path="/employee/update/:id" element={<UpdateEmployee />} />
          <Route path="/employee/Schedule" element={<Schedule />} />
          {/* end of the praneepa's */}

          {/* savindi */}
          <Route path="/admin/dashboardchart" element={<DashboardChart />} />
          <Route path="/admin/displayinventory" element={<DisplayItem />} />
          <Route path="/admin/addinventory" element={<AddItem />} />
          <Route path="/admin/update/:id" element={<UpdateItem />} />
          {/* end of the savindi's */}

        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

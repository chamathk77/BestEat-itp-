import { configureStore } from '@reduxjs/toolkit';

import LoginReducer from '../reducers/LoginReducer';
import FoodOrderReducer from '../reducers/FoodOrderReducer';
import driverReducer from "../reducers/driver-reducer";
import bikeReducer from '../reducers/bike-reducer'
import inqReducer from '../reducers/inq-reducer'
import msgReducer from "../reducers/inq-reducer";


export const store = configureStore({
  reducer: {

    driver:driverReducer,
    bike:bikeReducer,
    Login: LoginReducer,
    Order: FoodOrderReducer,
    inq:inqReducer,
    msg:msgReducer,
   
  },
});


export default store;

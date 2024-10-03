import { configureStore } from '@reduxjs/toolkit';

import LoginReducer from '../reducers/LoginReducer';
import FoodOrderReducer from '../reducers/FoodOrderReducer';


export const store = configureStore({
  reducer: {

    Login: LoginReducer,
    Order: FoodOrderReducer,
   
  },
});


export default store;

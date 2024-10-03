import { createSlice } from "@reduxjs/toolkit";

const CLASS_NAME = "FoodOrderReducer";

const orderInitialState = {

foodList: [],

};



export const FoodOrderSlice = createSlice({
  name: 'FoodOrderReducer',
  initialState: {
    order: orderInitialState,

  },
  reducers: {

    setFoodList: (state, action) => {

        
      state.order.foodList = action.payload;
      console.log(`${CLASS_NAME} Updating Reducer foodList state:`, state.order.foodList);
    },

  },
});

export const {setFoodList } = FoodOrderSlice.actions;
export default FoodOrderSlice.reducer;

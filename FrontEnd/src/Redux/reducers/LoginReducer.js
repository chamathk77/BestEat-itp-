import { createSlice } from "@reduxjs/toolkit";

const CLASS_NAME = "LoginReducer";

const UserInitialState = {
  UserName: '',
};

const selectedFoodInitialState={
  foodName:'',
  foodCategory:'',
  imageUrl:'',
  price:''
}

export const LoginSlice = createSlice({
  name: 'Login',
  initialState: {
    LoginUser: UserInitialState,
    selectedFood: selectedFoodInitialState,
  },
  reducers: {
    UpdateUserName: (state, action) => {
      state.LoginUser.UserName = action.payload;
      console.log(`${CLASS_NAME} Updating Reducer LoginUser UserName state:`, state.LoginUser.UserName);
    },
    ResetUserState: (state) => {
      state.LoginUser = UserInitialState;
      console.log(`${CLASS_NAME} Reset Reducer LoginUser state:`);
    },

    UpdateSelectedFood: (state, action) => {
      state.selectedFood = { ...state.selectedFood, ...action.payload };
      console.log(`${CLASS_NAME} Updating Reducer selectedFood state:`, state.selectedFood);
    },
    ResetSelectedFood: (state) => {
      state.selectedFood = selectedFoodInitialState;
      console.log(`${CLASS_NAME} Reset Reducer selectedFood state:`);
    },
  },
});

export const { UpdateUserName, ResetUserState,UpdateSelectedFood ,ResetSelectedFood} = LoginSlice.actions;
export default LoginSlice.reducer;

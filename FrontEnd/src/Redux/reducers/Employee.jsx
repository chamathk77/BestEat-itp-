import { createSlice } from "@reduxjs/toolkit";

const CLASS_NAME = "LoginReducer";

const Update_Employee_InitialState={
    id:'',
    name:'',
    email:'',
    address:'',
    phoneno:'',
   
}

export const Employee = createSlice({
  name: 'Login',
  initialState: {
    Update_Employee: Update_Employee_InitialState,
    
  },
  reducers: {

    Set_Update_Employee: (state, action) => {
        state.Update_Employee = { ...state.Update_Employee, ...action.payload };
        console.log(`${CLASS_NAME} Updating Reducer Update_Employee state:`, state.Update_Employee);
      },
    
  },
});

export const {Set_Update_Employee } = Employee.actions;
export default Employee.reducer;

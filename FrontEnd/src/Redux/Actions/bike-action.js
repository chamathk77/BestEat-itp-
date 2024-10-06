import { bikeConstants } from "./constants";
import axios from 'axios';
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";



export const fetchAvailableBikes = () => {
    return async (dispatch) => {
      dispatch({ type: bikeConstants.GET_AVAILABLE_BIKE_REQUEST });
  
      try {

    
        const res = await axios.get("http://localhost:8800/api/bike/getAvailableBikes");
  
        if (res.status === 200) {
          dispatch({
            type: bikeConstants.GET_AVAILABLE_BIKE_SUCCESS,
            payload: res.data.payload,
          });
        } else {
          dispatch({ type: bikeConstants.GET_AVAILABLE_BIKE_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 404 || error.response.status === 500) {
            dispatch({ type: bikeConstants.GET_AVAILABLE_BIKE_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: bikeConstants.GET_AVAILABLE_BIKE_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };

export const addNewBikes = (form) => {
    return async (dispatch) => {
      dispatch({ type: bikeConstants.CREATE_BIKE_REQUEST });
      try {
        const res = await axios.post("http://localhost:8800/api/bike/createBike", form);
  
        if (res.status === 201) {
          dispatch({
            type: bikeConstants.CREATE_BIKE_SUCCESS,
            payload: res.data.payload,
          });
          toast.success("New Bike added..!", { id: "t5" });
        } else {
          dispatch({ type: bikeConstants.CREATE_BIKE_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 404 || error.response.status === 500) {
            dispatch({ type: bikeConstants.CREATE_BIKE_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }else if(error.response.status === 403){
            dispatch({ type: bikeConstants.CREATE_BIKE_FALIURE });
            toast.error("Bike Already Registered..!" , { id: "t6" });
          }
        } else if (error.request) {
          dispatch({ type: bikeConstants.CREATE_BIKE_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };

  export const fetchAllBikes = () => {
    return async (dispatch) => {
      dispatch({ type: bikeConstants.GETALL_BIKE_REQUEST });
  
      try {
        console.log("bike 777777777777777777777777777777777")
        const res = await axios.get("http://localhost:8800/api/bike/getAll");
  
        if (res.status === 200) {
          dispatch({
            type: bikeConstants.GETALL_BIKE_SUCCESS,
            payload: res.data.payload,
          });
        } else {
          dispatch({ type: bikeConstants.GETALL_BIKE_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 404 || error.response.status === 500) {
            dispatch({ type: bikeConstants.GETALL_BIKE_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: bikeConstants.GETALL_BIKE_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };

  export const deleteBikes = (form) => {
    return async (dispatch) => {
      dispatch({ type: bikeConstants.DELETE_BIKE_REQUEST });
  
      try {
        const res = await axios.post("http://localhost:8800/api/bike/deleteBike", form);
  
        if (res.status === 200) {
          dispatch({
            type: bikeConstants.DELETE_BIKE_SUCCESS,
            payload: res.data.payload,
          });
          Swal.fire("Deleted!", "Bike has been deleted.", "success");
        } else {
          dispatch({ type: bikeConstants.DELETE_BIKE_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 404 || error.response.status === 500) {
            dispatch({ type: bikeConstants.DELETE_BIKE_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: bikeConstants.DELETE_BIKE_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };

  export const updateBike = (form) => {
    return async (dispatch) => {
      dispatch({ type: bikeConstants.UPDATES_BIKE_REQUEST });
  
      try {
        const res = await axios.post("http://localhost:8800/api/bike/updateBike", form);
  
        if (res.status === 200) {
          dispatch({
            type: bikeConstants.UPDATES_BIKE_SUCCESS,
            payload: res.data.payload,
          });
          toast.success("Bike details updated..!", { id: "t7" });
        } else {
          dispatch({ type: bikeConstants.UPDATES_BIKE_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 404 || error.response.status === 500) {
            dispatch({ type: bikeConstants.UPDATES_BIKE_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: bikeConstants.UPDATES_BIKE_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };
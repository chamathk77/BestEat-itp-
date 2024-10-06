import { driverConstants } from "./constants";
import axios from 'axios';
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";


export const CreateDrivers = (form) => {
    return async (dispatch) => {
      dispatch({ type: driverConstants.CREATE_DRIVER_REQUEST });
  
      try {
        const res = await axios.post("http://localhost:8800/api/driver/createDriver", form);
  
        if (res.status === 201) {
          dispatch({
            type: driverConstants.CREATE_DRIVER_SUCCESS,
            payload: res.data.payload,
          });
          toast.success("Driver registration successful..!");
        } else {
          dispatch({ type: driverConstants.CREATE_DRIVER_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 500) {
            dispatch({ type: driverConstants.CREATE_DRIVER_FALIURE });
            toast.error("Something went wrong..!", { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: driverConstants.CREATE_DRIVER_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        }
      }
    };
  };
  
  export const fetchDrivers = () => {
    return async (dispatch) => {
      dispatch({ type: driverConstants.GETALL_DRIVERS_REQUEST });
  
      try {
        const res = await axios.get("http://localhost:8800/api/driver/getAll");
  
        if (res.status === 200) {
          dispatch({
            type: driverConstants.GETALL_DRIVERS_SUCCESS,
            payload: res.data.payload,
          });
        } else {
          dispatch({ type: driverConstants.GETALL_DRIVERS_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 404 || error.response.status === 500) {
            dispatch({ type: driverConstants.GETALL_DRIVERS_FALIURE });
            toast.error("Something went wrong..!", { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: driverConstants.GETALL_DRIVERS_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        }
      }
    };
  };
  
  export const DeleteDriver = (form) => {
    return async (dispatch) => {
      dispatch({ type: driverConstants.DELETE_DRIVER_REQUEST });
      try {
        const res = await axios.post("http://localhost:8800/api/driver/deleteDriver", form);
        if (res.status === 200) {
          dispatch({
            type: driverConstants.DELETE_DRIVER_SUCCESS,
            payload: res.data.payload,
          });
          Swal.fire("Deleted!", "Driver has been deleted.", "success");
        } else {
          dispatch({ type: driverConstants.DELETE_DRIVER_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 500) {
            dispatch({ type: driverConstants.DELETE_DRIVER_FALIURE });
            toast.error("Something went wrong..!", { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: driverConstants.DELETE_DRIVER_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        }
      }
    };
  };
  
  export const updateDriver = (form) => {
    return async (dispatch) => {
      dispatch({ type: driverConstants.UPDATES_DRIVER_REQUEST });
      try {
        const res = await axios.post("http://localhost:8800/api/driver/updateDriver", form);
  
        if (res.status === 200) {
          dispatch({
            type: driverConstants.UPDATES_DRIVER_SUCCESS,
            payload: res.data.payload,
          });
          toast.success("Driver details updated..!");
        } else {
          dispatch({ type: driverConstants.UPDATES_DRIVER_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 500) {
            dispatch({ type: driverConstants.UPDATES_DRIVER_FALIURE });
            toast.error("Something went wrong..!", { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: driverConstants.UPDATES_DRIVER_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        }
      }
    };
  };

  export const assignOrderToDriver = (form) => {
    return async (dispatch) => {
      dispatch({ type: driverConstants.UPDATES_DRIVER_REQUEST });
      try {
        const res = await axios.post("http://localhost:8800/api/driver/addorder", form);
  
        if (res.status === 200) {
          dispatch({
            type: driverConstants.UPDATES_DRIVER_SUCCESS,
            payload: res.data.payload,
          });
          toast.success("Order Assigned..!");
        } else {
          dispatch({ type: driverConstants.UPDATES_DRIVER_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 500) {
            dispatch({ type: driverConstants.UPDATES_DRIVER_FALIURE });
            toast.error("Something went wrong..!", { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: driverConstants.UPDATES_DRIVER_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        }
      }
    };
  };
  
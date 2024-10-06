import express from "express";
import { createDriver, retriveAllDrivers, deleteDriver, updateDriver, orders, addorderID } from "../Controllers/driver-controller.js";

const router = express.Router();

router.post("/createDriver" ,createDriver);
router.get("/getAll" ,retriveAllDrivers);
router.get("/getActiveOrders" ,orders);
router.post("/updateDriver" ,updateDriver);
router.post("/addorder" ,addorderID);
router.post("/deleteDriver" ,deleteDriver);



export default router;
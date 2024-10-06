import express from "express";
import { createBike, retriveAllBikes, deleteBike, updateBike, retriveAvailableBikes } from "../Controllers/Bike_Controller.js";

const router = express.Router();

router.post("/createBike" ,createBike);
router.get("/getAll" ,retriveAllBikes);
router.get("/getAvailableBikes" ,retriveAvailableBikes);
router.post("/updateBike" ,updateBike);
router.post("/deleteBike" ,deleteBike);



export default router;
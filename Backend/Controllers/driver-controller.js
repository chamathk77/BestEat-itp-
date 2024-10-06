import db from "../index.js";

//create new driver account
export const createDriver = async (req, res) => {
  try {
    const body = req.body;
    const prefix = "DID";
    const suffix = Math.floor(100000 + Math.random() * 900000);
    const Driver_ID = prefix + "_" + suffix;

    const insertQuery = `INSERT INTO driver (Driver_ID, Name, Email, MobileNo, NIC, LicenseNumber, Status, BikeID) VALUES('${Driver_ID}', '${body.name}', '${body.email}', '${body.mobile}', '${body.nic}' , '${body.license}', 'Inactive', '${body.bikeID}' )`;
    db.query(insertQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in inserting..!",
          error: error,
        });
      } else if (result) {
        const refreshQuery = "SELECT * FROM driver ORDER BY CreateAt DESC";
        db.query(refreshQuery, async (error, result) => {
          if (error) {
            res.status(400).json({
              message: "Somthing went wrong in refreshing..!",
              error: error,
            });
          } else if (result) {
            res.status(201).json({
              message: "Driver Created ..!",
              payload: result,
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong!",
      error: error,
    });
  }
};

//retrive all drivers
export const retriveAllDrivers = async (req, res) => {
  try {
    const fetchQuery = "SELECT * FROM driver ORDER BY CreateAt DESC";
    db.query(fetchQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in data fetching..!",
          error: error,
        });
      } else {
        if (result.length > 0) {
          res.status(200).json({
            message: "Drivers fetched successfully ..!",
            payload: result,
          });
        } else {
          res.status(404).json({
            message: "No data found..!",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong!",
      error: error,
    });
  }
};

//delete driver
export const deleteDriver = async (req, res) => {
  try {
    const data = req.body;
    const deleteQuery = `DELETE FROM driver WHERE Driver_ID = '${data.driverId}'`;
    db.query(deleteQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in deleting..!",
          error: error,
        });
      } else if (result) {
        const refreshQuery = "SELECT * FROM driver ORDER BY CreateAt DESC";
        db.query(refreshQuery, async (error, result) => {
          if (error) {
            res.status(400).json({
              message: "Somthing went wrong in refreshing..!",
              error: error,
            });
          } else if (result.length > 0) {
            res.status(200).json({
              message: `Driver deleted successfully ..!`,
              payload: result,
            });
          } else {
            res.status(401).json({
              message: `No data found..!`,
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong!",
      error: error,
    });
  }
};

//update driver

export const updateDriver = async (req, res) => {
  try {
    const body = req.body;
    const updateQuery = `UPDATE driver SET Name='${body.name}' , Email='${body.email}' , MobileNo='${body.mobile}' , NIC='${body.nic}' , LicenseNumber='${body.license}' , Status='${body.status}', BikeID='${body.BikeID}' WHERE Driver_ID= '${body.driverId}'`;
    db.query(updateQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in updating..!",
          error: error,
        });
      } else if (result) {
        const refreshQuery = "SELECT * FROM driver ORDER BY CreateAt DESC";
        db.query(refreshQuery, async (error, result) => {
          if (error) {
            res.status(400).json({
              message: "Somthing went wrong in refreshing..!",
              error: error,
            });
          } else if (result.length > 0) {
            res.status(200).json({
              message: `Driver update successfully ..!`,
              payload: result,
            });
          } else {
            res.status(401).json({
              message: `No data found..!`,
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong!",
      error: error,
    });
  }
};


//retrive active orders
export const orders = async (req, res) => {
    try {
      const fetchQuery = "SELECT * FROM orders WHERE is_delivered='false'";
      db.query(fetchQuery, async (error, result) => {
        if (error) {
          res.status(400).json({
            message: "Somthing went wrong in data fetching..!",
            error: error,
          });
        } else {
          if (result.length > 0) {
            res.status(200).json({
              message: "orders fetched successfully ..!",
              payload: result,
            });
          } else {
            res.status(404).json({
              message: "No data found..!",
            });
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        message: "Something Went Wrong!",
        error: error,
      });
    }
  };

//update orders id in driver
export const addorderID = async (req, res) => {
  try {
    const body = req.body;
    const updateQuery = `UPDATE driver SET OrderID='${body.orderID}' WHERE Driver_ID= '${body.driverId}'`;
    db.query(updateQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in updating..!",
          error: error,
        });
      } else if (result) {
        const refreshQuery = "SELECT * FROM driver ORDER BY CreateAt DESC";
        db.query(refreshQuery, async (error, result) => {
          if (error) {
            res.status(400).json({
              message: "Somthing went wrong in refreshing..!",
              error: error,
            });
          } else if (result.length > 0) {
            res.status(200).json({
              message: `Driver update successfully ..!`,
              payload: result,
            });
          } else {
            res.status(401).json({
              message: `No data found..!`,
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong!",
      error: error,
    });
  }
  };
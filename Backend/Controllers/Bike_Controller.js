import db from "../index.js";

//create new bike
export const createBike = async (req, res) => {
  try {
    const body = req.body;
    const prefix = "BID";
    const suffix = Math.floor(100000 + Math.random() * 900000);
    const Bike_ID = prefix + "_" + suffix;

    const checkQuery = `SELECT * FROM bike WHERE LicensePlate = '${body.LicensePlate}'`;
    db.query(checkQuery, async (err, results) => {
      if (err) {
        res.status(400).json({
          message: "Somthing went wrong..!",
          error: err,
        });
      } else if (results.length > 0) {
        res.status(403).json({
          message: "Bike Alredy Registered..!",
        });
      } else {
        const insertQuery = `INSERT INTO bike (BikeID, LicensePlate, Brand, Model, Status, LastServiceDate, Kilometers) VALUES('${Bike_ID}', '${body.LicensePlate}', '${body.Brand}', '${body.Model}', 'Not Allocated', '${body.LastServiceDate}', '${body.Kilometers}' )`;
        db.query(insertQuery, async (error, result) => {
          if (error) {
            res.status(400).json({
              message: "Somthing went wrong in inserting..!",
              error: error,
            });
          } else if (result) {
            const refreshQuery = "SELECT * FROM bike";
            db.query(refreshQuery, async (error, result) => {
              if (error) {
                res.status(400).json({
                  message: "Somthing went wrong in refreshing..!",
                  error: error,
                });
              } else if (result) {
                res.status(201).json({
                  message: "Bike Added ..!",
                  payload: result,
                });
              }
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

//retrive all bike
export const retriveAllBikes = async (req, res) => {
  try {
    const fetchQuery = "SELECT * FROM bike";
    db.query(fetchQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in data fetching..!",
          error: error,
        });
      } else {
        if (result.length > 0) {
          res.status(200).json({
            message: "Bikes fetched successfully ..!",
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

//delete bike
export const deleteBike = async (req, res) => {
  try {
    const data = req.body;
    const deleteQuery = `DELETE FROM bike WHERE BikeID = '${data.BikeID}'`;
    db.query(deleteQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in deleting..!",
          error: error,
        });
      } else if (result) {
        const refresh = "SELECT * FROM bike";
        db.query(refresh, async (error, result) => {
          if (error) {
            res.status(400).json({
              message: "Somthing went wrong in refreshing..!",
              error: error,
            });
          } else if (result.length > 0) {
            res.status(200).json({
              message: `Bike deleted successfully ..!`,
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

//update bike

export const updateBike = async (req, res) => {
  try {
    const body = req.body;
    const updateQuery = `UPDATE bike SET Status='${body.Status}' , LastServiceDate='${body.LastServiceDate}', Kilometers='${body.Kilometers}' WHERE BikeID= '${body.BikeID}'`;
    db.query(updateQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in updating..!",
          error: error,
        });
      } else if (result) {
        const refresh = "SELECT * FROM bike";
        db.query(refresh, async (error, result) => {
          if (error) {
            res.status(400).json({
              message: "Somthing went wrong in refreshing..!",
              error: error,
            });
          } else if (result.length > 0) {
            res.status(200).json({
              message: `Bike update successfully ..!`,
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

//retrive all bike
export const retriveAvailableBikes = async (req, res) => {
  try {
    const fetchQuery = "SELECT * FROM bike WHERE Status='Not Allocated'";
    db.query(fetchQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in data fetching..!",
          error: error,
        });
      } else {
        if (result.length > 0) {
          res.status(200).json({
            message: "Bikes fetched successfully ..!",
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

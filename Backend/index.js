import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 8800;

// MySQL connection options
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "chamath77",
  database: "besteats",
};

app.use(express.json());
app.use(cors());
// Function to handle MySQL connection and reconnection
let db;

export default function handleDisconnect() {
  db = mysql.createConnection(dbConfig);

  db.connect(function (err) {
    if (err) {
      console.log("Error connecting to database:", err);
      setTimeout(handleDisconnect, 2000); // Try reconnecting after 2 seconds
    } else {
      console.log("Connected to database");
    }
  });

  db.on("error", function (err) {
    console.log("Database error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.fatal) {
      handleDisconnect(); // Reconnect if connection is lost
    } else {
      throw err; // Handle non-fatal errors differently
    }
  });
}

// Initial connection
handleDisconnect();

app.listen(port, () => {
  console.log(`App started and listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello this is backend!");
});

//-------------------------------------------chamath-----------------------------------------------------------------
app.get("/dashboard/foods", (req, res) => {
  const sqlSelect = "SELECT * FROM food_menu";

  db.query(sqlSelect, (err, data) => {
    if (err) {
      console.log("Error occurred:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json(data);
  });
});

app.post("/admin/addfood", (req, res) => {
  const q =
    "INSERT INTO food_menu(`name`,`category`,`image`,`price`) VALUES (?)";

  const VALUES = [
    req.body.name,
    req.body.category,
    req.body.image,
    req.body.price,
  ];

  db.query(q, [VALUES], (err, data) => {
    if (err) {
      console.log("Error occurred:", err);
      return res.status(500).json({ error: "Database error :" + err });
    }

    return res.status(200).json("Book has been created successfully");
  });
});

app.delete("/admin/fooddelete/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM food_menu WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.log("Error occurred:", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log("Book has been deleted successfully");

    return res.status(200).json("Book has been deleted successfully");
  });
});

app.put("/admin/updatefood/:id", (req, res) => {
  const bookId = req.params.id;

  const q =
    "UPDATE food_menu SET `name` = ?, `category` = ?, `image` = ?, `price` = ? WHERE id = ?";

  const VALUES = [
    req.body.name,
    req.body.category,
    req.body.image,
    req.body.price,
  ];

  db.query(q, [...VALUES, bookId], (err, data) => {
    if (err) {
      console.log("Error occurred:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(200).json("Book has been updated successfully");
  });
});
// customer table--------------------

app.get("/Users/Login", (req, res) => {
  const sqlSelect = "SELECT * FROM customers";

  db.query(sqlSelect, (err, data) => {
    if (err) {
      console.log("Error occurred:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json(data);
  });
});

// order tabele --------------------------
app.post("/order/display", (req, res) => {
  const { username } = req.body; // Get username from the request body

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const sqlSelect = "SELECT * FROM orders WHERE username = ?";

  db.query(sqlSelect, [username], (err, data) => {
    if (err) {
      console.log("Error occurred:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "No orders found for the user" });
    }
    return res.status(200).json(data);
  });
});

app.post("/order/insert", (req, res) => {
  const { username, TotalAmount, OrderDetails, address } = req.body; // Destructure the request body

  // Prepare the SQL query for inserting an order
  const q =
    "INSERT INTO Orders (username, TotalAmount, OrderDetails, is_delivered, address) VALUES (?, ?, ?, ?,?)";

  // Define values for the SQL query
  const values = [
    username,
    TotalAmount,
    JSON.stringify(OrderDetails), // Convert the order details to a JSON string
    false,
    address,
    // Default value for is_delivered
  ];

  // Execute the query
  db.query(q, values, (err, data) => {
    if (err) {
      console.log("Error occurred:", err);
      return res.status(500).json(err);
      // Return a 500 status on error
    }
    return res.status(201).json("true"); // Return a success message
  });
});

//-----------------------------------------------------------------------------------------------------------

//-------------------------------------------Savindi-----------------------------------------------------------------

app.get("/items", (req, res) => {
  const q = "SELECT * FROM items";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/items", (req, res) => {
  const q =
    "INSERT INTO items (`name`, `category`, `unit_price`, `quantity`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.category,
    req.body.unit_price,
    req.body.quantity,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Item has addede successfully");
  });
});

app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const q = "DELETE FROM items WHERE id = ?";

  db.query(q, [itemId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Item has been deleted successfully");
  });
});

app.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const q =
    "UPDATE items SET name = ?, category = ?, unit_price = ?, quantity = ?, rquantity = ?  WHERE id = ?";

  const values = [
    req.body.name,
    req.body.category,
    req.body.unit_price,
    req.body.quantity,
    req.body.rquantity,
  ];

  db.query(q, [...values, itemId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Item has been updated successfully");
  });
});

app.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const q = "UPDATE items SET rquantity = ? WHERE id = ?";

  const rquantity = req.body.rquantity;

  console.log("Received rquantity: ", rquantity); // Log the received value
  console.log("Item ID: ", itemId); // Log the item ID

  if (!rquantity || isNaN(rquantity)) {
    return res.status(400).json("Invalid remaining quantity value");
  }

  db.query(q, [rquantity, itemId], (err, data) => {
    if (err) {
      console.error("Error updating the database: ", err); // Log database error
      return res.json(err);
    }
    return res.json("Remaining quantity updated successfully!");
  });
});

//-----------------------------------------------------------------------------------------------------------
app.get("/api/driver/getAll", (req, res) => {
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
});
app.post("/api/driver/createDriver", (req, res) => {
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
});

app.post("/api/driver/deleteDriver", (req, res) => {
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
});
app.post("/api/driver/updateDriver", (req, res) => {
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
});
app.post("/api/driver/addorder", (req, res) => {
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
});

// /api/driver/addorder

// /api/bike/getAvailableBikes

app.get("/api/bike/getAvailableBikes", (req, res) => {
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
});

app.get("/api/bike/getAll", (req, res) => {
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
});

app.post("/api/bike/createBike", (req, res) => {
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
});

app.post("/api/bike/updateBike", (req, res) => {
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
});

app.post("/api/bike/deleteBike", (req, res) => {
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
});

// /api/bike/getAvailableBikes
app.post("/api/inquiry/createMessage", (req, res) => {
  try {
    const body = req.body;
    const prefix = "MID";
    const suffix = Math.floor(100000 + Math.random() * 900000);
    const Message_ID = prefix + "_" + suffix;

    const insertQuery = `INSERT INTO inq_message (Msg_ID, Inq_ID, Name, Message) VALUES('${Message_ID}', '${body.Inq_ID}', '${body.Name}', '${body.Message}' )`;
    db.query(insertQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in inserting..!",
          error: error,
        });
      } else if (result) {
        const refreshQuery = `SELECT * FROM inq_message WHERE Inq_ID ='${body.Inq_ID}'`;
        db.query(refreshQuery, async (error, result) => {
          if (error) {
            res.status(400).json({
              message: "Somthing went wrong in refreshing..!",
              error: error,
            });
          } else if (result) {
            res.status(201).json({
              message: "Message Created ..!",
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
});
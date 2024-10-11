import express from "express";
import mysql from "mysql";
import cors from "cors";
import { Parser } from 'json2csv';

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
    "N",
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

app.get("/items", (_req, res) => {
  const q = "SELECT * FROM items";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/items", (req, res) => {
  const q = "INSERT INTO items (`name`, `category`, `unit_price`, `quantity`, `expire_date`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.category,
    req.body.unit_price,
    req.body.quantity,
    req.body.expire_date,
  ];

  db.query(q, [values], (err, _data) => {
    if (err) return res.json(err);
    return res.json("Item has been added successfully");
  });
});

// Exporting a report as CSV (JSON to CSV conversion is used)
app.get("/admin/generatereport", (_req, res) => {
  const sqlSelect = "SELECT * FROM items"; 

  db.query(sqlSelect, (err, data) => {
    if (err) {
      console.log("Error occurred:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const csv = new Parser().parse(data); // Convert JSON to CSV
    res.header("Content-Type", "text/csv");
    res.attachment("item_report.csv"); // CSV file download name
    res.send(csv); // Send the CSV file
  });
});

// Search endpoint for items based on name or code
app.get('/search', (req, res) => {
  const searchQuery = req.query.q;
  const sqlSearch = `SELECT * FROM items WHERE item_name LIKE ? OR item_code LIKE ?`;

  db.query(sqlSearch, [`%${searchQuery}%`, `%${searchQuery}%`], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

// Delete item
app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const q = "DELETE FROM items WHERE id = ?";

  db.query(q, [itemId], (err, _data) => {
    if (err) return res.json(err);
    return res.json("Item has been deleted successfully");
  });
});

// Get item by ID
app.get("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const q = "SELECT * FROM items WHERE id = ?";

  db.query(q, [itemId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]); // Return the specific item
  });
});

// Update item
app.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const q = "UPDATE items SET name = ?, category = ?, unit_price = ?, quantity = ?, expire_date = ?  WHERE id = ?";

  const values = [
    req.body.name,
    req.body.category,
    req.body.unit_price,
    req.body.quantity,
    req.body.expire_date,
  ];

  db.query(q, [...values, itemId], (err, _data) => {
    if (err) return res.json(err);
    return res.json("Item has been updated successfully");
  });
});

// Update order quantity
app.put("/itemss/:id", (req, res) => {
  const itemId = req.params.id;
  const q = "UPDATE items SET rquantity = ? WHERE id = ?";
  const rquantity = req.body.rquantity;

  console.log("Received rquantity: ", rquantity);
  console.log("Item ID: ", itemId);

  if (!rquantity || isNaN(rquantity)) {
    return res.status(400).json("Invalid remaining quantity value");
  }

  db.query(q, [rquantity, itemId], (err, _data) => {
    if (err) {
      console.error("Error updating the database: ", err);
      return res.json(err);
    }
    return res.json("Remaining quantity updated successfully!");
  });
});

// Expiring items tracking
app.get('/api/expiring-items', (req, res) => {
  const query = `SELECT * FROM items WHERE expire_date <= CURDATE() + INTERVAL 7 DAY AND expire_date > CURDATE()`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching expiring items:', err); // Log error
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('Expiring items results:', results); // Log results
    res.json(results);
  });
});

app.get('/api/expiring-items', (req, res) => {
  const query = 'SELECT * FROM items WHERE expire_date < DATE_ADD(CURDATE(), INTERVAL 3 DAY)';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Endpoint to generate report of expiring items
app.get('/api/generate-report', (req, res) => {
  const query = 'SELECT * FROM items WHERE expire_date < DATE_ADD(CURDATE(), INTERVAL 3 DAY)';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);

    // Generate CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(results);

    // Set headers for CSV download
    res.header('Content-Type', 'text/csv');
    res.attachment('expiring-items-report.csv');
    res.send(csv);
  });
});


//------------------------------------------kasun-----------------------------------------------------------------

//drivers -------
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

// Bikes -------

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


// order table for transport ------------
app.get("/ordersTransport", (req, res) => {
  // const { username } = req.body; // Get username from the request body

  // if (!username) {
  //   return res.status(400).json({ error: "Username is required" });
  // }

  const sqlSelect = "SELECT * FROM orders";

  db.query(sqlSelect, (err, data) => {
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

app.get("/api/driver/Assigndriver", (req, res) => {
  try {
    const fetchQuery = "SELECT * FROM driver";
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

app.put("/order/assign/:id", (req, res) => {
  const orderId = req.params.id; // Order ID from the request parameters

  // SQL query to update the order details (assign driver and update status)
  const q = "UPDATE orders SET `driverId` = ?, `is_delivered` = ? WHERE OrderID = ?";

  const VALUES = [
    req.body.driverId,  // Driver ID from the request body
    req.body.is_delivered // Delivery status (e.g., 'N', 'Y', 'P') from the request body
  ];

  // Execute the query with the provided values and orderId
  db.query(q, [...VALUES, orderId], (err, data) => {
    if (err) {
      console.log("Error occurred:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(200).json("Order has been updated successfully");
  });
});
// ------------------------------praneepa---------------------------------------

app.get("/employee/display", (req, res) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
      if (err) return res.json("ERROR");
      return res.json(data);
  });
});

app.post('/employee/creates', (req, res) => {  
  const sql = "INSERT INTO employee (`id`, `Name`, `Address`, `Phoneno`, `Email`) VALUES (?)";

  const values = [
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.phone,
      req.body.email,
     
  ];
  db.query(sql, [values], (err) => {
      if (err) {
          console.error("Error inserting data:", err); 
          return res.json("Error");
      }
      return res.json("Employee added successfully");
  });
});

app.put('/employee/update/:id', (req, res) => {
  const sql = "UPDATE employee SET `Name` = ?, `Address` = ?, `Phoneno` = ?, `Email` = ? WHERE `id` = ?";
  
  const values = [
      req.body.name,
      req.body.address,
      req.body.phone,
      req.body.email,
      req.params.id, 
  ];
  
  db.query(sql, values, (err) => {
      if (err) {
          console.error("Error updating data:", err); 
          return res.status(500).json("Error updating employee");
      }
      return res.json("Employee updated successfully");
  });
});

app.delete('/delete/employee/:id', (req, res) => {
  const sql = "DELETE FROM employee WHERE id = ?";
  const id = req.params.id; 

  db.query(sql, [id], (err) => {
      if (err) {
          console.error("Error deleting data:", err); 
          return res.status(500).json("Error deleting employee");
      }
      return res.json("Employee deleted successfully");
  });
});

// time shecule------------

app.put('/employee/updateshedule/:id', (req, res) => {
  const employeeId = req.params.id;
  const { week_start_date, start_time, end_time } = req.body;

  // SQL query to update the schedule for the specific employee
  const sql = `
    UPDATE employee 
    SET 
      week_start_date = ?, 
      start_time = ?, 
      end_time = ? 
    WHERE id = ?
  `;

  db.query(sql, [week_start_date, start_time, end_time, employeeId], (err, result) => {
    if (err) {
      console.error("Error updating schedule:", err);
      return res.status(500).json({ error: "Error updating schedule" });
    }
    return res.json({ message: "Schedule updated successfully" });
  });
});


//--------------------------------- dasitha -----------------------------------------------------


// 
//---------------------------------------Dasiya's part Inq-----------------------------------//

app.get("/api/inquiry/getAll", (req, res) => {
  try {
    const fetchQuery = "SELECT * FROM inquiry";
    db.query(fetchQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in data fetching..!",
          error: error,
        });
      } else {
        if (result.length > 0) {
          res.status(200).json({
            message: "Inquiry fetched successfully ..!",
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

app.post("/api/inquiry/deleteInquiry", (req, res) => {
  try {
    const data = req.body;
    const deleteQuery = `DELETE FROM inquiry WHERE Inq_ID = '${data.inqId}'`;
    db.query(deleteQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in deleting..!",
          error: error,
        });
      } else if (result) {
        const refresh = "SELECT * FROM inquiry";
        db.query(refresh, async (error, result) => {
          if (error) {
            res.status(400).json({
              message: "Somthing went wrong in refreshing..!",
              error: error,
            });
          } else if (result.length > 0) {
            res.status(200).json({
              message: `Inquiry deleted successfully ..!`,
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

app.post("/api/inquiry/getById", (req, res) => {
  try {
    const body = req.body;
    const fetchQuery = `SELECT * FROM inquiry WHERE Inq_ID = '${body.InqID}'`;
    db.query(fetchQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in data fetching..!",
          error: error,
        });
      } else {
        if (result.length > 0) {
          res.status(200).json({
            message: "Inquiry fetched successfully ..!",
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

app.post("/api/inquiry/resolveInq", (req, res) => {
  try {
    const body = req.body;
    const updateQuery = `UPDATE inquiry SET Status='Resolve' WHERE Inq_ID = '${body.Inq_ID}'`;
    db.query(updateQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in deleting..!",
          error: error,
        });
      } else if (result) {
        res.status(200).json({
          message: `Inquiry resolved successfully ..!`,
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

//------------------inq msg (Dasiya's)-------------------------------//

app.post("/api/inqMsg/getAll", (req, res) => {
  try {
    const fetchQuery = `SELECT * FROM inq_message WHERE Inq_ID ='${req.body.Inq_ID}'`;
    db.query(fetchQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in data fetching..!",
          error: error,
        });
      } else {
        if (result.length > 0) {
          res.status(200).json({
            message: "Messages fetched successfully ..!",
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

app.post("/api/inqMsg/createMessage", (req, res) => {
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

app.post("/api/inqMsg/updateMessage", (req, res) => {
  try {
    const body = req.body;
    const updateQuery = `UPDATE inq_message SET Message='${body.message}' WHERE Msg_ID ='${body.Msg_ID}'`;
    db.query(updateQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in updating..!",
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
          } else if (result.length > 0) {
            res.status(200).json({
              message: `Message update successfully ..!`,
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

app.post("/api/inqMsg/deleteMessage", (req, res) => {
  try {
    const data = req.body;
    const deleteQuery = `DELETE FROM inq_message WHERE Msg_ID = '${data.Msg_ID}'`;
    db.query(deleteQuery, async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Somthing went wrong in deleting..!",
          error: error,
        });
      } else if (result) {
        const refreshQuery = `SELECT * FROM inq_message WHERE Inq_ID ='${data.Inq_ID}'`;
        db.query(refreshQuery, async (error, result) => {
          if (error) {
            res.status(400).json({
              message: "Somthing went wrong in refreshing..!",
              error: error,
            });
          } else if (result.length > 0) {
            res.status(200).json({
              message: `Message deleted successfully ..!`,
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

//--------------jayani-----------------
// Get all transactions
app.get("/admin/transactions", (req, res) => {
  const q = "SELECT * FROM transactions";
  db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
  });
});

// Add a transaction
app.post("/admin/transactions/add", (req, res) => {
  const q = "INSERT INTO transactions (`orderid`, `description`, `amount`, `date`, `paymentmethod`) VALUES (?)";
  const values = [
      req.body.orderid,
      req.body.description,
      req.body.amount,
      req.body.date,
      req.body.paymentmethod,
  ];

  console.log("------------------------------------", values);

  db.query(q, [values], (err, data) => {
      if (err) return res.json(err + '\n unsuccessfully');
      return res.json("Transaction has been created successfully");
  });
});

// Delete a transaction
app.delete("/admin/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const q = "DELETE FROM transactions WHERE id = ?";

  db.query(q, [transactionId], (err, data) => {
      if (err) return res.json(err);
      return res.json("Transaction has been deleted successfully");
  });
});

// Update a transaction
app.put("/admin/transaction/:id", (req, res) => {
  const transactionId = req.params.id;
  const q = "UPDATE transactions SET `orderid`=?, `description`=?, `amount`=?, `date`=?, `paymentmethod`=? WHERE id =?";

  console.log("-------------------------", transactionId);
  const values = [
      req.body.orderid,
      req.body.description,
      req.body.amount,
      req.body.date,
      req.body.paymentmethod,
  ];

  console.log("-------------------------", values);
  
  db.query(q, [...values, transactionId], (err, data) => {
      if (err) return res.json(err);
      return res.json("Transaction has been updated successfully");
  });
});

// New endpoint to get historical transactions for forecasting
app.get("/admin/transactions/history/:months", (req, res) => {
  const months = parseInt(req.params.months, 10); // Get the number of months from URL
  const q = "SELECT * FROM transactions WHERE date >= DATE_SUB(NOW(), INTERVAL ? MONTH)";

  db.query(q, [months], (err, data) => {
      if (err) return res.json(err);
      return res.json(data); // Return the transactions for the specified period
  });
});

//-----------------------------------------------------------

// add customer sign up-----------

app.post("/api/customers/addCustomer", (req, res) => {
  try {
    const body = req.body;
    const insertQuery = `
      INSERT INTO customers (username, first_name, last_name, email, phone_number, password, address, city) 
      VALUES ('${body.username}', '${body.first_name}', '${body.last_name}', '${body.email}', '${body.phone_number}', '${body.password}', '${body.address}', '${body.city}')
    `;
    
    db.query(insertQuery, (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Something went wrong in adding the customer!",
          error: error,
        });
      } else {
        res.status(200).json({
          message: "Customer added successfully!",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong on the server!",
      error: error,
    });
  }
});





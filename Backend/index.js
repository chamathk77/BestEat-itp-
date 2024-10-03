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

function handleDisconnect() {
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
  const { username, TotalAmount, OrderDetails,address } = req.body; // Destructure the request body

  // Prepare the SQL query for inserting an order
  const q =
    "INSERT INTO Orders (username, TotalAmount, OrderDetails, is_delivered, address) VALUES (?, ?, ?, ?,?)";

  // Define values for the SQL query
  const values = [
    username,
    TotalAmount,
    JSON.stringify(OrderDetails), // Convert the order details to a JSON string
    false,
    address
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

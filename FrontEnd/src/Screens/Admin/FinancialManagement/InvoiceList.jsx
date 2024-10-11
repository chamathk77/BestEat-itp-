import React, { useState } from "react";

const InvoiceList = () => {
  // Hardcoded invoice data
  const [invoices, setInvoices] = useState([
    { id: 1, itemName: "Burger Buns", date: "2024/09/01", description: "Ensure freshness on delivery.", amount: "$50.00", status: "pending" },
    { id: 2, itemName: "Ground Beef", date: "2024/09/02", description: "Grass-fed beef only.", amount: "$120.00", status: "pending" },
    { id: 3, itemName: "Cheddar Cheese", date: "2024/09/03", description: "Sharp cheddar preferred.", amount: "$75.00", status: "pending" },
    { id: 4, itemName: "French Fries", date: "2024/09/04", description: "Bulk package.", amount: "$40.00", status: "pending" },
    { id: 5, itemName: "Tomato Ketchup", date: "2024/09/05", description: "100% organic tomatoes.", amount: "$25.00", status: "pending" },
    { id: 6, itemName: "Lettuce", date: "2024/09/06", description: "Fresh, crispy lettuce only.", amount: "$30.00", status: "pending" },
    { id: 7, itemName: "Pickles", date: "2024/09/07", description: "Must be dill pickles.", amount: "$15.00", status: "pending" },
    { id: 8, itemName: "Onions", date: "2024/09/08", description: "Sweet onions for caramelization.", amount: "$10.00", status: "pending" },
    { id: 9, itemName: "Bacon Strips", date: "2024/09/09", description: "Hickory-smoked bacon preferred.", amount: "$80.00", status: "pending" },
    { id: 10, itemName: "Sesame Seeds", date: "2024/09/10", description: "For topping buns.", amount: "$10.00", status: "pending" },
  ]);

  // Function to handle status change
  const updateStatus = (id, newStatus) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status: newStatus } : invoice
      )
    );
  };

  // Calculate the number of pending invoices
  const pendingCount = invoices.filter((invoice) => invoice.status === "pending").length;

  // Inline CSS for the table
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyle = {
    padding: "10px",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };

  const buttonStyle = (status) => ({
    backgroundColor: status === "approved" ? "#4CAF50" : "#FFA500",
    color: "white",
    border: "none",
    padding: "8px 12px",
    marginRight: "5px",
    cursor: "pointer",
    borderRadius: "4px",
  });

  return (
    <div>
      <span style={{ textAlign: "center", margin: "20px 0", fontWeight: "bold", fontSize: "24px" }}>
        Invoice List
      </span>
      
      {/* Displaying the count of pending invoices */}
      <div style={{ textAlign: "center", marginBottom: "20px", fontSize: "18px" }}>
       You have to do {pendingCount} {pendingCount === 1 ? "invoice" : "invoices"} pending for transactions.
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Invoice ID</th>
            <th style={thStyle}>Item Name</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td style={tdStyle}>{invoice.id}</td>
              <td style={tdStyle}>{invoice.itemName}</td>
              <td style={tdStyle}>{invoice.date}</td>
              <td style={tdStyle}>{invoice.description}</td>
              <td style={tdStyle}>{invoice.amount}</td>
              <td style={tdStyle}>{invoice.status}</td>
              <td style={tdStyle}>
                <button
                  style={buttonStyle("approved")}
                  onClick={() => updateStatus(invoice.id, "approved")}
                  disabled={invoice.status === "approved"}
                >
                  Approve
                </button>
                <button
                  style={buttonStyle("pending")}
                  onClick={() => updateStatus(invoice.id, "pending")}
                  disabled={invoice.status === "pending"}
                >
                  Pending
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;

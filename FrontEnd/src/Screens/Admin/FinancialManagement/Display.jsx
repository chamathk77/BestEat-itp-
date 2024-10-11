import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons"; // Inquiry icon from Font Awesome
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Display = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchAllTransactions = async () => {
            try {
                const res = await axios.get("http://localhost:8800/admin/transactions");

                console.log("0000000000000",res.data);
                setTransactions(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllTransactions();
    }, []);

    const filteredTransactions = transactions.filter((transaction) => {
        return (
            transaction.orderid.toString().includes(searchTerm) ||
            transaction.date.includes(searchTerm)
        );
    });

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/admin/transactions/${id}`);
            setTransactions(transactions.filter(transaction => transaction.id !== id));
            toast.success('Transaction deleted successfully!');
        } catch (err) {
            console.log(err);
            toast.error('Failed to delete the transaction!');
        }
    };
    

    const exportToCSV = () => {
        const csvRows = [];
        const headers = ["Order ID", "Description", "Amount", "Date", "Payment Method"];
        csvRows.push(headers.join(","));

        transactions.forEach((transaction) => {
            const row = [
                transaction.orderid,
                transaction.description,
                transaction.amount.toFixed(2),
                transaction.date,
                transaction.paymentmethod
            ];
            csvRows.push(row.join(","));
        });

        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "transactions_report.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Transactions Report", 20, 10);
        const headers = [["Order ID", "Description", "Amount", "Date", "Payment Method"]];

        const data = transactions.map(transaction => [
            transaction.orderid,
            transaction.description,
            transaction.amount.toFixed(2),
            transaction.date,
            transaction.paymentmethod
        ]);

        doc.autoTable({
            head: headers,
            body: data,
        });

        doc.save("transactions_report.pdf");
    };

    const styles = {
        container: {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        },
        headerContainer: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        header: {
            fontSize: "2rem",
            color: "#333",
            marginBottom: "20px"
        },
        searchBar: {
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ced4da",
            borderRadius: "5px",
            fontSize: "1rem",
            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)"
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white"
        },
        thTd: {
            padding: "12px 15px",
            textAlign: "left"
        },
        th: {
            backgroundColor: "#007bff",
            color: "white",
            fontWeight: "bold"
        },
        trEven: {
            backgroundColor: "#f2f2f2"
        },
        trHover: {
            cursor: "pointer",
            backgroundColor: "#e9ecef"
        },
        button: {
            padding: "8px 12px",
            marginRight: "10px",
            border: "none",
            borderRadius: "5px",
            fontSize: "0.9rem",
            cursor: "pointer",
            textAlign: "center"
        },
        updateButton: {
            backgroundColor: "#28a745",
            color: "white"
        },
        deleteButton: {
            backgroundColor: "#dc3545",
            color: "white"
        },
        addButton: {
            backgroundColor: "#007bff",
            color: "white",
            display: "inline-block",
            marginTop: "20px"
        },
        link: {
            color: "white",
            textDecoration: "none"
        },
        addNewContainer: {
            textAlign: "center",
            marginTop: "20px"
        },
        reportButtons: {
            marginBottom: "20px",
            textAlign: "right"
        },
        forecastButton: {
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "8px 12px",
            fontSize: "0.9rem",
            cursor: "pointer",
            marginLeft: "10px",
        },
        inquiryIcon: {
            fontSize: "1.5rem",
            color: "#007bff",
            cursor: "pointer",
            marginLeft: "10px", // Add some space between the text and icon
        }
    };

    return (
        <div style={styles.container}>
            <ToastContainer />
            <div style={styles.headerContainer}>
                <h1 style={styles.header}>Transaction List</h1>
                <div>
                    <Link to="/admin/finance/forecast">
                        <button style={styles.forecastButton}>Forecasting</button>
                    </Link>
                    <Link to="/admin/finance/invoicelist">
                        <FontAwesomeIcon icon={faFileInvoice} style={styles.inquiryIcon} title="Inventory Inquiries" />
                    </Link>
                </div>
            </div>
            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by Order ID or Date"
                style={styles.searchBar}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Report buttons */}
            <div style={styles.reportButtons}>
                <button style={{ ...styles.button, ...styles.addButton }} onClick={exportToCSV}>
                    Export to CSV
                </button>
                <button style={{ ...styles.button, ...styles.addButton }} onClick={exportToPDF}>
                    Export to PDF
                </button>
            </div>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.thTd}>Order ID</th>
                        <th style={styles.thTd}>Description</th>
                        <th style={styles.thTd}>Amount</th>
                        <th style={styles.thTd}>Date</th>
                        <th style={styles.thTd}>Payment Method</th>
                        <th style={styles.thTd}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map((transaction, index) => (
                        <tr
                            key={transaction.id}
                            style={index % 2 === 0 ? styles.trEven : null}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor)}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? styles.trEven.backgroundColor : "white")}
                        >
                            <td style={styles.thTd}>{transaction.orderid}</td>
                            <td style={styles.thTd}>{transaction.description}</td>
                            <td style={styles.thTd}>${transaction.amount.toFixed(2)}</td>
                            <td style={styles.thTd}>{transaction.date}</td>
                            <td style={styles.thTd}>{transaction.paymentmethod}</td>
                            <td style={styles.thTd}>
                                <button style={{ ...styles.button, ...styles.updateButton }}>
                                    <Link to={`/admin/finance/update/${transaction.id}`} style={styles.link}>Update</Link>
                                </button>
                                <button
                                    style={{ ...styles.button, ...styles.deleteButton }}
                                    onClick={() => handleDelete(transaction.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={styles.addNewContainer}>
                <button style={styles.addButton}>
                    <Link to="/admin/finance/add" style={styles.link}>Add New Transaction</Link>
                </button>
            </div>
        </div>
        
    );
};

export default Display;

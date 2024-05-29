import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import moment from "moment";
import SpinnerOverlay from "./SpinnerOverlay";
import { toast } from "react-toastify";
export default function Transactionlogs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/trade/logs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Error : " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(async () => {
      fetchLogs();
    }, 200);

    return () => {};
  }, []);

  if (isLoading) {
    return <SpinnerOverlay />;
  }

  return (
    <div className="transactionLogs">
      <h1>Transaction Logs</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Portfolio ID</th>
            <th>Transaction Type</th>
            <th>Share ID</th>
            <th>Quantity</th>
            <th>Price Per Share</th>
            <th>Total Price</th>
            <th>Before Limit</th>
            <th>After Limit</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.userId}</td>
              <td>{log.portfolioId}</td>
              <td>{log.transactionType}</td>
              <td>{log.shareId}</td>
              <td>{log.quantity}</td>
              <td>{log.pricePerShare}</td>
              <td>{log.totalPrice}</td>
              <td>{log.beforeLimit}</td>
              <td>{log.afterLimit}</td>
              <td>{moment(log.createdAt).format("DD.DD.YYYY h:mm A")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

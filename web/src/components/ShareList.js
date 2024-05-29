import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import SpinnerOverlay from "./SpinnerOverlay";
import { toast } from "react-toastify";
export default function ShareList() {
  const [shares, setShares] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/trade/shares");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShares(data);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Error : " + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(async () => {
      fetchShares();
    }, 200);

    return () => {};
  }, []);

  if (isLoading) {
    return <SpinnerOverlay />;
  }

  return (
    <div className="Share">
      <h1>Shares</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {shares.map((share) => (
            <tr key={share.id}>
              <td>{share.id}</td>
              <td>{share.symbol}</td>
              <td>{share.currentPrice}</td>
              <td>{share.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

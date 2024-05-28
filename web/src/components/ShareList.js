import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";

export default function ShareList() {
  const [shares, setShares] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/trade/shares");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShares(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUsers();

    return () => {};
  }, []);

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

import React from "react";
import { Table } from "react-bootstrap";

export default function Portfolio({ user }) {
  if (!user.Portfolio || !user.Portfolio.PortfolioShares) {
    return <></>;
  }

  return (
    <div className="border border-1" style={{ padding: "10px" }}>
      <div className="row">
        <div className="col">
          <h5>Shares in portfolio :</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Share Id</th>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Current Price</th>
              </tr>
            </thead>
            <tbody>
              {user.Portfolio.PortfolioShares.map((share) => (
                <tr key={share.id}>
                  <td>{share.id}</td>
                  <td>{share.Share.symbol}</td>
                  <td>{share.quantity}</td>
                  <td>{share.Share.currentPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-4">
          <br></br>
          <Table>
            <tbody>
              <tr>
                <td>Portfolio ID</td>
                <td>{user.Portfolio.id}</td>
              </tr>
              <tr>
                <td>User ID</td>
                <td>{user.id}</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>Limit</td>
                <td>{user.Portfolio.limit}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

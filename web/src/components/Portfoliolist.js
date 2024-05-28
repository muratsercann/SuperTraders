import React, { useState, useEffect } from "react";
import Portfolio from "./Portfolio";

export default function Portfoliolist() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/trade/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUsers();

    return () => {};
  }, []);

  if (!users) {
    return <></>;
  }
  return (
    <div>
      <h1>Portfolios</h1>
      {users.map((user) => (
        <Portfolio key={user.id} user={user}></Portfolio>
      ))}
    </div>
  );
}

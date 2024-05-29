import React, { useState, useEffect } from "react";
import Portfolio from "./Portfolio";
import SpinnerOverlay from "./SpinnerOverlay";
import { toast } from "react-toastify";

export default function Portfoliolist() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        toast.error("Error : " + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(async () => {
      fetchUsers();
    }, 200);
    return () => {};
  }, []);

  if (isLoading) {
    return <SpinnerOverlay />;
  }

  return (
    <div style={{ position: "relative" }}>
      <div>
        <h1>Portfolios</h1>
        {users.map((user) => (
          <Portfolio key={user.id} user={user}></Portfolio>
        ))}
      </div>
    </div>
  );
}

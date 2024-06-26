import "./App.css";
import ShareList from "./components/ShareList";
import Transactionlogs from "./components/Transactionlogs";
import Portfolios from "./components/Portfoliolist";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "react-bootstrap";

function App() {
  return (
    <div>
      <Router>
        <div className="container" style={{ margin: "25px" }}>
          <nav>
            <Button variant="primary" as={Link} to="/">
              Shares
            </Button>{" "}
            <Button variant="primary" as={Link} to="/portfolios">
              Portfolios
            </Button>{" "}
            <Button variant="primary" as={Link} to="/transaction-logs">
              Transaction Logs
            </Button>
          </nav>

          <Routes>
            <Route path="/" element={<ShareList />} />
            <Route path="/portfolios" element={<Portfolios />} />
            <Route path="/transaction-logs" element={<Transactionlogs />} />
          </Routes>
        </div>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;

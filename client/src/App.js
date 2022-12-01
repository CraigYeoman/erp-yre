import Nav from "./components/Nav";
import Index from "./components/Index";
import WorkOrders from "./components/WorkOrders";
import CustomerList from "./components/customer/CustomerList";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/index" element={<Index />}></Route>
          <Route path="/customerlist" element={<CustomerList />}></Route>
        </Routes>
      </Router>

      <WorkOrders />
    </div>
  );
}

export default App;

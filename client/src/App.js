import Nav from "./components/Nav";
import Index from "./components/Index";
import CustomerDetail from "./components/customer/CustomerDetail";
import CustomerList from "./components/customer/CustomerList";
import VendorDetail from "./components/vendor/VendorDetail";
import VendorList from "./components/vendor/VendorList";
import WorkOrderDetail from "./components/workorder/WorkOrderDetail";
import WorkOrderList from "./components/workorder/WorkOrderList";
import WorkOrderForm from "./components/workorder/WorkOrderForm";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/customerdetail" element={<CustomerDetail />}></Route>
          <Route path="/customerlist" element={<CustomerList />}></Route>
          <Route path="/vendordetail" element={<VendorDetail />}></Route>
          <Route path="/vendorlist" element={<VendorList />}></Route>
          <Route path="/workorderdetail" element={<WorkOrderDetail />}></Route>
          <Route path="/workorderlist" element={<WorkOrderList />}></Route>
          <Route path="/workorderform" element={<WorkOrderForm />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

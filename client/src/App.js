import Nav from "./components/Nav";
import Index from "./components/Index";
import CustomerDetail from "./components/customer/CustomerDetail";
import CustomerForm from "./components/customer/CustomerForm";
import CustomerList from "./components/customer/CustomerList";
import JobTypeDetail from "./components/jobtype/JobTypeDetail";
import JobTypeList from "./components/jobtype/JobTypeList";
import LaborDetail from "./components/labor/LaborDetail";
import LaborForm from "./components/labor/LaborForm";
import LaborList from "./components/labor/LaborList";
import PartDetail from "./components/parts/PartDetail";
import PartsList from "./components/parts/PartsList";
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
          <Route
            path="/customerdetail/:id"
            element={<CustomerDetail />}
          ></Route>
          <Route path="/customerform" element={<CustomerForm />}></Route>
          <Route path="/customerlist" element={<CustomerList />}></Route>
          <Route path="/jobtypedetail/:id" element={<JobTypeDetail />}></Route>
          <Route path="/jobtypelist" element={<JobTypeList />}></Route>
          <Route path="/labordetail/:id" element={<LaborDetail />}></Route>
          <Route path="/laborform" element={<LaborForm />}></Route>
          <Route path="/laborlist" element={<LaborList />}></Route>
          <Route path="/partdetail/:id" element={<PartDetail />}></Route>
          <Route path="/partslist" element={<PartsList />}></Route>
          <Route path="/vendordetail/:id" element={<VendorDetail />}></Route>
          <Route path="/vendorlist" element={<VendorList />}></Route>
          <Route
            path="/workorderdetail/:id"
            element={<WorkOrderDetail />}
          ></Route>
          <Route path="/workorderlist" element={<WorkOrderList />}></Route>
          <Route path="/workorderform" element={<WorkOrderForm />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import Nav from "./components/Nav";
import Index from "./components/Index";
import CustomerDetail from "./components/customer/CustomerDetail";
import CustomerEditForm from "./components/customer/CustomerEditForm";
import CustomerForm from "./components/customer/CustomerForm";
import CustomerList from "./components/customer/CustomerList";
import JobTypeDetail from "./components/jobtype/JobTypeDetail";
import JobTypeEdit from "./components/jobtype/JobTypeEditForm";
import JobTypeList from "./components/jobtype/JobTypeList";
import JobTypeForm from "./components/jobtype/JobTypeForm";
import LaborDetail from "./components/labor/LaborDetail";
import LaborEditForm from "./components/labor/LaborEditForm";
import LaborForm from "./components/labor/LaborForm";
import LaborList from "./components/labor/LaborList";
import LaborCategory from "./components/labor/LaborCategory";
import LaborCategoryDetail from "./components/labor/LaborCategoryDetail";
import LaborCategoryEdit from "./components/labor/LaborCategoryEditFrom";
import LaborCategoryForm from "./components/labor/LaborCategoryForm";
import PartDetail from "./components/parts/PartDetail";
import PartEdit from "./components/parts/PartEditForm";
import PartsList from "./components/parts/PartsList";
import PartForm from "./components/parts/PartForm";
import PartCategory from "./components/parts/PartCategory";
import PartCategoryDetail from "./components/parts/PartCategoryDetail";
import PartCategoryEdit from "./components/parts/PartCategoryEditFrom";
import PartCategoryForm from "./components/parts/PartCategoryForm";
import VendorDetail from "./components/vendor/VendorDetail";
import VendorEdit from "./components/vendor/VendorEditForm";
import VendorForm from "./components/vendor/VendorForm";
import VendorList from "./components/vendor/VendorList";
import WorkOrderDetail from "./components/workorder/WorkOrderDetail";
import WorkOrderEdit from "./components/workorder/WorkOrderEditForm";
import WorkOrderList from "./components/workorder/WorkOrderList";
import WorkOrderForm from "./components/workorder/WorkOrderForm";
import Format from "./components/Format";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./components/theme";
import { useGlobalContext } from "./context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const { mode } = useGlobalContext();

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Format />}>
              <Route path="/" element={<Index />}></Route>
              <Route
                path="/customerdetail/:id"
                element={<CustomerDetail />}
              ></Route>
              <Route
                path="/customeredit/:id"
                element={<CustomerEditForm />}
              ></Route>
              <Route path="/customerform" element={<CustomerForm />}></Route>
              <Route path="/customerlist" element={<CustomerList />}></Route>
              <Route
                path="/jobtypedetail/:id"
                element={<JobTypeDetail />}
              ></Route>
              <Route path="/jobtypeedit/:id" element={<JobTypeEdit />}></Route>
              <Route path="/jobtypelist" element={<JobTypeList />}></Route>
              <Route path="/jobtypeform" element={<JobTypeForm />}></Route>
              <Route path="/labordetail/:id" element={<LaborDetail />}></Route>
              <Route path="/laboredit/:id" element={<LaborEditForm />}></Route>
              <Route path="/laborform" element={<LaborForm />}></Route>
              <Route path="/laborlist" element={<LaborList />}></Route>
              <Route path="/laborcategory" element={<LaborCategory />}></Route>
              <Route
                path="/laborcategoryform"
                element={<LaborCategoryForm />}
              ></Route>
              <Route
                path="/laborcategorydetail/:id"
                element={<LaborCategoryDetail />}
              ></Route>
              <Route
                path="/laborcategoryedit/:id"
                element={<LaborCategoryEdit />}
              ></Route>
              <Route path="/partdetail/:id" element={<PartDetail />}></Route>
              <Route path="/partedit/:id" element={<PartEdit />}></Route>
              <Route path="/partslist" element={<PartsList />}></Route>
              <Route path="/partform" element={<PartForm />}></Route>
              <Route path="/partcategory" element={<PartCategory />}></Route>
              <Route
                path="/partcategoryform"
                element={<PartCategoryForm />}
              ></Route>
              <Route
                path="/partcategorydetail/:id"
                element={<PartCategoryDetail />}
              ></Route>
              <Route
                path="/partcategoryedit/:id"
                element={<PartCategoryEdit />}
              ></Route>
              <Route
                path="/vendordetail/:id"
                element={<VendorDetail />}
              ></Route>
              <Route path="/vendoredit/:id" element={<VendorEdit />}></Route>
              <Route path="/vendorform" element={<VendorForm />}></Route>
              <Route path="/vendorlist" element={<VendorList />}></Route>
              <Route
                path="/workorderdetail/:id"
                element={<WorkOrderDetail />}
              ></Route>
              <Route
                path="/workorderedit/:id"
                element={<WorkOrderEdit />}
              ></Route>
              <Route path="/workorderlist" element={<WorkOrderList />}></Route>
              <Route path="/workorderform" element={<WorkOrderForm />}></Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;

import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

function Nav() {
  const { setListType } = useGlobalContext();
  return (
    <div className="nav">
      <Link to="/">Index</Link>
      <div className="nav-container">
        <h3>Work Orders</h3>
        <Link onClick={() => setListType("workorders")} to="/workorderlist">
          Work Orders List
        </Link>
        <Link to="/workorderform">New Work Order</Link>
      </div>
      <div className="nav-container">
        <h3>Customers</h3>
        <Link onClick={() => setListType("customers")} to="/customerlist">
          Customer List
        </Link>
      </div>
      <div className="nav-container">
        <h3>Vendors</h3>
        <Link onClick={() => setListType("vendors")} to="/vendorlist">
          Vendor List
        </Link>
      </div>
      <div className="nav-container">
        <h3>Parts</h3>
        <Link onClick={() => setListType("parts")} to="/partslist">
          Parts List
        </Link>
      </div>
      <div className="nav-container">
        <h3>Labor</h3>
        <Link onClick={() => setListType("labor")} to="/laborlist">
          Labor List
        </Link>
        <Link to="/laborform">New Labor</Link>
      </div>
      <div className="nav-container">
        <h3>Job Types</h3>
        <Link onClick={() => setListType("jobtypes")} to="/jobtypelist">
          Job Types
        </Link>
      </div>
    </div>
  );
}

export default Nav;

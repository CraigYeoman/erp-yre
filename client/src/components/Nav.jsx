import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/workorderlist">Work Orders</Link>
      <Link to="/customerlist">Customers</Link>
      <p>Vendors</p>
      <p>Parts</p>
      <p>Labor</p>
      <p>Job Types</p>
    </div>
  );
}

export default Nav;

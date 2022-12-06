import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const PartDetail = () => {
  const { partDetail, selectVendorID, loading } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  const { name, part_number, manufacture, customer_price, cost, _id, vendor } =
    partDetail;
  return (
    <div>
      <div key={_id}>
        <h3>{name}</h3>
        <p>{part_number}</p>
        <p>{manufacture}</p>
        <p>{customer_price}</p>
        <p>{cost}</p>
        <Link onClick={() => selectVendorID(vendor._id)} to="/vendordetail">
          {vendor.name}
        </Link>
      </div>
    </div>
  );
};

export default PartDetail;

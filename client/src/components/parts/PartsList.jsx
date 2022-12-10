import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const CustomerList = () => {
  const { data, selectPartID, selectVendorID } = useGlobalContext();

  if (!data.parts) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <div>
      {data.parts.map((part) => {
        const { name, part_number, manufacture, vendor, customer_price, _id } =
          part;
        return (
          <div key={_id}>
            <Link onClick={() => selectPartID(_id)} to="/partdetail">
              {name}
            </Link>
            <p>{part_number}</p>
            <p>{manufacture}</p>
            <p>{customer_price}</p>
            <Link onClick={() => selectVendorID(vendor._id)} to="/vendordetail">
              {vendor.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerList;

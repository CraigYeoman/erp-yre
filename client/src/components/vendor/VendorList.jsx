import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const VendorList = () => {
  const { data, selectVendorID } = useGlobalContext();
  if (!data.vendors) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  return (
    <div>
      {data.vendors.map((vendor) => {
        const { _id, name, main_contact, phone_number, email } = vendor;
        return (
          <div key={_id}>
            <Link
              onClick={() => selectVendorID(_id)}
              to={`/vendordetail/${_id}`}
            >
              {name}
            </Link>
            <p>{main_contact}</p>
            <p>{phone_number}</p>
            <p>{email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default VendorList;

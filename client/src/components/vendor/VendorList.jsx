import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

const VendorList = () => {
  const { listType, selectVendorID, formatPhoneNumber } = useGlobalContext();
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data.vendors) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  return (
    <div className="vendor-list-container">
      {data.vendors.map((vendor) => {
        const { _id, name, main_contact, phone_number, email } = vendor;
        return (
          <div className="vendor-container" key={_id}>
            <Link
              onClick={() => selectVendorID(_id)}
              to={`/vendordetail/${_id}`}
            >
              {name}
            </Link>
            <p>{main_contact}</p>
            <p>{formatPhoneNumber(phone_number)}</p>
            <p>{email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default VendorList;

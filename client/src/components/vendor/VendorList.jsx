import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const VendorList = () => {
  const { vendorList, selectVendorID } = useGlobalContext();

  return (
    <div>
      {typeof vendorList.vendors === "undefined" ? (
        <p>Loading...</p>
      ) : (
        vendorList.vendors.map((vendor) => {
          const { _id, name, main_contact, phone_number, email } = vendor;
          return (
            <div key={_id}>
              <Link onClick={() => selectVendorID(_id)} to="/vendordetail">
                {name}
              </Link>
              <p>{main_contact}</p>
              <p>{phone_number}</p>
              <p>{email}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default VendorList;

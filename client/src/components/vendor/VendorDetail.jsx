import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const VendorDetail = () => {
  const { vendorDetail, loading, selectPartID } = useGlobalContext();
  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  return (
    <div>
      <div>
        <div key={vendorDetail.vendor._id}>
          <p>
            {vendorDetail.vendor.name} {vendorDetail.vendor.main_contact}
          </p>

          <p>{vendorDetail.vendor.phone_number}</p>
          <p>{vendorDetail.vendor.email}</p>
          <p>{vendorDetail.vendor.address_line_1}</p>
          <p>{vendorDetail.vendor.address_line_2}</p>
          <p>{vendorDetail.vendor.city}</p>
          <p>{vendorDetail.vendor.state}</p>
          <p>{vendorDetail.vendor.zip_code}</p>
          <p>{vendorDetail.vendor.customer_number}</p>
        </div>
      </div>
      <div>
        {vendorDetail.vendor_parts.map((part) => {
          const { _id, name, customer_price, cost, part_number, manufacture } =
            part;
          return (
            <div key={_id}>
              <Link onClick={() => selectPartID(_id)} to={`/partdetail/${_id}`}>
                {name}
              </Link>
              <p>{cost}</p>
              <p>{customer_price}</p>
              <p>{part_number}</p>
              <p>{manufacture}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VendorDetail;

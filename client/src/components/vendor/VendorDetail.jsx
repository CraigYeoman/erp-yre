import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const VendorDetail = () => {
  const {
    vendorDetail,
    loading,
    selectPartID,
    onSubmitGet,
    onSubmitPost,
    response,
    responseText,
    selectVendorID,
  } = useGlobalContext();
  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const {
    _id,
    main_contact,
    phone_number,
    name,
    email,
    address_line_1,
    address_line_2,
    city,
    state,
    zip_code,
    customer_number,
  } = vendorDetail.vendor;
  return (
    <div className="container-column">
      <h3>Vendor</h3>
      <div className="container-background">
        <div key={_id}>
          <p>{name}</p>
          <p>{main_contact}</p>
          <p>{phone_number}</p>
          <p>{email}</p>
          <p>
            {address_line_1}, {city}, {state} {zip_code}
          </p>
          <p>{address_line_2}</p>
          <p>Customer Number: {customer_number}</p>
        </div>
        <div className="container-row">
          <button className="buttons dark">
            <Link onClick={() => selectVendorID(_id)} to={`/vendoredit/${_id}`}>
              Edit
            </Link>
          </button>
          <div>
            <div>
              <button
                className="buttons dark"
                onClick={() => onSubmitGet(_id, "vendors")}
              >
                Delete{" "}
              </button>
            </div>
            {response && typeof responseText.vendor_parts === "undefined" ? (
              <div>
                Are you sure you want to delete?
                <button onClick={() => onSubmitPost(_id, "vendors")}>
                  Delete
                </button>
                {responseText === "Complete" && <div>Deleted</div>}
              </div>
            ) : (
              <div>
                {response && (
                  <div> Please edit the parts below before deleting</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3>Parts</h3>
        {vendorDetail.vendor_parts.map((part) => {
          const { _id, name, customer_price, cost, part_number, manufacture } =
            part;
          return (
            <div className="container-background" key={_id}>
              <Link onClick={() => selectPartID(_id)} to={`/partdetail/${_id}`}>
                {name}
              </Link>
              <div className="container-row">
                <div className="align-right">
                  <p>Cost:</p>
                  <p>Customer Price:</p>
                  <p>Part Number:</p>
                  <p>Manufacture:</p>
                </div>
                <div>
                  <p>${cost}</p>
                  <p>${customer_price}</p>
                  <p>{part_number}</p>
                  <p>{manufacture}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VendorDetail;

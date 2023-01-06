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
    <div>
      <div>
        <div key={_id}>
          <p>
            {name} {main_contact}
          </p>

          <p>{phone_number}</p>
          <p>{email}</p>
          <p>{address_line_1}</p>
          <p>{address_line_2}</p>
          <p>{city}</p>
          <p>{state}</p>
          <p>{zip_code}</p>
          <p>{customer_number}</p>
        </div>

        <div>
          <button onClick={() => onSubmitGet(_id, "vendors")}>Delete </button>
        </div>

        {response && typeof responseText.vendor_parts === "undefined" ? (
          <div>
            Are you sure you want to delete?
            <button onClick={() => onSubmitPost(_id, "vendors")}>Delete</button>
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

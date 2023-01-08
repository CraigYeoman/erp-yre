import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const CustomerDetail = () => {
  const {
    customerDetail,
    loading,
    selectWorkOrderID,
    onSubmitGet,
    onSubmitPost,
    response,
    responseText,
    selectCustomerID,
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
    first_name,
    last_name,
    phone_number,
    email,
    address_line_1,
    address_line_2,
    city,
    state,
    zip_code,
  } = customerDetail.customer;

  return (
    <div>
      <div>
        <div key={_id}>
          <p>
            {first_name} {last_name}
          </p>
          <p>{phone_number}</p>
          <p>{email}</p>
          <p>{address_line_1}</p>
          <p>{address_line_2}</p>
          <p>{city}</p>
          <p>{state}</p>
          <p>{zip_code}</p>
        </div>
        <div>
          <button>
            <Link
              onClick={() => selectCustomerID(_id)}
              to={`/customeredit/${_id}`}
            >
              Edit
            </Link>
          </button>
          <button onClick={() => onSubmitGet(_id, "customers")}>Delete </button>
        </div>

        {response &&
        typeof responseText.customer_work_orders === "undefined" ? (
          <div>
            Are you sure you want to delete?
            <button onClick={() => onSubmitPost(_id, "customers")}>
              Delete
            </button>
            {responseText === "Complete" && <div>Deleted</div>}
          </div>
        ) : (
          <div>
            {response && (
              <div> Please edit the work orders below before deleting.</div>
            )}
          </div>
        )}
      </div>
      <div>
        {customerDetail.customer_workorders.map((workOrder) => {
          const {
            _id,
            date_received,
            date_due,
            date_finished,
            jobType,
            work_order_number,
            estimatedPrice,
            notes,
          } = workOrder;
          return (
            <div key={_id}>
              <Link
                onClick={() => selectWorkOrderID(_id)}
                to={`/workorderdetail/${_id}`}
              >
                {work_order_number}
              </Link>
              <p>{jobType.name}</p>
              <p>{date_received}</p>
              <p>{date_due}</p>
              <p>{date_finished}</p>
              <p>{estimatedPrice}</p>
              <p>{notes}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerDetail;

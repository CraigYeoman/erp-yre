import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
const { DateTime } = require("luxon");

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
    <div className="container-column">
      <div className="container-background">
        <div key={_id}>
          <p>
            {first_name} {last_name}
          </p>
          <p>{phone_number}</p>
          <p>{email}</p>
          <p>
            {address_line_1}, {city}, {state} {zip_code}
          </p>
          <p>{address_line_2}</p>
        </div>
        <div>
          <button className="buttons dark">
            <Link
              onClick={() => selectCustomerID(_id)}
              to={`/customeredit/${_id}`}
            >
              Edit
            </Link>
          </button>
          <button
            className="buttons dark"
            onClick={() => onSubmitGet(_id, "customers")}
          >
            Delete{" "}
          </button>
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
        <h3>Work Orders</h3>
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
            complete,
          } = workOrder;
          console.log(customerDetail.customer_workorders);
          return (
            <fieldset className="customer-detail-work-order" key={_id}>
              <legend>
                <Link
                  onClick={() => selectWorkOrderID(_id)}
                  to={`/workorderdetail/${_id}`}
                >
                  {work_order_number}
                </Link>
              </legend>
              <p>{jobType.name}</p>
              <p>
                Date Recieved: {DateTime.fromISO(date_received).toFormat("D")}
              </p>
              <p>Date Due: {DateTime.fromISO(date_due).toFormat("D")}</p>
              {complete === false ? (
                <p>Status: Inprocess</p>
              ) : (
                <div>
                  <p>Status: Complete</p>
                  <p>
                    Date Completed:{" "}
                    {DateTime.fromISO(date_finished).toFormat("D")}
                  </p>
                </div>
              )}

              <p>Estimated Total: ${estimatedPrice}</p>
              <p>{notes}</p>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerDetail;

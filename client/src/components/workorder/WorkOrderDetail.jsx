import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
const { DateTime } = require("luxon");

const WorkOrderDetail = () => {
  const {
    workOrderDetail,
    loading,
    selectCustomerID,
    onSubmitGet,
    onSubmitPost,
    response,
    responseText,
    selectID,
  } = useGlobalContext();
  const { work_order } = workOrderDetail;

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  const {
    work_order_number,
    jobType,
    date_received,
    date_due,
    complete,
    date_finished,
    customer,
    estimatedPrice,
    notes,
    accessories,
    labor,
    parts,
    deposit,
    _id,
  } = work_order;
  return (
    <div className="work-order-detail-container">
      <div className="work-order-detail-title">
        <h2>
          {work_order_number} {jobType.name}
        </h2>
        <div className="work-order-detail-button-container">
          <button className="buttons">
            <Link onClick={() => selectID(_id)} to={`/workorderedit/${_id}`}>
              Edit
            </Link>
          </button>
          <button
            className="buttons"
            onClick={() => onSubmitGet(_id, "workorders")}
          >
            Delete
          </button>
          {response && (
            <div>
              Are you sure you want to delete?
              <button onClick={() => onSubmitPost(_id, "workorders")}>
                Delete
              </button>
            </div>
          )}
          {responseText === "Complete" && "Deleted"}
        </div>
      </div>
      <div className="work-order-detail-info1-container">
        <div className="work-order-detail-dates">
          <div className="work-order-detail-dates-1">
            <p>Date Received: </p>
            <p>Date Due: </p>
            <p>Status: </p>
          </div>
          <div>
            <p>{DateTime.fromISO(date_received).toFormat("D")}</p>
            <p>{DateTime.fromISO(date_due).toFormat("D")}</p>
            <p>{complete ? "Complete" : "In Process"}</p>
            {complete ? <p>{date_finished}</p> : ""}
          </div>
        </div>
        <div className="work-order-detail-customer-info">
          <p>
            <Link
              onClick={() => selectCustomerID(customer._id)}
              to={`/customerdetail/${customer._id}`}
            >
              {customer.first_name} {customer.last_name}
            </Link>
          </p>
          <p>Phone Number :{customer.phone_number}</p>
          <p>Email: {customer.email}</p>
        </div>
      </div>
      <div className="work-order-detail-totals-container">
        <fieldset className="work-order-detail-totals">
          <legend>Totals</legend>
          <div>
            <p>Estimated Total: </p>
            <p>Deposit: </p>
            <p>Estimated Amount Due: </p>
          </div>
          <div>
            <p>${estimatedPrice}</p>
            <p>${deposit}</p>
            <p>${estimatedPrice - deposit}</p>
          </div>
        </fieldset>
        {labor.length === 0 ? (
          <option></option>
        ) : (
          <fieldset>
            <legend>Labor</legend>
            {labor.map((labor) => {
              return (
                <div key={labor._id}>
                  <p>{labor.name}</p>
                  <p>${labor.price}</p>
                </div>
              );
            })}
          </fieldset>
        )}

        {parts.length === 0 ? (
          <option></option>
        ) : (
          <fieldset>
            <legend>Parts Needed</legend>
            {parts.map((part) => {
              return (
                <div key={part._id}>
                  <p>{part.name}</p>
                  <p>${part.customer_price}</p>
                </div>
              );
            })}
          </fieldset>
        )}
      </div>
      {accessories.length === 0 ? (
        <option></option>
      ) : (
        <fieldset>
          <legend>Customer Accessories</legend>
          {accessories.map((accessory) => {
            return <p key={accessory._id}>{accessory.name}</p>;
          })}
        </fieldset>
      )}

      <div>
        Notes
        <p>{notes}</p>
      </div>
    </div>
  );
};

export default WorkOrderDetail;

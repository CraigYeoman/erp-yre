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
    sumTotal,
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
    notes,
    accessories,
    labor,
    parts,
    deposit,
    _id,
  } = work_order;

  let laborPrice = sumTotal(labor, "price");
  let partsPrice = sumTotal(parts, "customer_price");
  let total = laborPrice + partsPrice;
  let tax = total * 0.09;
  let grandTotal = total + tax;

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
      <div className="work-order-detail-info-container">
        <fieldset className="work-order-detail-info">
          <legend>Dates</legend>
          <div className="work-order-detail-name">
            <p>Date Received: </p>
            <p>Date Due: </p>
            <p>Status: </p>
          </div>
          <div className="work-order-detail-value">
            <p>{DateTime.fromISO(date_received).toFormat("D")}</p>
            <p>{DateTime.fromISO(date_due).toFormat("D")}</p>
            <p>{complete ? "Complete" : "In Process"}</p>
            {complete ? <p>{date_finished}</p> : ""}
          </div>
        </fieldset>
        <fieldset className="work-order-detail-info customer">
          <legend>Customer</legend>
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
        </fieldset>
      </div>
      <div className="work-order-detail-info-container">
        <fieldset className="work-order-detail-info">
          <legend>Totals</legend>
          <div className="work-order-detail-name">
            <p>Labor Total</p>

            <p>Parts Total</p>
            <p>Total</p>
            <p>Tax</p>
            <p>Grand Total</p>

            <p>Deposit: </p>
            <p>Est. Due: </p>
          </div>
          <div className="work-order-detail-value">
            <p>${laborPrice.toFixed(2)}</p>
            <p>${partsPrice.toFixed(2)}</p>
            <p>${total.toFixed(2)}</p>
            <p>${tax.toFixed(2)}</p>
            <p>${grandTotal.toFixed(2)}</p>
            <p>${deposit.toFixed(2)}</p>
            <p>${(grandTotal - deposit).toFixed(2)}</p>
          </div>
        </fieldset>
        <fieldset className="work-order-detail-info">
          <legend>Notes</legend>
          <p>{notes}</p>
        </fieldset>
      </div>
      <div className="work-order-detail-info-container">
        {labor.length === 0 ? (
          <option></option>
        ) : (
          <fieldset className="work-order-detail-info">
            <legend>Labor</legend>

            <div className="work-order-detail-name">
              {labor.map((labor) => {
                return (
                  <div key={labor.name}>
                    <p>{labor.name}</p>
                  </div>
                );
              })}
            </div>
            <div className="work-order-detail-value">
              {labor.map((labor) => {
                return (
                  <div key={labor._id}>
                    <p>${labor.price.toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </fieldset>
        )}

        {parts.length === 0 ? (
          <option></option>
        ) : (
          <fieldset className="work-order-detail-info">
            <legend>Parts Needed</legend>

            <div className="work-order-detail-name">
              {parts.map((part) => {
                return (
                  <div key={part.name}>
                    <p>{part.name}</p>
                  </div>
                );
              })}
            </div>
            <div className="work-order-detail-value">
              {parts.map((part) => {
                return (
                  <div key={part._id}>
                    <p>${part.customer_price.toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </fieldset>
        )}
      </div>
      {accessories.length === 0 ? (
        <option></option>
      ) : (
        <fieldset className="work-order-detail-info">
          <legend>Customer Accessories</legend>
          {accessories.map((accessory) => {
            return <p key={accessory._id}>{accessory.name}</p>;
          })}
        </fieldset>
      )}
    </div>
  );
};

export default WorkOrderDetail;

import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const WorkOrderDetail = () => {
  const { workOrderDetail, loading, selectCustomerID } = useGlobalContext();
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
  } = work_order;
  return (
    <div>
      <div>
        <h2>
          {work_order_number} {jobType.name}
        </h2>
        <div>
          <p>Date Received:{date_received}</p>
          <p>Date Due:{date_due}</p>
          <p>Status: {complete ? "Complete" : "In Process"}</p>
          {complete ? <p>{date_finished}</p> : ""}
        </div>
        <div>
          <h4>
            <Link
              onClick={() => selectCustomerID(customer._id)}
              to={`/customerdetail/${customer._id}`}
            >
              {customer.first_name} {customer.last_name}
            </Link>
          </h4>
          <p>{customer.phone_number}</p>
          <p>{customer.email}</p>
          <p>{customer.address_line_1}</p>
          <p>{customer.address_line_2}</p>
          <p>{customer.city}</p>
          <p>{customer.state}</p>
          <p>{customer.zip_code}</p>
        </div>
        <div>
          <p>{estimatedPrice}</p>

          <fieldset>
            <legend>Labor</legend>
            {labor.map((labor) => {
              return (
                <div key={labor._id}>
                  <p>{labor.name}</p>
                  <p>{labor.price}</p>
                </div>
              );
            })}
          </fieldset>
          <fieldset>
            <legend>Parts Needed</legend>
            {parts.map((part) => {
              return (
                <div key={part._id}>
                  <p>{part.name}</p>
                  <p>{part.customer_price}</p>
                </div>
              );
            })}
          </fieldset>
        </div>

        <fieldset>
          <legend>Customer Accessories</legend>
          {accessories.map((accessory) => {
            return <p key={accessory._id}>{accessory.name}</p>;
          })}
        </fieldset>

        <div>
          <p>{notes}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderDetail;

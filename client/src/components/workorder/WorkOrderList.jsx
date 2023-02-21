import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
const { DateTime } = require("luxon");

const WorkOrderList = () => {
  const { selectWorkOrderID, selectCustomerID, listType, sumTotal } =
    useGlobalContext();
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data.workOrders) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  return (
    <div className="work-order-list-container ">
      <div className="work-order-container">
        <fieldset>
          <legend>Work Order Number</legend>
          <p>Customer Name</p>
          <p>Job Type</p>
          <p>Date Recieved</p>
          <p>Due Date</p>
          <p>Estimated Price</p>
        </fieldset>
      </div>
      {data.workOrders.map((workOrder) => {
        const {
          _id,
          date_received,
          date_due,
          jobType,
          customer,
          work_order_number,
          labor,
          parts,
        } = workOrder;
        console.log(workOrder);
        return (
          <div className="work-order-container" key={_id}>
            <fieldset>
              <legend>
                <Link
                  onClick={() => selectWorkOrderID(_id)}
                  to={`/workorderdetail/${_id}`}
                >
                  {work_order_number}
                </Link>
              </legend>
              <p>
                <Link
                  onClick={() => selectCustomerID(customer._id)}
                  to={`/customerdetail/${customer._id}`}
                >
                  {customer.first_name} {customer.last_name}
                </Link>
              </p>
              <p>{jobType.name}</p>
              <p>{DateTime.fromISO(date_received).toFormat("D")}</p>
              <p>{DateTime.fromISO(date_due).toFormat("D")}</p>
              <p>
                $
                {(
                  sumTotal(labor, "price") +
                  sumTotal(parts, "customer_price") -
                  0
                ).toFixed(2)}
              </p>
            </fieldset>
          </div>
        );
      })}
    </div>
  );
};

export default WorkOrderList;

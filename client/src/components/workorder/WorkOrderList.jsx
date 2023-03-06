import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../../context";

const { DateTime } = require("luxon");

const WorkOrderList = () => {
  const {
    selectWorkOrderID,
    selectCustomerID,
    sumTotal,
    handleChange,
    values,
    clearFilters,
    data,
    getWorkOrder,
  } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  // let url = `/api/v1/erp/${listType}`;

  // useEffect(() => {
  //   getWorkOrder()
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  // }, []);

  useEffect(() => {
    getWorkOrder();
    console.log(data);
  }, [values]);

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
        <div className="container-row">
          <div className="container-column">
            <label htmlFor="jobtype">Job Type</label>
            <select
              type="select"
              placeholder="jobtype"
              name="jobType"
              required={true}
              onChange={handleChange}
              value={values.jobType}
            >
              <option value="all">All</option>
              {typeof data.jobTypeList === "undefined" ? (
                <option>Loading...</option>
              ) : (
                data.jobTypeList
                  .sort((a, b) => {
                    let textA = a.name.toUpperCase();
                    let textB = b.name.toUpperCase();
                    return textA < textB ? -1 : textA > textB ? 1 : 0;
                  })
                  .map((jobtype) => {
                    return (
                      <option value={jobtype._id} key={jobtype._id}>
                        {jobtype.name}
                      </option>
                    );
                  })
              )}
            </select>
          </div>

          <div className="container-column">
            <label htmlFor="sort">Sort</label>
            <select
              type="select"
              placeholder="sort"
              name="sort"
              required={true}
              onChange={handleChange}
              value={values.sort}
            >
              <option value="date_due">Due Date</option>
              <option value="date_received">Date Recieved</option>
              <option value="Work Order Number">Work Order Number</option>
              <option value="customer_name_a">Customer Name A-Z</option>
              <option value="customer_name_z">Customer Name Z-A</option>
              <option value="estimated_price_>">Estimated Price Largest</option>
              <option value="estimated_price_<">
                Estimated Price Smallest
              </option>
            </select>
          </div>
          <div className="container-column">
            <label htmlFor="complete">Status</label>
            <select
              type="select"
              placeholder="complete"
              name="complete"
              required={true}
              onChange={handleChange}
              value={values.complete}
            >
              <option value="false">Incomplete</option>
              <option value="true">Complete</option>
              <option value="all">All</option>
            </select>
          </div>
          <button onClick={handleSubmit}>Clear Filters</button>
        </div>
      </div>
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

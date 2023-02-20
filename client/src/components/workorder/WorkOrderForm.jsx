import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState, useEffect } from "react";
const rootUrl = "http://localhost:5000";

const WorkOrderForm = () => {
  useEffect(() => {
    fetch("/api/v1/erp/workorders/create")
      .then((response) => response.json())
      .then((data) => {
        setWorkOrderInfo(data);
      });
  }, []);

  const { loading, selectWorkOrderID } = useGlobalContext();
  const [values, setValues] = useState({
    customer: "",
    date_received: "",
    date_due: "",
    jobtype: "",
    parts: "",
    labor: "",
    work_order_number: "",
    notes: "",
  });

  const [customerAccessories, setCustomerAccessories] = useState([]);
  const [customerParts, setCustomerParts] = useState([]);
  const [customerLabor, setCustomerLabor] = useState([]);
  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseError, setResponseError] = useState(false);
  const [responseTextError, setResponseTextError] = useState("");
  const [workOrderInfo, setWorkOrderInfo] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeCheckBox = (id, array, func, event) => {
    if (event.target.checked === true) {
      const updatedValues = [...array, id];
      func(updatedValues);
    } else if (event.target.checked === false) {
      const updatedValues = array.filter((a) => a !== id);
      func(updatedValues);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponse(false);
    setResponseError(false);
    const {
      customer,
      date_received,
      date_due,
      jobtype,
      work_order_number,
      notes,
    } = values;
    let accessories = customerAccessories;
    let parts = customerParts;
    let labor = customerLabor;
    const workOrderData = {
      customer,
      date_received,
      date_due,
      jobtype,
      accessories,
      parts,
      labor,
      work_order_number,
      notes,
    };

    try {
      const url = `${rootUrl}/api/v1/erp/workorders/create`;
      axios
        .post(url, workOrderData)
        .then(function (response) {
          setResponseText(response.data);
          setResponse(true);
        })
        .catch(function (error) {
          setResponseTextError(error.response.data);
          console.log(error.response.data);
          setResponseError(true);
        });

      setValues({
        customer: "",
        date_received: "",
        date_due: "",
        part_number: "",
        jobtype: "",
        parts: "",
        labor: "",
        notes: "",
        work_order_number: "",
      });
      setCustomerAccessories([]);
      setCustomerParts([]);
      setCustomerLabor([]);
    } catch (error) {
      setResponseTextError(error);
      console.log(error);
      setResponseError(true);
    }
  };
  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  return (
    <div className="container-column">
      <form onSubmit={onSubmit}>
        <div className="container-column gap">
          <h2>New Work Order</h2>
          <div className="container-column">
            <label className="container-column" htmlFor="work_order_number">
              Work Order Number
            </label>
            <input
              type="number"
              placeholder="XXXXX"
              name="work_order_number"
              required={true}
              value={values.work_order_number}
              onChange={handleChange}
            ></input>
          </div>
          <div className="container-column">
            <label htmlFor="customer">Customer</label>
            <select
              type="select"
              placeholder="customer"
              name="customer"
              required={true}
              onChange={handleChange}
              value={values.customer}
            >
              <option value="" disabled selected hidden>
                Please Choose Customer
              </option>
              {typeof workOrderInfo.customers === "undefined" ? (
                <option>Loading...</option>
              ) : (
                workOrderInfo.customers
                  .sort((a, b) => {
                    let textA = a.first_name.toUpperCase();
                    let textB = b.first_name.toUpperCase();
                    return textA < textB ? -1 : textA > textB ? 1 : 0;
                  })
                  .map((customer) => {
                    return (
                      <option value={customer._id} key={customer._id}>
                        {customer.first_name} {customer.last_name}
                      </option>
                    );
                  })
              )}
            </select>
          </div>
          <div className="container-column">
            <label htmlFor="date_received">Date Received</label>
            <input
              type="date"
              placeholder="XX/XX/XXXX"
              name="date_received"
              required={true}
              value={values.date_received}
              onChange={handleChange}
            ></input>
          </div>
          <div className="container-column">
            <label htmlFor="date_due">Due Date</label>
            <input
              type="date"
              placeholder="XX/XX/XXXX"
              name="date_due"
              required={true}
              value={values.date_due}
              onChange={handleChange}
            ></input>
          </div>
          <div className="container-column">
            <label htmlFor="jobtype">Job Type</label>
            <select
              type="select"
              placeholder="jobtype"
              name="jobtype"
              required={true}
              onChange={handleChange}
              value={values.jobtype}
            >
              <option value="" disabled selected hidden>
                Please Choose Job Type
              </option>
              {typeof workOrderInfo.jobtypes === "undefined" ? (
                <option>Loading...</option>
              ) : (
                workOrderInfo.jobtypes
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
          <fieldset>
            <legend>Parts Needed</legend>
            {typeof workOrderInfo.parts === "undefined" ? (
              <option>Loading...</option>
            ) : (
              workOrderInfo.parts
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((part) => {
                  return (
                    <div key={part._id}>
                      <input
                        type="checkbox"
                        name="accessories"
                        onChange={(event) =>
                          handleChangeCheckBox(
                            part._id,
                            customerParts,
                            setCustomerParts,
                            event
                          )
                        }
                        value={part._id}
                      ></input>
                      <label htmlFor={part.name}>
                        ${part.customer_price} - {part.name}
                      </label>
                    </div>
                  );
                })
            )}
          </fieldset>
          <fieldset>
            <legend>Labor Needed</legend>
            {typeof workOrderInfo.labors === "undefined" ? (
              <option>Loading...</option>
            ) : (
              workOrderInfo.labors
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((labor) => {
                  return (
                    <div key={labor._id}>
                      <input
                        type="checkbox"
                        name="accessories"
                        onChange={(event) =>
                          handleChangeCheckBox(
                            labor._id,
                            customerLabor,
                            setCustomerLabor,
                            event
                          )
                        }
                        value={labor._id}
                      ></input>
                      <label htmlFor={labor.name}>
                        ${labor.price} - {labor.name}
                      </label>
                    </div>
                  );
                })
            )}
          </fieldset>

          <fieldset>
            <legend>Customer Accessories</legend>
            {typeof workOrderInfo.accessories === "undefined" ? (
              <option>Loading...</option>
            ) : (
              workOrderInfo.accessories
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((accessory) => {
                  return (
                    <div key={accessory._id}>
                      <input
                        type="checkbox"
                        name="accessories"
                        onChange={(event) =>
                          handleChangeCheckBox(
                            accessory._id,
                            customerAccessories,
                            setCustomerAccessories,
                            event
                          )
                        }
                        value={accessory._id}
                      ></input>
                      <label htmlFor={accessory.name}>{accessory.name}</label>
                    </div>
                  );
                })
            )}
          </fieldset>
          <label htmlFor="notes">
            <textarea
              placeholder="Notes"
              name="notes"
              value={values.notes}
              onChange={handleChange}
              cols="30"
              rows="10"
            ></textarea>
          </label>
          <button className="buttons" type="submit">
            Submit
          </button>
        </div>
      </form>
      {response && (
        <div>
          {responseText.msg}{" "}
          <Link
            onClick={() => selectWorkOrderID(responseText.workOrder._id)}
            to={`/workorderdetail/${responseText.workOrder._id}`}
          >
            {responseText.workOrder.work_order_number}
          </Link>
        </div>
      )}
      {responseError && (
        <div>
          <p>
            {responseText.workOrder.first_name}{" "}
            {responseText.workOrder.last_name}{" "}
            {responseText.workOrder.work_order_number}not created
          </p>
          {responseTextError.errors.map((error) => {
            const { msg, param, value } = error;
            return (
              <p key={error.param}>
                {msg} in {param} value {value}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WorkOrderForm;

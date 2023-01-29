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
    estimatedPrice: "",
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
      console.log(updatedValues);
    } else if (event.target.checked === false) {
      const updatedValues = array.filter((a) => a !== id);
      func(updatedValues);
      console.log(updatedValues);
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
      estimatedPrice,
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
      estimatedPrice,
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
        estimatedPrice: "",
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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="work_order_number">
            Work Order Number:
            <input
              type="number"
              placeholder="XXXXX"
              name="work_order_number"
              required={true}
              value={values.work_order_number}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="customer">
            Customer:
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
          </label>

          <label htmlFor="date_received">
            date_received:
            <input
              type="date"
              placeholder="XX/XX/XXXX"
              name="date_received"
              required={true}
              value={values.date_received}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="date_due">
            date_due:
            <input
              type="date"
              placeholder="XX/XX/XXXX"
              name="date_due"
              required={true}
              value={values.date_due}
              onChange={handleChange}
            ></input>
          </label>

          <label htmlFor="estimatedPrice">
            Estimated Price:
            <input
              type="number"
              placeholder="$$$"
              name="estimatedPrice"
              required={true}
              value={values.estimatedPrice}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="jobtype">
            Job Type:
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
          </label>

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
                      <label htmlFor={part.name}>{part.name}</label>
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
                      <label htmlFor={labor.name}>{labor.name}</label>
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
        </div>
        <button type="submit">Submit</button>
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

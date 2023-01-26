import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState, useEffect } from "react";
const rootUrl = "http://localhost:5000";
const { DateTime } = require("luxon");

const WorkOrderForm = () => {
  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/erp/workorders/${id}/edit`)
      .then((response) => response.json())
      .then((data) => {
        setWorkOrderDetail(data);
        setValues({
          customer: data.work_order.customer,
          date_received: DateTime.fromISO(
            data.work_order.date_received
          ).toISODate(),
          date_due: DateTime.fromISO(data.work_order.date_due).toISODate(),
          part_number: data.work_order.part_number,
          estimatedPrice: data.work_order.estimatedPrice,
          jobtype: data.work_order.jobtype,
          parts: data.work_order.parts,
          labor: data.work_order.labor,
          notes: data.work_order.notes,
          work_order_number: data.work_order.work_order_number,
          _id: data.work_order._id,
        });

        checkBoxLoad(data.work_order.accessories, setCustomerAccessories);
        checkBoxLoad(data.work_order.parts, setCustomerParts);
        checkBoxLoad(data.work_order.labor, setCustomerLabor);

        setLoading(false);
      });
  }, []);

  const [customerAccessories, setCustomerAccessories] = useState([]);
  const [customerParts, setCustomerParts] = useState([]);
  const [customerLabor, setCustomerLabor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseError, setResponseError] = useState(false);
  const [responseTextError, setResponseTextError] = useState("");
  const [workOrderDetail, setWorkOrderDetail] = useState("");
  const { selectWorkOrderID, id } = useGlobalContext();
  const [values, setValues] = useState({
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
    _id: "",
  });

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

  const checkBoxLoad = (array, func) => {
    const items = array.map((x) => x._id);
    func(items);
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
      _id,
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
      _id,
    };

    try {
      const url = `${rootUrl}/api/v1/erp/workorders/${_id}/edit`;
      axios
        .post(url, workOrderData)
        .then((response) => {
          setResponseText(response.data);
          setResponse(true);
        })
        .catch((error) => {
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
              <option value={workOrderDetail.work_order.customer._id}>
                {workOrderDetail.work_order.customer.first_name}
                {workOrderDetail.work_order.customer.last_name}
              </option>

              {workOrderDetail.customers
                .filter(
                  (a) => a._id !== workOrderDetail.work_order.customer._id
                )
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
                })}
            </select>
          </label>

          <label htmlFor="date_received">
            date_received:
            <input
              type="date"
              placeholder={values.date_received}
              name="date_received"
              required={true}
              value={values.date_received}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="date_due">
            Due date:
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
              <option value={workOrderDetail.work_order.jobType._id}>
                {workOrderDetail.work_order.jobType.name}
              </option>
              {loading === true ? (
                <option>Loading...</option>
              ) : (
                workOrderDetail.jobtypes
                  .filter(
                    (a) => a.name !== workOrderDetail.work_order.jobType.name
                  )
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
            {workOrderDetail.accessories
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
                      id={accessory._id}
                      checked={customerAccessories.includes(accessory._id)}
                      onChange={(event) =>
                        handleChangeCheckBox(
                          accessory._id,
                          customerAccessories,
                          setCustomerAccessories,
                          event
                        )
                      }
                    ></input>
                    <label htmlFor={accessory.name}>{accessory.name}</label>
                  </div>
                );
              })}
          </fieldset>
          <fieldset>
            <legend>Parts Needed</legend>

            {workOrderDetail.parts
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
                      name={part._id}
                      checked={customerParts.includes(part._id)}
                      onChange={(event) =>
                        handleChangeCheckBox(
                          part._id,
                          customerParts,
                          setCustomerParts,
                          event
                        )
                      }
                    ></input>
                    <label htmlFor={part.name}>{part.name}</label>
                  </div>
                );
              })}
          </fieldset>
          <fieldset>
            <legend>Labor Needed</legend>

            {workOrderDetail.labors
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
                      name={labor._id}
                      checked={customerLabor.includes(labor._id)}
                      onChange={(event) =>
                        handleChangeCheckBox(
                          labor._id,
                          customerLabor,
                          setCustomerLabor,
                          event
                        )
                      }
                    ></input>
                    <label htmlFor={labor.name}>{labor.name}</label>
                  </div>
                );
              })}
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
          {responseText.msg}
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

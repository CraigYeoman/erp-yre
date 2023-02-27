import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState, useEffect } from "react";
import FormDropDown from "../FormDropDown";
import { MdDeleteOutline } from "react-icons/md";
const rootUrl = "http://localhost:5000";

const WorkOrderForm = () => {
  useEffect(() => {
    fetch("/api/v1/erp/workorders/create")
      .then((response) => response.json())
      .then((data) => {
        setWorkOrderInfo(data);
      });
    setCustomerParts([]);
    setCustomerLabor([]);
  }, []);

  const {
    loading,
    selectWorkOrderID,
    customerParts,
    setCustomerParts,
    handleChangeArray,
    customerLabor,
    deleteItem,
    setCustomerLabor,
    sumTotal,
  } = useGlobalContext();
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
  // const [customerParts, setCustomerParts] = useState([]);

  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseError, setResponseError] = useState(false);
  const [responseTextError, setResponseTextError] = useState("");
  const [workOrderInfo, setWorkOrderInfo] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const handleChangeCheckBox = (id, array, func, event) => {
  //   if (event.target.checked === true) {
  //     const updatedValues = [...array, id];
  //     console.log(updatedValues);
  //     func(updatedValues);
  //   } else if (event.target.checked === false) {
  //     const updatedValues = array.filter((a) => a !== id);
  //     func(updatedValues);
  //   }
  // };

  const handleChangeCheckBox = (array, func, event, info) => {
    if (event.target.checked === true) {
      const updatedValues = [...array, info];
      console.log(updatedValues);
      func(updatedValues);
    } else if (event.target.checked === false) {
      const updatedValues = array.filter((a) => a._id !== info._id);
      func(updatedValues);
    }
    console.log(array);
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
                  let info = {
                    name: accessory.name,
                    _id: accessory._id,
                  };
                  return (
                    <div key={accessory._id}>
                      <input
                        type="checkbox"
                        name="accessories"
                        onChange={(event) =>
                          handleChangeCheckBox(
                            customerAccessories,
                            setCustomerAccessories,
                            event,
                            info
                          )
                        }
                        value={info}
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
          <FormDropDown
            name="Parts"
            array={workOrderInfo.parts}
            category={workOrderInfo.partsCategory}
          />
          <FormDropDown
            name="Labor"
            array={workOrderInfo.labors}
            category={workOrderInfo.laborCategory}
          />
          <div>
            <h3>Parts Total: ${sumTotal(customerParts, "customer_price")}</h3>
            {customerParts
              .sort((a, b) => {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
              .map((part) => {
                return (
                  <div key={part._id}>
                    <p>Part#: {part.part_number}</p> <p>Name: {part.name}</p>{" "}
                    <p>Manufacture: {part.manufacture}</p>
                    <p>Price: ${part.customer_price}</p>
                    <MdDeleteOutline
                      onClick={() =>
                        deleteItem(part._id, customerParts, setCustomerParts)
                      }
                    />
                  </div>
                );
              })}
          </div>
          <div>
            <h3>Labor Total: ${sumTotal(customerLabor, "price")}</h3>
            {customerLabor
              .sort((a, b) => {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
              .map((labor) => {
                return (
                  <div key={labor._id}>
                    <p>Labor: {labor.name}</p>
                    <p>Price: ${labor.price}</p>
                    <MdDeleteOutline
                      onClick={() =>
                        deleteItem(labor._id, customerLabor, setCustomerLabor)
                      }
                    />
                  </div>
                );
              })}
          </div>

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

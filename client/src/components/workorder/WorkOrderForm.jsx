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
    part_number: "",
    date_finished: "",
    estimatedPrice: "",
    complete: "",
    jobtype: "",
    accessories: "",
    parts: "",
    labor: "",
    notes: "",
    work_order_number: "",
  });

  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseError, setResponseError] = useState(false);
  const [responseTextError, setResponseTextError] = useState("");
  const [workOrderInfo, setWorkOrderInfo] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponse(false);
    setResponseError(false);
    const {
      customer,
      date_received,
      date_due,
      part_number,
      date_finished,
      estimatedPrice,
      complete,
      jobtype,
      accessories,
      parts,
      labor,
      notes,
      work_order_number,
    } = values;
    const workOrderData = {
      customer,
      date_received,
      date_due,
      part_number,
      date_finished,
      estimatedPrice,
      complete,
      jobtype,
      accessories,
      parts,
      labor,
      notes,
      work_order_number,
    };
    console.log(workOrderData);
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
        date_finished: "",
        estimatedPrice: "",
        complete: "",
        jobtype: "",
        accessories: "",
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
          <label htmlFor="complete">
            Complete:
            <input
              type="checkbox"
              name="complete"
              value={values.complete}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="date_finished">
            Date finished:
            <input
              type="date"
              placeholder="Leave empty if incomplete"
              name="date_finished"
              value={values.date_finished}
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

            <div>
              <input type="checkbox" name="none" value="none" />
              <label htmlFor="none">None</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="music"
                name="accessories"
                value="water pump"
              />
              <label htmlFor="water pump">water pump</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="music"
                name="accessories"
                value="pulleys"
              />
              <label htmlFor="pulleys">pulleys</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="music"
                name="distributor"
                value="distributor"
              />
              <label htmlFor="distributor">distributor</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="music"
                name="distributor wires"
                value="distributor wires"
              />
              <label htmlFor="distributor wires">distributor wires</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="music"
                name="power steering pump"
                value="power steering pump"
              />
              <label htmlFor="power steering pump">power steering pump</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="music"
                name="engine stand"
                value="engine stand"
              />
              <label htmlFor="engine stand">engine stand</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="music"
                name="flywheel"
                value="flywheel"
              />
              <label htmlFor="flywheel">flywheel</label>
            </div>
            <div>
              <input type="checkbox" id="music" name="spud" value="spud" />
              <label htmlFor="spud">spud</label>
            </div>
          </fieldset>
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
            {responseText.workOrder.name} {responseText.workOrder.last_name}
          </Link>
        </div>
      )}
      {responseError && (
        <div>
          <p>{responseTextError.workOrder.name} not created</p>
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

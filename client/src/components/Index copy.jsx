import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
const { DateTime } = require("luxon");
import { Box } from "@mui/material";

const Index = () => {
  const [data, setData] = useState([{}]);
  const { rootUrl, selectCustomerID, selectWorkOrderID } = useGlobalContext();

  useEffect(() => {
    fetch(`${rootUrl}/api/v1/erp/workorders/index`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (data.countArray == null) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <div className="container-column">
      <h1>Erp App</h1>
      <div className="container-row top">
        <h4>
          <p>Work Order Totals</p>
        </h4>
        {data.countArray.map((jobType) => (
          <h4 key={jobType.name}>
            <p>
              {jobType.name}: {jobType.count}
            </p>
          </h4>
        ))}
      </div>
      <div className="container-row top">
        <div className="container-column">
          <h3>Past Due</h3>
          <div className="container-column">
            {data.past_due.map((work_order) => (
              <div key={work_order._id} className="container-background sized">
                <p>
                  Due Date :{" "}
                  {DateTime.fromISO(work_order.date_due).toFormat("D")}
                </p>
                <p>
                  Work Order :{" "}
                  <Link
                    onClick={() => selectWorkOrderID(work_order._id)}
                    to={`/workorderdetail/${work_order._id}`}
                  >
                    {work_order.work_order_number}
                  </Link>
                </p>
                <p>
                  Name :{" "}
                  <Link
                    onClick={() => selectCustomerID(work_order.customer._id)}
                    to={`/customerdetail/${work_order.customer._id}`}
                  >
                    {work_order.customer.first_name}{" "}
                    {work_order.customer.last_name}
                  </Link>
                </p>
                <p>Job Type : {work_order.jobType.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="container-column">
          <h3>Due This Week</h3>
          <div className="container-column">
            {data.due_this_week.map((work_order) => (
              <div key={work_order._id} className="container-background sized">
                <p>
                  Due Date :{" "}
                  {DateTime.fromISO(work_order.date_due).toFormat("D")}
                </p>
                <p>
                  Work Order :{" "}
                  <Link
                    onClick={() => selectWorkOrderID(work_order._id)}
                    to={`/workorderdetail/${work_order._id}`}
                  >
                    {work_order.work_order_number}
                  </Link>
                </p>
                <p>
                  Name :{" "}
                  <Link
                    onClick={() => selectCustomerID(work_order.customer._id)}
                    to={`/customerdetail/${work_order.customer._id}`}
                  >
                    {work_order.customer.first_name}{" "}
                    {work_order.customer.last_name}
                  </Link>
                </p>
                <p>Job Type : {work_order.jobType.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="container-column">
          <h3>Due Next Week</h3>
          <div className="container-column">
            {data.due_next_week.map((work_order) => (
              <div key={work_order._id} className="container-background sized">
                <p>
                  Due Date :{" "}
                  {DateTime.fromISO(work_order.date_due).toFormat("D")}
                </p>
                <p>
                  Work Order :{" "}
                  <Link
                    onClick={() => selectWorkOrderID(work_order._id)}
                    to={`/workorderdetail/${work_order._id}`}
                  >
                    {work_order.work_order_number}
                  </Link>
                </p>
                <p>
                  Name :{" "}
                  <Link
                    onClick={() => selectCustomerID(work_order.customer._id)}
                    to={`/customerdetail/${work_order.customer._id}`}
                  >
                    {work_order.customer.first_name}{" "}
                    {work_order.customer.last_name}
                  </Link>
                </p>
                <p>Job Type : {work_order.jobType.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="container-column">
          <h3>Due In 30 Days</h3>
          <div className="container-column">
            {data.due_week_three_four.map((work_order) => (
              <div key={work_order._id} className="container-background sized">
                <p>
                  Due Date :{" "}
                  {DateTime.fromISO(work_order.date_due).toFormat("D")}
                </p>
                <p>
                  Work Order :{" "}
                  <Link
                    onClick={() => selectWorkOrderID(work_order._id)}
                    to={`/workorderdetail/${work_order._id}`}
                  >
                    {work_order.work_order_number}
                  </Link>
                </p>
                <p>
                  Name :{" "}
                  <Link
                    onClick={() => selectCustomerID(work_order.customer._id)}
                    to={`/customerdetail/${work_order.customer._id}`}
                  >
                    {work_order.customer.first_name}{" "}
                    {work_order.customer.last_name}
                  </Link>
                </p>
                <p>Job Type : {work_order.jobType.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

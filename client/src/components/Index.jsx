import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
const { DateTime } = require("luxon");

const Index = () => {
  const [data, setData] = useState([{}]);
  const { rootUrl, selectCustomerID, selectWorkOrderID } = useGlobalContext();

  useEffect(() => {
    fetch(`${rootUrl}/api/v1/erp/workorders/index`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  if (data.countArray == null) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  console.log(data);

  // const {
  //   work_order_count,
  //   work_order_count_new,
  //   work_order_count_refreshen,
  //   work_order_count_repair,
  //   work_order_count_machine_work,
  //   work_order_count_in_out,
  //   work_order_count_walk_in,
  //   work_order_count_used,
  // } = data.results;
  return (
    <div>
      <h1>Erp App</h1>
      <div>
        Work Order Totals
        {data.countArray.map((jobType) => (
          <div>
            <p>
              {jobType.name}:{jobType.count}
            </p>
          </div>
        ))}
      </div>
      <div>
        Due This Week
        {data.due_this_week.map((work_order) => (
          <div>
            <p>{DateTime.fromISO(work_order.date_due).toFormat("D")}</p>
            <Link
              onClick={() => selectWorkOrderID(work_order._id)}
              to={`/workorderdetail/${work_order._id}`}
            >
              {work_order.work_order_number}
            </Link>
            <Link
              onClick={() => selectCustomerID(work_order.customer._id)}
              to={`/customerdetail/${work_order.customer._id}`}
            >
              {work_order.customer.first_name} {work_order.customer.last_name}
            </Link>
            <p>{work_order.jobType.name}</p>
          </div>
        ))}
      </div>
      <div>
        Due Next Week
        {data.due_next_week.map((work_order) => (
          <div>
            <p>{DateTime.fromISO(work_order.date_due).toFormat("D")}</p>
            <Link
              onClick={() => selectWorkOrderID(work_order._id)}
              to={`/workorderdetail/${work_order._id}`}
            >
              {work_order.work_order_number}
            </Link>
            <Link
              onClick={() => selectCustomerID(work_order.customer._id)}
              to={`/customerdetail/${work_order.customer._id}`}
            >
              {work_order.customer.first_name} {work_order.customer.last_name}
            </Link>
            <p>{work_order.jobType.name}</p>
          </div>
        ))}
      </div>
      <div>
        Due In 30 Days
        {data.due_week_three_four.map((work_order) => (
          <div>
            <p>{DateTime.fromISO(work_order.date_due).toFormat("D")}</p>
            <Link
              onClick={() => selectWorkOrderID(work_order._id)}
              to={`/workorderdetail/${work_order._id}`}
            >
              {work_order.work_order_number}
            </Link>
            <Link
              onClick={() => selectCustomerID(work_order.customer._id)}
              to={`/customerdetail/${work_order.customer._id}`}
            >
              {work_order.customer.first_name} {work_order.customer.last_name}
            </Link>
            <p>{work_order.jobType.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;

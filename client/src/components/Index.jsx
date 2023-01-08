// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const Index = () => {
  const [data, setData] = useState([{}]);
  const { rootUrl } = useGlobalContext();

  useEffect(() => {
    fetch(`${rootUrl}/api/v1/erp/workorders/index`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (data.results == null) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  const {
    work_order_count,
    work_order_count_new,
    work_order_count_refreshen,
    work_order_count_repair,
    work_order_count_machine_work,
    work_order_count_in_out,
    work_order_count_walk_in,
    work_order_count_used,
  } = data.results;
  return (
    <div>
      <h1>Erp App</h1>
      <div>
        <h3>Work Order Count: {work_order_count}</h3>
        <h3>New Motors: {work_order_count_new}</h3>
        <h3>Refreshens {work_order_count_refreshen}</h3>
        <h3>Repairs: {work_order_count_repair}</h3>
        <h3>Used: {work_order_count_used}</h3>
        <h3>Machine Work: {work_order_count_machine_work}</h3>
        <h3>In and Out: {work_order_count_in_out}</h3>
        <h3>Walk In: {work_order_count_walk_in}</h3>
      </div>
    </div>
  );
};

export default Index;

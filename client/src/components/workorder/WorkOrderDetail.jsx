import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const WorkOrderDetail = () => {
  const { workOrderDetail, loading, selectCustomerID } = useGlobalContext();
  const { work_order } = workOrderDetail;

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  return (
    <div>
      <div>
        <h2>
          {work_order.work_order_number} {work_order.jobType.name}
        </h2>
        <div>
          <p>Date Received:{work_order.date_received}</p>
          <p>Date Due:{work_order.date_due}</p>
          <p>Status: {work_order.complete ? "Complete" : "In Process"}</p>
          {work_order.complete ? <p>{work_order.date_finished}</p> : ""}
        </div>
        <div>
          <h4>
            <Link
              onClick={() => selectCustomerID(work_order.customer._id)}
              to="/customerdetail"
            >
              {work_order.customer.first_name} {work_order.customer.last_name}
            </Link>
          </h4>
          <p>{work_order.customer.phone_number}</p>
          <p>{work_order.customer.email}</p>
          <p>{work_order.customer.address_line_1}</p>
          <p>{work_order.customer.address_line_2}</p>
          <p>{work_order.customer.city}</p>
          <p>{work_order.customer.state}</p>
          <p>{work_order.customer.zip_code}</p>
        </div>
        <div>
          <p>{work_order.estimatedPrice}</p>
          {/* <p>{labor}</p>
          <p>{parts}</p> */}
        </div>
        <div>
          <p>{work_order.notes}</p>
          <p>{work_order.accessories}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderDetail;

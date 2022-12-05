import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const WorkOrderList = () => {
  const { selectWorkOrderID, selectCustomerID, workOrdersList, loading } =
    useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  return (
    <div>
      {workOrdersList.workOrders.map((workOrder) => {
        const {
          _id,
          date_received,
          date_due,
          jobType,
          customer,
          work_order_number,
          estimatedPrice,
        } = workOrder;
        return (
          <div key={_id}>
            <p>
              <Link
                onClick={() => selectWorkOrderID(_id)}
                to="/workorderdetail"
              >
                {work_order_number}
              </Link>
            </p>
            <p>
              <Link
                onClick={() => selectCustomerID(customer._id)}
                to="/customerdetail"
              >
                {customer.first_name} {customer.last_name}
              </Link>
            </p>
            <p>{jobType.name}</p>
            <p>{date_received}</p>
            <p>{date_due}</p>
            <p>{estimatedPrice}</p>
          </div>
        );
      })}
    </div>
  );
};

export default WorkOrderList;

import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const CustomerDetail = () => {
  const { customerDetail, loading, selectWorkOrderID } = useGlobalContext();
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
        <div key={customerDetail.customer._id}>
          <p>
            {customerDetail.customer.first_name}{" "}
            {customerDetail.customer.last_name}
          </p>

          <p>{customerDetail.customer.phone_number}</p>
          <p>{customerDetail.customer.email}</p>
          <p>{customerDetail.customer.address_line_1}</p>
          <p>{customerDetail.customer.address_line_2}</p>
          <p>{customerDetail.customer.city}</p>
          <p>{customerDetail.customer.state}</p>
          <p>{customerDetail.customer.zip_code}</p>
        </div>
      </div>
      <div>
        {customerDetail.customer_workorders.map((workOrder) => {
          const {
            _id,
            date_received,
            date_due,
            date_finished,
            jobType,
            work_order_number,
            estimatedPrice,
            notes,
          } = workOrder;
          return (
            <div key={_id}>
              <Link
                onClick={() => selectWorkOrderID(_id)}
                to={`/workorderdetail/${_id}`}
              >
                {work_order_number}
              </Link>
              <p>{jobType.name}</p>
              <p>{date_received}</p>
              <p>{date_due}</p>
              <p>{date_finished}</p>
              <p>{estimatedPrice}</p>
              <p>{notes}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerDetail;

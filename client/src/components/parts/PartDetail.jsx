import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const PartDetail = () => {
  const {
    partDetail,
    selectVendorID,
    loading,
    response,
    responseText,
    onSubmitGet,
    onSubmitPost,
    selectWorkOrderID,
  } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  const { name, part_number, manufacture, customer_price, cost, _id, vendor } =
    partDetail;
  return (
    <div>
      <div key={_id}>
        <h3>{name}</h3>
        <p>{part_number}</p>
        <p>{manufacture}</p>
        <p>{customer_price}</p>
        <p>{cost}</p>
        <Link
          onClick={() => selectVendorID(vendor._id)}
          to={`/vendordetail/${vendor._id}`}
        >
          {vendor.name}
        </Link>
      </div>

      <div>
        <button onClick={() => onSubmitGet(_id, "parts")}>Delete </button>
      </div>

      {response && typeof responseText.part_work_orders === "undefined" ? (
        <div>
          Are you sure you want to delete?
          <button onClick={() => onSubmitPost(_id, "parts")}>Delete</button>
          {responseText === "Complete" && <div>Deleted</div>}
        </div>
      ) : (
        <div>
          {response &&
            responseText.part_work_orders.map((workOrder) => {
              return (
                <div>
                  Please edit the following work order before deleting
                  <Link
                    onClick={() => selectWorkOrderID(workOrder._id)}
                    to={`/workorderdetail/${workOrder._id}`}
                    key={workOrder._id}
                  >
                    {workOrder.work_order_number}
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default PartDetail;

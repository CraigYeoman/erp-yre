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
    selectPartID,
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
    <div className="container-column">
      <h3>Part Detail</h3>
      <div className="container-background" key={_id}>
        <h3>{name}</h3>
        <div className="container-row">
          <div className="align-right">
            <p>Part Number:</p>
            <p>Manufacture:</p>
            <p>Customer Price:</p>
            <p>Cost:</p>
            <p>Vendor:</p>
          </div>
          <div>
            <p>{part_number}</p>
            <p>{manufacture}</p>
            <p>{customer_price}</p>
            <p>{cost}</p>
            <p>
              <Link
                onClick={() => selectVendorID(vendor._id)}
                to={`/vendordetail/${vendor._id}`}
              >
                {vendor.name}
              </Link>
            </p>
          </div>
        </div>
        <div className="container-row">
          <button className="buttons dark">
            <Link onClick={() => selectPartID(_id)} to={`/partedit/${_id}`}>
              Edit
            </Link>
          </button>
          <button
            className="buttons dark"
            onClick={() => onSubmitGet(_id, "parts")}
          >
            Delete{" "}
          </button>
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
    </div>
  );
};

export default PartDetail;

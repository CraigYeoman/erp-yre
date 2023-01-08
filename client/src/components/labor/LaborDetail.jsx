import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const LaborDetail = () => {
  const {
    laborDetail,
    loading,
    selectWorkOrderID,
    onSubmitGet,
    onSubmitPost,
    response,
    responseText,
    selectLaborID,
  } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, price, _id } = laborDetail;

  return (
    <div>
      <div key={_id}>
        <h3>{name}</h3>
        <p>{price}</p>
      </div>
      <div>
        <button>
          <Link onClick={() => selectLaborID(_id)} to={`/laboredit/${_id}`}>
            Edit
          </Link>
        </button>
        <button onClick={() => onSubmitGet(_id, "labor")}>Delete </button>
      </div>

      {response && typeof responseText.labor_work_orders === "undefined" ? (
        <div>
          Are you sure you want to delete?
          <button onClick={() => onSubmitPost(_id, "labor")}>Delete</button>
          {responseText === "Complete" && <div>Deleted</div>}
        </div>
      ) : (
        <div>
          {response &&
            responseText.labor_work_orders.map((workOrder) => {
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

export default LaborDetail;

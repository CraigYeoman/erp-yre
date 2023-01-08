import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const JobTypeDetail = () => {
  const {
    jobTypeDetail,
    loading,
    onSubmitGet,
    onSubmitPost,
    response,
    responseText,
    selectWorkOrderID,
    selectJobTypeID,
  } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, _id } = jobTypeDetail;

  return (
    <div>
      <div key={_id}>
        <h3>{name}</h3>
      </div>

      <div>
        <button>
          <Link onClick={() => selectJobTypeID(_id)} to={`/jobtypeedit/${_id}`}>
            Edit
          </Link>
        </button>
        <button onClick={() => onSubmitGet(_id, "jobtypes")}>Delete </button>
      </div>

      {response && typeof responseText.job_type_work_orders === "undefined" ? (
        <div>
          Are you sure you want to delete?
          <button onClick={() => onSubmitPost(_id, "jobtypes")}>Delete </button>
          {responseText === "Complete" && <div>Deleted</div>}
        </div>
      ) : (
        <div>
          {response &&
            responseText.job_type_work_orders.map((workOrder) => {
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

export default JobTypeDetail;

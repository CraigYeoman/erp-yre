import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const LaborCategoryDetail = () => {
  const {
    laborCategoryDetail,
    loading,
    onSubmitGet,
    onSubmitPost,
    response,
    responseText,
    selectLaborID,
    selectLaborCategoryID,
  } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, _id } = laborCategoryDetail;

  return (
    <div className="container-column">
      <div key={_id}>
        <h3>{name}</h3>
      </div>

      <div className="container-row">
        <button className="buttons">
          <Link
            onClick={() => selectLaborCategoryID(_id)}
            to={`/laborcategoryedit/${_id}`}
          >
            Edit
          </Link>
        </button>
        <button
          className="buttons"
          onClick={() => onSubmitGet(_id, "laborcategory")}
        >
          Delete{" "}
        </button>
      </div>

      {response && typeof responseText.labor_category_labors === "undefined" ? (
        <div>
          Are you sure you want to delete?
          <button onClick={() => onSubmitPost(_id, "laborcategory")}>
            Delete{" "}
          </button>
          {responseText === "Complete" && <div>Deleted</div>}
        </div>
      ) : (
        <div>
          {response &&
            responseText.labor_category_labors.map((labor) => {
              return (
                <div>
                  Please edit the following labor before deleting
                  <Link
                    onClick={() => selectLaborID(labor._id)}
                    to={`/labordetail/${labor._id}`}
                    key={labor._id}
                  >
                    {labor.name}
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default LaborCategoryDetail;

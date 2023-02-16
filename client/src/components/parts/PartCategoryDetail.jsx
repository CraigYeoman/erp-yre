import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const PartCategoryDetail = () => {
  const {
    partCategoryDetail,
    loading,
    onSubmitGet,
    onSubmitPost,
    response,
    responseText,
    selectPartID,
    selectPartCategoryID,
  } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, _id } = partCategoryDetail;

  return (
    <div className="container-column">
      <div key={_id}>
        <h3>{name}</h3>
      </div>

      <div className="container-row">
        <button className="buttons">
          <Link
            onClick={() => selectPartCategoryID(_id)}
            to={`/partcategoryedit/${_id}`}
          >
            Edit
          </Link>
        </button>
        <button
          className="buttons"
          onClick={() => onSubmitGet(_id, "partcategory")}
        >
          Delete{" "}
        </button>
      </div>

      {response && typeof responseText.part_category_parts === "undefined" ? (
        <div>
          Are you sure you want to delete?
          <button onClick={() => onSubmitPost(_id, "partcategory")}>
            Delete{" "}
          </button>
          {responseText === "Complete" && <div>Deleted</div>}
        </div>
      ) : (
        <div>
          {response &&
            responseText.part_category_parts.map((part) => {
              return (
                <div>
                  Please edit the following part before deleting
                  <Link
                    onClick={() => selectPartID(part._id)}
                    to={`/partdetail/${part._id}`}
                    key={part._id}
                  >
                    {part.name}
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default PartCategoryDetail;

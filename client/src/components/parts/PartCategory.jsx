import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

const PartCategory = () => {
  const { selectPartCategoryID, listType } = useGlobalContext();
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data.partCategories) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <div className="container-column">
      <h3>Part Categories</h3>
      <h4>
        <Link to={`/partcategoryform/`}>New Category</Link>
      </h4>
      {data.partCategories.map((partCategory) => {
        const { name, _id } = partCategory;
        return (
          <div className="job-container" key={_id}>
            <Link
              onClick={() => selectPartCategoryID(_id)}
              to={`/partcategorydetail/${_id}`}
            >
              {name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PartCategory;

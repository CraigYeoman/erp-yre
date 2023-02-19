import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

const LaborCategory = () => {
  const { selectLaborCategoryID, listType } = useGlobalContext();
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data.laborCategories) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <div className="container-column">
      <h3>Labor Categories</h3>
      <h4>
        <Link to={`/laborcategoryform/`}>New Category</Link>
      </h4>
      {data.laborCategories.map((laborCategory) => {
        const { name, _id } = laborCategory;
        return (
          <div className="job-container" key={_id}>
            <Link
              onClick={() => selectLaborCategoryID(_id)}
              to={`/laborcategorydetail/${_id}`}
            >
              {name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default LaborCategory;

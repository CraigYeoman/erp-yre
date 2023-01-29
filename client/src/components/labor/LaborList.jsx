import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

const LaborList = () => {
  const { listType, selectLaborID } = useGlobalContext();
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data.labor) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <div className="labor-list-container">
      {data.labor.map((labor) => {
        const { name, price, _id } = labor;
        return (
          <div className="labor-container" key={_id}>
            <Link
              onClick={() => selectLaborID(_id)}
              to={`/labordetail/${labor._id}`}
            >
              {name}
            </Link>
            <p>${price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LaborList;

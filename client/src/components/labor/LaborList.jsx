import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const LaborList = () => {
  const { data, selectLaborID } = useGlobalContext();

  if (!data.labor) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <div>
      {data.labor.map((labor) => {
        const { name, price, _id } = labor;
        return (
          <div key={_id}>
            <Link
              onClick={() => selectLaborID(_id)}
              to={`/labordetail/${labor._id}`}
            >
              {name}
            </Link>
            <p>{price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LaborList;

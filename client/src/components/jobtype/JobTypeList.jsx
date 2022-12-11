import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const JobTypeList = () => {
  const { data, selectJobTypeID } = useGlobalContext();

  if (!data.jobTypes) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <div>
      {data.jobTypes.map((jobType) => {
        const { name, _id } = jobType;
        return (
          <div key={_id}>
            <Link
              onClick={() => selectJobTypeID(_id)}
              to={`/jobtypedetail/${_id}`}
            >
              {name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default JobTypeList;

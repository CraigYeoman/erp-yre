import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

const JobTypeList = () => {
  const { selectJobTypeID, listType } = useGlobalContext();
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data.jobTypes) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <div className="job-list-container">
      {data.jobTypes.map((jobType) => {
        const { name, _id } = jobType;
        return (
          <div className="job-container" key={_id}>
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

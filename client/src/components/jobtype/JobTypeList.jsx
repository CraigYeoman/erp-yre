import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const JobTypeList = () => {
  const { jobTypeList, selectJobTypeID, loading } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <div>
      {jobTypeList.jobTypes.map((jobType) => {
        const { name, _id } = jobType;
        return (
          <div key={_id}>
            <Link onClick={() => selectJobTypeID(_id)} to="/jobtypedetail">
              {name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default JobTypeList;

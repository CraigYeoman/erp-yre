import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const JobTypeDetail = () => {
  const { jobTypeDetail, loading } = useGlobalContext();

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
    </div>
  );
};

export default JobTypeDetail;

import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const PartDetail = () => {
  const { laborDetail, loading } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, price, _id } = laborDetail;

  return (
    <div>
      <div key={_id}>
        <h3>{name}</h3>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default PartDetail;

import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

const LaborForm = () => {
  const { laborList, selectLaborID, loading } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <form method="POST" action="">
      <div>
        <label for="name">
          Labor Name:
          <input
            type="text"
            placeholder="Labor Name"
            name="name"
            required={true}
          ></input>
        </label>
        <label for="price">
          Price:
          <input
            type="number"
            placeholder="$$$"
            name="price"
            required={true}
          ></input>
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LaborForm;

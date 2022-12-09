import axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useState } from "react";
const rootUrl = "http://localhost:5000";

const LaborForm = () => {
  const { laborList, selectLaborID, loading } = useGlobalContext();
  const [values, setValues] = useState({
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.preventDefault());
    const { name, price } = values;
    const laborData = { name, price };
    try {
      console.log(laborData);
      const url = `${rootUrl}/api/v1/erp/labor/create`;
      axios
        .post(url, laborData)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setValues({ name: "", price: "" });
    } catch (error) {
      loading(false);
    }
  };
  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">
          Labor Name:
          <input
            type="text"
            placeholder="Labor Name"
            name="name"
            required={true}
            value={values.name}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="price">
          Price:
          <input
            type="number"
            placeholder="$$$"
            name="price"
            required={true}
            value={values.price}
            onChange={handleChange}
          ></input>
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LaborForm;

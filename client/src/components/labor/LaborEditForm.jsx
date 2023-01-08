import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState } from "react";
const rootUrl = "http://localhost:5000";

const LaborForm = () => {
  const { loading, selectLaborID, laborDetail } = useGlobalContext();
  const [values, setValues] = useState({
    name: laborDetail.name,
    price: laborDetail.price,
    _id: laborDetail._id,
  });

  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponse(false);
    const { name, price } = values;
    const laborData = { name, price };
    try {
      const url = `${rootUrl}/api/v1/erp/labor/${laborDetail._id}/edit`;
      axios
        .post(url, laborData)
        .then(function (response) {
          setResponseText(response.data);
          setResponse(true);
        })
        .catch(function (error) {
          setResponseText(error.response.data.msg.message);
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
    <div>
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
      {response && (
        <div>
          <p>{responseText.msg}</p>
          <div>
            <h3>Old</h3>
            <p>{responseText.updatedLabor.name}</p>
            <p>{responseText.updatedLabor.price}</p>
          </div>
          <div>
            <h3>Updated</h3>
            <p>
              {" "}
              <Link
                onClick={() => selectLaborID(responseText.labor._id)}
                to={`/labordetail/${responseText.labor._id}`}
              >
                {responseText.labor.name}
              </Link>{" "}
            </p>
            <p>{responseText.labor.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaborForm;

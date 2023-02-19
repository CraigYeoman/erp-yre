import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState } from "react";
const rootUrl = "http://localhost:5000";

const LaborCategoryForm = () => {
  const { loading, selectLaborCategoryID } = useGlobalContext();
  const [values, setValues] = useState({
    name: "",
  });

  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseError, setResponseError] = useState(false);
  const [responseTextError, setResponseTextError] = useState("");
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponse(false);
    setResponseError(false);
    const { name } = values;
    const laborcategoryData = {
      name,
    };
    try {
      const url = `${rootUrl}/api/v1/erp/laborcategory/create`;
      axios
        .post(url, laborcategoryData)
        .then(function (response) {
          setResponseText(response.data);
          setResponse(true);
        })
        .catch(function (error) {
          setResponseTextError(error.response.data);
          console.log(error.response.data);
          setResponseError(true);
        });

      setValues({
        name: "",
      });
    } catch (error) {
      setResponseTextError(error);
      console.log(error);
      setResponseError(true);
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
    <div className="container-column">
      <h3>New Labor Category</h3>
      <form className="container-column gap" onSubmit={onSubmit}>
        <div className="container-column">
          <label htmlFor="name">Labor Category Name</label>
          <input
            type="text"
            placeholder="name"
            name="name"
            required={true}
            value={values.name}
            onChange={handleChange}
          ></input>
        </div>
        <button className="buttons" type="submit">
          Submit
        </button>
      </form>
      {response && (
        <div>
          {responseText.msg}
          <Link
            onClick={() =>
              selectLaborCategoryID(responseText.laborcategory._id)
            }
            to={`/laborcategorydetail/${responseText.laborcategory._id}`}
          >
            {" "}
            {responseText.laborcategory.name}
          </Link>
        </div>
      )}
      {responseError && (
        <div>
          <p>
            {responseTextError.laborcategory.name}
            not created
          </p>
          {responseTextError.errors.map((error) => {
            const { msg, param, value } = error;
            return (
              <p key={error.value}>
                {msg} in {param} value {value}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LaborCategoryForm;

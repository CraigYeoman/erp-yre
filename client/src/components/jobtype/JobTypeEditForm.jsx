import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState } from "react";
const rootUrl = "http://localhost:5000";

const JobTypeEditForm = () => {
  const { loading, selectJobTypeID, jobTypeDetail } = useGlobalContext();
  const [values, setValues] = useState({
    name: jobTypeDetail.name,
    _id: jobTypeDetail._id,
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

    const { name, _id } = values;
    const jobtypeData = {
      name,
      _id,
    };
    try {
      const url = `${rootUrl}/api/v1/erp/jobtypes/${jobTypeDetail._id}/edit`;
      axios
        .post(url, jobtypeData)
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
      <form className="container-column gap" onSubmit={onSubmit}>
        <div className="container-column">
          <label htmlFor="name">Job Type Name</label>
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
        <div className="container-column">
          <h3>Job Type Edited</h3>
          <div className="container-column">
            <div className="container-row">
              <div className="container-background">
                <h3>Previous</h3>
                <p>{responseText.updatedJobType.name}</p>
              </div>
              <div className="container-background">
                <h3>New</h3>
                <p>
                  <Link
                    onClick={() => selectJobTypeID(responseText.jobtype._id)}
                    to={`/jobtypedetail/${responseText.jobtype._id}`}
                  >
                    {responseText.jobtype.name}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {responseError && (
        <div>
          <p>
            {responseTextError.jobtype.name}
            not edited
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

export default JobTypeEditForm;

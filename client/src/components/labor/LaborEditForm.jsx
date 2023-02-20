import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState, useEffect } from "react";
const rootUrl = "http://localhost:5000";

const LaborEditForm = () => {
  useEffect(() => {
    fetch("/api/v1/erp/labor/create")
      .then((response) => response.json())
      .then((data) => {
        setLaborInfo(data);
        console.log(data);
      });
  }, []);

  const { loading, selectLaborID, laborDetail } = useGlobalContext();
  const [values, setValues] = useState({
    name: laborDetail.name,
    price: laborDetail.price,
    _id: laborDetail._id,
    laborCategory: laborDetail.laborCategory,
  });
  const [laborInfo, setLaborInfo] = useState("");

  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponse(false);
    const { name, price, _id, laborCategory } = values;
    const laborData = { name, price, _id, laborCategory };

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
    <div className="container-column">
      <h3>Labor</h3>
      <form className="container-column gap" onSubmit={onSubmit}>
        <div className="container-column gap">
          <div className="container-column">
            <label htmlFor="name">Labor Name</label>
            <input
              type="text"
              placeholder="Labor Name"
              name="name"
              required={true}
              value={values.name}
              onChange={handleChange}
            ></input>
          </div>
          <div className="container-column">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              placeholder="$$$"
              name="price"
              required={true}
              value={values.price}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="container-column">
          <label htmlFor="laborCategory">Category</label>
          <select
            type="select"
            placeholder="laborCategory"
            name="laborCategory"
            required={true}
            onChange={handleChange}
            value={values.laborCategory}
          >
            <option value={laborDetail.laborCategory._id}>
              {laborDetail.laborCategory.name}
            </option>
            {typeof laborInfo.labor_category_list === "undefined" ? (
              <option>Loading...</option>
            ) : (
              laborInfo.labor_category_list
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((laborCategory) => {
                  return (
                    <option value={laborCategory._id} key={laborCategory._id}>
                      {laborCategory.name}
                    </option>
                  );
                })
            )}
          </select>
        </div>
        <button className="buttons" type="submit">
          Submit
        </button>
      </form>
      {response && (
        <div className="container-column">
          <h3>Labor Edited</h3>
          <div className="container-row">
            <div className="container-background">
              <h3>Previous</h3>
              <p>{responseText.updatedLabor.name}</p>
              <p>${responseText.updatedLabor.price}</p>
            </div>
            <div className="container-background">
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
              <p>${responseText.labor.price}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaborEditForm;

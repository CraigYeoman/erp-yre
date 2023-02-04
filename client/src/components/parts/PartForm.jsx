import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState, useEffect } from "react";
const rootUrl = "http://localhost:5000";

const PartForm = () => {
  useEffect(() => {
    fetch("/api/v1/erp/parts/create")
      .then((response) => response.json())
      .then((data) => {
        setVendorInfo(data);
      });
  }, []);

  const { loading, selectPartID } = useGlobalContext();
  const [values, setValues] = useState({
    name: "",
    customer_price: "",
    cost: "",
    part_number: "",
    vendor: "",
    manufacture: "",
  });

  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseError, setResponseError] = useState(false);
  const [responseTextError, setResponseTextError] = useState("");
  const [vendorInfo, setVendorInfo] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponse(false);
    setResponseError(false);
    const { name, customer_price, cost, part_number, vendor, manufacture } =
      values;
    const partData = {
      name,
      customer_price,
      cost,
      part_number,
      vendor,
      manufacture,
    };

    try {
      const url = `${rootUrl}/api/v1/erp/parts/create`;
      axios
        .post(url, partData)
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
        customer_price: "",
        cost: "",
        part_number: "",
        vendor: "",
        manufacture: "",
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
      <h3>Create Part</h3>
      <form className="container-column gap" onSubmit={onSubmit}>
        <div className="container-column gap">
          <div className="container-column">
            <label htmlFor="name">Part Name</label>
            <input
              type="text"
              placeholder="3/8 8740 ARP Rod Bolt"
              name="name"
              required={true}
              value={values.name}
              onChange={handleChange}
            ></input>
          </div>
          <div className="container-column">
            <label htmlFor="customer_price">Customer Price</label>
            <input
              type="number"
              placeholder="$$$"
              name="customer_price"
              required={true}
              value={values.customer_price}
              onChange={handleChange}
            ></input>
          </div>
          <div className="container-column">
            <label htmlFor="cost">Cost</label>
            <input
              type="number"
              placeholder="$$$"
              name="cost"
              required={true}
              value={values.cost}
              onChange={handleChange}
            ></input>
          </div>
          <div className="container-column">
            <label htmlFor="part_number">Part Number</label>
            <input
              type="text"
              placeholder="XYZ"
              name="part_number"
              required={true}
              value={values.part_number}
              onChange={handleChange}
            ></input>
          </div>
          <div className="container-column">
            <label htmlFor="vendor">Vendor</label>
            <select
              type="select"
              placeholder="vendor"
              name="vendor"
              required={true}
              onChange={handleChange}
              value={values.vendor}
            >
              <option value="" disabled selected hidden>
                Please Choose Vendor
              </option>
              {typeof vendorInfo.vendor_list === "undefined" ? (
                <option>Loading...</option>
              ) : (
                vendorInfo.vendor_list
                  .sort((a, b) => {
                    let textA = a.name.toUpperCase();
                    let textB = b.name.toUpperCase();
                    return textA < textB ? -1 : textA > textB ? 1 : 0;
                  })
                  .map((vendor) => {
                    return (
                      <option value={vendor._id} key={vendor._id}>
                        {vendor.name}
                      </option>
                    );
                  })
              )}
            </select>
          </div>
          <div className="container-column">
            <label htmlFor="manufacture">Manufacture</label>
            <input
              type="text"
              placeholder="manufacture"
              name="manufacture"
              required={true}
              value={values.manufacture}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <button className="buttons" type="submit">
          Submit
        </button>
      </form>
      {response && (
        <div>
          {responseText.msg}
          <Link
            onClick={() => selectPartID(responseText.part._id)}
            to={`/partdetail/${responseText.part._id}`}
          >
            {responseText.part.name} {responseText.part.last_name}
          </Link>
        </div>
      )}
      {responseError && (
        <div>
          <p>{responseTextError.part.name} not created</p>
          {responseTextError.errors.map((error) => {
            const { msg, param, value } = error;
            return (
              <p key={error.param}>
                {msg} in {param} value {value}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PartForm;

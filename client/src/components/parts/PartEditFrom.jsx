import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState, useEffect } from "react";
const rootUrl = "http://localhost:5000";

const PartEditForm = () => {
  useEffect(() => {
    fetch("/api/v1/erp/parts/create")
      .then((response) => response.json())
      .then((data) => {
        setVendorInfo(data);
      });
  }, []);

  const { loading, selectPartID, partDetail } = useGlobalContext();
  const [values, setValues] = useState({
    name: partDetail.name,
    customer_price: partDetail.customer_price,
    cost: partDetail.cost,
    part_number: partDetail.part_number,
    vendor: partDetail.vendor,
    manufacture: partDetail.manufacture,
    _id: partDetail._id,
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
    const {
      name,
      customer_price,
      cost,
      part_number,
      vendor,
      manufacture,
      _id,
    } = values;
    const partData = {
      name,
      customer_price,
      cost,
      part_number,
      vendor,
      manufacture,
      _id,
    };

    try {
      const url = `${rootUrl}/api/v1/erp/parts/${partDetail._id}/edit`;
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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">
            Part Name:
            <input
              type="text"
              placeholder="3/8 8740 ARP Rod Bolt"
              name="name"
              required={true}
              value={values.name}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="customer_price">
            Customer Price:
            <input
              type="number"
              placeholder="$$$"
              name="customer_price"
              required={true}
              value={values.customer_price}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="cost">
            Cost:
            <input
              type="number"
              placeholder="$$$"
              name="cost"
              required={true}
              value={values.cost}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="part_number">
            Part Number:
            <input
              type="text"
              placeholder="XYZ"
              name="part_number"
              required={true}
              value={values.part_number}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="vendor">
            Vendor:
            <select
              type="select"
              placeholder="vendor"
              name="vendor"
              required={true}
              onChange={handleChange}
              value={values.vendor}
            >
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
          </label>
          <label htmlFor="manufacture">
            Manufacture:
            <input
              type="text"
              placeholder="manufacture"
              name="manufacture"
              required={true}
              value={values.manufacture}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          {responseText.msg}
          <div>
            <h3>Old</h3>
            <p>{responseText.updatedPart.name}</p>
            <p>{responseText.updatedPart.customer_price}</p>
            <p>{responseText.updatedPart.cost}</p>
            <p>{responseText.updatedPart.part_number}</p>
            <p>{responseText.updatedPart.vendor}</p>
            <p>{responseText.updatedPart.manufacture}</p>
          </div>
          <div>
            <h3>New</h3>
            <p>
              <Link
                onClick={() => selectPartID(responseText.part._id)}
                to={`/partdetail/${responseText.part._id}`}
              >
                {responseText.part.name}
              </Link>
            </p>
            <p>{responseText.part.customer_price}</p>
            <p>{responseText.part.cost}</p>
            <p>{responseText.part.part_number}</p>
            <p>{responseText.part.vendor}</p>
            <p>{responseText.part.manufacture}</p>
          </div>
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

export default PartEditForm;

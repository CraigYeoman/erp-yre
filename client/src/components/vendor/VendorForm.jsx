import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState } from "react";
const rootUrl = "http://localhost:5000";

const VendorForm = () => {
  const { loading, selectVendorID } = useGlobalContext();
  const [values, setValues] = useState({
    name: "",
    main_contact: "",
    phone_number: "",
    email: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip_code: "",
    customer_number: "",
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
    const {
      name,
      main_contact,
      phone_number,
      email,
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      customer_number,
    } = values;
    const vendorData = {
      name,
      main_contact,
      phone_number,
      email,
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      customer_number,
    };
    try {
      const url = `${rootUrl}/api/v1/erp/vendors/create`;
      axios
        .post(url, vendorData)
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
        main_contact: "",
        phone_number: "",
        email: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        zip_code: "",
        customer_number: "",
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
            Company Name:
            <input
              type="text"
              placeholder="Company LLC"
              name="name"
              required={true}
              value={values.name}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="main_contact">
            Main Contact:
            <input
              type="text"
              placeholder="Don John"
              name="main_contact"
              required={true}
              value={values.main_contact}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="phone_number">
            Phone Number:
            <input
              type="tel"
              placeholder="9999999999"
              name="phone_number"
              required={true}
              value={values.phone_number}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              placeholder="joe@gmail.com"
              name="email"
              required={true}
              value={values.email}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="address_line_1">
            Address line 1:
            <input
              type="text"
              placeholder="Address"
              name="address_line_1"
              required={true}
              value={values.address_line_1}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="address_line_2">
            Address line 2:
            <input
              type="text"
              placeholder="Address line 2"
              name="address_line_2"
              value={values.address_line_2}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="city">
            City:
            <input
              type="text"
              placeholder="City"
              name="city"
              required={true}
              value={values.city}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="state">
            State:
            <input
              type="text"
              placeholder="state"
              name="state"
              required={true}
              value={values.state}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="zip_code">
            Zip Code:
            <input
              type="text"
              placeholder="Zip Code"
              name="zip_code"
              required={true}
              value={values.zip_code}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="customer_number">
            Customer Number:
            <input
              type="text"
              placeholder="Customer Number"
              name="customer_number"
              required={true}
              value={values.customer_number}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          {responseText.msg}
          <Link
            onClick={() => selectVendorID(responseText.vendor._id)}
            to={`/vendordetail/${responseText.vendor._id}`}
          >
            {responseText.vendor.name}
          </Link>
        </div>
      )}
      {responseError && (
        <div>
          <p>{responseTextError.vendor.name} not created</p>
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

export default VendorForm;

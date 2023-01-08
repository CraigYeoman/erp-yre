import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState } from "react";
const rootUrl = "http://localhost:5000";

const CustomerForm = () => {
  const { loading, selectCustomerID, customerDetail } = useGlobalContext();
  const [values, setValues] = useState({
    first_name: customerDetail.customer.first_name,
    last_name: customerDetail.customer.last_name,
    phone_number: customerDetail.customer.phone_number,
    email: customerDetail.customer.email,
    address_line_1: customerDetail.customer.address_line_1,
    address_line_2: customerDetail.customer.address_line_2,
    city: customerDetail.customer.city,
    state: customerDetail.customer.state,
    zip_code: customerDetail.customer.zip_code,
    _id: customerDetail.customer._id,
  });
  console.log(customerDetail.customer.first_name);
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
      first_name,
      last_name,
      phone_number,
      email,
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      _id,
    } = values;
    const customerData = {
      first_name,
      last_name,
      phone_number,
      email,
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      _id,
    };
    try {
      const url = `${rootUrl}/api/v1/erp/customers/${_id}/edit`;
      axios
        .post(url, customerData)
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
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        zip_code: "",
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
          <label htmlFor="first_name">
            Customer First Name:
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              required={true}
              value={values.first_name}
              onChange={handleChange}
            ></input>
          </label>
          <label htmlFor="last_name">
            Last Name:
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              required={true}
              value={values.last_name}
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
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <p>{responseText.msg}</p>
          <div>
            <h3>Old</h3>
            <p>
              {responseText.updatedCustomer.first_name}{" "}
              {responseText.updatedCustomer.last_name}
            </p>
            <p>{responseText.updatedCustomer.phone_number}</p>
            <p>{responseText.updatedCustomer.email}</p>
            <p>{responseText.updatedCustomer.address_line_1}</p>
            <p>{responseText.updatedCustomer.address_line_2}</p>
            <p>{responseText.updatedCustomer.city}</p>
            <p>{responseText.updatedCustomer.state}</p>
            <p>{responseText.updatedCustomer.zip_code}</p>
          </div>
          <div>
            <h3>Updated</h3>
            <p>
              <Link
                onClick={() => selectCustomerID(responseText.customer._id)}
                to={`/customerdetail/${responseText.customer._id}`}
              >
                {responseText.customer.first_name}{" "}
                {responseText.customer.last_name}
              </Link>
            </p>
            <p>{responseText.customer.phone_number}</p>
            <p>{responseText.customer.email}</p>
            <p>{responseText.customer.address_line_1}</p>
            <p>{responseText.customer.address_line_2}</p>
            <p>{responseText.customer.city}</p>
            <p>{responseText.customer.state}</p>
            <p>{responseText.customer.zip_code}</p>
          </div>
        </div>
      )}
      {responseError && (
        <div>
          <p>
            {responseTextError.customer.first_name}{" "}
            {responseTextError.customer.last_name} not created
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

export default CustomerForm;

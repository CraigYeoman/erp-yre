import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState } from "react";
const rootUrl = "http://localhost:5000";

const VendorEditForm = () => {
  const { loading, selectVendorID, vendorDetail } = useGlobalContext();
  const [values, setValues] = useState({
    name: vendorDetail.vendor.name,
    main_contact: vendorDetail.vendor.main_contact,
    phone_number: vendorDetail.vendor.phone_number,
    email: vendorDetail.vendor.email,
    address_line_1: vendorDetail.vendor.address_line_1,
    address_line_2: vendorDetail.vendor.address_line_2,
    city: vendorDetail.vendor.city,
    state: vendorDetail.vendor.state,
    zip_code: vendorDetail.vendor.zip_code,
    customer_number: vendorDetail.vendor.customer_number,
    _id: vendorDetail.vendor._id,
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
      _id,
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
      _id,
    };
    try {
      const url = `${rootUrl}/api/v1/erp/vendors/${_id}/edit`;
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
          <div>
            <h3>Old</h3>
            <p>{responseText.updatedVendor.name}</p>
            <p>{responseText.updatedVendor.main_contact}</p>
            <p>{responseText.updatedVendor.phone_number}</p>
            <p>{responseText.updatedVendor.email}</p>
            <p>{responseText.updatedVendor.address_line_1}</p>
            <p>{responseText.updatedVendor.address_line_2}</p>
            <p>{responseText.updatedVendor.city}</p>
            <p>{responseText.updatedVendor.state}</p>
            <p>{responseText.updatedVendor.zip_code}</p>
            <p>{responseText.updatedVendor.customer_number}</p>
          </div>
          <div>
            <h3>New</h3>
            <Link
              onClick={() => selectVendorID(responseText.vendor._id)}
              to={`/vendordetail/${responseText.vendor._id}`}
            >
              {responseText.vendor.name}
            </Link>
            <p>{responseText.vendor.main_contact}</p>
            <p>{responseText.vendor.phone_number}</p>
            <p>{responseText.vendor.email}</p>
            <p>{responseText.vendor.address_line_1}</p>
            <p>{responseText.vendor.address_line_2}</p>
            <p>{responseText.vendor.city}</p>
            <p>{responseText.vendor.state}</p>
            <p>{responseText.vendor.zip_code}</p>
            <p>{responseText.vendor.customer_number}</p>
          </div>
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

export default VendorEditForm;

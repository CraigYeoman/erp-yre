import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

const CustomerList = () => {
  const { selectCustomerID, listType } = useGlobalContext();
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data.customers) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <div>
      {data.customers.map((customer) => {
        const {
          _id,
          first_name,
          last_name,
          phone_number,
          email,
          address_line_1,
          address_line_2,
          city,
          state,
          zip_code,
        } = customer;
        return (
          <div key={_id}>
            <Link
              onClick={() => selectCustomerID(_id)}
              to={`/customerdetail/${customer._id}`}
            >
              {first_name} {last_name}
            </Link>
            <p>{phone_number}</p>
            <p>{email}</p>
            <p>{address_line_1}</p>
            <p>{address_line_2}</p>
            <p>{city}</p>
            <p>{state}</p>
            <p>{zip_code}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerList;

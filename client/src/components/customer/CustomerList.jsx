import React, { useEffect, useState } from "react";

const CustomerList = () => {
  const [customerList, setCustomerList] = useState([{}]);
  useEffect(() => {
    fetch("/api/v1/erp/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomerList(data);
      });
  }, []);
  return (
    <div>
      {typeof customerList.customers === "undefined" ? (
        <p>Loading...</p>
      ) : (
        customerList.customers.map((customer) => {
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
              <p>
                {first_name} {last_name}
              </p>

              <p>{phone_number}</p>
              <p>{email}</p>
              <p>{address_line_1}</p>
              <p>{address_line_2}</p>
              <p>{city}</p>
              <p>{state}</p>
              <p>{zip_code}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CustomerList;

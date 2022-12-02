import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [customerList, setCustomerList] = useState([{}]);
  const [customerDetail, setCustomerDetail] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const fetchCustomerDetail = async (idCustomer) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/erp/customers/${idCustomer}`);

      if (data.customer) {
        setCustomerDetail(data);
        console.log(data);
      } else {
        setCustomerDetail([]);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const selectedCustomerID = (id) => {
    fetchCustomerDetail(id);
  };

  useEffect(() => {
    fetch("/api/v1/erp/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomerList(data);
      });
  }, []);

  //   useEffect(() => {
  //     fetch("/api/v1/erp/customers/:id")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCustomerDetail(data);
  //       });
  //   }, [setCustomerDetail]);

  return (
    <AppContext.Provider
      value={{
        customerList,
        setCustomerList,
        customerDetail,
        setCustomerDetail,
        selectedCustomerID,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };

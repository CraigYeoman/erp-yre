import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [customerList, setCustomerList] = useState([{}]);
  const [customerDetail, setCustomerDetail] = useState([{}]);
  const [laborList, setLaborList] = useState([{}]);
  const [laborDetail, setLaborDetail] = useState([{}]);
  const [partsList, setPartsList] = useState([{}]);
  const [partDetail, setPartDetail] = useState([{}]);
  const [vendorList, setVendorList] = useState([{}]);
  const [vendorDetail, setVendorDetail] = useState([{}]);
  const [workOrdersList, setworkOrdersList] = useState([{}]);
  const [workOrderDetail, setWorkOrderDetail] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const fetchCustomerDetail = async (idCustomer) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/erp/customers/${idCustomer}`);

      if (data.customer) {
        setCustomerDetail(data);
      } else {
        setCustomerDetail([]);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const fetchLaborDetail = async (idLabor) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/erp/labor/${idLabor}`);

      if (data) {
        setLaborDetail(data.labor_detail);
      } else {
        setLaborDetail([]);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const fetchPartDetail = async (idPart) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/erp/parts/${idPart}`);

      if (data) {
        setPartDetail(data.part);
      } else {
        setPartDetail([]);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const fetchVendorDetail = async (idVendor) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/erp/vendors/${idVendor}`);

      if (data.vendor) {
        setVendorDetail(data);
      } else {
        setVendorDetail([]);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const fetchWorkOrderDetail = async (idWorkOrder) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`api/v1/erp/workorders/${idWorkOrder}`);

      if (data.work_order) {
        setWorkOrderDetail(data);
        console.log(data);
        console.log(workOrderDetail);
      } else {
        setWorkOrderDetail([]);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const selectCustomerID = (id) => {
    fetchCustomerDetail(id);
  };

  const selectLaborID = (id) => {
    fetchLaborDetail(id);
  };

  const selectPartID = (id) => {
    fetchPartDetail(id);
  };

  const selectVendorID = (id) => {
    fetchVendorDetail(id);
  };

  const selectWorkOrderID = (id) => {
    fetchWorkOrderDetail(id);
  };

  useEffect(() => {
    fetch("/api/v1/erp/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomerList(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/v1/erp/labor")
      .then((response) => response.json())
      .then((data) => {
        setLaborList(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/v1/erp/parts")
      .then((response) => response.json())
      .then((data) => {
        setPartsList(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/v1/erp/vendors")
      .then((response) => response.json())
      .then((data) => {
        setVendorList(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/v1/erp/workorders")
      .then((response) => response.json())
      .then((data) => {
        setworkOrdersList(data);
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
        laborList,
        partsList,
        vendorList,
        workOrdersList,

        customerDetail,
        laborDetail,
        partDetail,
        vendorDetail,
        workOrderDetail,

        selectCustomerID,
        selectLaborID,
        selectPartID,
        selectVendorID,
        selectWorkOrderID,

        loading,
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

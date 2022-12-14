import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [customerDetail, setCustomerDetail] = useState([{}]);
  const [jobTypeDetail, setJobTypeDetail] = useState([{}]);
  const [laborDetail, setLaborDetail] = useState([{}]);
  const [partDetail, setPartDetail] = useState([{}]);
  const [vendorDetail, setVendorDetail] = useState([{}]);
  const [workOrderDetail, setWorkOrderDetail] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [listType, setListType] = useState("workorders");
  const [data, setData] = useState([{}]);

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

  const fetchJobTypeDetail = async (idJobType) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/erp/jobtypes/${idJobType}`);

      if (data) {
        setJobTypeDetail(data.job_type_detail);
      } else {
        setJobTypeDetail([]);
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
      const { data } = await axios.get(`/api/v1/erp/workorders/${idWorkOrder}`);
      console.log(data);
      if (data.work_order) {
        setWorkOrderDetail(data);
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

  const selectJobTypeID = (id) => {
    fetchJobTypeDetail(id);
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
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [listType]);

  return (
    <AppContext.Provider
      value={{
        customerDetail,
        jobTypeDetail,
        laborDetail,
        partDetail,
        vendorDetail,
        workOrderDetail,

        selectCustomerID,
        selectJobTypeID,
        selectLaborID,
        selectPartID,
        selectVendorID,
        selectWorkOrderID,
        setListType,

        data,
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

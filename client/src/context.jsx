import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [customerDetail, setCustomerDetail] = useState([{}]);
  const [jobTypeDetail, setJobTypeDetail] = useState([{}]);
  const [laborDetail, setLaborDetail] = useState([{}]);
  const [partDetail, setPartDetail] = useState([{}]);
  const [partCategoryDetail, setPartCategoryDetail] = useState([{}]);
  const [vendorDetail, setVendorDetail] = useState([{}]);
  const [workOrderDetail, setWorkOrderDetail] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [listType, setListType] = useState("workorders");
  // const [data, setData] = useState([{}]);
  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const rootUrl = "http://localhost:5000";
  const [id, selectID] = useState("");

  useEffect(() => {
    setResponse(false);
    setResponseText("");
  }, [loading]);

  const onSubmitGet = async (_id, schema) => {
    setResponse(false);
    setResponseText("");
    try {
      const url = `${rootUrl}/api/v1/erp/${schema}/${_id}/delete/`;
      axios
        .get(url)
        .then(function (response) {
          setResponseText(response.data);
          setResponse(true);
        })
        .catch(function (error) {
          console.log(error);
          setResponseText(error.response.data.msg.message);
        });
    } catch (error) {
      loading(false);
    }
  };

  const onSubmitPost = async (_id, schema) => {
    setResponse(false);
    setResponseText("");
    try {
      const url = `${rootUrl}/api/v1/erp/${schema}/${_id}/delete/`;
      axios
        .post(url)
        .then(function (response) {
          setResponseText(response.data);
          setResponse(true);
          setResponseText(response.data.msg);
        })
        .catch(function (error) {
          console.log(error);
          setResponseText(error.response.data.msg.message);
        });
    } catch (error) {
      loading(false);
    }
  };

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

  const fetchPartCategoryDetail = async (idPart) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/erp/partcategory/${idPart}`);

      if (data) {
        setPartCategoryDetail(data.part_category_detail);
      } else {
        setPartCategoryDetail([]);
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

  const selectPartCategoryID = (id) => {
    fetchPartCategoryDetail(id);
  };

  const selectVendorID = (id) => {
    fetchVendorDetail(id);
  };

  const selectWorkOrderID = (id) => {
    fetchWorkOrderDetail(id);
  };

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };

  // useEffect(() => {
  //   fetch(`/api/v1/erp/${listType}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  // });

  return (
    <AppContext.Provider
      value={{
        customerDetail,
        jobTypeDetail,
        laborDetail,
        partDetail,
        vendorDetail,
        workOrderDetail,
        partCategoryDetail,

        selectCustomerID,
        selectJobTypeID,
        selectLaborID,
        selectPartID,
        selectVendorID,
        selectWorkOrderID,
        setListType,
        selectPartCategoryID,

        id,
        selectID,
        formatPhoneNumber,

        // data,
        loading,
        listType,
        onSubmitGet,
        onSubmitPost,
        response,
        responseText,
        setResponse,
        setResponseText,
        rootUrl,
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

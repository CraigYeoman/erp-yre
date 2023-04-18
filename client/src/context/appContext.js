import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  GET_DATA_BEGIN,
  GET_DATA_SUCCESS,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CHANGE_PATH,
  HANDLE_CHANGE,
  CLEAR_FILTERS,
} from "./action";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  mode: "dark",
  user: user ? JSON.parse(user) : null,
  token: token,
  rootUrl: "http://localhost:5000",
  data: [{}],
  showSideBar: true,
  url: "/workorders/index",
  sort: "date_due",
  complete: "false",
  jobType: "all",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "http://localhost:5000/api/v1/erp",
  });

  // response interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log(error.response);
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 8000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/erp/user/${endPoint}`,
        currentUser
      );
      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          alertText,
        },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const updatePath = (path) => {
    dispatch({ type: CHANGE_PATH, payload: { path } });
  };

  const handleChange = (e) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const getData = async () => {
    dispatch({ type: GET_DATA_BEGIN });

    try {
      const { data } = await authFetch(state.url);

      dispatch({ type: GET_DATA_SUCCESS, payload: { data } });
    } catch (error) {
      console.log(error.response);
    }
  };

  const getWorkOrders = async () => {
    dispatch({ type: GET_DATA_BEGIN });

    const { jobType, complete, sort } = state;
    const url = `/workorders?jobType=${jobType}&complete=${complete}&sort=${sort}`;
    try {
      const { data } = await authFetch(url);

      dispatch({ type: GET_DATA_SUCCESS, payload: { data } });
    } catch (error) {
      console.log(error.response);
    }
  };

  const getDetail = async (id, schema) => {
    dispatch({ type: GET_DATA_BEGIN });

    const url = `/${schema}/${id}`;

    try {
      const { data } = await authFetch(url);

      dispatch({ type: GET_DATA_SUCCESS, payload: { data } });
    } catch (error) {
      console.log(error.response);
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      // no token
      const { user, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };

  const sumTotal = (array, name) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i][name];
    }
    return sum;
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        getData,
        toggleSidebar,
        logoutUser,
        updateUser,
        formatPhoneNumber,
        updatePath,
        sumTotal,
        handleChange,
        getWorkOrders,
        clearFilters,
        getDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
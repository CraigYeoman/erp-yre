import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState } from "react";
import Header from "../Header";
import Response from "../Response";
import { Box, useTheme, Button, TextField } from "@mui/material";
const rootUrl = "http://localhost:5000";

const JobTypeForm = () => {
  const { loading, selectJobTypeID } = useGlobalContext();
  const [values, setValues] = useState({
    name: "",
  });
  const theme = useTheme();
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
    const { name } = values;
    const jobtypeData = {
      name,
    };
    try {
      const url = `${rootUrl}/api/v1/erp/jobtypes/create`;
      axios
        .post(url, jobtypeData)
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
    <Box m="1.5rem 2.5rem">
      <Header title="New Job Type" subtitle="Fill out form below" />
      <form onSubmit={onSubmit}>
        <Box
          mt="1rem"
          mb="1rem"
          sx={{
            display: "flex",
          }}
        >
          <TextField
            label="Job Type Name"
            placeholder="Name"
            name="name"
            required
            value={values.name}
            onChange={handleChange}
          />
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <Response
        response={response}
        responseText={responseText}
        selectFunction={selectJobTypeID}
        item="jobtype"
        path={"jobtypedetail"}
        responseError={responseError}
        responseTextError={responseTextError}
      />
    </Box>
  );
};

export default JobTypeForm;

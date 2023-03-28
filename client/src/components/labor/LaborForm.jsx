import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "../Header";
import Response from "../Response";
const rootUrl = "http://localhost:5000";

const LaborForm = () => {
  useEffect(() => {
    fetch("/api/v1/erp/labor/create")
      .then((response) => response.json())
      .then((data) => {
        setLaborInfo(data);
      });
  }, []);

  const { loading, selectLaborID } = useGlobalContext();
  const [values, setValues] = useState({
    name: "",
    price: "",
    laborCategory: "",
  });

  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseError, setResponseError] = useState(false);
  const [responseTextError, setResponseTextError] = useState("");
  const [laborInfo, setLaborInfo] = useState("");
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponse(false);
    setResponseError(false);
    const { name, price, laborCategory } = values;
    const laborData = { name, price, laborCategory };
    try {
      const url = `${rootUrl}/api/v1/erp/labor/create`;
      axios
        .post(url, laborData)
        .then(function (response) {
          setResponseText(response.data);
          setResponse(true);
        })
        .catch(function (error) {
          setResponseError(true);
          setResponseTextError(error.response.data);
        });

      setValues({ name: "", price: "", laborCategory: "" });
    } catch (error) {
      loading(false);
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
      <Header title="New Labor" subtitle="Fill out form below" />
      <form onSubmit={onSubmit}>
        <Box
          mt="1rem"
          mb="1rem"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "240px",
          }}
        >
          <TextField
            label="Labor Name"
            placeholder="Labor Name"
            margin={"normal"}
            required
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          <TextField
            label="Price"
            placeholder="$$$"
            margin={"normal"}
            required
            value={values.price}
            onChange={handleChange}
            name="price"
            type="number"
          />
          <FormControl sx={{ minWidth: 80, mt: "16px", mb: "8px" }}>
            <InputLabel id="laborCategory">Labor Category</InputLabel>
            <Select
              name="laborCategory"
              required={true}
              onChange={handleChange}
              value={values.laborCategory}
              labelId="laborCategory"
              label="Labor Category"
            >
              {(laborInfo.labor_category_list || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((laborCategory) => {
                  return (
                    <MenuItem value={laborCategory._id} key={laborCategory._id}>
                      {laborCategory.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <Response
        response={response}
        responseText={responseText}
        selectFunction={selectLaborID}
        item="labor"
        path={"labordetail"}
        responseError={responseError}
        responseTextError={responseTextError}
      />
    </Box>
  );
};

export default LaborForm;

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

const PartForm = () => {
  useEffect(() => {
    fetch("/api/v1/erp/parts/create")
      .then((response) => response.json())
      .then((data) => {
        setPartInfo(data);
      });
  }, []);

  const { loading, selectPartID } = useGlobalContext();
  const [values, setValues] = useState({
    name: "",
    customer_price: "",
    cost: "",
    part_number: "",
    vendor: "",
    partCategory: "",
    manufacture: "",
  });

  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseError, setResponseError] = useState(false);
  const [responseTextError, setResponseTextError] = useState("");
  const [partInfo, setPartInfo] = useState("");
  const theme = useTheme();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponse(false);
    setResponseError(false);
    const {
      name,
      customer_price,
      cost,
      part_number,
      vendor,
      partCategory,
      manufacture,
    } = values;
    const partData = {
      name,
      customer_price,
      cost,
      part_number,
      vendor,
      partCategory,
      manufacture,
    };

    try {
      const url = `${rootUrl}/api/v1/erp/parts/create`;
      console.log(partData);
      axios
        .post(url, partData)
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
        customer_price: "",
        cost: "",
        part_number: "",
        vendor: "",
        partCategory: "",
        manufacture: "",
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
      <Header title="Create Part" subtitle="Fill out form below" />
      <form onSubmit={onSubmit}>
        <Box
          mt="1rem"
          mb="1rem"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "240px",
            gap: "5px;",
          }}
        >
          <TextField
            label="Part Name"
            placeholder="3/8 8740 ARP Rod Bolt"
            margin={"normal"}
            required
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          <TextField
            label="Customer Price"
            placeholder="$$$"
            margin={"normal"}
            required
            value={values.customer_price}
            onChange={handleChange}
            name="customer_price"
            type="number"
          />
          <TextField
            label="Cost"
            placeholder="$$$"
            margin={"normal"}
            required
            value={values.cost}
            onChange={handleChange}
            name="cost"
            type="number"
          />
          <TextField
            label="Part Number"
            placeholder="XYZ"
            margin={"normal"}
            required
            value={values.part_number}
            onChange={handleChange}
            name="part_number"
          />
          <FormControl sx={{ minWidth: 80, mt: "16px", mb: "8px" }}>
            <InputLabel id="vendor">Vendor</InputLabel>
            <Select
              name="vendor"
              required={true}
              onChange={handleChange}
              value={values.vendor}
              labelId="vendor"
              label="Vendor"
            >
              {(partInfo.vendor_list || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((vendor) => {
                  return (
                    <MenuItem value={vendor._id} key={vendor._id}>
                      {vendor.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 80, mt: "16px", mb: "8px" }}>
            <InputLabel id="partCategory">Part Category</InputLabel>
            <Select
              name="partCategory"
              required={true}
              onChange={handleChange}
              value={values.partCategory}
              labelId="partCategory"
              label="Part Category"
            >
              {(partInfo.part_category_list || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((partCategory) => {
                  return (
                    <MenuItem value={partCategory._id} key={partCategory._id}>
                      {partCategory.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <TextField
            label="Manufacture"
            placeholder="Manufacture"
            margin={"normal"}
            value={values.manufacture}
            onChange={handleChange}
            name="manufacture"
          />
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <Response
        response={response}
        responseText={responseText}
        selectFunction={selectPartID}
        item="part"
        path={"partdetail"}
        responseError={responseError}
        responseTextError={responseTextError}
      />
    </Box>
  );
};

export default PartForm;

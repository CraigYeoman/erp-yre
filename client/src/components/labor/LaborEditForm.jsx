import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  InputLabel,
  FormControl,
  Link,
  NativeSelect,
} from "@mui/material";
import Header from "../Header";
const rootUrl = "http://localhost:5000";

const LaborEditForm = () => {
  useEffect(() => {
    fetch("/api/v1/erp/labor/create")
      .then((response) => response.json())
      .then((data) => {
        setLaborInfo(data);
      });
  }, []);

  const theme = useTheme();
  const { loading, selectLaborID, laborDetail } = useGlobalContext();
  const [values, setValues] = useState({
    name: laborDetail.name,
    price: laborDetail.price,
    _id: laborDetail._id,
    laborCategory: laborDetail.laborCategory._id,
  });
  const [laborInfo, setLaborInfo] = useState("");

  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponse(false);
    const { name, price, _id, laborCategory } = values;
    const laborData = { name, price, _id, laborCategory };

    try {
      const url = `${rootUrl}/api/v1/erp/labor/${laborDetail._id}/edit`;
      axios
        .post(url, laborData)
        .then(function (response) {
          setResponseText(response.data);
          setResponse(true);
        })
        .catch(function (error) {
          setResponseText(error.response.data.msg.message);
        });
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
      <Header title="Edit Labor" subtitle="Fill out form below" />
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
            <InputLabel shrink htmlFor="select" id="laborCategory">
              Labor Category
            </InputLabel>
            <NativeSelect
              name="laborCategory"
              required={true}
              onChange={handleChange}
              value={values.laborCategory}
              label="Labor Category"
              id="select"
              type="select"
            >
              <option value={laborDetail.laborCategory._id}>
                {laborDetail.laborCategory.name}
              </option>
              {(laborInfo.labor_category_list || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((laborCategory) => {
                  if (laborCategory._id !== laborDetail.laborCategory._id) {
                    return (
                      <option value={laborCategory._id} key={laborCategory._id}>
                        {laborCategory.name}
                      </option>
                    );
                  }
                  return "";
                })}
            </NativeSelect>
          </FormControl>
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      {response && (
        <Box mt="20px">
          <Typography
            variant="h3"
            color={theme.palette.secondary[300]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            Labor Edited
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              mt="10px"
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
              }}
            >
              <Box
                sx={{
                  bgcolor: theme.palette.background.alt,
                  padding: "10px",
                  borderRadius: "4px",
                  border: 1,
                }}
              >
                {console.log(responseText)}
                <Typography
                  variant="h3"
                  color={theme.palette.secondary[100]}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  Previous
                </Typography>
                <p>{responseText.updatedLabor.name}</p>
                <p>${responseText.updatedLabor.price}</p>
                <p>{responseText.updatedLabor.laborCategory.name}</p>
              </Box>
              <Box
                sx={{
                  bgcolor: theme.palette.background.alt,
                  padding: "10px",
                  borderRadius: "4px",
                  border: 1,
                }}
              >
                <Typography
                  variant="h3"
                  color={theme.palette.secondary[100]}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  Updated
                </Typography>
                <p>
                  <Link
                    component={RouterLink}
                    color="inherit"
                    onClick={() => selectLaborID(responseText.labor._id)}
                    to={`/labordetail/${responseText.labor._id}`}
                  >
                    {responseText.labor.name}
                  </Link>
                </p>
                <p>${responseText.labor.price}</p>
                <p>{responseText.labor.laborCategory.name}</p>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LaborEditForm;

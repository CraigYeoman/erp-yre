import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState } from "react";
import Header from "../Header";
import {
  Box,
  useTheme,
  Button,
  TextField,
  Typography,
  Link,
} from "@mui/material";
const rootUrl = "http://localhost:5000";

const PartCategoryEditForm = () => {
  const { loading, selectPartCategoryID, partCategoryDetail } =
    useGlobalContext();
  const [values, setValues] = useState({
    name: partCategoryDetail.name,
    _id: partCategoryDetail._id,
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

    const { name, _id } = values;
    const partCategoryData = {
      name,
      _id,
    };
    try {
      const url = `${rootUrl}/api/v1/erp/partcategory/${partCategoryDetail._id}/edit`;
      axios
        .post(url, partCategoryData)
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
      <Header title="New Part Category" subtitle="Fill out form below" />
      <form onSubmit={onSubmit}>
        <Box
          mt="1rem"
          mb="1rem"
          sx={{
            display: "flex",
          }}
        >
          <TextField
            label="Part Category Name"
            placeholder="Name"
            margin={"normal"}
            required
            value={values.name}
            onChange={handleChange}
            name="name"
          />
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
            Part Category Edited
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
                <Typography
                  variant="h3"
                  color={theme.palette.secondary[100]}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  Previous
                </Typography>
                <p>{responseText.updatedPartCategory.name}</p>
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
                  New
                </Typography>
                <p>
                  <Link
                    component={RouterLink}
                    color="inherit"
                    onClick={() =>
                      selectPartCategoryID(responseText.partcategory._id)
                    }
                    to={`/partcategorydetail/${responseText.partcategory._id}`}
                  >
                    {responseText.partcategory.name}
                  </Link>
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {responseError && (
        <div>
          <p>
            {responseTextError.partcategory.name}
            not edited
          </p>
          {responseTextError.errors.map((error) => {
            const { msg, param, value } = error;
            return (
              <p key={error.value}>
                {msg} in {param} value {value}
              </p>
            );
          })}
        </div>
      )}
    </Box>
  );
};

export default PartCategoryEditForm;

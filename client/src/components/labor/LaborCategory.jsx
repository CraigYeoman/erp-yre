import { Link as RouterLink } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Header from "../Header";
import { Box, useTheme, Link, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const LaborCategory = () => {
  const theme = useTheme();
  const { selectLaborCategoryID, listType } = useGlobalContext();
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data.laborCategories) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Labor Categories"} subtitle={""} />
      <Typography
        variant="h4"
        fontWeight="bold"
        color={theme.palette.secondary[300]}
        sx={{ marginBottom: "15px" }}
      >
        <Link component={RouterLink} color="inherit" to={`/laborcategoryform/`}>
          New Category
        </Link>
      </Typography>
      {data.laborCategories.map((laborCategory) => {
        const { name, _id } = laborCategory;
        return (
          <Box className="job-container" mb="5px" key={_id}>
            <Typography variant="h5" color={theme.palette.secondary[100]}>
              <Link
                component={RouterLink}
                color="inherit"
                underline="none"
                onClick={() => selectLaborCategoryID(_id)}
                to={`/laborcategorydetail/${_id}`}
              >
                {name}
              </Link>
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default LaborCategory;

import { Link as RouterLink } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Header from "../Header";
import {
  Box,
  useTheme,
  Link,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const PartDetail = () => {
  const theme = useTheme();
  const {
    partDetail,
    selectVendorID,
    loading,
    response,
    responseText,
    onSubmitGet,
    onSubmitPost,
    selectWorkOrderID,
    selectPartID,
  } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  const { name, part_number, manufacture, customer_price, cost, _id, vendor } =
    partDetail;
  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Part Detail"} />
      <Card
        variant="outlined"
        sx={{
          bgcolor: theme.palette.background.alt,
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={theme.palette.secondary[300]}
          >
            {name}
          </Typography>

          <p>Part Number: {part_number}</p>
          <p>Manufacture: {manufacture}</p>
          <p>Customer Price: ${customer_price}</p>
          <p>Cost: ${cost}</p>
          <p>
            Vendor:{" "}
            <Link
              component={RouterLink}
              color="inherit"
              onClick={() => selectVendorID(vendor._id)}
              to={`/vendordetail/${vendor._id}`}
            >
              {vendor.name}
            </Link>
          </p>
        </CardContent>
      </Card>
      <Box mt="15px">
        <Button variant="contained">
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            onClick={() => selectPartID(_id)}
            to={`/partedit/${_id}`}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmitGet(_id, "parts")}
          sx={{ marginLeft: "15px" }}
        >
          Delete
        </Button>
        {response && (
          <Box mt="15px">
            Are you sure you want to delete?
            <Button
              variant="contained"
              onClick={() => onSubmitPost(_id, "parts")}
              sx={{ marginLeft: "15px" }}
            >
              Delete
            </Button>
          </Box>
        )}
        {responseText === "Complete" && "Deleted"}
      </Box>
    </Box>
  );
};

export default PartDetail;

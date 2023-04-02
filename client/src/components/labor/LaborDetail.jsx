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

const LaborDetail = () => {
  const theme = useTheme();

  const {
    laborDetail,
    loading,
    selectWorkOrderID,
    onSubmitGet,
    onSubmitPost,
    response,
    responseText,
    selectLaborID,
  } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, price, _id, laborCategory } = laborDetail;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Labor Detail"} subtitle={""} />
      <Box component="span" Cx={{ display: "inline-block", mx: "2px" }}>
        <Card
          variant="outlined"
          sx={{
            bgcolor: theme.palette.background.alt,
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          <CardContent display>
            <Typography
              sx={{ marginBottom: "5px" }}
              variant="h5"
              fontWeight="bold"
              color={theme.palette.secondary[300]}
            >
              {name}
            </Typography>
            <Typography
              sx={{ marginBottom: "5px" }}
              variant="body"
              color={theme.palette.secondary[100]}
            >
              Customer Price: ${price}
              <br />
            </Typography>
            <Typography
              sx={{ marginBottom: "5px" }}
              variant="body"
              color={theme.palette.secondary[100]}
            >
              Category: {laborCategory.name}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt="15px">
        <Button variant="contained">
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            onClick={() => selectLaborID(_id)}
            to={`/laboredit/${_id}`}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmitGet(_id, "labor")}
          sx={{ marginLeft: "15px" }}
        >
          Delete
        </Button>
      </Box>

      {response && typeof responseText.labor_work_orders === "undefined" ? (
        <Box mt="15px">
          Are you sure you want to delete?
          <Button
            variant="contained"
            onClick={() => onSubmitPost(_id, "labor")}
            sx={{ marginLeft: "15px" }}
          >
            Delete
          </Button>
        </Box>
      ) : (
        <div>
          {response &&
            responseText.labor_work_orders.map((workOrder) => {
              return (
                <Box mt="15px">
                  Please edit the following work order before deleting
                  <Link
                    component={RouterLink}
                    onClick={() => selectWorkOrderID(workOrder._id)}
                    to={`/workorderdetail/${workOrder._id}`}
                    key={workOrder._id}
                  >
                    {workOrder.work_order_number}
                  </Link>
                </Box>
              );
            })}
        </div>
      )}
      {responseText === "Complete" && "Deleted"}
    </Box>
  );
};

export default LaborDetail;

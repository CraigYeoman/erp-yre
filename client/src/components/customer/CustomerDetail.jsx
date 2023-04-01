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
const { DateTime } = require("luxon");

const CustomerDetail = () => {
  const theme = useTheme();
  const {
    customerDetail,
    loading,
    selectWorkOrderID,
    onSubmitGet,
    onSubmitPost,
    response,
    responseText,
    selectCustomerID,
    formatPhoneNumber,
  } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const {
    _id,
    first_name,
    last_name,
    phone_number,
    email,
    address_line_1,
    address_line_2,
    city,
    state,
    zip_code,
  } = customerDetail.customer;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Customer"} subtitle={first_name + " " + last_name} />

      <Box>
        <p>{formatPhoneNumber(phone_number)}</p>
        <p>{email}</p>
        <p>
          {address_line_1}, {city}, {state} {zip_code}
        </p>
        <p>{address_line_2}</p>
      </Box>
      <Box mt="15px">
        <Button variant="contained">
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            onClick={() => selectCustomerID(_id)}
            to={`/customeredit/${_id}`}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmitGet(_id, "customers")}
          sx={{ marginLeft: "15px" }}
        >
          Delete
        </Button>
        {response && (
          <Box mt="15px">
            Are you sure you want to delete?
            <Button
              variant="contained"
              onClick={() => onSubmitPost(_id, "customers")}
              sx={{ marginLeft: "15px" }}
            >
              Delete
            </Button>
          </Box>
        )}
        {responseText === "Complete" && "Deleted"}
      </Box>
      <Box mt="15px">
        <Typography
          variant="h5"
          fontWeight="bold"
          color={theme.palette.secondary[300]}
        >
          Work Orders
        </Typography>
        {customerDetail.customer_workorders.map((workOrder) => {
          console.log(workOrder);
          const {
            _id,
            date_received,
            date_due,
            date_finished,
            jobType,
            work_order_number,
            notes,
            complete,
          } = workOrder;
          return (
            <Card
              variant="outlined"
              sx={{
                bgcolor: theme.palette.background.alt,
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <CardContent>
                <Link
                  component={RouterLink}
                  color="inherit"
                  onClick={() => selectWorkOrderID(_id)}
                  to={`/workorderdetail/${_id}`}
                >
                  {work_order_number}
                </Link>
                <p>{jobType.name}</p>
                <p>
                  Date Recieved: {DateTime.fromISO(date_received).toFormat("D")}
                </p>
                <p>Date Due: {DateTime.fromISO(date_due).toFormat("D")}</p>
                {complete === false ? (
                  <p>Status: Inprocess</p>
                ) : (
                  <div>
                    <p>Status: Complete</p>
                    <p>
                      Date Completed:{" "}
                      {DateTime.fromISO(date_finished).toFormat("D")}
                    </p>
                  </div>
                )}
                <p>{notes}</p>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default CustomerDetail;

import { Link as RouterLink } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Header from "../Header";
import { Box, useTheme, Link, Button, Typography } from "@mui/material";

const JobTypeDetail = () => {
  const theme = useTheme();

  const {
    jobTypeDetail,
    loading,
    onSubmitGet,
    onSubmitPost,
    response,
    responseText,
    selectWorkOrderID,
    selectJobTypeID,
  } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, _id } = jobTypeDetail;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Job Type"} subtitle={"Detail"} />
      <Box mt="15px">
        <Typography
          variant="h4"
          fontWeight="bold"
          color={theme.palette.secondary[100]}
        >
          {name}
        </Typography>
      </Box>
      <Box mt="15px">
        <Button variant="contained">
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            onClick={() => selectJobTypeID(_id)}
            to={`/jobtypeedit/${_id}`}
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
      </Box>

      {response && typeof responseText.job_type_work_orders === "undefined" ? (
        <Box mt="15px">
          Are you sure you want to delete?
          <Button
            variant="contained"
            onClick={() => onSubmitGet(_id, "jobtypes")}
            sx={{ marginLeft: "15px" }}
          >
            Delete
          </Button>
        </Box>
      ) : (
        <div>
          {response &&
            responseText.job_type_work_orders.map((workOrder) => {
              return (
                <Box mt="15px">
                  Please edit the following work order before deleting{" "}
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

export default JobTypeDetail;

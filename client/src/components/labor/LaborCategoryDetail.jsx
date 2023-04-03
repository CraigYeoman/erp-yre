import { Link as RouterLink } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Header from "../Header";
import { Box, Link, Button } from "@mui/material";

const LaborCategoryDetail = () => {
  const {
    laborCategoryDetail,
    loading,
    onSubmitGet,
    onSubmitPost,
    response,
    responseText,
    selectLaborCategoryID,
  } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, _id } = laborCategoryDetail;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={name} subtitle={""} />

      <Box mt="15px">
        <Button variant="contained">
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            onClick={() => selectLaborCategoryID(_id)}
            to={`/laborcategoryedit/${_id}`}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmitGet(_id, "laborcategory")}
          sx={{ marginLeft: "15px" }}
        >
          Delete
        </Button>

        {response && (
          <Box mt="15px">
            Are you sure you want to delete?
            <Button
              variant="contained"
              onClick={() => onSubmitPost(_id, "laborcategory")}
              sx={{ marginLeft: "15px" }}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
      {responseText === "Complete" && "Deleted"}
    </Box>
  );
};

export default LaborCategoryDetail;

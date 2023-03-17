import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { Box, useTheme, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";

const JobTypeList = () => {
  const { selectJobTypeID, listType, setLoading, loading } = useGlobalContext();
  const [data, setData] = useState([{}]);
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (!data.jobTypes) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1.5,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          color="inherit"
          onClick={() => selectJobTypeID(params.row._id)}
          to={`/jobtypedetail/${params.row._id}`}
        >
          {params.row._id}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Job Types" subtitle="List of Job Types" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={loading || !data.jobTypes}
          rows={data.jobTypes}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default JobTypeList;

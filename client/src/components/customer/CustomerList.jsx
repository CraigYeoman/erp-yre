import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { Box, useTheme, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";

const CustomerList = () => {
  const { selectCustomerID, listType, formatPhoneNumber, setLoading, loading } =
    useGlobalContext();
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

  if (!data.customers) {
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
          onClick={() => selectCustomerID(params.row._id)}
          to={`/customerdetail/${params.row._id}`}
        >
          {params.row._id}
        </Link>
      ),
    },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {formatPhoneNumber(params.row.phone_number)}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address_line_1",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "zip_code",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Customers" subtitle="List of Customers" />
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
          loading={loading || !data.customers}
          rows={data.customers}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default CustomerList;

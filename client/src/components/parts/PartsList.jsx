import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const PartsList = () => {
  const { listType, selectPartID, selectVendorID } = useGlobalContext();
  const [data, setData] = useState([{}]);
  const theme = useTheme();

  useEffect(() => {
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data.parts) {
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
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "part_number",
      headerName: "Part Number",
      flex: 1,
    },
    {
      field: "partCategory.name",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "manufacture",
      headerName: "Manufacture",
      flex: 1,
    },
    {
      field: "customer_price",
      headerName: "Customer Price",
      flex: 1,
    },
    {
      field: "vendor",
      headerName: "Vendor Name",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        mt="40bx"
        height="75%"
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
          rows={data.parts}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
      <h1>Parts</h1>
      <h3>List</h3>
      <div className="parts-container-title">
        <p>Name</p>
        <p>Part Number</p>
        <p>Category</p>
        <p>Manufacture</p>
        <p>Customer Price</p>
        <p>Vendor Name</p>
      </div>
      {data.parts.map((part) => {
        const {
          name,
          part_number,
          partCategory,
          manufacture,
          vendor,
          customer_price,
          _id,
        } = part;
        return (
          <div className="parts-container" key={_id}>
            <Link onClick={() => selectPartID(_id)} to={`/partdetail/${_id}`}>
              {name}
            </Link>
            <p>{part_number}</p>
            <p>{partCategory.name}</p>
            <p>{manufacture}</p>
            <p>${customer_price}</p>
            <Link
              onClick={() => selectVendorID(vendor._id)}
              to={`/vendordetail/${vendor._id}`}
            >
              {vendor.name}
            </Link>
          </div>
        );
      })}
    </Box>
  );
};

export default PartsList;

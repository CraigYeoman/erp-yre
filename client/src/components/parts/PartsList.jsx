import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { Box, useTheme, Link, InputAdornment } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";

const PartsList = () => {
  const { listType, selectPartID, selectVendorID, setLoading, loading } =
    useGlobalContext();
  const [data, setData] = useState([{}]);
  const [detailRow, setDetailRow] = useState([{}]);
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/erp/${listType}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
        // let detailRow = data.parts.map((part) => {
        //   return {
        //     _id: part._id,
        //     part_number: part.part_number,
        //     partCategory: part.partCategory.name,
        //     manufacture: part.manufacture,
        //     vendor: part.vendor.name,
        //     customer_price: part.customer_price,
        //     name: part.name,
        //   };
        // });
        setDetailRow(detailRow);

        setLoading(false);
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
      flex: 1.5,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          color="inherit"
          onClick={() => selectPartID(params.row._id)}
          to={`/partdetail/${params.row._id}`}
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
    {
      field: "part_number",
      headerName: "Part Number",
      flex: 1,
    },
    {
      field: "partCategory",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.partCategory.name}</div>;
      },
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
      renderCell: (params) => {
        return <div className="rowitem">${params.row.customer_price}</div>;
      },
    },
    {
      field: "vendor",
      headerName: "Vendor Name",
      flex: 1,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          color="inherit"
          onClick={() => selectVendorID(params.row.vendor._id)}
          to={`/vendordetail/${params.row.vendor._id}`}
        >
          {params.row.vendor.name}
        </Link>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Parts" subtitle="List of Parts" />
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
          loading={loading || !data.parts}
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

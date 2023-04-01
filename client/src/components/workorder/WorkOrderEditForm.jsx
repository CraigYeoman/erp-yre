import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useState, useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import {
  Box,
  useTheme,
  Button,
  TextField,
  InputLabel,
  FormControl,
  NativeSelect,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Typography,
  Link,
} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Header from "../Header";
const rootUrl = "http://localhost:5000";
const { DateTime } = require("luxon");

const WorkOrderForm = () => {
  useEffect(() => {
    setCustomerParts([]);
    setCustomerLabor([]);
    setLoading(true);
    fetch(`/api/v1/erp/workorders/${id}/edit`)
      .then((response) => response.json())
      .then((data) => {
        setWorkOrderDetail(data);
        setValues({
          customer: data.work_order.customer._id,
          date_received: DateTime.fromISO(
            data.work_order.date_received
          ).toISODate(),
          date_due: DateTime.fromISO(data.work_order.date_due).toISODate(),
          part_number: data.work_order.part_number,
          jobtype: data.work_order.jobType._id,
          parts: data.work_order.parts,
          labor: data.work_order.labor,
          notes: data.work_order.notes,
          work_order_number: data.work_order.work_order_number,
          _id: data.work_order._id,
        });
        setCustomerParts(data.work_order.parts);
        setCustomerLabor(data.work_order.labor);
        checkBoxLoad(data.work_order.accessories, setCustomerAccessories);
        console.log(customerAccessories);
        setLoading(false);
      });
  }, []);

  const [customerAccessories, setCustomerAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState("");
  const [response, setResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseError, setResponseError] = useState(false);
  const [responseTextError, setResponseTextError] = useState("");
  const [workOrderDetail, setWorkOrderDetail] = useState("");
  const {
    selectWorkOrderID,
    id,
    deleteItem,
    sumTotal,
    customerParts,
    setCustomerParts,
    customerLabor,
    setCustomerLabor,
    handleChangeArray,
  } = useGlobalContext();
  const [values, setValues] = useState({
    customer: "",
    date_received: "",
    date_due: "",
    part_number: "",
    jobtype: "",
    parts: "",
    labor: "",
    notes: "",
    work_order_number: "",
    _id: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeCheckBox = (array, func, event, info) => {
    if (event.target.checked === true) {
      const updatedValues = [...array, info];
      func(updatedValues);
    } else if (event.target.checked === false) {
      const updatedValues = array.filter((a) => a !== info);
      func(updatedValues);
    }
  };

  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };

  const checkBoxLoad = (array, func) => {
    const items = array.map((x) => x._id);
    func(items);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponse(false);
    setResponseError(false);
    const {
      customer,
      date_received,
      date_due,
      jobtype,
      work_order_number,
      notes,
      _id,
    } = values;
    let accessories = customerAccessories;
    let parts = customerParts;
    let labor = customerLabor;
    const workOrderData = {
      customer,
      date_received,
      date_due,
      jobtype,
      accessories,
      parts,
      labor,
      work_order_number,
      notes,
      _id,
    };

    try {
      const url = `${rootUrl}/api/v1/erp/workorders/${_id}/edit`;
      axios
        .post(url, workOrderData)
        .then((response) => {
          setResponseText(response.data);
          setResponse(true);
        })
        .catch((error) => {
          setResponseTextError(error.response.data);
          console.log(error.response.data);
          setResponseError(true);
        });
    } catch (error) {
      setResponseTextError(error);
      console.log(error);
      setResponseError(true);
    }
  };

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Edit Work Order" subtitle="Edit form below" />
      <form onSubmit={onSubmit}>
        <Box
          mt="1rem"
          mb="1rem"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "240px",
            gap: "5px;",
          }}
        >
          <TextField
            label="Work Order Number"
            placeholder="XXXXX"
            margin={"normal"}
            required
            value={values.work_order_number}
            onChange={handleChange}
            name="work_order_number"
          />
          <FormControl sx={{ minWidth: 80, mt: "16px", mb: "8px" }}>
            <InputLabel id="customer">Customer</InputLabel>
            <NativeSelect
              name="customer"
              required={true}
              onChange={handleChange}
              value={values.customer}
              labelId="customer"
              label="Customer"
            >
              <option value={workOrderDetail.work_order.customer._id}>
                {workOrderDetail.work_order.customer.first_name}{" "}
                {workOrderDetail.work_order.customer.last_name}
              </option>
              {(workOrderDetail.customers || [])
                .sort((a, b) => {
                  let textA = a.first_name.toUpperCase();
                  let textB = b.first_name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((customer) => {
                  if (
                    customer._id !== workOrderDetail.work_order.customer._id
                  ) {
                    return (
                      <option value={customer._id} key={customer._id}>
                        {customer.first_name} {customer.last_name}
                      </option>
                    );
                  }
                  return "";
                })}
            </NativeSelect>
          </FormControl>
          <TextField
            label="Date Received"
            margin={"normal"}
            required
            value={values.date_received}
            onChange={handleChange}
            name="date_received"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Due Date"
            margin={"normal"}
            required
            value={values.date_due}
            onChange={handleChange}
            name="date_due"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl sx={{ minWidth: 80, mt: "16px", mb: "8px" }}>
            <InputLabel id="jobtype">Job Type</InputLabel>
            <NativeSelect
              name="jobtype"
              required={true}
              onChange={handleChange}
              value={values.jobtype}
              labelId="jobtype"
              label="Job Type"
            >
              <option value={workOrderDetail.work_order.jobType._id}>
                {workOrderDetail.work_order.jobType.name}
              </option>
              {(workOrderDetail.jobtypes || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((jobtype) => {
                  if (jobtype._id !== workOrderDetail.work_order.jobType._id) {
                    return (
                      <option value={jobtype._id} key={jobtype._id}>
                        {jobtype.name}
                      </option>
                    );
                  }
                  return "";
                })}
            </NativeSelect>
          </FormControl>
          {workOrderDetail.partsCategory && (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: theme.palette.background.default,
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{
                    bgcolor: theme.palette.background.default,
                    fontWeight: "bold",
                    fontSize: "16px",
                    paddingLeft: "0px",
                  }}
                  color="inherit"
                >
                  Parts
                </ListSubheader>
              }
            >
              {workOrderDetail.partsCategory.map((category) => {
                return (
                  <>
                    <ListItemButton
                      key={category._id}
                      onClick={() => {
                        handleClick(category._id);
                      }}
                    >
                      <ListItemText primary={category.name} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse
                      in={category._id === selectedIndex}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {workOrderDetail.parts
                          .filter(
                            ({ partCategory }) => partCategory === category._id
                          )
                          .map((part) => {
                            let info = {
                              name: part.name,
                              customer_price: part.customer_price,
                              _id: part._id,
                              manufacture: part.manufacture,
                              part_number: part.part_number,
                            };
                            return (
                              <ListItemButton key={part._id} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                  <MdAddCircleOutline
                                    onClick={() =>
                                      handleChangeArray(
                                        customerParts,
                                        setCustomerParts,
                                        info
                                      )
                                    }
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  sx={{
                                    alignContent: "",
                                    display: "block",
                                  }}
                                  primary={part.name}
                                  secondary={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        {`$${part.customer_price}`}
                                      </Typography>
                                      <Typography>{`Part #:${part.part_number}`}</Typography>
                                      <Typography>
                                        {part.manufacture}
                                      </Typography>
                                    </Box>
                                  }
                                />
                              </ListItemButton>
                            );
                          })}
                      </List>
                    </Collapse>
                  </>
                );
              })}
            </List>
          )}
          <Box>
            {customerParts
              .sort((a, b) => {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
              .map((part) => {
                return (
                  <Box
                    mb="15px"
                    ml="16px"
                    key={part._id}
                    sx={{ borderRadius: "4px", border: 1, padding: "8px" }}
                  >
                    <Typography variant="body1">
                      Part#: {part.part_number}
                    </Typography>
                    <Typography variant="body1">Name: {part.name}</Typography>{" "}
                    <Typography variant="body1">
                      Manufacture: {part.manufacture}
                    </Typography>
                    <Typography variant="body1">
                      Price: ${part.customer_price}
                    </Typography>
                    <MdDeleteOutline
                      onClick={() =>
                        deleteItem(part._id, customerParts, setCustomerParts)
                      }
                    />
                  </Box>
                );
              })}
            <Typography
              variant="h6"
              color={theme.palette.secondary[300]}
              sx={{ mb: "10px", ml: "15px" }}
              fontWeight="bold"
            >
              Parts Total: ${sumTotal(customerParts, "customer_price")}
            </Typography>
          </Box>

          {workOrderDetail.laborCategory && (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: theme.palette.background.default,
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{
                    bgcolor: theme.palette.background.default,
                    fontWeight: "bold",
                    fontSize: "16px",
                    paddingLeft: "0px",
                  }}
                  color="inherit"
                >
                  Labor
                </ListSubheader>
              }
            >
              {workOrderDetail.laborCategory.map((category) => {
                return (
                  <>
                    <ListItemButton
                      key={category._id}
                      onClick={() => {
                        handleClick(category._id);
                      }}
                    >
                      <ListItemText primary={category.name} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse
                      in={category._id === selectedIndex}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {workOrderDetail.labors
                          .filter(
                            ({ laborCategory }) =>
                              laborCategory === category._id
                          )
                          .map((labor) => {
                            let info = {
                              name: labor.name,
                              price: labor.price,
                              _id: labor._id,
                            };
                            return (
                              <ListItemButton key={labor._id} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                  <MdAddCircleOutline
                                    onClick={() =>
                                      handleChangeArray(
                                        customerLabor,
                                        setCustomerLabor,
                                        info
                                      )
                                    }
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={labor.name}
                                  secondary={`$${labor.price}`}
                                />
                              </ListItemButton>
                            );
                          })}
                      </List>
                    </Collapse>
                  </>
                );
              })}
            </List>
          )}
          <Box mb="5px">
            <Typography
              variant="h6"
              color={theme.palette.secondary[300]}
              sx={{ mb: "10px", ml: "15px" }}
              fontWeight="bold"
            >
              Labor Total: ${sumTotal(customerLabor, "price")}
            </Typography>

            {customerLabor
              .sort((a, b) => {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
              .map((labor) => {
                return (
                  <Box
                    mb="15px"
                    ml="16px"
                    sx={{ borderRadius: "4px", border: 1, padding: "8px" }}
                    key={labor._id}
                  >
                    <Typography variant="body1">Labor: {labor.name}</Typography>
                    <Typography variant="body1">
                      Price: ${labor.price}
                    </Typography>
                    <MdDeleteOutline
                      onClick={() =>
                        deleteItem(labor._id, customerLabor, setCustomerLabor)
                      }
                    />
                  </Box>
                );
              })}
          </Box>
          <FormControl
            sx={{ minWidth: 80, mt: "16px", mb: "8px" }}
            component="fieldset"
          >
            <FormLabel component="legend">Customer Accessories</FormLabel>
            <FormGroup>
              {(workOrderDetail.accessories || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((accessory) => {
                  return (
                    <FormControlLabel
                      key={accessory._id}
                      control={
                        <Checkbox
                          checked={
                            !!customerAccessories.includes(accessory._id)
                          }
                          onChange={(event) =>
                            handleChangeCheckBox(
                              customerAccessories,
                              setCustomerAccessories,
                              event,
                              accessory._id
                            )
                          }
                          name={accessory.name}
                        />
                      }
                      label={accessory.name}
                    />
                  );
                })}
            </FormGroup>
          </FormControl>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Notes"
            style={{ width: 200 }}
            name="notes"
            value={values.notes}
            onChange={handleChange}
          />
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      {response && (
        <Box mt="15px">
          {responseText.msg}{" "}
          <Link
            component={RouterLink}
            color="inherit"
            onClick={() => selectWorkOrderID(responseText.workOrder._id)}
            to={`/workorderdetail/${responseText.workOrder._id}`}
          >
            {responseText.workOrder.work_order_number}
          </Link>
        </Box>
      )}
      {responseError && (
        <div>
          <p>
            {responseText.workOrder.first_name}{" "}
            {responseText.workOrder.last_name}{" "}
            {responseText.workOrder.work_order_number}not updated
          </p>
          {responseTextError.errors.map((error) => {
            const { msg, param, value } = error;
            return (
              <p key={error.param}>
                {msg} in {param} value {value}
              </p>
            );
          })}
        </div>
      )}
    </Box>
  );
};

export default WorkOrderForm;

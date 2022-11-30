const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const vendorsRouter = require("./routes/vendors");
const jobTypeRouter = require("./routes/jobtype");
const customerRouter = require("./routes/customer");
const laborRouter = require("./routes/labor");
const partsRouter = require("./routes/parts");
const workOrdersRouter = require("./routes/workorders");

const app = express();

const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
// Set up mongoose connection
const port = process.env.port || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send('<h1>Erp API</h1><a href="/api/v1/erp">erp route</a>');
});

app.use("/api/v1/vendors", vendorsRouter);
app.use("/api/v1/jobtypes", jobTypeRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/labor", laborRouter);
app.use("/api/v1/parts", partsRouter);
app.use("/api/v1/workorders", workOrdersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(notFoundMiddleware);
app.use(errorMiddleware);

start();

module.exports = app;

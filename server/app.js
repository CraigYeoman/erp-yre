require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
//const workOrdersRouter = require("./routes/workorders");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("<h1>Working</h1>");
});

//app.use("/api/v1/workorders", workOrdersRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.port || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

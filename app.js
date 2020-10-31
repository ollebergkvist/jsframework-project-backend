// Essentials
require("dotenv").config(); // Use dotenv for env variables
const express = require("express"); // Module to run express server
const rateLimit = require("express-rate-limit"); // Module to limit repeated requests to API
const morgan = require("morgan"); // Module to log requests
const cors = require("cors"); // Module to allow clients from other domains to retrieve data from API
const fs = require("fs"); // Module to work with filesystem
const path = require("path"); // Module to work with directories and file paths
const bodyParser = require("body-parser"); // Body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
const StartMongoServer = require("./db/db");
const rate = require("./models/stock");
const app = express(); // Exec express
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = process.env.SERVER_PORT;
io.origins([process.env.SOCKET_ORIGIN]); // Allows defined client to communicate with server

// CORS config
var corsOptions = {
  origin: process.env.SOCKET_ORIGIN,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Imports routes defined in routes dir
const signup = require("./routes/signup.js");
const login = require("./routes/login.js");
const findAll = require("./routes/findall");
const findOne = require("./routes/findone");
const deposit = require("./routes/deposit");
const purchase = require("./routes/purchase");
const sell = require("./routes/sell");
const test = require("./routes/test");

// What to do when our maximum request rate is breached
// const limitReached = () => {
//   res.status(429).send("Too many requests. Try again later.");
// };

// rateLimit config
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   onLimitReached: limitReached, // Call function to send error message
// });

// Create db connection
StartMongoServer();

// Initialize middleware
// app.use(limiter);
app.use(cors(corsOptions)); // Use cors module and defined options
app.use(bodyParser.json()); // Supports parsing of application/json type post data
app.use(bodyParser.urlencoded({ extended: true })); // Supports parsing of application/x-www-form-urlencoded post data

// Initialize router middleware
app.use("/test", test);
app.use("/signup", signup);
app.use("/login", login);
app.use("/findall", findAll);
app.use("/findone", findOne);
app.use("/deposit", deposit);
app.use("/purchase", purchase);
app.use("/sell", sell);

//Creates a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// Don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
  // use morgan to log at command line
  app.use(morgan("combined", { stream: accessLogStream })); // 'combined' outputs the Apache style LOGs
}

// Socket.io
var apple = {
  label: "Apple Inc",
  rate: 1.002,
  variance: 1.9,
  startingPoint: 120,
  data: [],
  borderWidth: 2,
  borderColor: "#0275d8",
  labels: [],
};

var walmart = {
  label: "Walmart Inc",
  rate: 1.001,
  variance: 0.2,
  startingPoint: 122,
  data: [],
  borderWidth: 2,
  borderColor: "#5cb85c",
  labels: [],
};

var stocks = [apple, walmart];

setInterval(() => {
  stocks.map((stock) => {
    if (stock.data.length > 12) {
      stock.data.shift();
    }
    if (stock.labels.length > 12) {
      stock.labels.shift();
    }
    stock.labels.push(new Date().toLocaleTimeString("sv-SE"));
    stock.data.push(rate.getStockPrice(stock));

    return stock;
  });
  io.emit("stocks", stocks);
}, 5000);

// Starts server and sets what port to listen to
const expressServer = server.listen(port, () => {
  console.log("Express server is up and running"); // Prints message
});

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = expressServer; // Export server in order to use it in test files

const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const apiErr = require("../controllers/errorController");

const router = require("../routes/index");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

app.use(router);

app.use(apiErr.onError);
app.use(apiErr.onLost);

module.exports = app;

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const path = require("path");

const routes = require("./routes");
const entriesRouter = require("./routes/entries");
const quoteRouter = require("./routes/quote");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api/entries", entriesRouter);
app.use("/api", quoteRouter);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (statusCode === 500) {
    return res.status(500).send({ message: "Server error" });
  }

  return res.status(statusCode).send({ message });
});

app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

module.exports = app;


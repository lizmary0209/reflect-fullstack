const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");


const routes = require("./routes");
const entriesRouter = require("./routes/entries");
const quoteRouter = require("./routes/quote");

const app = express();

const FRONTEND_URL = "https://reflect-fullstack.vercel.app";
const BACKEND_URL = "https://reflect-backend-w00n.onrender.com";


app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "connect-src": ["'self'", FRONTEND_URL, BACKEND_URL],
        "img-src": ["'self'", "data:", "https:"],
        "font-src": ["'self'", "data:", "https:"],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "script-src": ["'self'"],
      },
    },
  })
);


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

module.exports = app;


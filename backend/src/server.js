require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8888;
const hostname = process.env.HOSTNAME || "localhost";
const initAPIRoute = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

initAPIRoute(app);

app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

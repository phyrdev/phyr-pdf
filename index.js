const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const animalize = require("./routes/animalize");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use("/animalize", animalize);
app.use("/public", express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

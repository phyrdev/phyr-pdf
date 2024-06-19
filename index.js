const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
const animalize = require("./routes/animalize");
const cors = require("cors");
const mqtt = require("mqtt");
const randomstring = require("randomstring");

try {
  const id = randomstring.generate(5);
  const client = mqtt.connect("mqtt://broker.hivemq.com");
  client.on("connect", () => {
    console.log("Connected to MQTT broker");
    client.subscribe("animalize/server");
  });
  client.on("message", (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);
    client.publish("animalize/client", `Hello from Node.js with id ${id}`);
  });
} catch (error) {
  console.log(error);
}

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

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json({ extended: false }));

//Connect to MongoDB
connectDB();

//define routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.listen(9000, () => console.log(`Server listening on Port 9000`));

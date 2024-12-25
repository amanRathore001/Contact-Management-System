const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express()
const port = process.env || 5000;

connectDb();
app.use(express.json());
app.use(errorHandler)

app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/usersRoutes"));

app.listen(port, (req, res) => {
    console.log(`Server running ${port}`);

})
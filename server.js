const express = require("express");
require('dotenv').config({ path: '.env' });
const cors = require("cors");
const studentRoutes = require("./src/routes/studentRoutes.js");
const examRoutes = require("./src/routes/examRoutes.js");

const app = express();

app.use(express.json());

app.use(cors());
app.use(studentRoutes);
app.use(examRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`)
})
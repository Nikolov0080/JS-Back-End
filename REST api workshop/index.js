const express = require("express");
const { connectDB } = require('./database');
const cubeRouter = require('./routes/cubes');
const app = express();
app.use(express.json());

connectDB();
app.use('/cube', cubeRouter);

app.listen(4000, () => {
    console.log('Api running on port 4000 !');
})
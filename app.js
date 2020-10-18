require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 
const userRouter = require("./api/users/user.router");
const empRouter = require("./api/employee/emp.router");
app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/employee",empRouter);


app.listen(port,()=>{ 
    console.log("server up and running on port ",port);
}) 
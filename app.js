require('dotenv').config();
const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())
const port = process.env.PORT || 3000; 
const userRouter = require("./api/users/user.router");
const empRouter = require("./api/employee/emp.router");
const adminRouter = require("./api/admin/admin.router");
app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/employee",empRouter);
app.use("/api/admin",adminRouter);


app.listen(port,()=>{ 
    console.log("server up and running on port ",port);
}) 
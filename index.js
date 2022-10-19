const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const dbConnection = require('./server');
const port = process.env.PORT || 5000;
const user = require('./Routes/user.route');
const job = require('./Routes/job.route');
const admin = require('./Routes/admin.route');
const ErrorHandeler = require('./helper/Error.handeler');
// Middleware
app.use(cors());
app.use(express.json());
//------------------->>>>Create Route Here<<<<-------------------
app.use('/api/v1/user',user)
app.use('/api/v1/job',job)
app.use('/api/v1/admin',admin)
//------------------->>>>Create Route Here<<<<-------------------

app.get("/",(req,res)=>{
    res.send("Route Is Working!!")
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`.yellow.bold);
})
//------------------->>>>DataBase Connection<<<<-------------------
dbConnection()
app.all("*", (req, res) => {
    res.send("404 not found")
    })
//------------------->>>>Global Error Handler<<<<------------------- 
app.use(ErrorHandeler)
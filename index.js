const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const dbConnection = require('./server');
const port = process.env.PORT || 5000;
const user = require('./Routes/user.route');
const job = require('./Routes/job.route');
// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/v1/user',user)
app.use('/api/v1/job',job)

app.get("/",(req,res)=>{
    res.send("Route Is Working!!")
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`.yellow.bold);
})
dbConnection()
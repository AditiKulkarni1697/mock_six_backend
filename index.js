// Import the Express module
const express = require('express');

var cors = require('cors')

const {connection}=require("./db")

const {userRouter}=require("./routes/user.routes")

const {blogRouter}= require("./routes/blog.routes")

const {auth}= require("./middlewares/authentication.middleware")

// Create an instance of the Express application
const app = express()

app.use(express.json())

app.options('*', cors())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.use("/user", userRouter)

app.use(auth)

app.use("/blog", blogRouter)

// Start the server
const port = 3000; // You can use any port you prefer
app.listen(port, async() => {
    try{
       await connection
       console.log("db is connected")
    }
    catch(err){
     console.log(err.message)
    }
    console.log(`Server is running on port ${port}`);
});

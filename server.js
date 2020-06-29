const express = require("express");
const dotenv = require("dotenv"); 
const connectDB = require("./config/db");
const colors = require("colors");
const data = require("./routes/data");
//config vars
dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();
app.use(express.json());

//Mounting Routers
app.use("/api/v1/data", data);


//Starting Server
const PATH = process.env.PORT || 3000
const server = app.listen(PATH, () => {
    console.log(`App listening on port ${PATH}!`.yellow.bold);
});
  
process.on("unhandledRejection", (err, promise) => {
console.log(`Error : ${err.message}`.red);
server.close(() => process.exit(1));
});

const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase =require('./config/database')

// handling uncaught exception
process.on("uncaughtException", (err)=>{
  console.log("Error: "+err.message);
  console.log("shutting down the server due to uncaught exception");
  process.exit(1);
})

// console.log(youtube);
// config
dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log("server is woking on port " + process.env.PORT);
});

//unhandled promise rejection
process.on('unhandledRejection', (err) =>{
  console.log("Error: "+err.message);
  console.log("shutting down the server due to unhandled promise rejection");

  server.close(()=>{
    process.exit(1);
  });
})
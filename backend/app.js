import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";
import mongoose from "mongoose";

const app = express();
dotenv.config({ path: "./config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})

dbConnection();

app.use(errorMiddleware);

mongoose.connect(
  `mongodb://mongo:27017/docker-db` ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>{
    if(err){
      console.error("FAILED TO CONNECT TO MONGODB").
      console.error(err);
    }else{
      console.log("CONNECTED TO MONGODB!!");
      app.listen(80);
    }
  }
);


export default app;

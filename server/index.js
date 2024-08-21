import express from 'express';
import db from '../server/utlis/db.js';
import cors from "cors";
import cookieParser from 'cookie-parser';
import  { EmployeeRoute } from './Routes/EmployeeRoute.js';




const app = express();


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());
app.use("/employee",EmployeeRoute);





db.connect(function(err){
    if(err){
        console.log("connection error")
    }else{
        console.log("connected")
    }
});


app.listen(8081,()=>{
    console.log("listening port");
})
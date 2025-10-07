import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const connectDB = async ()=>{
try{
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    if(conn) {
        console.log("mongodb connected")
    }
}

catch(error){
    console.error("mongodb connection error:",error)
}
};

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message :"server is up....",
    })
})


const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log( `server is running on port ${PORT}`);
    connectDB();
})
const express=require("express");
const mongoose = require("mongoose")
const dotenv= require("dotenv")
const app=express();

const authRoute=require("./routes/auth")
const userRoute=require("./routes/user")

dotenv.config();
app.use(express.json());

const connectToMongoDb = async()=>{
     try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully Connected To Mongo")
        
     } catch (error) {
        console.log(error)
     }
}


const port = process.env.PORT || 5000

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);

connectToMongoDb();

app.listen(port,()=>{
    console.log("App listening at 5000");
})
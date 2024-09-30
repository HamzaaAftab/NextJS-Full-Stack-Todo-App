import mongoose from "mongoose";

export const connectDB = async (req,res)=>{
    try {
        await mongoose.connect("mongodb+srv://hamzaaftab992:hamzakhan@cluster0.hjsca.mongodb.net/todo-app")
        console.log("Database Connected");
        
    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
}
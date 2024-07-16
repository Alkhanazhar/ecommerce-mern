import mongoose from "mongoose";

const conndectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connect to Mongoose")
    } catch (error) {
        
        console.error(error.message);

    }
}
export default conndectDb ;
import mongoose from "mongoose";


const ConnectDB = async() =>{
    
    try{
        const connect = await mongoose.connect(process.env.MONGODB_CONNECT_URI);
        console.log("connected")
        console.log(`\n MongoDB connected !! DB HOST ${connect.connection.host}`)
    } catch(error){
        console.log(`Error: ${error}`)
        process.exit(1)
    }
}

export default ConnectDB
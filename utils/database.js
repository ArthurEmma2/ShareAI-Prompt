import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () =>{
    mongoose.set("strictQuery", true)
    if(isConnected){
        console.log("connected to mongodb")
        return;
    }

    try{
        await mongoose.connect(process.env.DATABASE_URL,{
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true
    }catch (errors){
        console.log(errors)

    }
}
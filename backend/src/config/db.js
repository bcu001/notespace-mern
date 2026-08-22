import mongoose, { mongo } from 'mongoose'
import { ENV } from './env.js'
import dns from 'dns';

dns.setServers([
    "0.0.0.0",
    "8.8.8.8"
])

const connectDB = async()=>{
    try{
       await mongoose.connect(`${ENV.DB_URI}/${ENV.DB_NAME}`);
        console.log(`Database name: ${mongoose.connection.name}`);
    }catch(error){
        console.error("Mongodb connection Error",error);
        process.exit(0);
    }
}

export default connectDB;
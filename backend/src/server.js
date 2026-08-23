import express from "express";
import notesRoutes from "./routes/note.route.js";
import connectDB from "./config/db.js";
import { ENV } from "./config/env.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors'

const app = express();
const PORT = ENV.PORT || 5001;

app.use(cors({
    origin: ENV.CLIENT_URL,
}))
app.use(express.json());
app.use(rateLimiter);

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "notespace backend default endpoint /"
    })
})

app.use("/api/notes", notesRoutes);

const startServer  = async()=>{
    try{
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`server is running on http://localhost:${PORT}`)
        })
    } catch(error){
        console.error("Error at startServer: ", error);
        process.exit(1);
    }
}

startServer();
import express from "express";
import notesRoutes from "./routes/note.route.js";
import connectDB from "./config/db.js";
import { ENV } from "./config/env.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = ENV.PORT || 5001;

app.use(express.json());
app.use(rateLimiter);

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "notespace backend default endpoint /"
    })
})

app.use("/api/notes", notesRoutes);

app.listen(PORT,()=>{
     connectDB(); 
    console.log(`server is running on http://localhost:${PORT}`)
})
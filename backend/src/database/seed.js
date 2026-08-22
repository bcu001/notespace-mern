import mongoose from "mongoose";
import Note from "../model/note.model.js";
import connectDB from "../config/db.js";

const notes = Array.from({ length: 20 }, (_, i) => ({
    title: `Note ${i + 1}`,
    content: `This is the content of note ${i + 1}.`
}));

const seedDatabase = async () => {
    try {
        await connectDB();

        await Note.deleteMany();
        await Note.insertMany(notes);

        console.log("20 notes seeded successfully");

        await mongoose.connection.close();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedDatabase();
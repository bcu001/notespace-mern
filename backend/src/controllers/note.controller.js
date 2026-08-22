import mongoose from "mongoose";
import Note from "../model/note.model.js"
import {sendResponse} from "../utils/apiResponse.js"

export const getAllNotes = async(_,res)=>{
    try {
     const notes = await Note.find().sort({createdAt:-1});
      return sendResponse(res,200, "notes are fetched", notes);
    } catch (error) {
     console.error("Error at getAllNotes: ",error);
     return  sendResponse(res,500, error.message || "internal server error");
    }
}
export const createNote = async(req,res)=>{
     try{
          const {title , content} = req.body;
          const newNote = new Note({title, content});
          await newNote.save(); 
          return sendResponse(res,201, "note is created", newNote);
     } catch(error){
          console.error("error at createNote: ",error);
          return sendResponse(res,500, error.message || "internal server error");
     }
}
export const updateNote = async(req,res)=>{
     try{
          const id = req.params.id;
          const {title, content} = req.body;
          const note = await Note.findByIdAndUpdate(id,{title,content}, {new:true});
          if(!note) return sendResponse(res,404, "not not found");
          return sendResponse(res,200, "note is updated",note);
     } catch(error){
          console.error("error at updateNote: ",error);
          return sendResponse(res,500, error.message || "internal server error");
     }
}
export const deleteNote = async(req,res)=>{
     try{
          const id = req.params.id;
          const note = await Note.findByIdAndDelete(id);
          if(!note) return sendResponse(res,404, "note not found");
          return sendResponse(res,200, "note is deleted",note);
     } catch(error){
          console.error("error at deleteNote: ",error);
          return sendResponse(res,500, error.message || "internal server error");
     }
}

export const getNoteById = async(req,res)=>{
     try{
          const id = req.params.id;
          const note = await Note.findById(id);
          if(!note) return sendResponse(res,404, "note not found");
          return sendResponse(res,200, "note found", note);
     } catch(error){
          console.error("error at getNoteById: ",error);
          return sendResponse(res,500, error.message || "internal server error");
     }
}
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String },
    dob: { type: String },
    rollNumber: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
    
  });

export const User= mongoose.model('User', userSchema);
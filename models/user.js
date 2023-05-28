import { Schema, model, models } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
      type: String,  
      required: [true, "Username already exist"],
      unique:   [true, "Username already exist"],
    },
    email: {
      type: String,
      required: [true, "Email already exist"],
      unique: [true, "Email already exist"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  
  });
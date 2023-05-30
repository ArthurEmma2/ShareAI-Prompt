import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username already exist"],
    unique: [true, "Username already exist"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;

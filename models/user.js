import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
    required: true,
  },
});

const User = models.User || model("User", UserSchema);

export default User;

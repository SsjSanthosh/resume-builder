import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    avatar: {
      type: String,
      unique: true,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true, collection: "users" }
);

const User = models.User || model("User", UserSchema);

export default User;

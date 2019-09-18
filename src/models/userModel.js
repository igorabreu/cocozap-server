import { Schema, model } from "mongoose"

const userSchema = Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

const User = model("users", userSchema)

export default User
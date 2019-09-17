import { Schema, model } from "mongoose"

const userSchema = Schema({
  date: {
    type: Date,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  triedToSolve: {
    type: String,
    required: true,
  },
  externalHelp: {
    type: String,
    required: true,
  }
})

const Notifications = model("notifications", userSchema)

export default Notifications
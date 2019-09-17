import express from "express"
import cors from "cors"
import { urlencoded, json } from "body-parser"
import { connect, connection } from "mongoose"
import apiRoutes from "./routes/api-routes"

require("dotenv").config()
const app = express()
const port = process.env.PORT

app.use(cors())

app.use(
  urlencoded({
    extended: true
  })
)
app.use(json())

connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

connection.on("connected", res => {
  console.log("Database is connected")
})

app.get("/", (req, res) => {
  res.send("Working")
})

app.use(express.static('uploads'))

app.use("/api", apiRoutes)

app.listen(port, () => {
  console.log("Running API on port " + port)
})

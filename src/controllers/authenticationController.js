import User from "../models/userModel"
import { compare } from "bcrypt"

export function auth(req, res) {
  const { username, password } = req.body
  User.find({ username: username }, (err, user) => {
    if (err) res.send(err)
    compare(password, user[0].password, (err, doesMatch) => {
      res.json({
        auth: doesMatch
      })
    })
  })
}

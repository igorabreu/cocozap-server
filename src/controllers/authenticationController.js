import User from "../models/userModel"
import { compare } from "bcrypt"

export function auth(req, res) {
  const { username, password } = req.body
  User.find({ username: username }, (err, user) => {
    if (user && user.length > 0) {
      compare(password, user[0].password, (err, doesMatch) => {
        if (doesMatch) {
          res.json({
            auth: doesMatch
          })
        } else {
          res.send('Wrong password')
        }
      })
    } else {
      res.send('User not found')
    }
  })
}

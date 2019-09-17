import { find } from "../models/userModel"
import { compare } from "bcrypt"

export function auth(req, res) {
  const { email, password } = req.body
  find({ email: email }, (err, user) => {
    if (err) res.send(err)
    compare(password, user[0].password, (err, doesMatch) => {
      res.json({
        auth: doesMatch
      })
    })
  })
}

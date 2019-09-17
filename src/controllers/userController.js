import bcrypt from "bcrypt"
import User from "../models/userModel"

export const getUsers = (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      response = { error: true, message: "Error fetching data" }
    } else {
      response = { data }
    }
    res.json(response)
  })
}

export const getUsersWithPagination = (req, res) => {
  const pageNumber = parseInt(req.body.pageNumber)
  const size = parseInt(req.body.size)
  const query = {}
  let response

  if (pageNumber < 0 || pageNumber === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1"
    }
    return res.json(response)
  }

  query.skip = size * (pageNumber - 1)
  query.limit = size

  // Find some documents
  User.countDocuments({}, (err, totalCount) => {
    if (err) {
      response = { error: true, message: "Error fetching data" }
    }
    User.find({}, {}, query, (err, data) => {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { error: true, message: "Error fetching data" }
      } else {
        const totalPages = Math.ceil(totalCount / size)
        response = { error: false, message: data, pages: totalPages }
      }
      res.json(response)
    })
  })
}

export const newUser = (req, res) => {
  var user = new User()
  bcrypt.hash(req.body.password, 5, (err, bcryptedPassword) => {
    user.name = req.body.name
    user.email = req.body.email
    user.password = bcryptedPassword
    user.save(err => {
      res.json({
        user
      })
    })
  })
}

export const getSingleUser = (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) res.send(err)
    res.json({
      data: user
    })
  })
}

export const updateUser = (req, res) => {
  User.findById(req.params.user_id, function(err, user) {
    if (err) res.send(err)

    user.name = req.body.name
    user.email = req.body.email

    user.save(function(err) {
      if (err) res.json(err)
      res.json({
        data: user
      })
    })
  })
}

export const deleteUser = (req, res) => {
  User.remove(
    {
      _id: req.params.user_id
    },
    function(err, user) {
      if (err) res.send(err)

      res.json({
        status: "success"
      })
    }
  )
}

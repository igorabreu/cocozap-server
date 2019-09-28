import bcrypt from "bcrypt"
import User from "../models/userModel"
import checkAPIKey from "../utils/checkAPIKey"

export const getUsers = (req, res) => {
  if (!checkAPIKey(req.headers.api_key, process.env.API_KEY)) {
    return res.send(401)
  }
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
  if (!checkAPIKey(req.headers.api_key, process.env.API_KEY)) {
    return res.send(401)
  }
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
  User.estimatedDocumentCount({}, (err, totalCount) => {
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
  if (!checkAPIKey(req.headers.api_key, process.env.API_KEY)) {
    return res.send(401)
  }
  var user = new User()
  bcrypt.hash(req.body.password, 5, (err, bcryptedPassword) => {
    user.username = req.body.username
    user.password = bcryptedPassword
    user.save(err => {
      res.json({
        user
      })
    })
  })
}

export const getSingleUser = (req, res) => {
  if (!checkAPIKey(req.headers.api_key, process.env.API_KEY)) {
    return res.send(401)
  }
  User.findById(req.params.user_id, (err, user) => {
    if (err) res.send(err)
    res.json({
      data: user
    })
  })
}

export const updateUser = (req, res) => {
  if (!checkAPIKey(req.headers.api_key, process.env.API_KEY)) {
    return res.send(401)
  }
  User.findById(req.params.user_id, function(err, user) {
    if (err) res.send(err)

    user.username = req.body.username
    
    user.save(function(err) {
      if (err) res.json(err)
      res.json({
        data: user
      })
    })
  })
}

export const deleteUser = (req, res) => {
  if (!checkAPIKey(req.headers.api_key, process.env.API_KEY)) {
    return res.send(401)
  }
  User.deleteOne(
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

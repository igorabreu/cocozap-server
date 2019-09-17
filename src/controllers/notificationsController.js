import Notification from "../models/notificationModel"

export const getNotifications = (req, res) => {
  Notification.find({}, (err, data) => {
    if (err) {
      response = { error: true, message: "Error fetching data" }
    } else {
      response = { data }
    }
    res.json(response)
  })
}

export const getNotificationsWithPagination = (req, res) => {
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
  Notification.countDocuments({}, (err, totalCount) => {
    if (err) {
      response = { error: true, message: "Error fetching data" }
    }
    Notification.find({}, {}, query, function(err, data) {
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

export const newNotifiation = (req, res, next) => {
  const { body } = req
  let notification = new Notification(Object.assign({}, body))
  notification.picture = `${process.env.URL}${req.file.path.replace('uploads', '')}`
  notification.save(err => {
    res.json({
      notification
    })
  })
}

export const getSingleNotification = (req, res) => {
  Notification.findById(req.params.notification_id, (err, notification) => {
    if (err) res.send(err)
    res.json({
      data: notification
    })
  })
}

export const updateNotification = (req, res) => {
  Notification.findById(req.params.notification_id, function(err, notification) {
    if (err) res.send(err)
    const { body } = req

    //TODO improve for something like Object.assing({}, notification, body)
    notification.date = body.date
    notification.picture = body.picture
    notification.description = body.description
    notification.category = body.category
    notification.frequency = body.frequency
    notification.address = body.address
    notification.location = body.location
    notification.lat = body.lat
    notification.long = body.long
    notification.triedToSolve = body.triedToSolve
    notification.externalHelp = body.externalHelp

    notification.save(function(err) {
      if (err) res.json(err)
      res.json({
        data: notification
      })
    })
  })
}

export const updateNotificationWithImage = (req, res) => {
  Notification.findById(req.params.notification_id, function(err, notification) {
    if (err) res.send(err)
    const { body } = req

    //TODO improve for something like Object.assing({}, notification, body)
    notification.date = body.date
    notification.picture = body.picture
    notification.description = body.description
    notification.category = body.category
    notification.frequency = body.frequency
    notification.address = body.address
    notification.location = body.location
    notification.lat = body.lat
    notification.long = body.long
    notification.triedToSolve = body.triedToSolve
    notification.externalHelp = body.externalHelp
    notification.picture = `${process.env.URL}${req.file.path.replace('uploads', '')}`

    notification.save(function(err) {
      if (err) res.json(err)
      res.json({
        data: notification
      })
    })
  })
}

export const deleteNotification = (req, res) => {
  Notification.remove(
    {
      _id: req.params.notification_id
    },
    function(err, notification) {
      if (err) res.send(err)

      res.json({
        status: "success"
      })
    }
  )
}

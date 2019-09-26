const router = require("express").Router()
import {
  getUsers,
  getUsersWithPagination,
  newUser,
  getSingleUser,
  updateUser,
  deleteUser
} from "../controllers/userController"
import {
  getNotifications,
  getNotificationsWithPagination,
  newNotification,
  getSingleNotification,
  updateNotification,
  deleteNotification,
  updateNotificationWithImage,
  newNotificationsBatch
} from "../controllers/notificationsController"
import { auth } from "../controllers/authenticationController"
import multer from "multer"

//multer config
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/images")
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname)
  }
})
const upload = multer({ storage: storage })


//Users
router
  .route("/users")
  .get(getUsers)
  .post(newUser)

router.route("/users/pagination").get(getUsersWithPagination)

router
  .route("/users/:user_id")
  .get(getSingleUser)
  .patch(updateUser)
  .put(updateUser)
  .delete(deleteUser)

//Notifications
router
  .route("/notifications")
  .get(getNotifications)
  .post(upload.single("picture"), newNotification)

router
  .route("/notifications/batch")
  .post(newNotificationsBatch)

router.route("/notifications/pagination").post(getNotificationsWithPagination)

router
  .route("/notifications/:notification_id")
  .get(getSingleNotification)
  .put(upload.single("picture"), updateNotificationWithImage)
  .patch(updateNotification)
  .delete(deleteNotification)

//Authentication
router.route("/auth").post(auth)

export default router

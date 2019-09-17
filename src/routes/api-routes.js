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
  newNotifiation,
  getSingleNotification,
  updateNotification,
  deleteNotification
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
  .post(upload.single("image"), newNotifiation)

router.route("/notifications/pagination").get(getNotificationsWithPagination)

router
  .route("/notifications/:notification_id")
  .get(getSingleNotification)
  .patch(updateNotification)
  .put(updateNotification)
  .delete(deleteNotification)

//Authentication
router.route("/login").post(auth)

export default router

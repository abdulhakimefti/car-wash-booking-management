import express from "express"
import { myBookingController } from "./myBooking.controller"
import { USER_ROLE } from "../user/user.const"
import auth from "../../middlewares/auth"

const router = express.Router()

router.get('/',auth(USER_ROLE.user),myBookingController.getMyBooking)



export const myBookingRoutes = router
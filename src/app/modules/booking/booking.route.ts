import express from "express"
import validateRequest from "../../middlewares/validateRequest"
import { bookingValidation } from "./booking.validation"
import { bookingControllers } from "./booking.controller"
import { USER_ROLE } from "../user/user.const"
import auth from "../../middlewares/auth"
const router = express.Router()

router.post('/',auth(USER_ROLE.user),validateRequest(bookingValidation.createBookingValidationSchema),bookingControllers.createBooking)
router.get('/',auth(USER_ROLE.admin),bookingControllers.getAllBooking)



export const bookingRoutes = router
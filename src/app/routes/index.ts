import express  from "express"
import { userRoutes } from "../modules/user/user.route"
import { bookingRoutes } from "../modules/booking/booking.route"
import { serviceRoutes } from "../modules/service/service.route"
import { slotRoutes } from "../modules/slot/slot.route"
import { myBookingRoutes } from "../modules/myBooking/myBooking.route"
const router = express.Router()

const moduleRoutes = [
    {
        path: '/auth',
        route : userRoutes
    },
    {
        path: '/bookings',
        route: bookingRoutes
    },
    {
        path: '/services',
        route:serviceRoutes
    },
    {
        path:'/slots',
        route:slotRoutes
    },
    {
        path:'/my-bookings',
        route:myBookingRoutes
    }
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route))


export default router
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const user_const_1 = require("../user/user.const");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_const_1.USER_ROLE.user), (0, validateRequest_1.default)(booking_validation_1.bookingValidation.createBookingValidationSchema), booking_controller_1.bookingControllers.createBooking);
router.get('/', (0, auth_1.default)(user_const_1.USER_ROLE.admin), booking_controller_1.bookingControllers.getAllBooking);
exports.bookingRoutes = router;

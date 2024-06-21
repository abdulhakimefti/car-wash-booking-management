import express from "express"
import validateRequest from "../../middlewares/validateRequest"
import { serviceValidation } from "./service.validation"
import { slotValidation } from "../slot/slot.validation"
import auth from "../../middlewares/auth"
import { USER_ROLE } from "../user/user.const"
import { serviceController } from "./service.controller"

const router = express.Router()
// auth(USER_ROLE.admin)
router.post('/',auth(USER_ROLE.admin),validateRequest(serviceValidation.createServiceValidationSchema),serviceController.createService)
router.get('/',serviceController.getServices)
router.get('/:id',serviceController.getServices)
router.put('/:id',auth(USER_ROLE.admin),serviceController.serviceUpdate),
router.delete('/:id',auth(USER_ROLE.admin),serviceController.serviceDelete)
router.post('/slots',auth(USER_ROLE.admin),validateRequest(slotValidation.createSlotValidationSchema),serviceController.createSlots)



export const serviceRoutes = router
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validation_1 = require("./service.validation");
const slot_validation_1 = require("../slot/slot.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../user/user.const");
const service_controller_1 = require("./service.controller");
const router = express_1.default.Router();
// auth(USER_ROLE.admin)
router.post('/', (0, auth_1.default)(user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(service_validation_1.serviceValidation.createServiceValidationSchema), service_controller_1.serviceController.createService);
router.get('/', service_controller_1.serviceController.getServices);
router.get('/:id', service_controller_1.serviceController.getServices);
router.put('/:id', (0, auth_1.default)(user_const_1.USER_ROLE.admin), service_controller_1.serviceController.serviceUpdate),
    router.delete('/:id', (0, auth_1.default)(user_const_1.USER_ROLE.admin), service_controller_1.serviceController.serviceDelete);
router.post('/slots', (0, auth_1.default)(user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(slot_validation_1.slotValidation.createSlotValidationSchema), service_controller_1.serviceController.createSlots);
exports.serviceRoutes = router;

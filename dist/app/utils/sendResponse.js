"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, responseData) => {
    res.status(responseData.statusCode).json({
        success: responseData.success,
        statusCode: responseData.statusCode,
        message: responseData.message,
        token: responseData.token,
        data: responseData.data
    });
};
exports.default = sendResponse;

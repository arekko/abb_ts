"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMessages_1 = require("./modules/register/errorMessages");
const yup = require("yup");
exports.registerPasswordValidation = yup
    .string()
    .min(3, errorMessages_1.passwordNotLongEnough)
    .max(255);
//# sourceMappingURL=yupSchemas.js.map
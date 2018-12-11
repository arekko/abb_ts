import * as yup from "yup";
export var duplicateEmail = "already taken";
export var emailNotLongEnough = "email must be at least 3 characters";
export var passwordNotLongEnough = "password must be at least 3 characters";
export var invalidEmail = "email must be a valid email";
export var registerPasswordValidation = yup
    .string()
    .min(3, passwordNotLongEnough)
    .max(255)
    .required();
export var validUserSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, emailNotLongEnough)
        .max(255)
        .email(invalidEmail)
        .required(),
    password: registerPasswordValidation
});
//# sourceMappingURL=user.js.map
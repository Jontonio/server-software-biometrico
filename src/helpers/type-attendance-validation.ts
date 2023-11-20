import { body } from "express-validator";

export const TypeAttendanceValidator = () => {

    return [
        body('type_attendance').not()
                       .isEmpty()
                       .withMessage('El type_attendance es requerido')
    ]
}



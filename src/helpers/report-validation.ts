import { body } from "express-validator";

export const checkYear = () => {
    return[
        body('year').not()
                     .isEmpty()
                     .withMessage('El año para generar el reporte de tipo de justificación es requerido')
    ]
}


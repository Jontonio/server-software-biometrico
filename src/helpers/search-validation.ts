import { check } from "express-validator";

export const searchValidator = () => {
    return[
        check('table').not()
                     .isEmpty()
                     .withMessage('El parámetro nombre de la tabla es requerido')
                     .bail(),
        check('term').not()
                     .isEmpty()
                     .withMessage('El parámetro término de búsqueda es requerido')
    ]
}


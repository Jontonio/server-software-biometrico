import { body } from "express-validator"
import { typeJustification } from "../resources/types"
import { existInstitutionStaff } from "./institution-staff-validation"

export const justificationValidator = () => {
    
    return [
        body('type_justification').not()
                .isEmpty()
                .withMessage('El tipo de justificación es requerido')
                .bail()
                .isLength({max:100})
                .withMessage('El tipo de justificación debe ser menos de 10 carácteres')
                .bail()
                .custom( checkTypeJustification ),
        body('date_justification').not()
                                .isEmpty()
                                .withMessage(`La fecha de justificación para (${typeJustification}) es requerido`)
                                .bail()
                                .isISO8601()
                                .withMessage('La fechaHora debe estar en formato ISO8601 (YYYY-MM-DDTHH:mm:ss)')
                                .bail(),
        body('url_document').not()
                                .isEmpty()
                                .withMessage(`El archivo de justificación es requerido`)
                                .bail()
                                .custom( checkURLFile ),
        body('InstitutionStaffIdInstitutionStaff').not()
                                                .isEmpty()
                                                .withMessage(`El id del personal en la institución es requerido`)
                                                .bail()
                                                .custom ((InstitutionStaffIdInstitutionStaff) => existInstitutionStaff(InstitutionStaffIdInstitutionStaff))
    ]
}

export const checkTypeJustification = (type_justification:string) => {
    if(!typeJustification.includes(type_justification)){
        throw new Error(`El tipo de justificación debe contener almenos (${typeJustification})`)
    }
    return true;
}

const patternURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/

export const checkURLFile = (url_document:string) => {

    if(!url_document.match(patternURL)){
        throw new Error(`El archivo de justificación debe ser la url del archivo`)
    }
    return true;
}
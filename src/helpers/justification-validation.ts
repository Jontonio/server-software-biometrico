import { body, check } from "express-validator"
import { typeJustification } from "../resources/types"
import { existInstitutionStaff } from "./institution-staff-validation"
import { TypeJustification } from "../models/TypeJustification"
import { StatusJustification } from "../models/StatusJustification"
import { Justification } from "../models"

export const justificationValidator = () => {
    
    return [
        body('TypeJustificationIdTypeJustification').not()
                .isEmpty()
                .withMessage('El tipo de justificación es requerido')
                .bail()
                .custom((TypeJustificationIdTypeJustification) => existIdTypeJustification(TypeJustificationIdTypeJustification))
                .bail(),
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

export const typeJustificationValidator = () => {
    
    return [
        body('type_justification').not()
                .isEmpty()
                .withMessage('El tipo de justificación es requerido')
                .bail()
                .isLength({max:100})
                .withMessage('El tipo de justificación debe ser menos de 10 carácteres')
                .bail()
                .custom( existTypeJustification )
                .bail()
    ]
}

export const statusJustificationValidator = () => {
    
    return [
        body('status_justification').not()
                .isEmpty()
                .withMessage('El estado de justificación es requerido')
                .bail()
                .isLength({max:100})
                .withMessage('El estado de justificación debe ser menos de 10 carácteres')
                .bail()
                .custom( existStatusJustification )
                .bail()
    ]
}

export const checkIdJustification = () => {
    
    return [
        check('id_justification').not()
                .isEmpty()
                .withMessage('El id de la justificación es requerido')
                .bail()
                .custom( existIdJustification )
                .bail()
    ]
}

export const existTypeJustification = async (type_justification:string) => {
    
    if(!type_justification){
        throw new Error('Es necesario el tipo de justificación a registrar')
    }

    const existType = await TypeJustification.findOne({
        where:{ type_justification }
    })

    if(existType){
        throw new Error(`El tipo de justificación ${type_justification} ya se encuentra registrado`)
    }

    return true;
}

export const existIdTypeJustification = async (id_type_justification:string) => {
    
    if(!id_type_justification){
        throw new Error('Es necesario id el tipo de justificación a registrar')
    }

    const existType = await TypeJustification.findOne({
        where:{ id_type_justification }
    })

    if(!existType){
        throw new Error(`El id ${id_type_justification} del tipo de justificación no se encuentra registrado`)
    }

    return true;
}

export const existIdJustification = async (id_justification:string) => {
    
    if(!id_justification){
        throw new Error('Es necesario id de la justificación')
    }

    const existType = await Justification.findOne({
        where:{ id_justification }
    })

    if(!existType){
        throw new Error(`El id ${id_justification} de la justificación no se encuentra registrado`)
    }

    return true;
}

export const existStatusJustification = async (status_justification:string) => {
    
    if(!status_justification){
        throw new Error('Es necesario el estado de justificación a registrar')
    }

    const existType = await StatusJustification.findOne({
        where:{ status_justification }
    })

    if(existType){
        throw new Error(`El estado de justificación ${status_justification} ya se encuentra registrado`)
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
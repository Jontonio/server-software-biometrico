import { body, check } from "express-validator";
import { Shift } from "../models/Shift";

export const shiftValidator = () => {
    return[
        body('shift').not()
                     .isEmpty()
                     .withMessage('El turno a crear es requerido')
                     .bail()
                     .custom( existShift )
    ]
}

export const checkIdShift = () => {
    return[
        check('id_shift').not()
                     .isEmpty()
                     .withMessage('El id del turno es requerido')
                     .bail()
                     .custom( existIdShift )
    ]
}

const existShift = async (shift:string) => {

    if(!shift){
        throw new Error('El turno es requerido');
    }

    const existShift = await Shift.findOne({
        where:{ shift }
    })

    if(existShift){
        throw new Error(`El turno ${shift} ya se encuentra registrado en el sistema`);
    }
    return true;
}

export const existIdShift = async (id_shift:string) => {

    if(!id_shift){
        throw new Error('El id del turno es requerido');
    }

    const existShift = await Shift.findOne({
        where:{ id_shift, status: true }
    })

    if(!existShift){
        throw new Error(`El turno con id ${id_shift} no se encuentra registrado en el sistema`);
    }

    return true;
}
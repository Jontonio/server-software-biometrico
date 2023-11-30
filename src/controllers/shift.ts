import { Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { Shift } from "../models/Shift";
import { InstitutionShift } from "../models/InstitutionShift";

export const registerShift = async (req:Request, res: Response)=> {
    try {
        
        const { body } = req;
        const shift = await Shift.create( body );
        // return response message
        return res.status(201).json( new ResponseServer('Registro de turno correctamente', true, shift ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar un nuevo turno', false, null))
    }
}

export const getShifts = async (req:Request, res: Response)=> {
    try {
        const { offset = 0, limit = 5 } = req.params;
        const shifts = await Shift.findAndCountAll({
            where:{ status: true },
            offset:Number(offset),
            limit:Number(limit),
            attributes:{ exclude:['createdAt','updatedAt'] }
        });
        // return response message
        return res.status(200).json( new ResponseServer('Lista de turnos registrados', true, shifts ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener turnos', false))
    }
}

export const deleteInstitutionShift = async (req:Request, res:Response)=> {
    try {
        // get id_institution_shift from params
        const { id_institution_shift } = req.params;
        // find one institution shift with modular id_institution_shift
        const institution = await InstitutionShift.findOne({ 
            where:{ id_institution_shift }
        })
        // update institution
        const respInstitution = await institution!.set({ status:false }).save();
        // return message response
        return res.status(200).json( new ResponseServer('Institución con turno eliminada correctamente', true, respInstitution ))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al eliminar institución con turno', false))
    }
}


import { Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { WorkScheduleInstitution } from "../models";

export const registerWorkScheduleIE = async (req:Request, res: Response)=> {
    try {
        // get data grom body
        const { body } = req;
        // register new work schedule institution
        const workScheduleIE = await WorkScheduleInstitution.create( body );
        // return response message
        return res.status(201).json( new ResponseServer('Horario laboral del personal en la institución registado correctamente', true, workScheduleIE))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar horario laboral del personal en la institución ', false, null))
    }
}

export const updateWorkScheduleIE = async (req:Request, res: Response)=> {
    try {
        // get data grom body
        const { id_work_schedule_institution } = req.params;
        const { body } = req;
        // register new work schedule institution
        const workScheduleIE = await WorkScheduleInstitution.findOne({
            where:{ id_work_schedule_institution, status:true }
        });

        const respUpdate = await workScheduleIE?.set( body ).save();
        // return response message
        return res.status(200).json( new ResponseServer('Horario laboral del personal en la institución actualizado correctamente', true, respUpdate))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al actualizar el horario laboral del personal en la institución ', false, null))
    }
}

export const deleteWorkScheduleIE = async (req:Request, res: Response)=> {
    try {
        // get data grom body
        const { id_work_schedule_institution } = req.params;
        // register new work schedule institution
        const workScheduleIE = await WorkScheduleInstitution.findOne({
            where:{ id_work_schedule_institution, status:true }
        });

        const respDelete = await workScheduleIE?.set({ status:false }).save();
        // return response message
        return res.status(200).json( new ResponseServer('Horario laboral del personal en la institución eliminado correctamente', true, respDelete))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al eliminar el horario laboral del personal en la institución ', false, null))
    }
}

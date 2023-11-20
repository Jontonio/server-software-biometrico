import { Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { WorkSchedule } from "../models";

export const registerWorkSchedule = async (req:Request, res: Response)=> {
    try {
        // get data grom body
        const { body } = req;
        // register new work schedule
        const workSchedule = await WorkSchedule.create( body );
        // return response message
        return res.status(201).json( new ResponseServer('Horario laboral registrado correctamente', true, workSchedule))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar horario laboral', false, null))
    }
}

export const getWorkSchedule = async (req:Request, res: Response)=> {
    try {
        // register new work schedule
        const listWorkSchedule = await WorkSchedule.findAll({
            where:{ status:true }
        });
        const countWorkSchedule = await WorkSchedule.count({
            where:{ status:true }
        });
        // return response message
        return res.status(200).json( new ResponseServer('Listas de horario laboral registrados', true, listWorkSchedule, countWorkSchedule))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener lista de horario laboral', false, null))
    }
}

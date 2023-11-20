import { Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { Attendance } from "../models";

export const registerAttendance = async (req:Request, res: Response)=> {
    try {
        // get data grom body
        const { body } = req;
        // register new Attendance
        const attendance = await Attendance.create( body );
        // return response message
        return res.status(201).json( new ResponseServer('Asistencia registrada correctamente', true, attendance))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar asistencia', false, null))
    }
}

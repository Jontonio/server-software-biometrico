import { Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { TypeAttendance } from "../models";


export const registerTypeAttendance = async (req:Request, res: Response)=> {
    try {
        // get body from request
        const { body } = req;
        // register new type Attendance
        const typeAttendance = await TypeAttendance.create( body );
        // return response message
        return res.status(201).json( new ResponseServer('Type Attendance registrada correctamente', true, TypeAttendance ))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar Type Attendance', false, null))
    }
}
import { Request, Response } from "express";
import { TypeStaff } from "../models";
import { ResponseServer } from "../class/Response";

export const registerTypeStaff = async (req:Request, res: Response)=> {
    try {
        // get body from request
        const { body } = req;
        // register new type staff
        const institution = await TypeStaff.create( body );
        // return response message
        return res.status(201).json( new ResponseServer('Tipo de personal creado correctamente', true, institution ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar un tipo de personal', false, null))
    }
}

export const getListTypeStaff = async (req:Request, res: Response)=> {
    try {
        // find all type staff
        const listTipoPersonal = await TypeStaff.findAll({
            where:{ 'status': true }
        });
        // return response message
        return res.status(201).json( new ResponseServer('Lista de tipos de personal', true, listTipoPersonal, listTipoPersonal.length ))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener tipos de personal', false, null))
    }
}

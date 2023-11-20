import {Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { Institution, InstitutionStaff, Justification, Staff, TypeStaff } from "../models";
import { InstitutionShift } from "../models/InstitutionShift";

export const registerJustification = async ( req:Request, res:Response) => {
    try {
        const { body } = req;
        const justification = await Justification.create( body );
        return res.status(200).json( new ResponseServer('Justificación registrada correctamente', true, justification))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar justificación', false))
    }
}

export const getOneJustification = async ( req:Request, res:Response) => {
    try {
        const { id_justification } = req.params;
        const justification = await Justification.findOne({
            where:{ id_justification, status:true }
        });
        return res.status(200).json( new ResponseServer('Justificación', true, justification))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener justificación', false))
    }
}

export const getJustifications = async (req:Request, res:Response) => {
    try {

        const {  offset = 0, limit = 5 } = req.query;

        const justifications = await Justification.findAndCountAll({
            include:[
                {
                    model:InstitutionStaff,
                    include:[
                        {
                            model:Staff,
                            attributes:{ exclude:['createdAt','updatedAt'] }
                        },
                        {
                            model:TypeStaff,
                            attributes:{ exclude:['createdAt','updatedAt'] }
                        },
                        {
                            model:InstitutionShift,
                            include:[
                                {
                                    model:Institution
                                }
                            ],
                            attributes:{ exclude:['createdAt','updatedAt'] }
                        }
                    ],
                    attributes:{ exclude:['createdAt','updatedAt'] }
                }
            ],
            offset: Number( offset ),
            limit: Number( limit )
        });

        return res.status(200).json( new ResponseServer('Lista de justificaciones', true, justifications))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener justificaciones', false))
    }
}

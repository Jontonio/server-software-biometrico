import {Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { Institution, InstitutionStaff, Justification, Staff, TypeStaff } from "../models";
import { InstitutionShift } from "../models/InstitutionShift";
import { TypeJustification } from "../models/TypeJustification";
import { StatusJustification } from "../models/StatusJustification";
import { switchStatusJustificationEmail } from "../email/switchJustification";
import { ServerAPI } from "../server/ServerAPI";
import { Notification } from "../class/Notification";
import { getOneInsitutionStaff } from "./institutionStaff";
import moment from "moment";

const notification = Notification.getInstance;

export const registerJustification = async ( req:Request, res:Response) => {
    try {
        const { body } = req;
        const { InstitutionStaffIdInstitutionStaff, TypeJustificationIdTypeJustification } = body;
        //add progress justification
        const newData = {...body,'StatusJustificationIdStatusJustification':1};
        const justification = await Justification.create( newData );

        const ieStaff = await getOneInsitutionStaff(InstitutionStaffIdInstitutionStaff);
        const staff:any = ieStaff?.get('Staff');

        const typeJustification = await getOneTypeJustification(TypeJustificationIdTypeJustification)

        notification.addJustifyNotification({
            id:Number(justification.get('id_justification')),
            msg:`${staff.names} registro una justificación de tipo ${typeJustification?.get('type_justification')}`,
            tableName:'Justification',
            isRouting:true,
            time: moment().format('llll'),
            isRead:false
        })

        // Envía datos a los clientes conectados
        const server = ServerAPI.getInstance;
        server.io.emit('addNewNotification', notification.getInfoNotification() );
        return res.status(201).json( new ResponseServer('Justificación registrada correctamente', true, justification))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar justificación', false))
    }
}

export const registerTypeJustification = async ( req:Request, res:Response) => {
    try {
        const { body } = req;
        const typeJustification = await TypeJustification.create( body );
        return res.status(201).json( new ResponseServer('Nuevo tipo de justificación registrada correctamente', true, typeJustification))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar tipo de justificación', false))
    }
}

export const registerStatusJustification = async ( req:Request, res:Response) => {
    try {
        const { body } = req;
        const typeJustification = await StatusJustification.create( body );
        
        return res.status(201).json( new ResponseServer('Nuevo estado de justificación registrada correctamente', true, typeJustification))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar estado de justificación', false))
    }
}

export const getOneJustification = async ( req:Request, res:Response) => {
    try {
        const { id_justification } = req.params;
        const justification = await Justification.findOne({
            where:{ id_justification, status:true },
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
                },
                {
                    model:TypeJustification
                },
                {
                    model:StatusJustification
                }
            ]
        });
        return res.status(200).json( new ResponseServer('Justificación', true, justification))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener justificación', false))
    }
}

export const getJustifications = async (req:Request, res:Response) => {
    try {

        const {  offset = 0, limit = 5, id_status_justification = 1 } = req.query;

        const justifications = await Justification.findAndCountAll({
            where:{ StatusJustificationIdStatusJustification:id_status_justification },
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
                },
                {
                    model:TypeJustification
                },
                {
                    model:StatusJustification
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

export const getTypeJustifications = async (req:Request, res:Response) => {
    try {

        const {  offset = 0, limit = 5 } = req.query;

        const typeJustifications = await TypeJustification.findAndCountAll({
            offset: Number( offset ),
            limit: Number( limit )
        });

        return res.status(200).json( new ResponseServer('Lista de tipo de justificaciones', true, typeJustifications))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener tipo de justificaciones', false))
    }
}

export const getStatusJustifications = async (req:Request, res:Response) => {
    try {

        const {  offset = 0, limit = 5 } = req.query;

        const statusJustifications = await StatusJustification.findAndCountAll({
            offset: Number( offset ),
            limit: Number( limit )
        });

        return res.status(200).json( new ResponseServer('Lista de estado de justificaciones', true, statusJustifications))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener estado de justificaciones', false))
    }
}

export const updateStatusJustification = async ( req:Request, res:Response) => {
    try {
        const { StatusJustificationIdStatusJustification, status_justification  } = req.body;
        const { id_justification } = req.params;
        const justification = await Justification.findOne( {
            where:{ id_justification },
            include:[
                {
                    model:InstitutionStaff,
                    include:[
                        {
                            model:Staff
                        }
                    ]
                },
                {
                    model:TypeJustification
                }
            ]
        });
        await justification?.set({ StatusJustificationIdStatusJustification }).save();
        // get staff information 
        await switchStatusJustificationEmail(status_justification, justification)
        return res.status(201).json( new ResponseServer('Estado de justificación actualizado correctamente', true, justification))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al actualizar el estado de justificación', false))
    }
}

export const getOneTypeJustification = async (id_type_justification:number) => {
    try {
        const typeJustification = await TypeJustification.findOne({
            where:{ id_type_justification },
            attributes:['id_type_justification','type_justification']
        })
        return typeJustification;
    } catch (e) {
        throw new Error(`Error al obtener una tipo de justificación con id ${id_type_justification}`);
        
    }
}
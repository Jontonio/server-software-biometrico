import { Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { InstitutionStaff, Staff, TypeStaff, WorkSchedule, WorkScheduleInstitution} from "../models";

export const registerStaffAtTheInstitution = async (req:Request, res: Response)=> {
    try {
        // get data grom body
        const { body } = req;
        // // register new Staff at the Institution
        const staffAtTheInstitution = await InstitutionStaff.create( body );
        // // return response message
        return res.status(201).json( new ResponseServer(`Personal registrado correctamente en la institución`, true, staffAtTheInstitution))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar personal en la institución', false, null))
    }
}

export const updateStaffAtTheInstitution = async (req:Request, res: Response)=> {
    try {
        // get data grom body
        const { body } = req;

        const { id_institution_staff } = req.params;
        
        const IEStaff = await InstitutionStaff.findOne({
            where:{ id_institution_staff }
        })

        const resUpdateIEStaff = await IEStaff?.set( body ).save();
        // // return response message
        return res.status(200).json( new ResponseServer(`Información laboral del personal actualizada correctamente`, true, resUpdateIEStaff))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al actualizar personal en la institución', false))
    }
}

export const getScheduleStaffAtTheInstitution = async (req:Request, res: Response)=> {
    try {
        // get data grom body
        const { id_institution_staff } = req.params;
        // register new Staff at the Institution
        const staffAtTheInstitution = await InstitutionStaff.findOne({
            where:{ id_institution_staff },
            include:[
                {
                    model:WorkScheduleInstitution
                }
            ]
        });

        // return response message
        return res.status(201).json( new ResponseServer('Horario personal', true, staffAtTheInstitution))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener horario personal', false, null))
    }
}

export const getOneStaffAtTheInstitution = async (req:Request, res: Response)=> {
    try {
        // get id card from params
        const { id_institution_staff, id_institution_shift } = req.params;
        // find one staff with id card 
        const staff = await InstitutionStaff.findOne({
            where:{ id_institution_staff, InstitutionShiftIdInstitutionShift: id_institution_shift  },
            include:[
                {
                    model:Staff,
                },
                {
                    model:TypeStaff,
                },
                {
                    model: WorkScheduleInstitution,
                    include:[
                        {
                            model:WorkSchedule
                        }
                    ]
                }
            ],
            attributes:{ exclude:['createdAt','updatedAt']}
        })
        // return response menssage
        return res.status(200).json( new ResponseServer(`Personal con Id ${id_institution_staff} en la institución obtenido`, true, staff ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener un personal', false, null))
    }
}

export const deleteStaffAtTheInstitution = async (req:Request, res: Response)=> {
    try {
        // get id card from params
        const { id_institution_staff } = req.params;
        // find one staff with id card 
        const staff = await InstitutionStaff.findByPk( id_institution_staff )
        const respStaff = staff?.set({status:false}).save();
        // return response menssage
        return res.status(201).json( new ResponseServer(`Personal con Id ${id_institution_staff} eliminado correctamente`, true, respStaff ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al eliminar personal en la institución', false, null))
    }
}


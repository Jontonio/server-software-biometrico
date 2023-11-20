import { Op } from 'sequelize' 
import sequelize from 'sequelize' 
import { Request, Response } from "express";
import { ResponseSUNAT, ResponseServer } from "../class/Response";

import { globalConfig } from "../config/config";
import { Staff, Institution, Attendance, TypeStaff, InstitutionStaff } from "../models";
import { InstitutionShift } from '../models/InstitutionShift';
import { Shift } from '../models/Shift';

export const registerStaff = async (req:Request, res: Response)=> {
    try {
        // get body from request
        const { body } = req;
        const { id_card, working_hours, staff_condition, InstitutionShift, TypeStaff } = body;
        // register data
        const staff = await Staff.create( body );
        const institutionStaff =  await InstitutionStaff.create({
            InstitutionShiftIdInstitutionShift:InstitutionShift,
            StaffIdCard:id_card,
            TypeStaffIdTypeStaff: TypeStaff,
            working_hours,
            staff_condition
        })
        return res.status(201).json( new ResponseServer('Personal registrado correctamente', true, institutionStaff))
        
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al registrar un personal', false, null))
    }
}

export const updateStaff = async (req:Request, res: Response)=> {
    try {
        // get body from request
        const { body } = req;
        const { id_card } = req.params;
        // find one staff by id card
        const staff = await Staff.findByPk( id_card )
        // update staff
        const resUpdateStaff = await staff!.set( body ).save();
        // return response message 
        return res.status(201).json( new ResponseServer('Personal actualizado correctamente', true, resUpdateStaff ))

    } catch (e:any) {
        console.error(e);
        return res.status(500).json( new ResponseServer(`Ocurrio un error al actualizar personal`, false, null))
    }
}

export const getOneStaff = async (req:Request, res: Response)=> {
    try {
        // get id card from params
        const { id_card } = req.params;
        // find one staff with id card 
        const staff = await Staff.findOne({
            where:{ id_card }
        })
        // return response menssage
        return res.status(201).json( new ResponseServer(`Personal con documento ${ id_card } obtenido`, true, staff ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener un personal', false, null))
    }
}

export const getOneStaffWithAttendance = async (req:Request, res: Response)=> {
    try {
        // get id card from params
        const { id_institution_staff, year, month, id_institution_shift } = req.body;
        // find one staff with about information
        const institutionStaff = await InstitutionStaff.findOne({
            where:{ id_institution_staff, InstitutionShiftIdInstitutionShift:id_institution_shift },
            include: [
                {
                    model: Staff
                },
                {
                    model:TypeStaff
                }
            ]
        });
        // if no exist staff at the institution  return error
        if(!institutionStaff){
            return res.status(404).json( new ResponseServer(`Personal con id ${id_institution_staff} en la institución no se encontró datos`, false, null))
        }

        const attendances = await InstitutionStaff.findOne({
            where:{ id_institution_staff },
            include: [
                {
                    model: Attendance,
                    where:{
                        [Op.and]: [
                            sequelize.where(sequelize.fn('YEAR', sequelize.col('date_time')), year),
                            sequelize.where(sequelize.fn('MONTH', sequelize.col('date_time')), month)
                        ]
                    }
                }
            ],
        });


        const data = {
            ...institutionStaff?.toJSON(),
            'Attendances': attendances?attendances.get('Attendances'):[]
        }

        // return response message
        return res.status(200).json( new ResponseServer(`Personal con id ${id_institution_staff} en la institución datos`, true, data))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener un personal', false, null))
    }
}

export const getListStaff = async (req:Request, res: Response)=> {
    try {
        // get data from body
        const { modular_code } = req.body;
        // find all staff
        const listStaff = await Staff.findAll({
            where:{'$Institution.modular_code$': modular_code, 'status':true },
            include:[ TypeStaff, Institution, Attendance ]
        });
        // return response message
        return res.status(200).json( new ResponseServer('Lista de personal', true, listStaff, listStaff.length ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener lista de personal', false, null))
    }
}

export const getOneStaffWithInstitutions = async (req:Request, res: Response)=> {
    try {
        // get data from body
        const { id_card, type_id_card } = req.body;
        // get one staff
        const staff = await Staff.findOne({
            where:{ id_card, type_id_card },
            include:[
                {
                    model:InstitutionStaff,
                    where:{ status: true },
                    attributes:{ exclude:['createdAt','updatedAt','StaffIdCard','InstitutionModularCode'] },
                    include:[
                        {
                            model: InstitutionShift,
                            include:[
                                {
                                    model:Institution,
                                    attributes:{ exclude:['createdAt','updatedAt','address_IE','dependency_management'] }
                                },
                                {
                                    model:Shift,
                                    attributes:{ exclude:['createdAt','updatedAt','address_IE','dependency_management'] }
                                }
                            ],
                            attributes:{ exclude:['createdAt','updatedAt','address_IE','dependency_management'] }
                        }
                    ]
                }
            ],
            attributes:{ exclude:['createdAt','updatedAt','TypeStaffIdTypeStaff'] }
        })

        if(!staff){
            return res.status(404).json( new ResponseServer('El personal no cuenta con instituciones activas', false, null))
        }

        // return response messagem
        return res.status(200).json( new ResponseServer('Lista de personal', true, staff))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener lista de personal', false, null))
    }
}

export const searchDNIAPI = async (req:Request, res: Response)=> {
    try {
        // get ida card from body 
        const { id_card } = req.body;
        // get data from API
        const data = await (await fetch(`${globalConfig.URL_API_RENIEC}${id_card}`,{ 
            method:'GET', 
            headers:{ 'Authorization': globalConfig.TOKEN_API_RENIEC }
        })).json();
        // verify if exist error
        if(data.error){
            // return response message
            return res.status(404).json( new ResponseServer('Número de DNI no se encuentra en el padrón de RENIEC', false, null ))
        }
        // return response message
        return res.status(201).json( new ResponseServer('Datos de la persona de RENIEC', true, formatData(data) ))

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al obtener consulta de DNI API', false, null))
    }
}

const formatData = (persona:ResponseSUNAT) => {
    return {
        'names':persona.nombres,
        'first_name':persona.apellidoPaterno,
        'last_name':persona.apellidoMaterno,
    }
}

import {Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { Institution, InstitutionStaff, Staff, TypeStaff, WorkScheduleInstitution } from "../models";
import { Op } from 'sequelize';
import { InstitutionShift } from "../models/InstitutionShift";
import { Shift } from "../models/Shift";

const permitionsTables = [
    'institution',
    'staff-at-the-institution',
    'user'
]

export const searchInformation = async ( req:Request, res:Response) => {
    try {

        const { table, term } = req.params;

        if(!permitionsTables.includes(table)){
            return res.status(404).json( new ResponseServer(`La tabla ${table} no están permitidas para las busquedas`, true))
        }
        
        switch (table) {
            case 'institution':
                await searchInstitution( term, req, res)
                break;
            case 'staff-at-the-institution':
                await searchStaffAtTheInstitution( term, req, res)
                break;
            default:
                break;
        }

    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al subir archivo', false))
    }
}

const searchInstitution = async (term:string, req:Request, res:Response) => {

    const { offset = 0, limit = 5 } = req.query;

    const institutions = await Institution.findAndCountAll({
        distinct:true,
        attributes:{ exclude:['updatedAt'] },
        offset:Number(offset),
        limit:Number(limit),
        order:[['createdAt','DESC']],
        where:{
            [Op.or]:[
                { 
                    modular_code: { [Op.startsWith]:term }
                }, 
                {  
                    name_IE: { [Op.substring]:term }
                }
            ],
            [Op.and]:[{ status: true }]
        },
        include:[
            {
                model: InstitutionShift,
                include:[
                    {
                        model:Shift,
                        attributes:{ exclude:['createdAt','updatedAt'] },
                    }
                ],
                order:[[InstitutionShift, 'createdAt','DESC']],
            },
        ]
    })

    if(institutions.rows.length==0){
        return res.status(200).json( new ResponseServer(`No se encontraron resultados para ${term}`, false, institutions ))
    }

    return res.status(200).json( new ResponseServer(`Resultados de búsqueda ${term}`, true, institutions ))
}

const searchStaffAtTheInstitution = async (term:string, req:Request, res:Response) => {

    const { offset = 0, limit = 5, id_institution_shift } = req.query;

    if(!id_institution_shift){
        return res.status(500).json( new ResponseServer(`Para realizar la busqueda de la I.E es necesario el Id de la institución en turno`, false ))
    }
    // find one institution with modular code
    const institutionWithStaff = await InstitutionStaff.findAndCountAll({
        where:{ InstitutionShiftIdInstitutionShift: id_institution_shift },
        include:[
            {
                model: Staff,
                attributes:{ exclude:['createdAt','updatedAt'] },
                where:{
                    [Op.or]:[
                        { 
                            names: { [Op.substring]:term }
                        }, 
                        {  
                            id_card: { [Op.substring]:term }
                        }
                    ],
                    [Op.and]:[{ status: true }]
                },
            },
            {
                model:WorkScheduleInstitution,
                attributes:{ exclude:['createdAt','updatedAt'] }
            },
            {
                model: TypeStaff,
                attributes:{ exclude:['createdAt','updatedAt'] }
            }
        ],
        distinct:true,
        attributes:{ exclude:['createdAt','updatedAt'] },
        offset:Number(offset),
        limit:Number(limit)
    });

    // if(institutionWithStaff.rows.length==0){
    //     return res.status(404).json( new ResponseServer(`No se encontraron resultados para ${term}`, false, institutionWithStaff ))
    // }

    return res.status(200).json( new ResponseServer(`Resultados de búsqueda ${term}`, true, institutionWithStaff ))
}